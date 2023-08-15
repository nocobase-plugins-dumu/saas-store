'use strict';

var lodash = require('lodash');
var constants = require('../../constants');

function setAcl(app) {
  app.acl.use(async (ctx, next) => {
    var _a, _b;
    const isRoot = ctx.state.currentRole === "root";
    const { actionName } = ctx.action;
    if (!["get", "list"].includes(actionName) || isRoot) {
      return next();
    }
    const resourceName = (_a = ctx.action) == null ? void 0 : _a.resourceName;
    const collection = app.db.getCollection(resourceName);
    if (resourceName === constants.SAAS_TABLE.store) {
      const filter = {
        id: {
          $in: lodash.map(ctx.state.currentUser.getDataValue(constants.SAAS_TABLE_KEY_NAME.store), (i) => i.id)
        }
      };
      ctx.action.mergeParams({
        filter
      });
      return next();
    }
    if (resourceName === constants.SAAS_TABLE.tenant) {
      ctx.action.mergeParams({
        filter: {
          id: ctx.state.currentTenant.id
        }
      });
      return next();
    }
    if (!(collection == null ? void 0 : collection.fields.get(constants.SAAS_TABLE_ID.store))) {
      return next();
    }
    if ((_b = ctx.state.currentStore) == null ? void 0 : _b.id) {
      ctx.action.mergeParams({
        filter: {
          [constants.SAAS_TABLE_ID.store]: ctx.state.currentStore.id
        }
      });
    }
    await next();
  });
}

exports.setAcl = setAcl;
