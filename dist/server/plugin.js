'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var server = require('@nocobase/server');
var path = require('path');
var constants = require('../constants');
var saasStore = require('./actions/saasStore');
var saasStoreField = require('./fields/saasStoreField');
var acl = require('./middlewares/acl');
var setCurrentTenantAndStore = require('./middlewares/setCurrentTenantAndStore');
var employee = require('./middlewares/employee');
var department = require('./middlewares/department');

class DuMuSassStorePlugin extends server.Plugin {
  beforeLoad() {
    this.db.registerFieldTypes({
      [constants.DUMU_SAAS_STORE_PLUGIN_NAME]: saasStoreField.SaasStoreField
    });
    this.app.resourcer.use(setCurrentTenantAndStore.setCurrentTenantAndStore, {
      tag: "setCurrentTenantAndStore",
      before: "acl",
      after: "setCurrentRole"
    });
    this.app.db.on("collection:loaded", (e) => {
      const collectionName = e.collection.options.name;
      const dumuSaasStoreField = e.collection.getField(constants.SAAS_TABLE_KEY_NAME.store);
      if (!dumuSaasStoreField || [constants.SAAS_TABLE.tenant, constants.SAAS_TABLE.store].includes(collectionName)) {
        return;
      }
      const collection = this.db.getCollection(collectionName);
      collection.setField(constants.SAAS_TABLE_ID.store, {
        type: constants.DUMU_SAAS_STORE_PLUGIN_NAME
      });
    });
  }
  async load() {
    await this.db.import({
      directory: path.resolve(__dirname, "collections")
    });
    const rootRole = this.app.acl.define({
      role: "root"
    });
    rootRole.grantAction("saasStore:use");
    saasStore.registerSaasStoreAction(this.app);
    acl.setAcl(this.app);
    employee.registerEmployeeDbMiddlewares(this.app);
    department.registerDepartmentDbMiddlewares(this.app);
  }
  async install(options) {
  }
  async afterEnable() {
    const repo = this.db.getRepository("collections");
    for (const name of [constants.SAAS_TABLE.tenant, constants.SAAS_TABLE.store, constants.SAAS_TABLE.storeDepartment, constants.SAAS_TABLE.employee]) {
      await repo.db2cm(name);
    }
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = DuMuSassStorePlugin;

exports.DuMuSassStorePlugin = DuMuSassStorePlugin;
exports.default = plugin_default;
