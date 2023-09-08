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
var saasStore_exports = {};
__export(saasStore_exports, {
  registerSaasStoreAction: () => registerSaasStoreAction,
  useSaasStoreIdFiled: () => useSaasStoreIdFiled
});
module.exports = __toCommonJS(saasStore_exports);
var import_constants = require("../../constants");
async function useSaasStoreIdFiled(tableName, db) {
  const collection = db.getCollection(tableName);
  if (collection.hasField(import_constants.SAAS_TABLE_KEY_NAME.store)) {
    throw new Error(`${tableName}\u5DF2\u5F00\u542Fsaas\u591A\u95E8\u5E97\u5B57\u6BB5`);
  }
  const storeField = {
    foreignKey: import_constants.SAAS_TABLE_ID.store,
    onDelete: "NO ACTION",
    type: "belongsTo",
    interface: "m2o",
    target: import_constants.SAAS_TABLE.store,
    uiSchema: {
      "x-component": "AssociationField",
      "x-component-props": { multiple: false, fieldNames: { label: import_constants.STORE_TABLE_TITLE_KEY, value: "id" } },
      title: "\u95E8\u5E97"
    }
  };
  await collection.addField(import_constants.SAAS_TABLE_KEY_NAME.store, storeField);
  await collection.sync({ alter: true });
  const fieldRepository = db.getRepository("fields");
  await fieldRepository.create({
    values: {
      name: import_constants.SAAS_TABLE_KEY_NAME.store,
      type: storeField.type,
      interface: storeField.interface,
      collectionName: tableName,
      options: storeField
    }
  });
}
function registerSaasStoreAction(app) {
  app.resource({
    name: "saasStore",
    actions: {
      // 开启多门店字段方法
      use: async (ctx, next) => {
        const { tableName } = ctx.action.params;
        await useSaasStoreIdFiled(tableName, app.db);
        ctx.body = 1;
        await next();
      }
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerSaasStoreAction,
  useSaasStoreIdFiled
});
