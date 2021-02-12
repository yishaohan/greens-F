import React from 'react';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
// import {notification} from 'antd';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { getUser } from './services/user';
import defaultSettings from '../config/defaultSettings';
import logo from '../public/resources/Y192.png';
import Cookies from 'js-cookie';
import { MenuDataItem } from '@ant-design/pro-layout';
import { generatorMenuTree } from '@/utils/utils';
import { generatorMenuData } from '@/utils/utils';

/**
 * 获取用户信息比较慢的时候会展示一个 loading
 */
export const initialStateConfig = {
  loading: <PageLoading />,
};

// plugin-initial-state插件会在应用启动时自动执行,获取初始数据
export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.UserListItem;
  fetchUserInfo?: () => Promise<API.UserListItem | undefined>;
  menuData?: MenuDataItem[];
}> {
  // 获取用户信息
  const fetchUserInfo = async () => {
    // 异步调用: 获取当前用户信息
    // try {
    //   let currentUser;
    //   await getUser().then((response) => {
    //     if (response.status === 200) {
    //       currentUser = response.data;
    //     } else {
    //       Cookies.remove('autoLogin');
    //       history.push('/user/login');
    //     }
    //   });
    //   return currentUser;
    // } catch (error) {
    //   Cookies.remove('autoLogin');
    //   history.push('/user/login');
    // }
    // return undefined;

    // 同步调用: 获取当前用户信息
    try {
      const response = await getUser();
      if (response.status === 200) {
        const currentUser: API.UserListItem = response.data;
        return currentUser;
      }
      Cookies.remove('autoLogin');
      history.push('/user/login');
    } catch (error) {
      Cookies.remove('autoLogin');
      history.push('/user/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行 ??????????????????????????????????????????????????????????????/
  if (
    history.location.pathname !== '/user/login' &&
    history.location.pathname !== '/user/register'
  ) {
    // 获取当前用户信息
    const currentUser = await fetchUserInfo();
    console.log(currentUser);
    // 获取当前用户菜单
    let menus: API.MenuListItem[] = [];
    if (currentUser !== undefined) {
      currentUser.roles.forEach((role) => {
        menus = [...menus, ...role.menus];
      });
      menus = generatorMenuTree(menus);
    }

    // 根据获取到的菜单生成AntD Pro MenuDataItem[]
    const menuData: MenuDataItem[] = generatorMenuData(menus);
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
      menuData,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// plugin-layout运行时配置
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    logo: () => <img src={logo} alt={'Project Y'} />,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const {currentUser} = initialState;
      const { location } = history;
      // 如果没有登录，重定向到 login  ?????????????????????????????????????????????????????
      if (
        !initialState?.currentUser &&
        location.pathname !== '/user/login' &&
        location.pathname !== '/user/register'
      ) {
        Cookies.remove('autoLogin');
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    menuDataRender: (menuData) => {
      // console.log(initialState!.menuData);
      // console.log(menuData);
      return initialState!.menuData || menuData;
    },
    // menuDataRender: (menuData) => initialState.menuData || menuData,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
