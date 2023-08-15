'use strict';

var constants = require('../../constants');

var employee_default = {
  name: constants.SAAS_TABLE.employee,
  title: "\u95E8\u5E97\u5458\u5DE5",
  inherits: "users",
  model: constants.SAAS_TABLE.employee + "Model",
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
      name: constants.SAAS_TABLE_KEY_NAME.department,
      type: "belongsToMany",
      interface: "m2m",
      foreignKey: "userId",
      otherKey: constants.SAAS_TABLE_ID.departmentId,
      through: constants.SAAS_TABLE.storeDepartmentUsers,
      target: constants.SAAS_TABLE.storeDepartment,
      targetKey: "id",
      sourceKey: "id",
      uiSchema: {
        "x-component": "AssociationField",
        "x-component-props": { multiple: true, fieldNames: { label: "name", value: "id" } },
        title: "\u6240\u5C5E\u90E8\u95E8"
      }
    },
    {
      name: constants.SAAS_TABLE_KEY_NAME.store,
      foreignKey: constants.SAAS_TABLE_ID.store,
      onDelete: "NO ACTION",
      type: "belongsTo",
      interface: "m2o",
      target: constants.SAAS_TABLE.store,
      uiSchema: {
        "x-component": "AssociationField",
        "x-component-props": { multiple: false, fieldNames: { label: constants.STORE_TABLE_TITLE_KEY, value: "id" } },
        title: "\u95E8\u5E97"
      }
    }
  ]
};

module.exports = employee_default;
