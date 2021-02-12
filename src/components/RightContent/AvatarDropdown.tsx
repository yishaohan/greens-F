import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, message, Spin } from 'antd';
import { history, useModel } from 'umi';
import { logout } from '@/pages/user/login/services/login';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import Cookies from 'js-cookie';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const handleLogout = async () => {
  Cookies.remove('autoLogin');
  await logout()
    .then((response) => {
      if (response.status !== 200) {
        console.log(`Error: logout - ${response.status}`);
        throw new Error(`Error: logout - ${response.status}`);
      }
      console.log('用户注销成功!');
      message.success('用户注销成功!');
    })
    .catch((e) => {
      console.log(`用户注销失败 - ${e}`);
      message.error(`用户注销失败 - ${e}`).then(() => {});
    });
  const { query, pathname } = history.location;
  // @ts-ignore
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === 'logout' && initialState) {
        // ????????清除已缓存的菜单项
        initialState.menuData = [];
        setInitialState({ ...initialState, currentUser: undefined });
        handleLogout().then();
        return;
      }
      history.push(`/personal/${key}`);
    },
    [initialState, setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.nickname) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="info">
          <UserOutlined />
          用户信息
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          用户设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatarURL} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.nickname}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
