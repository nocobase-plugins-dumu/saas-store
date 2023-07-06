// 引入字段类型基类
import { BaseColumnFieldOptions, Field } from '@nocobase/database';
import lodash from 'lodash';
import { DataTypes, Model } from 'sequelize';
import { DUMU_SAAS_STORE_PLUGIN_NAME, SAAS_TABLE_ID } from '../../constants';

export interface SaasStoreFieldOptions extends BaseColumnFieldOptions {
  type: typeof DUMU_SAAS_STORE_PLUGIN_NAME;
  dataIndex: string;
  dataType?: string;
  createOnly?: boolean;
}

export class SaasStoreField extends Field {
  get dataType() {
    return DataTypes.BIGINT;
  }

  listener = async (model: Model, options) => {
    const name = SAAS_TABLE_ID.store;
    const { context } = options;
    model.set(SAAS_TABLE_ID.store, lodash.get(context, 'state.currentStore.id'));
    model.changed(name as any, true);
  };

  bind() {
    super.bind();
    this.on('beforeCreate', this.listener);
  }

  unbind() {
    super.unbind();
    this.off('beforeCreate', this.listener);
  }
}
