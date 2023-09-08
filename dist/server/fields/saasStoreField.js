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
var saasStoreField_exports = {};
__export(saasStoreField_exports, {
  SaasStoreField: () => SaasStoreField
});
module.exports = __toCommonJS(saasStoreField_exports);
var import_database = require("@nocobase/database");
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
var import_constants = require("../../constants");
class SaasStoreField extends import_database.Field {
  get dataType() {
    return import_sequelize.DataTypes.BIGINT;
  }
  listener = async (model, options) => {
    const name = import_constants.SAAS_TABLE_ID.store;
    const { context } = options;
    const currentStoreId = import_lodash.default.get(context, "state.currentStore.id");
    if (currentStoreId && model.get(import_constants.SAAS_TABLE_ID.store) !== currentStoreId) {
      model.set(import_constants.SAAS_TABLE_ID.store, import_lodash.default.get(context, "state.currentStore.id"));
      model.changed(name, true);
    }
  };
  bind() {
    super.bind();
    this.on("beforeCreate", this.listener);
    this.on("beforeUpdate", this.listener);
  }
  unbind() {
    super.unbind();
    this.off("beforeCreate", this.listener);
    this.off("beforeUpdate", this.listener);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SaasStoreField
});
