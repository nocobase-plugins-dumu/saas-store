import { RecursionField } from '@formily/react';
import { uid } from '@formily/shared';
import { CollectionCategroriesContext, useCompile, useResourceActionContext } from '@nocobase/client';
import { Card, Tabs } from 'antd';
import React, { useContext, useState } from 'react';
import { collectionTableSchema } from './collection';

export const ConfigurationTabs = () => {
  const { data } = useContext(CollectionCategroriesContext);
  const { run, defaultRequest, setState } = useResourceActionContext();
  const [key, setKey] = useState('all');
  const [_, setActiveKey] = useState('all');
  const compile = useCompile();

  if (!data) return null;

  const tabsItems = data
    .sort((a, b) => b.sort - a.sort)
    .concat()
    .map((v) => {
      return {
        ...v,
        schema: collectionTableSchema,
      };
    });
  !tabsItems.find((v) => v.id === 'all') &&
    tabsItems.unshift({
      name: '{{t("All collections")}}',
      id: 'all',
      sort: 0,
      closable: false,
      schema: collectionTableSchema,
    });
  const onChange = (key: string) => {
    setActiveKey(key);
    setKey(uid());
    if (key !== 'all') {
      const prevFilter = defaultRequest?.params?.filter;
      const filter = { $and: [prevFilter, { 'category.id': key }] };
      run({ filter });
      setState?.({ category: [+key], params: [{ filter }] });
    } else {
      run();
      setState?.({ category: [], params: [] });
    }
  };

  return (
    <Tabs
      onChange={onChange}
      hideAdd={true}
      defaultActiveKey="all"
      type="editable-card"
      destroyInactiveTabPane={true}
      tabBarStyle={{ marginBottom: '0px' }}
      items={tabsItems.map((item) => {
        return {
          label: compile(item.name),
          key: item.id,
          closable: false,
          children: (
            <Card bordered={false}>
              <RecursionField name={key} schema={item.schema} onlyRenderProperties />
            </Card>
          ),
        };
      })}
    />
  );
};
