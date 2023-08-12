import { CollectionOptions } from '@nocobase/database';
import { SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME, STORE_TABLE_TITLE_KEY } from '../../constants';

export default {
  name: SAAS_TABLE.storeDepartment,
  title: '门店部门',
  model: SAAS_TABLE.storeDepartment + 'Model',
  logging: true,
  autoGenId: true,
  createdBy: true,
  updatedBy: true,
  createdAt: true,
  updatedAt: true,
  sortable: true,
  tree: 'adjacency-list',
  template: 'tree',
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
      interface: 'integer',
      name: 'parentId',
      type: 'bigInt',
      isForeignKey: true,
      uiSchema: {
        type: 'number',
        title: '{{t("Parent ID")}}',
        'x-component': 'InputNumber',
        'x-read-pretty': true,
      },
      target: SAAS_TABLE.storeDepartment,
    },
    {
      interface: 'm2o',
      type: 'belongsTo',
      name: 'parent',
      treeParent: true,
      foreignKey: 'parentId',
      uiSchema: {
        title: '{{t("Parent")}}',
        'x-component': 'AssociationField',
        'x-component-props': { multiple: false, fieldNames: { label: STORE_TABLE_TITLE_KEY, value: 'id' } },
      },
      target: SAAS_TABLE.storeDepartment,
    },
    {
      interface: 'o2m',
      type: 'hasMany',
      name: 'children',
      foreignKey: 'parentId',
      uiSchema: {
        title: '{{t("Children")}}',
        'x-component': 'RecordPicker',
        'x-component-props': { multiple: true, fieldNames: { label: STORE_TABLE_TITLE_KEY, value: 'id' } },
      },
      treeChildren: true,
      target: SAAS_TABLE.storeDepartment,
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
    {
      name: SAAS_TABLE_KEY_NAME.employee,
      type: 'belongsToMany',
      interface: 'm2m',
      collectionName: SAAS_TABLE.storeDepartment,
      parentKey: null,
      uiSchema: {
        title: '员工',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: true,
          fieldNames: {
            label: 'nickname',
            value: 'id',
          },
        },
      },
      target: SAAS_TABLE.employee,
      through: SAAS_TABLE.storeDepartmentUsers,
      sourceKey: 'id',
      foreignKey: SAAS_TABLE_ID.departmentId,
      targetKey: 'id',
      otherKey: 'userId',
    },
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
  ],
} as CollectionOptions;
