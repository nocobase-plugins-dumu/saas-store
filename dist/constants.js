var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var constants_exports = {};
__export(constants_exports, {
  DUMU_SAAS_STORE_PLUGIN_NAME: () => DUMU_SAAS_STORE_PLUGIN_NAME,
  HTTP_HEADER_STORE_KEY: () => HTTP_HEADER_STORE_KEY,
  NO_STORE_ID_TABLES: () => NO_STORE_ID_TABLES,
  SAAS_STORE_ID_CACHE_KEY: () => SAAS_STORE_ID_CACHE_KEY,
  SAAS_TABLE: () => SAAS_TABLE,
  SAAS_TABLE_ID: () => SAAS_TABLE_ID,
  SAAS_TABLE_KEY_NAME: () => SAAS_TABLE_KEY_NAME,
  STORE_TABLE_TITLE_KEY: () => STORE_TABLE_TITLE_KEY,
  namespace: () => namespace,
  userExtendField: () => userExtendField
});
module.exports = __toCommonJS(constants_exports);
const DUMU_SAAS_STORE_PLUGIN_NAME = "dumuSaasStore";
const SAAS_TABLE = {
  tenant: "tenant",
  store: "store",
  employee: "employee",
  storeDepartment: "storeDepartment",
  storeDepartmentUsers: "storeDepartmentUsers"
};
const SAAS_TABLE_ID = {
  store: "duMuSaasStoreId",
  tenant: "duMuSaasTenantId",
  departmentId: "orgId"
};
const SAAS_TABLE_KEY_NAME = {
  store: "duMuSaasStore",
  tenant: "duMuSaasTenant",
  department: "departments",
  employee: "employees"
};
const HTTP_HEADER_STORE_KEY = "X-Store";
const SAAS_STORE_ID_CACHE_KEY = "DUMU_SAAS_STORE_ID_CACHE_KEY";
const STORE_TABLE_TITLE_KEY = "name";
const NO_STORE_ID_TABLES = [
  "roles",
  SAAS_TABLE.tenant,
  SAAS_TABLE.store,
  SAAS_TABLE.storeDepartment,
  SAAS_TABLE.storeDepartmentUsers
];
const namespace = "dumu-saas-store";
const userExtendField = () => ({
  name: SAAS_TABLE_KEY_NAME.department,
  type: "belongsToMany",
  interface: "m2m",
  foreignKey: "userId",
  otherKey: SAAS_TABLE_ID.departmentId,
  through: SAAS_TABLE.storeDepartmentUsers,
  target: SAAS_TABLE.storeDepartment,
  targetKey: "id",
  sourceKey: "id",
  uiSchema: {
    "x-component": "AssociationField",
    "x-component-props": { multiple: true, fieldNames: { label: "name", value: "id" } },
    title: "\u6240\u5C5E\u90E8\u95E8"
  },
  reverseField: {
    name: "users",
    type: "belongsToMany",
    interface: "m2m",
    collectionName: SAAS_TABLE.storeDepartment,
    parentKey: null,
    uiSchema: {
      title: '{{t("Users")}}',
      "x-component": "AssociationField",
      "x-component-props": {
        multiple: true,
        fieldNames: {
          label: "nickname",
          value: "id"
        }
      }
    },
    target: "users",
    through: SAAS_TABLE.storeDepartmentUsers,
    sourceKey: "id",
    foreignKey: SAAS_TABLE_ID.departmentId,
    targetKey: "id",
    otherKey: "userId"
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DUMU_SAAS_STORE_PLUGIN_NAME,
  HTTP_HEADER_STORE_KEY,
  NO_STORE_ID_TABLES,
  SAAS_STORE_ID_CACHE_KEY,
  SAAS_TABLE,
  SAAS_TABLE_ID,
  SAAS_TABLE_KEY_NAME,
  STORE_TABLE_TITLE_KEY,
  namespace,
  userExtendField
});
