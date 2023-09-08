import { Context } from '@nocobase/actions';
import { Application } from '@nocobase/server';
import { SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME, STORE_TABLE_TITLE_KEY } from '../../constants';
import { Database } from '@nocobase/database';

export async function useSaasStoreIdFiled(tableName: string, db: Database) {
  const collection = db.getCollection(tableName);
  if (collection.hasField(SAAS_TABLE_KEY_NAME.store)) {
    throw new Error(`${tableName}已开启saas多门店字段`);
  }
  const storeField = {
    name: SAAS_TABLE_KEY_NAME.store,
    foreignKey: SAAS_TABLE_ID.store,
    onDelete: 'NO ACTION',
    type: 'belongsTo',
    interface: 'm2o',
    target: SAAS_TABLE.store,
    uiSchema: {
      'x-component': 'AssociationField',
      'x-component-props': { multiple: false, fieldNames: { label: STORE_TABLE_TITLE_KEY, value: 'id' } },
      title: '门店',
    },
  };

  await collection.addField(SAAS_TABLE_KEY_NAME.store, storeField);
  await collection.sync({ alter: true });
  const fieldRepository = db.getRepository('fields');
  await fieldRepository.create({
    values: {
      name: SAAS_TABLE_KEY_NAME.store,
      type: storeField.type,
      interface: storeField.interface,
      collectionName: tableName,
      options: storeField,
    },
  });
}

export function registerSaasStoreAction(app: Application) {
  app.resource({
    name: 'saasStore',
    actions: {
      // 开启多门店字段方法
      use: async (ctx: Context, next) => {
        const { tableName } = ctx.action.params;
        await useSaasStoreIdFiled(tableName, app.db);
        ctx.body = 1;
        await next();
      },
    },
  });
}
