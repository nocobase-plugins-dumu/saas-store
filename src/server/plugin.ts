import { Context } from '@nocobase/actions';
import { actions } from '@nocobase/auth';
import { CollectionRepository } from '@nocobase/plugin-collection-manager';
import { InstallOptions, Plugin } from '@nocobase/server';
import omit from 'lodash/omit';
import { resolve } from 'path';
import { SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME, STORE_TABLE_TITLE_KEY, userExtendField } from '../constants';
import { setCurrentTenantAndStore } from './middlewares/setCurrentTenantAndStore';

export class DuMuSassStorePlugin extends Plugin {
  afterAdd() {}

  beforeLoad() {
    this.app.resourcer.use(setCurrentTenantAndStore, {
      tag: 'setCurrentTenantAndStore',
      before: 'acl',
      after: 'setCurrentRole',
    });
  }

  async load() {
    await this.db.import({
      directory: resolve(__dirname, 'collections'),
    });
    const rootRole = this.app.acl.define({
      role: 'root',
    });
    rootRole.grantAction('saasStore:use');
    this.app.resource({
      name: 'saasStore',
      actions: {
        use: async (ctx: Context, next) => {
          const { tableName } = ctx.action.params;
          const collection = this.app.db.getCollection(tableName);
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
          const fieldRepository = this.app.db.getRepository('fields');
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
        collections: async (ctx: Context, next) => {
          actions.list(ctx as any, next);
        },
      },
    });
  }

  async install(options?: InstallOptions) {
    const repo = this.db.getRepository<CollectionRepository>('collections');
    for (const name of [SAAS_TABLE.tenant, SAAS_TABLE.store, SAAS_TABLE.storeDepartment]) {
      await repo.db2cm(name);
    }
    const tempField = userExtendField();
    const fieldRepository = this.app.db.getRepository('fields');
    let departmentField = await fieldRepository.findOne({
      filter: {
        name: tempField.reverseField.name,
        collectionName: SAAS_TABLE.storeDepartment,
      },
    });
    if (!departmentField) {
      departmentField = await fieldRepository.create({
        values: {
          name: tempField.reverseField.name,
          type: tempField.reverseField.type,
          interface: tempField.reverseField.interface,
          collectionName: SAAS_TABLE.storeDepartment,
          options: tempField.reverseField,
        },
      });
    }

    let userField = await fieldRepository.findOne({
      filter: {
        name: tempField.name,
        collectionName: 'users',
      },
    });
    if (!userField) {
      userField = await fieldRepository.create({
        values: {
          reverseKey: departmentField.key,
          name: tempField.name,
          type: tempField.type,
          interface: tempField.interface,
          collectionName: 'users',
          options: omit(tempField, 'reverseField'),
        },
      });
    }
    await fieldRepository.update({
      values: {
        reverseKey: userField.key,
      },
      filter: {
        key: departmentField.key,
      },
    });
    this.app.db.getCollection('users').setField(tempField.name, tempField);
    this.app.db.getCollection(SAAS_TABLE.storeDepartment).setField(tempField.reverseField.name, tempField.reverseField);
  }

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default DuMuSassStorePlugin;
