export declare const DUMU_SAAS_STORE_PLUGIN_NAME = "dumuSaasStore";
export declare const SAAS_TABLE: {
    tenant: string;
    store: string;
    employee: string;
    storeDepartment: string;
    storeDepartmentUsers: string;
};
export declare const SAAS_TABLE_ID: {
    store: string;
    tenant: string;
    departmentId: string;
};
export declare const SAAS_TABLE_KEY_NAME: {
    store: string;
    tenant: string;
    department: string;
    employee: string;
};
export declare const HTTP_HEADER_STORE_KEY = "X-Store";
export declare const SAAS_STORE_ID_CACHE_KEY = "DUMU_SAAS_STORE_ID_CACHE_KEY";
export declare const STORE_TABLE_TITLE_KEY = "name";
export declare const NO_STORE_ID_TABLES: string[];
export declare const namespace = "dumu-saas-store";
export declare const userExtendField: () => {
    name: string;
    type: string;
    interface: string;
    foreignKey: string;
    otherKey: string;
    through: string;
    target: string;
    targetKey: string;
    sourceKey: string;
    uiSchema: {
        'x-component': string;
        'x-component-props': {
            multiple: boolean;
            fieldNames: {
                label: string;
                value: string;
            };
        };
        title: string;
    };
    reverseField: {
        name: string;
        type: string;
        interface: string;
        collectionName: string;
        parentKey: any;
        uiSchema: {
            title: string;
            'x-component': string;
            'x-component-props': {
                multiple: boolean;
                fieldNames: {
                    label: string;
                    value: string;
                };
            };
        };
        target: string;
        through: string;
        sourceKey: string;
        foreignKey: string;
        targetKey: string;
        otherKey: string;
    };
};
