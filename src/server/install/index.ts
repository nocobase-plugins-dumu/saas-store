import Database from '@nocobase/database';
import { SAAS_TABLE } from '../../constants';
import { useSaasStoreIdFiled } from '../actions/saasStore';

export async function dumuSaasStoreInstall(db: Database) {
  const repo = db.getRepository<any>('collections');
  for (const name of [SAAS_TABLE.tenant, SAAS_TABLE.store, SAAS_TABLE.storeDepartment, SAAS_TABLE.employee]) {
    await repo.db2cm(name);
  }
  await useSaasStoreIdFiled('users', db);
}
