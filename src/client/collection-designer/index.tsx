import { ISchema } from '@formily/react';
import { uid } from '@formily/shared';
import { SchemaComponent } from '@nocobase/client';
import React from 'react';
import { ConfigurationTable } from './ConfigurationTable';
import { ConfigurationTabs } from './ConfigurationTabs';

const schema: ISchema = {
  type: 'object',
  properties: {
    [uid()]: {
      // 'x-decorator': 'CollectionCategoriesProvider',
      'x-component': 'ConfigurationTable',
    },
  },
};
export const CollectionDesigner = () => {
  return (
    <SchemaComponent
      schema={schema}
      components={{
        ConfigurationTable,
        ConfigurationTabs,
      }}
    />
  );
};
