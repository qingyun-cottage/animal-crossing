import pageRoutes from './config/router.config';

export default {
  history: 'hash',
  publicPath: './',
  hash: true,
  manifest: {
    basePath: './',
  },
  treeShaking: true,
  routes: pageRoutes,
  theme: {
    'primary-color': '#8a7b66',
    'border-radius-base': '3px',
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'umi3',
        dll: true,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
