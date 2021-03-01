/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import type { MenuDataItem } from '@ant-design/pro-layout';
import React from 'react';
import * as Icon from '@ant-design/icons/lib/icons';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import moment from 'moment';
import { fixedZero } from '@/pages/covid19/school/utils/utils';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 生成权限树
export const generatorAuthTree = (auths: API.AuthListItem[]) => {
  const tree: API.AuthListItem[] = [];
  auths.forEach((outItem: API.AuthListItem) => {
    if (outItem.authGrade === 1) {
      // eslint-disable-next-line no-param-reassign
      outItem.children = [];
      tree.push(outItem);
    }
    auths.forEach((inItem) => {
      if (outItem.id === inItem.parentId) {
        outItem.children.push(inItem);
      }
    });
  });
  return tree;
};

// 生成菜单树
export const generatorMenuTree = (menus: API.MenuListItem[]) => {
  const tree: API.MenuListItem[] = [];
  menus.forEach((outItem: API.MenuListItem) => {
    if (outItem.menuGrade === 1) {
      // eslint-disable-next-line no-param-reassign
      outItem.children = [];
      tree.push(outItem);
    }
    menus.forEach((inItem) => {
      if (outItem.id === inItem.parentId) {
        outItem.children.push(inItem);
      }
    });
  });
  return tree;
};

// 生成菜单项
export const generatorMenuData = (menus: API.MenuListItem[]): MenuDataItem[] => {
  const menuData: MenuDataItem[] = [];
  menus.forEach((menu) => {
    if (menu.children) {
      menuData.push({
        icon: React.createElement(Icon[menu.menuIcon]),
        name: menu.menuName,
        path: menu.menuPath,
        locale: menu.menuComponent,
        children: generatorMenuData(menu.children),
      });
    } else {
      menuData.push({
        icon: React.createElement(Icon[menu.menuIcon]),
        name: menu.menuName,
        path: menu.menuPath,
        locale: menu.menuComponent,
      });
    }
  });
  return menuData;
};

// 获取当前用户所有菜单
export const getUserMenus = (user: API.UserListItem): API.MenuListItem[] => {
  // 获取当前用户菜单
  const menus: API.MenuListItem[] = [];
  if (user !== undefined) {
    let include = false;
    user.roles.forEach((role) => {
      role.menus.forEach((menu) => {
        menus.forEach((includeMenu) => {
          if (includeMenu.menuName === menu.menuName) {
            include = true;
          }
        });
        if (!include) {
          menus.push(menu);
        }
        include = false;
      });
    });
    return menus;
  }
  return [];
};

// 日期选择??????
type RangePickerValue = RangePickerProps<moment.Moment>['value'];

export function getTimeDistance(type: 'today' | 'week' | 'month' | 'year'): RangePickerValue {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }
  const year = now.getFullYear();

  if (type === 'month') {
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};
