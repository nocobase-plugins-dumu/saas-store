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
var setCurrentTenantAndStore_exports = {};
__export(setCurrentTenantAndStore_exports, {
  setCurrentTenantAndStore: () => setCurrentTenantAndStore
});
module.exports = __toCommonJS(setCurrentTenantAndStore_exports);
var import_lodash = require("lodash");
var import_constants = require("../../constants");
async function setCurrentTenantAndStore(ctx, next) {
  if (!ctx.state.currentUser) {
    return next();
  }
  const currentStoreId = +ctx.get(import_constants.HTTP_HEADER_STORE_KEY);
  const userId = ctx.state.currentUser.id;
  const storeSources = await ctx.db.getRepository(import_constants.SAAS_TABLE.store).find({
    filter: {
      [import_constants.SAAS_TABLE_KEY_NAME.department]: {
        [import_constants.SAAS_TABLE_KEY_NAME.employee]: {
          id: userId
        }
      }
    },
    appends: [import_constants.SAAS_TABLE_KEY_NAME.tenant]
  });
  const stores = (0, import_lodash.map)(storeSources, (i) => i.toJSON());
  const tenant = (0, import_lodash.uniqBy)(
    (0, import_lodash.map)(stores, (item) => {
      const tenant2 = item[import_constants.SAAS_TABLE_KEY_NAME.tenant];
      tenant2[import_constants.SAAS_TABLE_KEY_NAME.store] = (0, import_lodash.filter)(stores, (item2) => item2[import_constants.SAAS_TABLE_ID.tenant] === tenant2.id).map(
        (i) => (0, import_lodash.omit)(i, import_constants.SAAS_TABLE_KEY_NAME.tenant)
      );
      return tenant2;
    }),
    "id"
  );
  ctx.state.currentUser.setDataValue(import_constants.SAAS_TABLE_KEY_NAME.store, stores);
  ctx.state.currentUser.setDataValue(import_constants.SAAS_TABLE_KEY_NAME.tenant, tenant);
  let currentStore = (0, import_lodash.find)(stores, { id: currentStoreId });
  if (!currentStore) {
    currentStore = (stores == null ? void 0 : stores.length) ? stores[0] : null;
  }
  if (!currentStore) {
    return next();
  }
  if (ctx.state.currentUser[import_constants.SAAS_TABLE_ID.store] !== currentStore.id) {
    ctx.state.currentUser[import_constants.SAAS_TABLE_ID.store] = currentStore.id;
    await ctx.db.getRepository(import_constants.SAAS_TABLE.employee).update({
      values: {
        [import_constants.SAAS_TABLE_ID.store]: currentStore.id
      },
      filterByTk: userId
    });
  }
  ctx.state.currentTenant = currentStore[import_constants.SAAS_TABLE_KEY_NAME.tenant];
  ctx.state.currentStore = currentStore;
  await next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setCurrentTenantAndStore
});
