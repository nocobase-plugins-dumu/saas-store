import Database from '@nocobase/database';
import { CollectionRepository } from '@nocobase/plugin-collection-manager';
import { omit } from 'lodash';
import { SAAS_TABLE, userExtendField } from '../../constants';

export async function dumuSaasStoreInstall(db: Database) {
  const repo = db.getRepository<CollectionRepository>('collections');
  for (const name of [SAAS_TABLE.tenant, SAAS_TABLE.store, SAAS_TABLE.storeDepartment]) {
    await repo.db2cm(name);
  }
  const tempField = userExtendField();
  const fieldRepository = this.app.db.getRepository('fields');
  let departmentField = await fieldRepository.findOne({
    filter: {
      name: tempField.reverseField.name,
      collectionName: SAAS_TABLE.storeDepartment,
    },
  });
  if (!departmentField) {
    departmentField = await fieldRepository.create({
      values: {
        name: tempField.reverseField.name,
        type: tempField.reverseField.type,
        interface: tempField.reverseField.interface,
        collectionName: SAAS_TABLE.storeDepartment,
        options: tempField.reverseField,
      },
    });
  }

  let userField = await fieldRepository.findOne({
    filter: {
      name: tempField.name,
      collectionName: 'users',
    },
  });
  if (!userField) {
    userField = await fieldRepository.create({
      values: {
        reverseKey: departmentField.key,
        name: tempField.name,
        type: tempField.type,
        interface: tempField.interface,
        collectionName: 'users',
        options: omit(tempField, 'reverseField'),
      },
    });
  }
  await fieldRepository.update({
    values: {
      reverseKey: userField.key,
    },
    filter: {
      key: departmentField.key,
    },
  });
  this.app.db.getCollection('users').setField(tempField.name, tempField);
  this.app.db.getCollection(SAAS_TABLE.storeDepartment).setField(tempField.reverseField.name, tempField.reverseField);
}
