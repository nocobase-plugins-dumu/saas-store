import { CollectionOptions } from '@nocobase/database';
import { SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME, STORE_TABLE_TITLE_KEY } from '../../constants';

export default {
  name: SAAS_TABLE.tenant,
  title: '租户',
  model: SAAS_TABLE.tenant + 'Model',
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
      name: SAAS_TABLE_KEY_NAME.store,
      type: 'hasMany',
      interface: 'o2m',
      collectionName: SAAS_TABLE.tenant,
      target: 'store',
      onDelete: 'NO ACTION',
      sourceKey: 'id',
      foreignKey: SAAS_TABLE_ID.tenant,
      targetKey: 'id',
      uiSchema: {
        title: '门店',
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
