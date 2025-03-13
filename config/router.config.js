export default [
  {
    path: '/',
    component: '../layouts',
    routes: [
      {
        path: '/',
        redirect: '/fish',
      },
      {
        name: '导航',
        path: '/navi',
        component: '../pages',
      },
      {
        name: '鱼类图鉴',
        path: '/fish',
        component: '../pages/fish',
      },
      {
        name: '昆虫图鉴',
        path: '/insect',
        component: '../pages/insect',
      },
      {
        name: '化石图鉴',
        path: '/fossil',
        component: '../pages/fossil',
      },
      {
        name: '相关备注',
        path: '/desc',
        component: '../pages/desc',
      },
    ],
  },
];
