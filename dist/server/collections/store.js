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
var store_exports = {};
__export(store_exports, {
  default: () => store_default
});
module.exports = __toCommonJS(store_exports);
var import_constants = require("../../constants");
var store_default = {
  name: import_constants.SAAS_TABLE.store,
  title: "\u95E8\u5E97",
  model: import_constants.SAAS_TABLE.store + "Model",
  logging: true,
  autoGenId: true,
  createdBy: true,
  updatedBy: true,
  createdAt: true,
  updatedAt: true,
  sortable: true,
  fields: [
    {
      name: "id",
      type: "bigInt",
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      uiSchema: { type: "number", title: '{{t("ID")}}', "x-component": "InputNumber", "x-read-pretty": true },
      interface: "id"
    },
    {
      interface: "input",
      type: "string",
      name: import_constants.STORE_TABLE_TITLE_KEY,
      uiSchema: {
        type: "string",
        title: "\u540D\u79F0",
        "x-component": "Input"
      }
    },
    {
      name: import_constants.SAAS_TABLE_KEY_NAME.tenant,
      type: "belongsTo",
      interface: "m2o",
      collectionName: "store",
      foreignKey: import_constants.SAAS_TABLE_ID.tenant,
      onDelete: "NO ACTION",
      target: import_constants.SAAS_TABLE.tenant,
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
        title: "\u79DF\u6237"
      }
    },
    {
      name: import_constants.SAAS_TABLE_KEY_NAME.department,
      type: "hasMany",
      interface: "o2m",
      collectionName: import_constants.SAAS_TABLE.store,
      target: import_constants.SAAS_TABLE.storeDepartment,
      onDelete: "SET NULL",
      sourceKey: "id",
      foreignKey: import_constants.SAAS_TABLE_ID.store,
      targetKey: "id",
      uiSchema: {
        title: "\u95E8\u5E97\u7EC4\u7EC7\u67B6\u6784",
        "x-component": "AssociationField",
        "x-component-props": {
          multiple: true,
          fieldNames: {
            label: import_constants.STORE_TABLE_TITLE_KEY,
            value: "id"
          }
        }
      }
    }
  ]
};
