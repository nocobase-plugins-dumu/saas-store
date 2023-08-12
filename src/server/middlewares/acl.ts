import { Application } from '@nocobase/server';
import { map } from 'lodash';
import { SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME } from '../../constants';

export function setAcl(app: Application) {
  app.acl.use(async (ctx, next) => {
    const isRoot = ctx.state.currentRole === 'root';
    const { actionName } = ctx.action;
    if (!['get', 'list'].includes(actionName) || isRoot) {
      return next();
    }
    const resourceName = ctx.action?.resourceName;
    const collection = app.db.getCollection(resourceName);
    // 只看自己所在的门店
    if (resourceName === SAAS_TABLE.store) {
      const filter = {
        id: {
          $in: map(ctx.state.currentUser.getDataValue(SAAS_TABLE_KEY_NAME.store), (i) => i.id),
        },
      };
      ctx.action.mergeParams({
        filter,
      });
      return next();
    }
    // 默认只看当前租户
    if (resourceName === SAAS_TABLE.tenant) {
      ctx.action.mergeParams({
        filter: {
          id: ctx.state.currentTenant.id,
        },
      });
      return next();
    }

    if (!collection?.fields.get(SAAS_TABLE_ID.store)) {
      return next();
    }
    // 如果有门店id，会带上当前门店id
    if (ctx.state.currentStore?.id) {
      ctx.action.mergeParams({
        filter: {
          [SAAS_TABLE_ID.store]: ctx.state.currentStore.id,
        },
      });
    }

    await next();
  });
}
