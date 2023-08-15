(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react"), require("@nocobase/client"), require("antd"), require("lodash"), require("@formily/shared"), require("@formily/react")) : typeof define === "function" && define.amd ? define(["exports", "react", "@nocobase/client", "antd", "lodash", "@formily/shared", "@formily/react"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["@nocobase/plugin-dumu-saas-store"] = {}, global.react, global["@nocobase/client"], global.antd, global.lodash, global["@formily/shared"], global["@formily/react"]));
})(this, function(exports2, require$$0, client, antd, lodash, shared, react) {
  "use strict";
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a)
      m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps)
      for (b in a = c.defaultProps, a)
        void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  const DUMU_SAAS_STORE_PLUGIN_NAME = "dumuSaasStore";
  const SAAS_TABLE = {
    tenant: "tenant",
    store: "store",
    employee: "employee",
    storeDepartment: "storeDepartment",
    storeDepartmentUsers: "storeDepartmentUsers"
  };
  const SAAS_TABLE_ID = {
    store: "duMuSaasStoreId",
    tenant: "duMuSaasTenantId",
    departmentId: "orgId"
  };
  const SAAS_TABLE_KEY_NAME = {
    store: "duMuSaasStore",
    tenant: "duMuSaasTenant",
    department: "departments",
    employee: "employees"
  };
  const HTTP_HEADER_STORE_KEY = "X-Store";
  const SAAS_STORE_ID_CACHE_KEY = "DUMU_SAAS_STORE_ID_CACHE_KEY";
  const STORE_TABLE_TITLE_KEY = "name";
  const NO_STORE_ID_TABLES = [
    "roles",
    SAAS_TABLE.tenant,
    SAAS_TABLE.store,
    SAAS_TABLE.storeDepartment,
    SAAS_TABLE.storeDepartmentUsers
  ];
  const CollectionCategory = react.observer(
    (props) => {
      const { value } = props;
      const compile = client.useCompile();
      return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: value.map((item) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(antd.Tag, { color: item.color, children: compile(item.name) }, item.name);
      }) });
    },
    { displayName: "CollectionCategory" }
  );
  const CollectionTemplate = react.observer(
    (props) => {
      const { value } = props;
      const { getTemplate } = client.useCollectionManager();
      const compile = client.useCompile();
      const schema2 = getTemplate(value);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(antd.Tag, { children: compile((schema2 == null ? void 0 : schema2.title) || '{{t("General collection")}}') });
    },
    { displayName: "CollectionTemplate" }
  );
  const collectionSchema = {
    type: "object",
    properties: {
      block1: {
        type: "void",
        "x-collection": "collections",
        "x-decorator": "ResourceActionProvider",
        "x-decorator-props": {
          collection: client.collection,
          dragSort: true,
          request: {
            resource: "collections",
            action: "list",
            params: {
              pageSize: 50,
              sort: "sort",
              filter: {
                "hidden.$isFalsy": true
              },
              appends: ["category"]
            }
          }
        },
        properties: {
          tabs: {
            type: "void",
            "x-component": "ConfigurationTabs"
          }
        }
      }
    }
  };
  const collectionTableSchema = {
    type: "object",
    properties: {
      [shared.uid()]: {
        type: "void",
        "x-component": "ActionBar",
        "x-component-props": {
          style: {
            marginBottom: 10
          }
        },
        properties: {
          filter: {
            type: "void",
            title: '{{ t("Filter") }}',
            default: {
              $and: [{ title: { $includes: "" } }, { name: { $includes: "" } }]
            },
            "x-action": "filter",
            "x-component": "Filter.Action",
            "x-component-props": {
              icon: "FilterOutlined",
              useProps: "{{ cm.useFilterActionProps }}"
            },
            "x-align": "left"
          }
        }
      },
      tip: {
        type: "void",
        "x-component": "div",
        "x-content": "开启后将为此数据表创建dumuSaasStoreId字段（开启实际是给数据表增加了一个dumuSaasStoreId字段，您也可以手动添加），开启后不能手动关闭，如需关闭，请手动删除数据库dumuSaasStoreId字段；users和roles不能增加该字段。",
        "x-component-props": {
          style: {
            marginBottom: 10
          }
        }
      },
      [shared.uid()]: {
        type: "void",
        "x-uid": "input",
        "x-component": "Table.Void",
        "x-component-props": {
          rowKey: "name",
          rowSelection: {
            type: "checkbox"
          },
          useDataSource: "{{ cm.useDataSourceFromRAC }}",
          sortDirections: []
        },
        properties: {
          column1: {
            type: "void",
            "x-decorator": "Table.Column.Decorator",
            "x-component": "Table.Column",
            properties: {
              title: {
                "x-component": "CollectionField",
                "x-read-pretty": true
              }
            }
          },
          column2: {
            type: "void",
            "x-decorator": "Table.Column.Decorator",
            "x-component": "Table.Column",
            properties: {
              name: {
                type: "string",
                "x-component": "CollectionField",
                "x-read-pretty": true
              }
            }
          },
          column3: {
            type: "void",
            "x-decorator": "Table.Column.Decorator",
            "x-component": "Table.Column",
            title: '{{t("Collection template")}}',
            properties: {
              template: {
                "x-component": CollectionTemplate,
                "x-read-pretty": true
              }
            }
          },
          column4: {
            type: "void",
            "x-decorator": "Table.Column.Decorator",
            "x-component": "Table.Column",
            "x-visible": "categoryVisible",
            title: '{{t("Collection category")}}',
            properties: {
              category: {
                "x-component": CollectionCategory,
                "x-read-pretty": true
              }
            }
          },
          column5: {
            type: "void",
            title: '{{ t("Actions") }}',
            "x-component": "Table.Column",
            properties: {
              drawer: {
                type: "void",
                "x-component": "Action.Link",
                title: "开启",
                "x-component-props": {
                  confirm: {
                    title: "提示",
                    content: "开启后将为此数据表创建dumuSaasStoreId字段，开启后不能手动关闭，如需关闭，请手动删除数据库改字段列"
                  },
                  useAction: "{{ useSaasAction }}"
                },
                "x-reactions": (field) => {
                  const i = field.path.segments[1];
                  const key = field.path.segments[0];
                  const table = field.form.getValuesIn(`${key}.${i}`);
                  if (table) {
                    field.title = "开启";
                    if (NO_STORE_ID_TABLES.includes(table.name)) {
                      field.disabled = true;
                    }
                    const { getCollectionFields } = client.useCollectionManager();
                    if (lodash.find(getCollectionFields(table.name), { name: SAAS_TABLE_KEY_NAME.store })) {
                      field.disabled = true;
                      field.setTitle("已开启");
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  const useSaasAction = () => {
    const { name } = client.useRecord();
    const actionContext = client.useActionContext();
    const api = client.useAPIClient();
    const { refreshCM } = client.useCollectionManager();
    return {
      async run() {
        actionContext.setVisible(false);
        await api.request({
          url: "saasStore:use",
          params: {
            tableName: name
          }
        });
        await refreshCM();
      }
    };
  };
  const SchemaComponentContext = require$$0.createContext({});
  const ConfigurationTable = () => {
    const { collections = [], interfaces } = client.useCollectionManager();
    const {
      data: { database }
    } = client.useCurrentAppInfo();
    const api = client.useAPIClient();
    const resource = api.resource("dbViews");
    const collectonsRef = require$$0.useRef();
    collectonsRef.current = collections;
    const compile = client.useCompile();
    const loadDBViews = async () => {
      return resource.list().then(({ data }) => {
        var _a;
        return (_a = data == null ? void 0 : data.data) == null ? void 0 : _a.map((item) => {
          const schema2 = item.schema;
          return {
            label: schema2 ? `${schema2}.${compile(item.name)}` : item.name,
            value: schema2 ? `${schema2}_${item.name}` : item.name
          };
        });
      });
    };
    const ctx = require$$0.useContext(SchemaComponentContext);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SchemaComponentContext.Provider, { value: { ...ctx, designable: false }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      client.SchemaComponent,
      {
        schema: collectionSchema,
        components: {
          CollectionFieldsTable: client.CollectionFieldsTable
        },
        scope: {
          loadDBViews,
          useSaasAction,
          interfaces,
          enableInherits: (database == null ? void 0 : database.dialect) === "postgres",
          isPG: (database == null ? void 0 : database.dialect) === "postgres"
        }
      }
    ) });
  };
  const ConfigurationTabs = () => {
    const { data } = require$$0.useContext(client.CollectionCategroriesContext);
    const { run, defaultRequest, setState } = client.useResourceActionContext();
    const [key, setKey] = require$$0.useState("all");
    const [_, setActiveKey] = require$$0.useState("all");
    const compile = client.useCompile();
    if (!data)
      return null;
    const tabsItems = data.sort((a, b) => b.sort - a.sort).concat().map((v) => {
      return {
        ...v,
        schema: collectionTableSchema
      };
    });
    !tabsItems.find((v) => v.id === "all") && tabsItems.unshift({
      name: '{{t("All collections")}}',
      id: "all",
      sort: 0,
      closable: false,
      schema: collectionTableSchema
    });
    const onChange = (key2) => {
      var _a;
      setActiveKey(key2);
      setKey(shared.uid());
      if (key2 !== "all") {
        const prevFilter = (_a = defaultRequest == null ? void 0 : defaultRequest.params) == null ? void 0 : _a.filter;
        const filter = { $and: [prevFilter, { "category.id": key2 }] };
        run({ filter });
        setState == null ? void 0 : setState({ category: [+key2], params: [{ filter }] });
      } else {
        run();
        setState == null ? void 0 : setState({ category: [], params: [] });
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      antd.Tabs,
      {
        onChange,
        hideAdd: true,
        defaultActiveKey: "all",
        type: "editable-card",
        destroyInactiveTabPane: true,
        tabBarStyle: { marginBottom: "0px" },
        items: tabsItems.map((item) => {
          return {
            label: compile(item.name),
            key: item.id,
            closable: false,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(antd.Card, { bordered: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx(react.RecursionField, { name: key, schema: item.schema, onlyRenderProperties: true }) })
          };
        })
      }
    );
  };
  const schema = {
    type: "object",
    properties: {
      [shared.uid()]: {
        // 'x-decorator': 'CollectionCategoriesProvider',
        "x-component": "ConfigurationTable"
      }
    }
  };
  const CollectionDesigner = () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      client.SchemaComponent,
      {
        schema,
        components: {
          ConfigurationTable,
          ConfigurationTabs
        }
      }
    );
  };
  const { defaultProps, operators } = client.interfacesProperties;
  const saasStoreField = {
    name: DUMU_SAAS_STORE_PLUGIN_NAME,
    type: "object",
    group: "systemInfo",
    order: 9,
    title: "saas多门店字段",
    description: "saas多门店字段",
    sortable: true,
    default: {
      name: SAAS_TABLE_KEY_NAME.store,
      type: "belongsTo",
      interface: "m2o",
      collectionName: SAAS_TABLE_KEY_NAME.store,
      foreignKey: SAAS_TABLE_ID.store,
      onDelete: "NO ACTION",
      target: SAAS_TABLE.store,
      targetKey: "id",
      uiSchema: {
        "x-component": "AssociationField",
        "x-component-props": {
          multiple: false,
          fieldNames: {
            label: STORE_TABLE_TITLE_KEY,
            value: "id"
          }
        },
        title: "门店"
      }
    },
    properties: {
      ...defaultProps,
      "uiSchema.title": {
        type: "string",
        title: '{{t("Field display name")}}',
        required: true,
        default: "ID",
        "x-decorator": "FormItem",
        "x-component": "Input"
      },
      name: {
        type: "string",
        title: '{{t("Field name")}}',
        required: true,
        "x-disabled": true,
        "x-decorator": "FormItem",
        "x-component": "Input",
        description: "saas多门店字段"
      }
    },
    filterable: {
      operators: operators.number
    }
  };
  const SaasStoreManager = () => {
    const api = client.useAPIClient();
    const currentStoreId = +api.storage.getItem(SAAS_STORE_ID_CACHE_KEY);
    api.axios.interceptors.request.use((config) => {
      config.headers[HTTP_HEADER_STORE_KEY] = currentStoreId;
      return config;
    });
    const userState = client.useCurrentUserContext().data.data;
    const stores = userState[SAAS_TABLE_KEY_NAME.store];
    const tenant = userState[SAAS_TABLE_KEY_NAME.tenant];
    let options = [];
    const style = {
      padding: "10px"
    };
    if (stores.length === 1) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", style, children: stores[0].name });
    }
    let defaultValue;
    const currentStore = lodash.find(stores, (i) => i.id === currentStoreId) || stores[0];
    if (!currentStore) {
      return;
    }
    let storeName = currentStore.name;
    if (tenant.length === 1) {
      options = lodash.map(stores, (i) => {
        return {
          ...i,
          [SAAS_TABLE_KEY_NAME.store]: []
        };
      });
      defaultValue = currentStore.id;
    } else {
      options = tenant;
      storeName = `${currentStore[SAAS_TABLE_KEY_NAME.tenant].name} / ${storeName}`;
      defaultValue = [currentStore[SAAS_TABLE_KEY_NAME.tenant].id, currentStore.id];
    }
    const onChange = (value) => {
      const storeId = lodash.last(value);
      api.storage.setItem(SAAS_STORE_ID_CACHE_KEY, storeId);
      window.location.reload();
    };
    console.log(options);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      antd.Cascader,
      {
        options,
        fieldNames: {
          label: "name",
          value: "id",
          children: SAAS_TABLE_KEY_NAME.store
        },
        onChange,
        defaultValue,
        placeholder: "选择门店",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", style, children: storeName })
      }
    );
  };
  const dumuSaasStoreProvider = require$$0.memo((props) => {
    const ctx = require$$0.useContext(client.CollectionManagerContext);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      client.PinnedPluginListProvider,
      {
        items: {
          [DUMU_SAAS_STORE_PLUGIN_NAME]: { order: 1, component: "SaasStoreManager", snippet: "pm.*" }
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          client.SettingsCenterProvider,
          {
            settings: {
              [DUMU_SAAS_STORE_PLUGIN_NAME]: {
                title: "saas多门店",
                icon: "appstoreoutlined",
                tabs: {
                  tab2: {
                    title: "saas多门店字段配置",
                    component: () => /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionDesigner, {})
                  }
                }
              }
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(client.SchemaComponentOptions, { components: { SaasStoreManager }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              client.CollectionManagerContext.Provider,
              {
                value: { ...ctx, interfaces: { ...ctx.interfaces, [DUMU_SAAS_STORE_PLUGIN_NAME]: saasStoreField } },
                children: props.children
              }
            ) })
          }
        )
      }
    );
  });
  class DumuSaasStorePlugin extends client.Plugin {
    async load() {
      this.app.addProvider(dumuSaasStoreProvider);
    }
  }
  exports2.default = DumuSaasStorePlugin;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
