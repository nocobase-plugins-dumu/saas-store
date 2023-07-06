export const DUMU_SAAS_STORE_PLUGIN_NAME = 'dumuSaasStore';
export const SAAS_TABLE = {
  tenant: 'tenant',
  store: 'store',
  storeDepartment: 'storeOrganization',
  storeDepartmentUsers: 'storeOrganizationUsers',
};
export const SAAS_TABLE_ID = {
  store: 'duMuSaasStoreId',
  tenant: 'duMuSaasTenantId',
  departmentId: 'orgId',
};
export const SAAS_TABLE_KEY_NAME = {
  store: 'duMuSaasStore',
  tenant: 'duMuSaasTenant',
  department: 'departments',
};
export const HTTP_HEADER_STORE_KEY = 'X-Store';
export const STORE_TABLE_TITLE_KEY = 'name';
export const NO_STORE_ID_TABLES = [
  'roles',
  'users',
  SAAS_TABLE.tenant,
  SAAS_TABLE.store,
  SAAS_TABLE.storeDepartment,
  SAAS_TABLE.storeDepartmentUsers,
];
export const namespace = require('../package.json').name;
export const userExtendField = () => ({
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
  reverseField: {
    name: 'users',
    type: 'belongsToMany',
    interface: 'm2m',
    collectionName: SAAS_TABLE.storeDepartment,
    parentKey: null,
    uiSchema: {
      title: '{{t("Users")}}',
      'x-component': 'AssociationField',
      'x-component-props': {
        multiple: true,
        fieldNames: {
          label: 'nickname',
          value: 'id',
        },
      },
    },
    target: 'users',
    through: SAAS_TABLE.storeDepartmentUsers,
    sourceKey: 'id',
    foreignKey: SAAS_TABLE_ID.departmentId,
    targetKey: 'id',
    otherKey: 'userId',
  },
});
