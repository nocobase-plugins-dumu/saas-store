var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var plugin_exports = {};
__export(plugin_exports, {
  DuMuSassStorePlugin: () => DuMuSassStorePlugin,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_path = require("path");
var import_constants = require("../constants");
var import_saasStore = require("./actions/saasStore");
var import_saasStoreField = require("./fields/saasStoreField");
var import_acl = require("./middlewares/acl");
var import_setCurrentTenantAndStore = require("./middlewares/setCurrentTenantAndStore");
var import_employee = require("./middlewares/employee");
var import_department = require("./middlewares/department");
class DuMuSassStorePlugin extends import_server.Plugin {
  beforeLoad() {
    this.db.registerFieldTypes({
      [import_constants.DUMU_SAAS_STORE_PLUGIN_NAME]: import_saasStoreField.SaasStoreField
    });
    this.app.resourcer.use(import_setCurrentTenantAndStore.setCurrentTenantAndStore, {
      tag: "setCurrentTenantAndStore",
      before: "acl",
      after: "setCurrentRole"
    });
    this.app.db.on("collection:loaded", (e) => {
      const collectionName = e.collection.options.name;
      const dumuSaasStoreField = e.collection.getField(import_constants.SAAS_TABLE_KEY_NAME.store);
      if (!dumuSaasStoreField || [import_constants.SAAS_TABLE.tenant, import_constants.SAAS_TABLE.store].includes(collectionName)) {
        return;
      }
      const collection = this.db.getCollection(collectionName);
      collection.setField(import_constants.SAAS_TABLE_ID.store, {
        type: import_constants.DUMU_SAAS_STORE_PLUGIN_NAME
      });
    });
  }
  async load() {
    await this.db.import({
      directory: (0, import_path.resolve)(__dirname, "collections")
    });
    const rootRole = this.app.acl.define({
      role: "root"
    });
    rootRole.grantAction("saasStore:use");
    (0, import_saasStore.registerSaasStoreAction)(this.app);
    (0, import_acl.setAcl)(this.app);
    (0, import_employee.registerEmployeeDbMiddlewares)(this.app);
    (0, import_department.registerDepartmentDbMiddlewares)(this.app);
  }
  async install(options) {
  }
  async afterEnable() {
    const repo = this.db.getRepository("collections");
    for (const name of [import_constants.SAAS_TABLE.tenant, import_constants.SAAS_TABLE.store, import_constants.SAAS_TABLE.storeDepartment, import_constants.SAAS_TABLE.employee]) {
      await repo.db2cm(name);
    }
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = DuMuSassStorePlugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DuMuSassStorePlugin
});
