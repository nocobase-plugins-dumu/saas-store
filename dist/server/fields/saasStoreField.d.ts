import { BaseColumnFieldOptions, Field } from '@nocobase/database';
import { DataTypes, Model } from 'sequelize';
import { DUMU_SAAS_STORE_PLUGIN_NAME } from '../../constants';
export interface SaasStoreFieldOptions extends BaseColumnFieldOptions {
    type: typeof DUMU_SAAS_STORE_PLUGIN_NAME;
    dataIndex: string;
    dataType?: string;
    createOnly?: boolean;
}
export declare class SaasStoreField extends Field {
    get dataType(): DataTypes.BigIntDataTypeConstructor;
    listener: (model: Model, options: any) => Promise<void>;
    bind(): void;
    unbind(): void;
}
