import { observer } from '@formily/react';
import { useCollectionManager } from '@nocobase/client';
import { Switch } from 'antd';
import { find } from 'lodash';
import React from 'react';

export const SassStoreSwitch = observer(
  (props: any) => {
    const { value } = props;
    const { getTemplate } = useCollectionManager();
    const schema = getTemplate(value);
    console.log({ value, schema, props });
    const checked = find(value, { name: 'storeId' });
    return <Switch checked={checked} disabled={checked} />;
  },
  { displayName: 'SassStoreSwitch' },
);
