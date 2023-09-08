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
var acl_exports = {};
__export(acl_exports, {
  setAcl: () => setAcl
});
module.exports = __toCommonJS(acl_exports);
var import_lodash = require("lodash");
var import_constants = require("../../constants");
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
    if (resourceName === import_constants.SAAS_TABLE.store) {
      const filter = {
        id: {
          $in: (0, import_lodash.map)(ctx.state.currentUser.getDataValue(import_constants.SAAS_TABLE_KEY_NAME.store), (i) => i.id)
        }
      };
      ctx.action.mergeParams({
        filter
      });
      return next();
    }
    if (resourceName === import_constants.SAAS_TABLE.tenant) {
      ctx.action.mergeParams({
        filter: {
          id: ctx.state.currentTenant.id
        }
      });
      return next();
    }
    if (!(collection == null ? void 0 : collection.fields.get(import_constants.SAAS_TABLE_ID.store))) {
      return next();
    }
    if ((_b = ctx.state.currentStore) == null ? void 0 : _b.id) {
      ctx.action.mergeParams({
        filter: {
          [import_constants.SAAS_TABLE_ID.store]: ctx.state.currentStore.id
        }
      });
    }
    await next();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setAcl
});
