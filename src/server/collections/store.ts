import { CollectionOptions } from '@nocobase/database';
import { SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME, STORE_TABLE_TITLE_KEY } from '../../constants';

export default {
  name: SAAS_TABLE.store,
  title: '门店',
  model: SAAS_TABLE.store + 'Model',
  logging: true,
  autoGenId: true,
  createdBy: true,
  updatedBy: true,
  createdAt: true,
  updatedAt: true,
  sortable: true,
  fields: [
    {
      name: 'id',
      type: 'bigInt',
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      uiSchema: { type: 'number', title: '{{t("ID")}}', 'x-component': 'InputNumber', 'x-read-pretty': true },
      interface: 'id',
    },
    {
      interface: 'input',
      type: 'string',
      name: STORE_TABLE_TITLE_KEY,
      uiSchema: {
        type: 'string',
        title: '名称',
        'x-component': 'Input',
      },
    },
    {
      name: SAAS_TABLE_KEY_NAME.tenant,
      type: 'belongsTo',
      interface: 'm2o',
      collectionName: 'store',
      foreignKey: SAAS_TABLE_ID.tenant,
      onDelete: 'NO ACTION',
      target: SAAS_TABLE.tenant,
      targetKey: 'id',
      uiSchema: {
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: false,
          fieldNames: {
            label: STORE_TABLE_TITLE_KEY,
            value: 'id',
          },
        },
        title: '租户',
      },
    },
    {
      name: SAAS_TABLE_KEY_NAME.department,
      type: 'hasMany',
      interface: 'o2m',
      collectionName: SAAS_TABLE.store,
      target: SAAS_TABLE.storeDepartment,
      onDelete: 'SET NULL',
      sourceKey: 'id',
      foreignKey: SAAS_TABLE_ID.store,
      targetKey: 'id',
      uiSchema: {
        title: '门店组织架构',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: true,
          fieldNames: {
            label: STORE_TABLE_TITLE_KEY,
            value: 'id',
          },
        },
      },
    },
  ],
} as CollectionOptions;
