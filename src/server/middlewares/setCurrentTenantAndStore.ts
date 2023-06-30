import { Context } from '@nocobase/actions';
import { Repository } from '@nocobase/database';
import { find, map, uniqBy } from 'lodash';

export async function setCurrentTenantAndStore(ctx: Context, next) {
  const currentStoreId = ctx.get('X-Store');

  if (!ctx.state.currentUser) {
    return next();
  }

  const userId = ctx.state.currentUser.id;
  // 查找当前用户门店
  const stores = await ctx.db.getRepository<Repository>('store').find({
    filter: {
      orgs: {
        users: {
          id: userId,
        },
      },
    },
    appends: ['tenant'],
  });
  ctx.state.currentUser.setDataValue('stores', stores);
  // // 查找当前用户租户
  const tenant = uniqBy(
    map(stores, (item) => item.tenant),
    'id',
  );
  ctx.state.currentUser.setDataValue('tenant', tenant);
  let currentStore = find(stores, { id: currentStoreId });
  if (!currentStore) {
    currentStore = stores?.length ? stores[0] : null;
  }
  if (!currentStore) {
    return next();
  }
  const currentTenant = currentStore.tenant;
  // 设置当前租户和门店
  if (currentTenant) {
    ctx.state.currentTenant = currentTenant;
  }
  if (currentStore) {
    ctx.state.currentStore = currentStore;
  }

  await next();
}
