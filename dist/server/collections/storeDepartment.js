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
var storeDepartment_exports = {};
__export(storeDepartment_exports, {
  default: () => storeDepartment_default
});
module.exports = __toCommonJS(storeDepartment_exports);
var import_constants = require("../../constants");
var storeDepartment_default = {
  name: import_constants.SAAS_TABLE.storeDepartment,
  title: "\u95E8\u5E97\u90E8\u95E8",
  model: import_constants.SAAS_TABLE.storeDepartment + "Model",
  logging: true,
  autoGenId: true,
  createdBy: true,
  updatedBy: true,
  createdAt: true,
  updatedAt: true,
  sortable: true,
  tree: "adjacency-list",
  template: "tree",
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
      interface: "integer",
      name: "parentId",
      type: "bigInt",
      isForeignKey: true,
      uiSchema: {
        type: "number",
        title: '{{t("Parent ID")}}',
        "x-component": "InputNumber",
        "x-read-pretty": true
      },
      target: import_constants.SAAS_TABLE.storeDepartment
    },
    {
      interface: "m2o",
      type: "belongsTo",
      name: "parent",
      treeParent: true,
      foreignKey: "parentId",
      uiSchema: {
        title: '{{t("Parent")}}',
        "x-component": "AssociationField",
        "x-component-props": { multiple: false, fieldNames: { label: import_constants.STORE_TABLE_TITLE_KEY, value: "id" } }
      },
      target: import_constants.SAAS_TABLE.storeDepartment
    },
    {
      interface: "o2m",
      type: "hasMany",
      name: "children",
      foreignKey: "parentId",
      uiSchema: {
        title: '{{t("Children")}}',
        "x-component": "RecordPicker",
        "x-component-props": { multiple: true, fieldNames: { label: import_constants.STORE_TABLE_TITLE_KEY, value: "id" } }
      },
      treeChildren: true,
      target: import_constants.SAAS_TABLE.storeDepartment
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
    },
    {
      name: import_constants.SAAS_TABLE_KEY_NAME.employee,
      type: "belongsToMany",
      interface: "m2m",
      collectionName: import_constants.SAAS_TABLE.storeDepartment,
      parentKey: null,
      uiSchema: {
        title: "\u5458\u5DE5",
        "x-component": "AssociationField",
        "x-component-props": {
          multiple: true,
          fieldNames: {
            label: "nickname",
            value: "id"
          }
        }
      },
      target: import_constants.SAAS_TABLE.employee,
      through: import_constants.SAAS_TABLE.storeDepartmentUsers,
      sourceKey: "id",
      foreignKey: import_constants.SAAS_TABLE_ID.departmentId,
      targetKey: "id",
      otherKey: "userId"
    }
    // 好像可以不用这个，先去掉
    // {
    //   name: SASS_TABLE_KEY_NAME.tenant,
    //   type: 'belongsTo',
    //   interface: 'm2o',
    //   collectionName: SASS_TABLE_KEY_NAME.tenant,
    //   foreignKey: SASS_TABLE_ID.tenant,
    //   onDelete: 'NO ACTION',
    //   target: SASS_TABLE.tenant,
    //   targetKey: 'id',
    //   uiSchema: {
    //     'x-component': 'AssociationField',
    //     'x-component-props': {
    //       multiple: false,
    //       fieldNames: {
    //         label: STORE_TABLE_TITLE_KEY,
    //         value: 'id',
    //       },
    //     },
    //     title: '租户',
    //   },
    // },
  ]
};
