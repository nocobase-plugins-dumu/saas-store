'use strict';

var database = require('@nocobase/database');
var lodash = require('lodash');
var sequelize = require('sequelize');
var constants = require('../../constants');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var lodash__default = /*#__PURE__*/_interopDefault(lodash);

class SaasStoreField extends database.Field {
  get dataType() {
    return sequelize.DataTypes.BIGINT;
  }
  listener = async (model, options) => {
    const name = constants.SAAS_TABLE_ID.store;
    const { context } = options;
    const currentStoreId = lodash__default.default.get(context, "state.currentStore.id");
    if (currentStoreId && model.get(constants.SAAS_TABLE_ID.store) !== currentStoreId) {
      model.set(constants.SAAS_TABLE_ID.store, lodash__default.default.get(context, "state.currentStore.id"));
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

exports.SaasStoreField = SaasStoreField;
