import { Application } from '@nocobase/server';
import { Database } from '@nocobase/database';
export declare function useSaasStoreIdFiled(tableName: string, db: Database): Promise<void>;
export declare function registerSaasStoreAction(app: Application): void;
