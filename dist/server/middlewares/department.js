'use strict';

var constants = require('../../constants');

function registerDepartmentDbMiddlewares(app) {
  app.db.on(`${constants.SAAS_TABLE.storeDepartment}.beforeDestroy`, (model) => {
    if (!model.parentId) {
      throw new Error("\u9876\u7EA7\u90E8\u95E8\u4E0D\u53EF\u5220\u9664");
    }
  });
}

exports.registerDepartmentDbMiddlewares = registerDepartmentDbMiddlewares;
