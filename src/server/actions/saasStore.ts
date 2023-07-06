import { Context } from '@nocobase/actions';
import { Application } from '@nocobase/server';
import { SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME, STORE_TABLE_TITLE_KEY } from '../../constants';

export function registerSaasStoreAction(app: Application) {
  app.resource({
    name: 'saasStore',
    actions: {
      // 开启多门店字段方法
      use: async (ctx: Context, next) => {
        const { tableName } = ctx.action.params;
        const collection = app.db.getCollection(tableName);
        if (collection.hasField(SAAS_TABLE_KEY_NAME.store)) {
          ctx.throw(`${tableName}已开启saas多门店字段`);
        }
        const storeField = {
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
        const fieldRepository = app.db.getRepository('fields');
        await fieldRepository.create({
          values: {
            name: SAAS_TABLE_KEY_NAME.store,
            type: storeField.type,
            interface: storeField.interface,
            collectionName: tableName,
            options: storeField,
          },
        });
        ctx.body = 1;
        await next();
      },
    },
  });
}
