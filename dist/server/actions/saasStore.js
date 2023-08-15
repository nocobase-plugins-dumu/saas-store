'use strict';

var constants = require('../../constants');

async function useSaasStoreIdFiled(tableName, db) {
  const collection = db.getCollection(tableName);
  if (collection.hasField(constants.SAAS_TABLE_KEY_NAME.store)) {
    throw new Error(`${tableName}\u5DF2\u5F00\u542Fsaas\u591A\u95E8\u5E97\u5B57\u6BB5`);
  }
  const storeField = {
    foreignKey: constants.SAAS_TABLE_ID.store,
    onDelete: "NO ACTION",
    type: "belongsTo",
    interface: "m2o",
    target: constants.SAAS_TABLE.store,
    uiSchema: {
      "x-component": "AssociationField",
      "x-component-props": { multiple: false, fieldNames: { label: constants.STORE_TABLE_TITLE_KEY, value: "id" } },
      title: "\u95E8\u5E97"
    }
  };
  await collection.addField(constants.SAAS_TABLE_KEY_NAME.store, storeField);
  await collection.sync({ alter: true });
  const fieldRepository = db.getRepository("fields");
  await fieldRepository.create({
    values: {
      name: constants.SAAS_TABLE_KEY_NAME.store,
      type: storeField.type,
      interface: storeField.interface,
      collectionName: tableName,
      options: storeField
    }
  });
}
function registerSaasStoreAction(app) {
  app.resource({
    name: "saasStore",
    actions: {
      // 开启多门店字段方法
      use: async (ctx, next) => {
        const { tableName } = ctx.action.params;
        await useSaasStoreIdFiled(tableName, app.db);
        ctx.body = 1;
        await next();
      }
    }
  });
}

exports.registerSaasStoreAction = registerSaasStoreAction;
exports.useSaasStoreIdFiled = useSaasStoreIdFiled;
