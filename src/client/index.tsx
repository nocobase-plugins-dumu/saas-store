import { SettingsCenterProvider } from '@nocobase/client';
import React from 'react';
import { CollectionDesigner } from './collection-designer';

const SassStore = React.memo((props) => {
  return (
    <SettingsCenterProvider
      settings={{
        'dumu-sass-store': {
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
      {props.children}
    </SettingsCenterProvider>
  );
});
SassStore.displayName = 'SassStore';

export default SassStore;
