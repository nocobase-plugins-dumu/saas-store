import { observer } from '@formily/react';
import { useCollectionManager, useCompile } from '@nocobase/client';
import { Tag } from 'antd';
import React from 'react';

export const CollectionTemplate = observer(
  (props: any) => {
    const { value } = props;
    const { getTemplate } = useCollectionManager();
    const compile = useCompile();
    const schema = getTemplate(value);

    return <Tag>{compile(schema?.title || '{{t("General collection")}}')}</Tag>;
  },
  { displayName: 'CollectionTemplate' },
);
