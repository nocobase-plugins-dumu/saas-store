'use strict';

var lodash = require('lodash');
var constants = require('../../constants');

async function setCurrentTenantAndStore(ctx, next) {
  if (!ctx.state.currentUser) {
    return next();
  }
  const currentStoreId = +ctx.get(constants.HTTP_HEADER_STORE_KEY);
  const userId = ctx.state.currentUser.id;
  const stores = lodash.map(
    await ctx.db.getRepository(constants.SAAS_TABLE.store).find({
      filter: {
        [constants.SAAS_TABLE_KEY_NAME.department]: {
          [constants.SAAS_TABLE_KEY_NAME.employee]: {
            id: userId
          }
        }
      },
      appends: [constants.SAAS_TABLE_KEY_NAME.tenant]
    }),
    (i) => i.dataValues
  );
  const tenant = lodash.uniqBy(
    lodash.map(stores, (item) => {
      const tenant2 = item[constants.SAAS_TABLE_KEY_NAME.tenant].dataValues;
      tenant2[constants.SAAS_TABLE_KEY_NAME.store] = lodash.filter(stores, (item2) => item2[constants.SAAS_TABLE_ID.tenant] === tenant2.id).map(
        (i) => lodash.omit(i, constants.SAAS_TABLE_KEY_NAME.tenant)
      );
      return tenant2;
    }),
    "id"
  );
  ctx.state.currentUser.setDataValue(constants.SAAS_TABLE_KEY_NAME.store, stores);
  ctx.state.currentUser.setDataValue(constants.SAAS_TABLE_KEY_NAME.tenant, tenant);
  let currentStore = lodash.find(stores, { id: currentStoreId });
  if (!currentStore) {
    currentStore = (stores == null ? void 0 : stores.length) ? stores[0] : null;
  }
  if (!currentStore) {
    return next();
  }
  if (ctx.state.currentUser[constants.SAAS_TABLE_ID.store] !== currentStore.id) {
    ctx.state.currentUser[constants.SAAS_TABLE_ID.store] = currentStore.id;
    await ctx.db.getRepository(constants.SAAS_TABLE.employee).update({
      values: {
        [constants.SAAS_TABLE_ID.store]: currentStore.id
      },
      filterByTk: userId
    });
  }
  ctx.state.currentTenant = currentStore[constants.SAAS_TABLE_KEY_NAME.tenant];
  ctx.state.currentStore = currentStore;
  await next();
}

exports.setCurrentTenantAndStore = setCurrentTenantAndStore;
