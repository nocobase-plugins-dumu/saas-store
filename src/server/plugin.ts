import { InstallOptions, Plugin } from '@nocobase/server';
import { resolve } from 'path';
import { DUMU_SAAS_STORE_PLUGIN_NAME, NO_STORE_ID_TABLES, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME } from '../constants';
import { registerSaasStoreAction } from './actions/saasStore';
import { SaasStoreField } from './fields/saasStoreField';
import { dumuSaasStoreInstall } from './install';
import { setCurrentTenantAndStore } from './middlewares/setCurrentTenantAndStore';

export class DuMuSassStorePlugin extends Plugin {
  beforeLoad() {
    this.db.registerFieldTypes({
      [DUMU_SAAS_STORE_PLUGIN_NAME]: SaasStoreField,
    });
    // 当前租户和门店上下文
    this.app.resourcer.use(setCurrentTenantAndStore, {
      tag: 'setCurrentTenantAndStore',
      before: 'acl',
      after: 'setCurrentRole',
    });
    this.app.db.on('collection:loaded', (e) => {
      const collectionName = e.collection.options.name;
      const dumuSaasStoreField = e.collection.getField(SAAS_TABLE_KEY_NAME.store);
      if (!dumuSaasStoreField || NO_STORE_ID_TABLES.includes(collectionName)) {
        return;
      }
      const collection = this.db.getCollection(collectionName);
      collection.setField(SAAS_TABLE_ID.store, {
        type: DUMU_SAAS_STORE_PLUGIN_NAME,
      });
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
    registerSaasStoreAction(this.app);
  }

  async install(options?: InstallOptions) {
    await dumuSaasStoreInstall(this.db);
  }

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default DuMuSassStorePlugin;
