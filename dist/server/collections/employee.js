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
var employee_exports = {};
__export(employee_exports, {
  default: () => employee_default
});
module.exports = __toCommonJS(employee_exports);
var import_constants = require("../../constants");
var employee_default = {
  name: import_constants.SAAS_TABLE.employee,
  title: "\u95E8\u5E97\u5458\u5DE5",
  inherits: "users",
  model: import_constants.SAAS_TABLE.employee + "Model",
  logging: true,
  autoGenId: true,
  createdBy: true,
  updatedBy: true,
  createdAt: true,
  updatedAt: true,
  sortable: true,
  fields: [
    {
      interface: "m2m",
      type: "belongsToMany",
      name: "roles",
      target: "roles",
      foreignKey: "userId",
      otherKey: "roleName",
      onDelete: "CASCADE",
      sourceKey: "id",
      targetKey: "name",
      through: "rolesUsers",
      uiSchema: {
        type: "array",
        title: '{{t("Roles")}}',
        "x-component": "AssociationField",
        "x-component-props": {
          multiple: true,
          fieldNames: {
            label: "title",
            value: "name"
          }
        }
      }
    },
    {
      name: import_constants.SAAS_TABLE_KEY_NAME.department,
      type: "belongsToMany",
      interface: "m2m",
      foreignKey: "userId",
      otherKey: import_constants.SAAS_TABLE_ID.departmentId,
      through: import_constants.SAAS_TABLE.storeDepartmentUsers,
      target: import_constants.SAAS_TABLE.storeDepartment,
      targetKey: "id",
      sourceKey: "id",
      uiSchema: {
        "x-component": "AssociationField",
        "x-component-props": { multiple: true, fieldNames: { label: "name", value: "id" } },
        title: "\u6240\u5C5E\u90E8\u95E8"
      }
    },
    {
      name: import_constants.SAAS_TABLE_KEY_NAME.store,
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
    }
  ]
};
