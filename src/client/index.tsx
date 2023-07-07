import {
  CollectionManagerContext,
  PinnedPluginListProvider,
  registerField,
  SchemaComponentOptions,
  SettingsCenterProvider,
  useAPIClient,
  useCurrentUserContext,
} from '@nocobase/client';
import { Cascader } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { find, last } from 'lodash';
import React, { useContext } from 'react';
import {
  DUMU_SAAS_STORE_PLUGIN_NAME,
  HTTP_HEADER_STORE_KEY,
  SAAS_STORE_ID_CACHE_KEY,
  SAAS_TABLE_KEY_NAME,
} from '../constants';
import { CollectionDesigner } from './collection-designer';
import { saasStoreField } from './saasStoreField';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

registerField(saasStoreField.group, DUMU_SAAS_STORE_PLUGIN_NAME, saasStoreField);
const SaasStoreManager = () => {
  const api = useAPIClient();
  const currentStoreId = +api.storage.getItem(SAAS_STORE_ID_CACHE_KEY);
  api.axios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers[HTTP_HEADER_STORE_KEY] = currentStoreId;
    return config;
  });
  const userState = useCurrentUserContext().data.data;
  const stores = userState[SAAS_TABLE_KEY_NAME.store];
  const tenant = userState[SAAS_TABLE_KEY_NAME.tenant];
  let options: Option[] = [];
  const style = {
    padding: '10px',
  };
  if (stores.length === 1) {
    return (
      <a href="#" style={style}>
        {stores[0].name}
      </a>
    );
  }
  let defaultValue: number[];
  const currentStore = find(stores, (i) => i.id === currentStoreId) || stores[0];
  // 不在任何门店下
  if (!currentStore) {
    return;
  }
  let storeName = currentStore.name;

  if (tenant.length === 1) {
    options = stores;
    defaultValue = currentStore.id;
  } else {
    options = tenant;
    storeName = `${currentStore[SAAS_TABLE_KEY_NAME.tenant].name} / ${storeName}`;
    defaultValue = [currentStore[SAAS_TABLE_KEY_NAME.tenant].id, currentStore.id];
  }
  const onChange = (value: string[]) => {
    const storeId = last(value);
    api.storage.setItem(SAAS_STORE_ID_CACHE_KEY, storeId);
    window.location.reload();
  };
  return (
    <Cascader
      options={options}
      fieldNames={{
        label: 'name',
        value: 'id',
        children: SAAS_TABLE_KEY_NAME.store,
      }}
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder="选择门店"
    >
      <a href="#" style={style}>
        {storeName}
      </a>
    </Cascader>
  );
};

export default (props) => {
  const ctx = useContext(CollectionManagerContext);
  return (
    <PinnedPluginListProvider
      items={{
        [DUMU_SAAS_STORE_PLUGIN_NAME]: { order: 1, component: 'SaasStoreManager', snippet: 'app' },
      }}
    >
      <SettingsCenterProvider
        settings={{
          [DUMU_SAAS_STORE_PLUGIN_NAME]: {
            title: 'saas多门店',
            icon: 'appstoreoutlined',
            tabs: {
              tab2: {
                title: 'saas多门店字段配置',
                component: () => <CollectionDesigner />,
              },
            },
          },
        }}
      >
        <SchemaComponentOptions components={{ SaasStoreManager }}>
          <CollectionManagerContext.Provider
            value={{ ...ctx, interfaces: { ...ctx.interfaces, mathFormula: saasStoreField } }}
          >
            {props.children}
          </CollectionManagerContext.Provider>
        </SchemaComponentOptions>
      </SettingsCenterProvider>
    </PinnedPluginListProvider>
  );
};
