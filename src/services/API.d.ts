declare namespace API {
  // 用户相关
  export interface UserSearchParams {
    current?: number;
    pageSize?: number;
    nickname?: string;
    username?: string;
    mobilePhone?: string;
  }

  export interface UserListItem {
    id: number;
    nickname: string;
    username: string;
    mobilePhone: string;
    password: string;
    avatarURL: string;
    createDateTime: Date;
    enabled: boolean;
    locked: boolean;
    roles: RoleListItem[];
  }

  export interface AddUserRoleParams {
    userID: number;
    roleID: number;
  }

  export interface DeleteUserRoleParams {
    userID: number;
    roleID: number;
  }

  // 角色相关
  export interface RoleSearchParams {
    current?: number;
    pageSize?: number;
    roleName?: string;
    roleDescript?: string;
  }

  export interface RoleListItem {
    id: number;
    roleName: string;
    roleDescript: string;
    enabled: boolean;
    auths: AuthListItem[];
  }

  export interface UpdateRoleAuthParam {
    roleId: number;
    addAuthIds: number[];
    removeAuthIds: number[];
  }

  // 权限相关
  export interface AuthSearchParams {
    current?: number;
    pageSize?: number;
    authName?: string;
    requestMethod?: string;
    requestUrl?: string;
  }

  export interface AuthListItem {
    id: number;
    parentId: number;
    authGrade: number;
    authName: string;
    authDescript: string;
    requestUrl: string;
    requestMethod: string;
    enabled: boolean;
    children: AuthListItem[];
  }

  // 以下为AntD默认的
  export type CurrentUser = {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  };

  export type LoginStateType = {
    status?: 'ok' | 'error';
    type?: string;
  };

  export type NoticeIconData = {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  };
}
