import { Collection } from '@nocobase/database';
import { InstallOptions, Plugin } from '@nocobase/server';
import { setCurrentTenantAndStore } from './middlewares/setCurrentTenantAndStore';

export class DumuSassStorePlugin extends Plugin {
  afterAdd() {}

  beforeLoad() {
    this.app.resourcer.use(setCurrentTenantAndStore, {
      tag: 'setCurrentTenantAndStore',
      before: 'acl',
      after: 'setCurrentRole',
    });
    this.db.on('afterDefineCollection', (collection: Collection) => {
      const { tenantMode, storeMode } = collection.options;
      if (tenantMode === true) {
        console.log('111');
        // collection.setField('createdBy', {
        //   type: 'belongsTo',
        //   target: 'users',
        //   foreignKey: 'createdById',
        //   targetKey: 'id',
        // });
      }
      if (storeMode === true) {
        console.log('111');
        // collection.setField('updatedBy', {
        //   type: 'belongsTo',
        //   target: 'users',
        //   foreignKey: 'updatedById',
        //   targetKey: 'id',
        // });
      }
    });
  }

  async load() {}

  async install(options?: InstallOptions) {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default DumuSassStorePlugin;
