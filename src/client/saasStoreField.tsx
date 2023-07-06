import { IField, interfacesProperties } from '@nocobase/client';
import { SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME, STORE_TABLE_TITLE_KEY } from '../constants';

const { defaultProps, operators } = interfacesProperties;

export const saasStoreField: IField = {
  name: 'mathFormula',
  type: 'object',
  group: 'systemInfo',
  order: 9,
  title: 'saas多门店字段',
  description: 'saas多门店字段',
  sortable: true,
  default: {
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
  properties: {
    ...defaultProps,
    'uiSchema.title': {
      type: 'string',
      title: '{{t("Field display name")}}',
      required: true,
      default: 'ID',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    name: {
      type: 'string',
      title: '{{t("Field name")}}',
      required: true,
      'x-disabled': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      description: 'saas多门店字段',
    },
  },
  filterable: {
    operators: operators.number,
  },
};
