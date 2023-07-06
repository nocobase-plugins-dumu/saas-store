import {
  CollectionManagerContext,
  registerField,
  SchemaComponentOptions,
  SettingsCenterProvider,
} from '@nocobase/client';
import React, { useContext } from 'react';
import { DUMU_SAAS_STORE_PLUGIN_NAME } from '../constants';
import { CollectionDesigner } from './collection-designer';
import { saasStoreField } from './saasStoreField';

registerField(saasStoreField.group, DUMU_SAAS_STORE_PLUGIN_NAME, saasStoreField);

const SassStore = (props) => {
  const ctx = useContext(CollectionManagerContext);
  return (
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
      <SchemaComponentOptions>
        <CollectionManagerContext.Provider
          value={{ ...ctx, interfaces: { ...ctx.interfaces, mathFormula: saasStoreField } }}
        >
          {props.children}
        </CollectionManagerContext.Provider>
      </SchemaComponentOptions>
    </SettingsCenterProvider>
  );
};
SassStore.displayName = DUMU_SAAS_STORE_PLUGIN_NAME;

export default SassStore;
