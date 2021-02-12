// src/access.ts

export default function access(initialState: { currentUser?: API.UserListItem | undefined }) {
  const { currentUser } = initialState || {};
  // 获取当前用户所拥有的菜单路径
  const paths: string[] = [];
  const auths = {};
  if (currentUser !== undefined) {
    currentUser.roles.forEach((role) => {
      role.menus.forEach((menu) => {
        paths.push(menu.menuPath);
      });
      role.auths.forEach((auth) => {
        auths[auth.authName] = true;
      });
    });
  }

  return {
    canDashboardPage: paths.includes('/info/dashboard'),
    canSchoolsPage: paths.includes('/info/schools'),
    canPersonalInfoPage: paths.includes('/personal/info'),
    canPersonalSettingsPage: paths.includes('/personal/settings'),
    canUserListPage: paths.includes('/admin/user/userList'),
    canRoleListPage: paths.includes('/admin/role/roleList'),
    canAuthListPage: paths.includes('/admin/auth/authList'),
    canMenuListPage: paths.includes('/admin/menu/menuList'),
    ...auths,
  };
}
