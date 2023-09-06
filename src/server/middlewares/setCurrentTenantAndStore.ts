import { Context } from '@nocobase/actions';
import { Repository } from '@nocobase/database';
import { filter, find, map, omit, uniqBy } from 'lodash';
import { HTTP_HEADER_STORE_KEY, SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME } from '../../constants';

export async function setCurrentTenantAndStore(ctx: Context, next) {
  if (!ctx.state.currentUser) {
    return next();
  }
  const currentStoreId = +ctx.get(HTTP_HEADER_STORE_KEY);
  const userId = ctx.state.currentUser.id;
  // 查找当前用户门店
  const storeSources = await ctx.db.getRepository<Repository>(SAAS_TABLE.store).find({
    filter: {
      [SAAS_TABLE_KEY_NAME.department]: {
        [SAAS_TABLE_KEY_NAME.employee]: {
          id: userId,
        },
      },
    },
    appends: [SAAS_TABLE_KEY_NAME.tenant],
  });
  const stores = map(storeSources, (i) => i.toJSON());
  const tenant = uniqBy(
    map(stores, (item) => {
      const tenant = item[SAAS_TABLE_KEY_NAME.tenant];
      tenant[SAAS_TABLE_KEY_NAME.store] = filter(stores, (item) => item[SAAS_TABLE_ID.tenant] === tenant.id).map((i) =>
        omit(i, SAAS_TABLE_KEY_NAME.tenant),
      );
      return tenant;
    }),
    'id',
  );

  ctx.state.currentUser.setDataValue(SAAS_TABLE_KEY_NAME.store, stores);
  ctx.state.currentUser.setDataValue(SAAS_TABLE_KEY_NAME.tenant, tenant);
  let currentStore = find(stores, { id: currentStoreId });
  if (!currentStore) {
    currentStore = stores?.length ? stores[0] : null;
  }
  if (!currentStore) {
    return next();
  }
  // 更新当前门店id
  if (ctx.state.currentUser[SAAS_TABLE_ID.store] !== currentStore.id) {
    ctx.state.currentUser[SAAS_TABLE_ID.store] = currentStore.id;
    await ctx.db.getRepository<Repository>(SAAS_TABLE.employee).update({
      values: {
        [SAAS_TABLE_ID.store]: currentStore.id,
      },
      filterByTk: userId,
    });
  }
  // 设置当前租户和门店
  ctx.state.currentTenant = currentStore[SAAS_TABLE_KEY_NAME.tenant];
  ctx.state.currentStore = currentStore;

  await next();
}
