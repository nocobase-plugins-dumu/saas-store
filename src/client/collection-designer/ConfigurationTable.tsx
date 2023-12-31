import {
  CollectionFieldsTable,
  ISchemaComponentContext,
  SchemaComponent,
  useActionContext,
  useAPIClient,
  useCollectionManager,
  useCompile,
  useCurrentAppInfo,
  useRecord,
} from '@nocobase/client';
import React, { createContext, useContext, useRef } from 'react';
import { collectionSchema } from './collection';

const useSaasAction = () => {
  const { name } = useRecord();
  const actionContext = useActionContext();
  const api = useAPIClient();
  const { refreshCM } = useCollectionManager();
  return {
    async run() {
      actionContext.setVisible(false);
      await api.request({
        url: 'saasStore:use',
        params: {
          tableName: name,
        },
      });
      await refreshCM();
    },
  };
};
export const SchemaComponentContext = createContext<ISchemaComponentContext>({});

export const ConfigurationTable = () => {
  const { collections = [], interfaces } = useCollectionManager();
  const {
    data: { database },
  } = useCurrentAppInfo();
  const api = useAPIClient();
  const resource = api.resource('dbViews');
  const collectonsRef: any = useRef();
  collectonsRef.current = collections;
  const compile = useCompile();
  const loadDBViews = async () => {
    return resource.list().then(({ data }) => {
      return data?.data?.map((item: any) => {
        const schema = item.schema;
        return {
          label: schema ? `${schema}.${compile(item.name)}` : item.name,
          value: schema ? `${schema}_${item.name}` : item.name,
        };
      });
    });
  };
  const ctx = useContext(SchemaComponentContext);
  return (
    <SchemaComponentContext.Provider value={{ ...ctx, designable: false }}>
      <SchemaComponent
        schema={collectionSchema}
        components={{
          CollectionFieldsTable,
        }}
        scope={{
          loadDBViews,
          useSaasAction,
          interfaces,
          enableInherits: database?.dialect === 'postgres',
          isPG: database?.dialect === 'postgres',
        }}
      />
    </SchemaComponentContext.Provider>
  );
};
