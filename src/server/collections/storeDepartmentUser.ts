import { CollectionOptions } from '@nocobase/database';
import { SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME, STORE_TABLE_TITLE_KEY } from '../../constants';

export default {
  name: SAAS_TABLE.storeDepartmentUsers,
  title: '门店用户关联表',
  fields: [
    {
      name: SAAS_TABLE_KEY_NAME.store,
      type: 'belongsTo',
      interface: 'm2o',
      collectionName: SAAS_TABLE_KEY_NAME.store,
      foreignKey: SAAS_TABLE_ID.store,
      onDelete: 'NO ACTION',
      target: SAAS_TABLE.store,
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
        title: '门店',
      },
    },
  ],
} as CollectionOptions;
