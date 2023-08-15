'use strict';

var constants = require('../../constants');
var get = require('lodash/get');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var get__default = /*#__PURE__*/_interopDefault(get);

const setDefaultDepartment = async (model, options) => {
  const transaction = options.transaction;
  const ctx = options.context;
  if (!options.values) {
    return;
  }
  const store = get__default.default(options, `values.${constants.SAAS_TABLE_KEY_NAME.store}`);
  const storeId = store.id;
  if (!store) {
    throw new Error("\u8BF7\u8BBE\u7F6E\u6240\u5C5E\u95E8\u5E97");
  }
  const departmentResp = ctx.db.getRepository(constants.SAAS_TABLE.storeDepartment);
  const departmentUserResp = ctx.db.getRepository(constants.SAAS_TABLE.storeDepartmentUsers);
  const departmentUser = await departmentUserResp.findOne({
    filter: {
      userId: model.id
    }
  });
  if (!departmentUser) {
    let rootDepartment = await departmentResp.findOne({
      filter: {
        [constants.SAAS_TABLE_ID.store]: storeId,
        parentId: {
          $empty: true
        }
      }
    });
    if (!rootDepartment) {
      rootDepartment = await departmentResp.create({
        values: {
          name: store.name,
          [constants.SAAS_TABLE_ID.store]: storeId
        },
        transaction
      });
    }
    const depUser = await departmentUserResp.create({
      values: {
        userId: model.id,
        [constants.SAAS_TABLE_ID.departmentId]: rootDepartment.id
      }
    });
    console.log({ depUser });
  }
};
function registerEmployeeDbMiddlewares(app) {
  app.db.on(`${constants.SAAS_TABLE.employee}.afterSave`, setDefaultDepartment);
}

exports.registerEmployeeDbMiddlewares = registerEmployeeDbMiddlewares;
