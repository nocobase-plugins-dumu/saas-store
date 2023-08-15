'use strict';

var constants = require('../../constants');

var storeDepartmentUser_default = {
  name: constants.SAAS_TABLE.storeDepartmentUsers,
  title: "\u95E8\u5E97\u7528\u6237\u5173\u8054\u8868",
  fields: [
    {
      name: constants.SAAS_TABLE_KEY_NAME.store,
      type: "belongsTo",
      interface: "m2o",
      collectionName: constants.SAAS_TABLE_KEY_NAME.store,
      foreignKey: constants.SAAS_TABLE_ID.store,
      onDelete: "NO ACTION",
      target: constants.SAAS_TABLE.store,
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
        title: "\u95E8\u5E97"
      }
    }
  ]
};

module.exports = storeDepartmentUser_default;
