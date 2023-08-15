'use strict';

var constants = require('../../constants');

var tenant_default = {
  name: constants.SAAS_TABLE.tenant,
  title: "\u79DF\u6237",
  model: constants.SAAS_TABLE.tenant + "Model",
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
      name: constants.SAAS_TABLE_KEY_NAME.store,
      type: "hasMany",
      interface: "o2m",
      collectionName: constants.SAAS_TABLE.tenant,
      target: "store",
      onDelete: "NO ACTION",
      sourceKey: "id",
      foreignKey: constants.SAAS_TABLE_ID.tenant,
      targetKey: "id",
      uiSchema: {
        title: "\u95E8\u5E97",
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

module.exports = tenant_default;
