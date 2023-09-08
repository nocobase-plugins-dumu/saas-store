import { Application } from '@nocobase/server';
import { SAAS_TABLE, SAAS_TABLE_ID, SAAS_TABLE_KEY_NAME } from '../../constants';
import get from 'lodash/get';
import { Context } from '@nocobase/actions';
import { SaveListener } from '@nocobase/database/src/types';

const setDefaultDepartment: SaveListener = async (model, options) => {
  const transaction = options.transaction;
  const ctx = (options as any).context as Context;
  if (!(options as any).values) {
    return;
  }
  const store = get(options, `values.${SAAS_TABLE_KEY_NAME.store}`) as any;
  const storeId = store.id;
  if (!store) {
    throw new Error('请设置所属门店');
  }
  const departmentResp = ctx.db.getRepository(SAAS_TABLE.storeDepartment);
  const departmentUserResp = ctx.db.getRepository(SAAS_TABLE.storeDepartmentUsers);
  const departmentUser = await departmentUserResp.findOne({
    filter: {
      userId: model.id,
    },
    transaction,
  });
  if (!departmentUser) {
    let rootDepartment = await departmentResp.findOne({
      filter: {
        [SAAS_TABLE_ID.store]: storeId,
        parentId: {
          $empty: true,
        },
      },
      transaction,
    });
    if (!rootDepartment) {
      rootDepartment = await departmentResp.create({
        values: {
          name: store.name,
          [SAAS_TABLE_ID.store]: storeId,
        },
        transaction,
      });
    }
    const depUser = await departmentUserResp.create({
      values: {
        userId: model.id,
        [SAAS_TABLE_ID.departmentId]: rootDepartment.id,
        [SAAS_TABLE_ID.store]: storeId,
      },
      transaction,
    });
    console.log({ depUser });
  }
};

export function registerEmployeeDbMiddlewares(app: Application) {
  app.db.on(`${SAAS_TABLE.employee}.afterSave`, setDefaultDepartment);
}
