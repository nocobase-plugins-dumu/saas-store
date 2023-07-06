import { Context } from '@nocobase/actions';
import { Repository } from '@nocobase/database';
import { find, map, uniqBy } from 'lodash';
import { HTTP_HEADER_STORE_KEY, SAAS_TABLE, SAAS_TABLE_KEY_NAME } from '../../constants';

export async function setCurrentTenantAndStore(ctx: Context, next) {
  if (!ctx.state.currentUser) {
    return next();
  }
  const currentStoreId = ctx.get(HTTP_HEADER_STORE_KEY);
  const userId = ctx.state.currentUser.id;
  // 查找当前用户门店
  const stores = await ctx.db.getRepository<Repository>(SAAS_TABLE.store).find({
    filter: {
      [SAAS_TABLE_KEY_NAME.department]: {
        users: {
          id: userId,
        },
      },
    },
    appends: [SAAS_TABLE_KEY_NAME.tenant],
  });
  ctx.state.currentUser.setDataValue(SAAS_TABLE_KEY_NAME.store, stores);
  // // 查找当前用户租户
  const tenant = uniqBy(
    map(stores, (item) => item[SAAS_TABLE_KEY_NAME.tenant]),
    'id',
  ).filter(Boolean);
  ctx.state.currentUser.setDataValue(SAAS_TABLE_KEY_NAME.tenant, tenant);
  let currentStore = find(stores, { id: currentStoreId });
  if (!currentStore) {
    currentStore = stores?.length ? stores[0] : null;
  }
  if (!currentStore) {
    return next();
  }
  // 设置当前租户和门店
  ctx.state.currentTenant = currentStore[SAAS_TABLE_KEY_NAME.tenant];
  ctx.state.currentStore = currentStore;

  await next();
}
