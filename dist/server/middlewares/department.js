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
var department_exports = {};
__export(department_exports, {
  registerDepartmentDbMiddlewares: () => registerDepartmentDbMiddlewares
});
module.exports = __toCommonJS(department_exports);
var import_constants = require("../../constants");
function registerDepartmentDbMiddlewares(app) {
  app.db.on(`${import_constants.SAAS_TABLE.storeDepartment}.beforeDestroy`, (model) => {
    if (!model.parentId) {
      throw new Error("\u9876\u7EA7\u90E8\u95E8\u4E0D\u53EF\u5220\u9664");
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerDepartmentDbMiddlewares
});
