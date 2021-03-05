// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

/*
config.ts文件是umijs的配置文件
https://umijs.org/zh-CN/config
 */
export default defineConfig({
  hash: true, // 配置路由模式
  antd: {
    compact: false, // 紧凑布局
  }, // plugin-antd开启antd
  dva: {
    // plugin-dva开启dva
    hmr: true,
  },
  layout: {
    // plugin-layout开启layout布局(https://beta-pro.ant.design/docs/layout-cn   https://procomponents.ant.design/components/layout)
    name: 'Project Y',
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'highlight-color': '#FF8800',
    // 'link-color': '#FF8800', // 链接色
    'normal-color': '#FF8800',
    // successColor: '#52c41a', // 成功色
    // warningColor: '#faad14', // 警告色
    // errorColor: '#f5222d', // 错误色
    // fontSizeBase: 14px, // 主字号
    // 'heading-color': 'rgba(255, 136, 0, 0.85)', // 标题色
    // textColor: 'rgba(255, 136, 0, 0.65)', // 主文本色
    // textColorSecondary: 'rgba(0, 0, 0, 0.45)', // 次文本色
    // disabledColor: 'rgba(0, 0, 0, 0.25)', // 失效色
    // borderRadiusBase: '2px', // 组件/浮层圆角
    // 'border-color-base': '#FF8800', // 边框色
    // boxShadowBase: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08) 0 9px 28px 8px rgba(0, 0, 0, 0.05)', // 浮层阴影  layout: 'top',
  },
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  scripts: [
    'https://unpkg.com/react@17/umd/react.production.min.js',
    'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
    'https://unpkg.com/@ant-design/charts@1.0.5/dist/charts.min.js',
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    '@ant-design/charts': 'charts',
  },
});
