export const DUMU_SAAS_STORE_PLUGIN_NAME = 'dumuSaasStore';
export const SAAS_TABLE = {
  tenant: 'tenant',
  store: 'store',
  employee: 'employee',
  storeDepartment: 'storeDepartment',
  storeDepartmentUsers: 'storeDepartmentUsers',
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
  employee: 'employees',
};
export const HTTP_HEADER_STORE_KEY = 'X-Store';
export const SAAS_STORE_ID_CACHE_KEY = 'DUMU_SAAS_STORE_ID_CACHE_KEY';
export const STORE_TABLE_TITLE_KEY = 'name';
export const NO_STORE_ID_TABLES = [
  'roles',
  SAAS_TABLE.tenant,
  SAAS_TABLE.store,
  SAAS_TABLE.storeDepartment,
  SAAS_TABLE.storeDepartmentUsers,
];
export const namespace = 'dumu-saas-store';
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
