import { Application } from '@nocobase/server';
import { SAAS_TABLE } from '../../constants';

export function registerDepartmentDbMiddlewares(app: Application) {
  app.db.on(`${SAAS_TABLE.storeDepartment}.beforeDestroy`, (model) => {
    if (!model.parentId) {
      throw new Error('顶级部门不可删除');
    }
  });
}
