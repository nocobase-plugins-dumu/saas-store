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
var tenant_exports = {};
__export(tenant_exports, {
  default: () => tenant_default
});
module.exports = __toCommonJS(tenant_exports);
var import_constants = require("../../constants");
var tenant_default = {
  name: import_constants.SAAS_TABLE.tenant,
  title: "\u79DF\u6237",
  model: import_constants.SAAS_TABLE.tenant + "Model",
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
      name: import_constants.SAAS_TABLE_KEY_NAME.store,
      type: "hasMany",
      interface: "o2m",
      collectionName: import_constants.SAAS_TABLE.tenant,
      target: "store",
      onDelete: "NO ACTION",
      sourceKey: "id",
      foreignKey: import_constants.SAAS_TABLE_ID.tenant,
      targetKey: "id",
      uiSchema: {
        title: "\u95E8\u5E97",
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
