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

  // BS Schools COVID19相关
  export interface BCSchoolsCOVID19SearchParams {
    current?: number;
    pageSize?: number;
    schoolName?: string;
    districtName?: string;
    cityName?: string;
    healthRegionName?: string;
    notificationDate?: string;
    notificationMethod?: string;
  }

  export interface BCSchoolDistrictListItem {
    districtName: string;
    districtAbb: string;
    districtWebAddress: string;
    districtPhone: string;
    districtFax: string;
    postalCode: string;
    address: string;
    courierPostalCode: string;
    courierAddress: string;
  }

  export interface BCSchoolInfoListItem {
    schoolName: string;
    schoolDistrict: BCSchoolDistrictListItem;
    schoolCategory: string;
    schoolType: string;
    gradeRange: string;
    enrolmentTotal: number;
    principalFirstName: string;
    principalLastName: string;
    principalTitle: string;
    postalCode: string;
    city: string;
    province: string;
    schoolAddress: string;
    schoolPhone: string;
    schoolEmail: string;
    schoolFax: string;
    grade1Enrolment: number;
    grade2Enrolment: number;
    grade3Enrolment: number;
    grade4Enrolment: number;
    grade5Enrolment: number;
    grade6Enrolment: number;
    grade7Enrolment: number;
    grade8Enrolment: number;
    grade9Enrolment: number;
    grade10Enrolment: number;
    grade11Enrolment: number;
    grade12Enrolment: number;
  }

  export interface BCSchoolsCOVID19ListItem {
    id: number;
    schoolsInfo: BCSchoolInfoListItem;
    schoolId: string;
    schoolName: string;
    districtId: string;
    districtName: string;
    districtAbb: string;
    cityId: string;
    cityName: string;
    healthId: string;
    healthRegionName: string;
    notificationDate: string;
    notificationMethod: string;
    exposureDate: string;
    exposureNumber: number;
    extraInfo: string;
    documentation: string;
  }

  export interface BCSchoolsSummarySearchParams {
    startDate?: string;
    endDate?: string;
  }

  export interface BCSchoolsSummaryListItem {
    schoolName: string;
    count: number;
  }

  // BS Schools District COVID19统计相关
  export interface BCSchoolsDistrictSummarySearchParams {
    startDate?: string;
    endDate?: string;
  }

  //
  export interface BCSchoolsDistrictsSummaryListItem {
    districtAbb: string;
    districtName: string;
    count: number;
  }

  // BC Schools Health COVID19统计相关
  export interface BCSchoolsHealthsSummarySearchParams {
    startDate?: string;
    endDate?: string;
  }

  export interface BCSchoolsHealthsSummaryListItem {
    healthRegionName: string;
    count: number;
  }

  // BC Schools COVID19 Total
  export interface BCSchoolsTotalSummary {
    total: number;
    updateDateTime: string;
    weeklyChanges: number;
    dailyChanges: number;
  }

  // BC Schools COVID19 Daily Summary
  export interface BCSchoolsDailySummarySearchParams {
    startDate?: string;
    endDate?: string;
  }

  export interface BCSchoolsDailySummaryListItem {
    day: string;
    count: number;
  }

  // BC Schools Health Cities COVID19统计相关
  export interface BCSchoolsHealthsCitiesSummarySearchParams {
    startDate?: string;
    endDate?: string;
  }

  export interface BCSchoolsHealthsCitiesSummaryListItem {
    healthRegionName: string;
    cityName: string;
    count: number;
  }

  // BC Schools COVID19 Monthly Summary
  export interface BCSchoolsMonthlySummarySearchParams {
    startDate?: string;
    endDate?: string;
  }

  export interface BCSchoolsMonthlySummaryListItem {
    month: string;
    count: number;
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
