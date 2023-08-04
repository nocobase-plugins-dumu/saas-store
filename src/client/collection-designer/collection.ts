import { ISchema } from '@formily/react';
import { uid } from '@formily/shared';
import { collection } from '@nocobase/client';
import { find } from 'lodash';
import { NO_STORE_ID_TABLES, SAAS_TABLE_KEY_NAME } from '../../constants';
import { CollectionCategory } from './components/CollectionCategory';
import { CollectionTemplate } from './components/CollectionTemplate';

export const collectionSchema: ISchema = {
  type: 'object',
  properties: {
    block1: {
      type: 'void',
      'x-collection': 'collections',
      'x-decorator': 'ResourceActionProvider',
      'x-decorator-props': {
        collection: collection,
        dragSort: true,
        request: {
          resource: 'collections',
          action: 'list',
          params: {
            pageSize: 50,
            sort: 'sort',
            filter: {
              'hidden.$isFalsy': true,
            },
            appends: ['category'],
          },
        },
      },
      properties: {
        tabs: {
          type: 'void',
          'x-component': 'ConfigurationTabs',
        },
      },
    },
  },
};

export const collectionTableSchema: ISchema = {
  type: 'object',
  properties: {
    [uid()]: {
      type: 'void',
      'x-component': 'ActionBar',
      'x-component-props': {
        style: {
          marginBottom: 10,
        },
      },
      properties: {
        filter: {
          type: 'void',
          title: '{{ t("Filter") }}',
          default: {
            $and: [{ title: { $includes: '' } }, { name: { $includes: '' } }],
          },
          'x-action': 'filter',
          'x-component': 'Filter.Action',
          'x-component-props': {
            icon: 'FilterOutlined',
            useProps: '{{ cm.useFilterActionProps }}',
          },
          'x-align': 'left',
        },
      },
    },
    tip: {
      type: 'void',
      'x-component': 'div',
      'x-content':
        '开启后将为此数据表创建dumuSaasStoreId字段（开启实际是给数据表增加了一个dumuSaasStoreId字段，您也可以手动添加），开启后不能手动关闭，如需关闭，请手动删除数据库dumuSaasStoreId字段；users和roles不能增加该字段。',
      'x-component-props': {
        style: {
          marginBottom: 10,
        },
      },
    },
    [uid()]: {
      type: 'void',
      'x-uid': 'input',
      'x-component': 'Table.Void',
      'x-component-props': {
        rowKey: 'name',
        rowSelection: {
          type: 'checkbox',
        },
        useDataSource: '{{ cm.useDataSourceFromRAC }}',
        sortDirections: [],
      },
      properties: {
        column1: {
          type: 'void',
          'x-decorator': 'Table.Column.Decorator',
          'x-component': 'Table.Column',
          properties: {
            title: {
              'x-component': 'CollectionField',
              'x-read-pretty': true,
            },
          },
        },
        column2: {
          type: 'void',
          'x-decorator': 'Table.Column.Decorator',
          'x-component': 'Table.Column',
          properties: {
            name: {
              type: 'string',
              'x-component': 'CollectionField',
              'x-read-pretty': true,
            },
          },
        },
        column3: {
          type: 'void',
          'x-decorator': 'Table.Column.Decorator',
          'x-component': 'Table.Column',
          title: '{{t("Collection template")}}',
          properties: {
            template: {
              'x-component': CollectionTemplate,
              'x-read-pretty': true,
            },
          },
        },
        column4: {
          type: 'void',
          'x-decorator': 'Table.Column.Decorator',
          'x-component': 'Table.Column',
          'x-visible': 'categoryVisible',
          title: '{{t("Collection category")}}',
          properties: {
            category: {
              'x-component': CollectionCategory,
              'x-read-pretty': true,
            },
          },
        },
        column5: {
          type: 'void',
          title: '{{ t("Actions") }}',
          'x-component': 'Table.Column',
          properties: {
            drawer: {
              type: 'void',
              'x-component': 'Action.Link',
              title: '开启',
              'x-component-props': {
                confirm: {
                  title: '提示',
                  content:
                    '开启后将为此数据表创建dumuSaasStoreId字段，开启后不能手动关闭，如需关闭，请手动删除数据库改字段列',
                },
                useAction: '{{ useSaasAction }}',
              },
              'x-reactions': (field) => {
                const i = field.path.segments[1];
                const key = field.path.segments[0];
                const table = field.form.getValuesIn(`${key}.${i}`);
                console.log({ table, field });
                if (table) {
                  field.title = '开启';
                  if (NO_STORE_ID_TABLES.includes(table.name)) {
                    field.disabled = true;
                  }
                  if (find(table.fields, { name: SAAS_TABLE_KEY_NAME.store })) {
                    field.disabled = true;
                    field.setTitle('已开启');
                  }
                }
              },
            },
          },
        },
      },
    },
  },
};
