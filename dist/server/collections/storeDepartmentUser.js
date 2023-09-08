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
var storeDepartmentUser_exports = {};
__export(storeDepartmentUser_exports, {
  default: () => storeDepartmentUser_default
});
module.exports = __toCommonJS(storeDepartmentUser_exports);
var import_constants = require("../../constants");
var storeDepartmentUser_default = {
  name: import_constants.SAAS_TABLE.storeDepartmentUsers,
  title: "\u95E8\u5E97\u7528\u6237\u5173\u8054\u8868",
  fields: [
    {
      name: import_constants.SAAS_TABLE_KEY_NAME.store,
      type: "belongsTo",
      interface: "m2o",
      collectionName: import_constants.SAAS_TABLE_KEY_NAME.store,
      foreignKey: import_constants.SAAS_TABLE_ID.store,
      onDelete: "NO ACTION",
      target: import_constants.SAAS_TABLE.store,
      targetKey: "id",
      uiSchema: {
        "x-component": "AssociationField",
        "x-component-props": {
          multiple: false,
          fieldNames: {
            label: import_constants.STORE_TABLE_TITLE_KEY,
            value: "id"
          }
        },
        title: "\u95E8\u5E97"
      }
    }
  ]
};
