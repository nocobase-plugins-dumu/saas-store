'use strict';

var constants = require('../../constants');

var store_default = {
  name: constants.SAAS_TABLE.store,
  title: "\u95E8\u5E97",
  model: constants.SAAS_TABLE.store + "Model",
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
      name: constants.STORE_TABLE_TITLE_KEY,
      uiSchema: {
        type: "string",
        title: "\u540D\u79F0",
        "x-component": "Input"
      }
    },
    {
      name: constants.SAAS_TABLE_KEY_NAME.tenant,
      type: "belongsTo",
      interface: "m2o",
      collectionName: "store",
      foreignKey: constants.SAAS_TABLE_ID.tenant,
      onDelete: "NO ACTION",
      target: constants.SAAS_TABLE.tenant,
      targetKey: "id",
      uiSchema: {
        "x-component": "AssociationField",
        "x-component-props": {
          multiple: false,
          fieldNames: {
            label: constants.STORE_TABLE_TITLE_KEY,
            value: "id"
          }
        },
        title: "\u79DF\u6237"
      }
    },
    {
      name: constants.SAAS_TABLE_KEY_NAME.department,
      type: "hasMany",
      interface: "o2m",
      collectionName: constants.SAAS_TABLE.store,
      target: constants.SAAS_TABLE.storeDepartment,
      onDelete: "SET NULL",
      sourceKey: "id",
      foreignKey: constants.SAAS_TABLE_ID.store,
      targetKey: "id",
      uiSchema: {
        title: "\u95E8\u5E97\u7EC4\u7EC7\u67B6\u6784",
        "x-component": "AssociationField",
        "x-component-props": {
          multiple: true,
          fieldNames: {
            label: constants.STORE_TABLE_TITLE_KEY,
            value: "id"
          }
        }
      }
    }
  ]
};

module.exports = store_default;
