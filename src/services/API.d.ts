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
    menus: MenuListItem[];
  }

  export interface UpdateRoleAuthParam {
    roleId: number;
    addAuthIds: number[];
    removeAuthIds: number[];
  }

  export interface UpdateRoleMenuParam {
    roleId: number;
    addMenuIds: number[];
    removeMenuIds: number[];
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

  // 菜单相关
  export interface MenuSearchParams {
    current?: number;
    pageSize?: number;
    menuName?: string;
    menuDescript?: string;
    menuPath?: string;
  }

  export interface MenuListItem {
    id: number;
    parentId: number;
    menuGrade: number;
    sortId: number;
    menuIcon: string;
    menuName: string;
    menuDescript: string;
    menuPath: string;
    menuComponent: string;
    enabled: boolean;
    children: MenuListItem[];
  }

  export interface ReceiverInfoItem {
    name: string;
    telePhone: string;
    email: string;
    postcode: string;
    address: string;
    remark?: string;
  }

  export interface OrderInfoItem {
    quantity: number;
    item1: boolean;
    item2: boolean;
    item3: boolean;
    item4: boolean;
    item5: boolean;
    item6: boolean;
  }

  export interface SubmitOrder {
    orderId?: string;
    name: string;
    telePhone: string;
    email: string;
    postcode: string;
    address: string;
    remark?: string;
    quantity: number;
    item1: boolean;
    item2: boolean;
    item3: boolean;
    item4: boolean;
    item5: boolean;
    item6: boolean;
    error?: string;
  }

  export interface OrderListItem {
    id: number;
    name: string;
    telePhone: string;
    email: string;
    status: boolean;
    clientQuantity: number;
    item1: boolean;
    item2: boolean;
    item3: boolean;
    item4: boolean;
    item5: boolean;
    item6: boolean;
    remark: string;
    postcode: string;
    address: string;
    orderID: string;
    amountValue: string;
    payerFullName: string;
    payerGivenName: string;
    payerSurname: string;
    payerPhoneNumber: string;
    payerEmail: string;
    payerPostalCode: string;
    payerAdminArea1: string;
    payerAdminArea2: string;
    payerAdminArea3: string;
    payerAdminArea4: string;
    payerAddressLine1: string;
    payerAddressLine2: string;
    payerAddressLine3: string;
    payeeEmail: string;
  }

  export interface OrderListItemSearchParams {
    current?: number;
    pageSize?: number;
    name?: string;
    telePhone?: string;
    email?: string;
    // status?: boolean;
    orderId?: string;
  }

  // 以下为AntD默认的
  // export type CurrentUser = {
  //   avatar?: string;
  //   name?: string;
  //   title?: string;
  //   group?: string;
  //   signature?: string;
  //   tags?: {
  //     key: string;
  //     label: string;
  //   }[];
  //   userid?: string;
  //   access?: 'user' | 'guest' | 'admin';
  //   unreadCount?: number;
  // };

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
