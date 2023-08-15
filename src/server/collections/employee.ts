import { CollectionOptions } from '@nocobase/database';
import { SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME, STORE_TABLE_TITLE_KEY } from '../../constants';

export default {
  name: SAAS_TABLE.employee,
  title: '门店员工',
  inherits: 'users',
  model: SAAS_TABLE.employee + 'Model',
  logging: true,
  autoGenId: true,
  createdBy: true,
  updatedBy: true,
  createdAt: true,
  updatedAt: true,
  sortable: true,
  fields: [
    {
      interface: 'm2m',
      type: 'belongsToMany',
      name: 'roles',
      target: 'roles',
      foreignKey: 'userId',
      otherKey: 'roleName',
      onDelete: 'CASCADE',
      sourceKey: 'id',
      targetKey: 'name',
      through: 'rolesUsers',
      uiSchema: {
        type: 'array',
        title: '{{t("Roles")}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: true,
          fieldNames: {
            label: 'title',
            value: 'name',
          },
        },
      },
    },
    {
      name: SAAS_TABLE_KEY_NAME.department,
      type: 'belongsToMany',
      interface: 'm2m',
      foreignKey: 'userId',
      otherKey: SAAS_TABLE_ID.departmentId,
      through: SAAS_TABLE.storeDepartmentUsers,
      target: SAAS_TABLE.storeDepartment,
      targetKey: 'id',
      sourceKey: 'id',
      uiSchema: {
        'x-component': 'AssociationField',
        'x-component-props': { multiple: true, fieldNames: { label: 'name', value: 'id' } },
        title: '所属部门',
      },
    },
    {
      name: SAAS_TABLE_KEY_NAME.store,
      foreignKey: SAAS_TABLE_ID.store,
      onDelete: 'NO ACTION',
      type: 'belongsTo',
      interface: 'm2o',
      target: SAAS_TABLE.store,
      uiSchema: {
        'x-component': 'AssociationField',
        'x-component-props': { multiple: false, fieldNames: { label: STORE_TABLE_TITLE_KEY, value: 'id' } },
        title: '门店',
      },
    },
  ],
} as CollectionOptions;
