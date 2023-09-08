var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var employee_exports = {};
__export(employee_exports, {
  registerEmployeeDbMiddlewares: () => registerEmployeeDbMiddlewares
});
module.exports = __toCommonJS(employee_exports);
var import_constants = require("../../constants");
var import_get = __toESM(require("lodash/get"));
const setDefaultDepartment = async (model, options) => {
  const transaction = options.transaction;
  const ctx = options.context;
  if (!options.values) {
    return;
  }
  const store = (0, import_get.default)(options, `values.${import_constants.SAAS_TABLE_KEY_NAME.store}`);
  const storeId = store.id;
  if (!store) {
    throw new Error("\u8BF7\u8BBE\u7F6E\u6240\u5C5E\u95E8\u5E97");
  }
  const departmentResp = ctx.db.getRepository(import_constants.SAAS_TABLE.storeDepartment);
  const departmentUserResp = ctx.db.getRepository(import_constants.SAAS_TABLE.storeDepartmentUsers);
  const departmentUser = await departmentUserResp.findOne({
    filter: {
      userId: model.id
    }
  });
  if (!departmentUser) {
    let rootDepartment = await departmentResp.findOne({
      filter: {
        [import_constants.SAAS_TABLE_ID.store]: storeId,
        parentId: {
          $empty: true
        }
      }
    });
    if (!rootDepartment) {
      rootDepartment = await departmentResp.create({
        values: {
          name: store.name,
          [import_constants.SAAS_TABLE_ID.store]: storeId
        },
        transaction
      });
    }
    const depUser = await departmentUserResp.create({
      values: {
        userId: model.id,
        [import_constants.SAAS_TABLE_ID.departmentId]: rootDepartment.id
      }
    });
    console.log({ depUser });
  }
};
function registerEmployeeDbMiddlewares(app) {
  app.db.on(`${import_constants.SAAS_TABLE.employee}.afterSave`, setDefaultDepartment);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerEmployeeDbMiddlewares
});
