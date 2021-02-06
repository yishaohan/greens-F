export default [
  {
    path: '/user', // 路由地址
    layout: false, // 指定antd Pro组件是否需要渲染到Layout布局中(此处的login界面不需要Layout布局中的顶部菜单和左侧的工具栏,所以是False)
    routes: [
      {
        path: '/user',
        routes: [
          // 定义嵌套路由
          {
            name: 'login', // 当前路由名称
            path: '/user/login', // 子路由地址
            component: './user/login/login', // 路由对应的组件
          },
          {
            name: 'register',
            path: '/user/register',
            component: './user/register/register',
          },
        ],
      },
    ],
  },
  // 只要当前的组件是渲染到Layout布局中,并且指定了name和icon属性,那么会自动作为左侧菜单的内容来显示
  {
    name: 'welcome', // antd Pro会根据name指定的KEY到国际化的文件中获取对应的VALUE
    path: '/welcome',
    icon: 'HomeFilled', // antd Pro会根据icon指定的KEY到antd图标库中获取对应的图标
    component: './Welcome',
  },
  {
    name: 'personal-center',
    path: '/personal',
    icon: 'UserOutlined',
    routes: [
      {
        name: 'personal-info',
        path: '/personal/info',
        component: './Welcome',
      },
      {
        name: 'personal-settings',
        path: '/personal/settings',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'user-management',
    path: '/admin',
    icon: 'TeamOutlined',
    routes: [
      {
        name: 'user-list',
        path: '/admin/userList',
        component: './admin/userManagement/userList',
      },
      {
        name: 'role-list',
        path: '/admin/roleList',
        component: './admin/userManagement/roleList',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
