import { InstallOptions, Plugin } from '@nocobase/server';
export declare class DuMuSassStorePlugin extends Plugin {
    beforeLoad(): void;
    load(): Promise<void>;
    install(options?: InstallOptions): Promise<void>;
    afterEnable(): Promise<void>;
    afterDisable(): Promise<void>;
    remove(): Promise<void>;
}
export default DuMuSassStorePlugin;
