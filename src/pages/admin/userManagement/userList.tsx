import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { searchType, UserListItem } from './services/userList';
import { getUsers, updateUser, deleteUser } from './services/userList';
import { Switch, Avatar, Space, Button, message } from 'antd';
import {
  PlusOutlined,
  MinusOutlined,
  ExportOutlined,
  ImportOutlined,
  EditOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import type { FormInstance } from 'antd/lib/form';

export default (): React.ReactNode => {
  const current = 1;
  const pageSize = 5;

  const ref = useRef<FormInstance>();
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const handleUsers = (params: searchType) => {
    getUsers(params)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('出错了!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
        return response.data;
      })
      .then((data) => {
        setUsers(data.content);
        setTotal(data.totalElements);
      })
      .catch((e) => {
        message.error(`获取用户信息出错!${e}`);
      });
  };

  const handleUpdateUser = (user: UserListItem, index: number) => {
    // 修改服务器中的状态
    updateUser(user)
      .then((response) => {
        if (response.status === 201) {
          message.success('更新用户状态成功!');
          // 修改本地状态
          const data = [...users];
          data[index] = user;
          setUsers(data);
        } else {
          message.error(`更新用户状态失败: ${response.msg}`);
        }
      })
      .catch((e) => {
        message.error(`更新用户状态失败: ${e}`);
      });
  };

  const handleDeleteUser = (user: UserListItem) => {
    deleteUser(user)
      .then((response) => {
        if (response.status === 204) {
          message.success('删除用户成功!');
          // 修改本地状态
          // const data = [...users];
          // data[index] = user;
          // setUsers(data);
          console.log('删除用户成功!');
        } else {
          message.error(`删除用户失败-1: ${response.msg}`);
          console.log(`删除用户失败-1: ${response.msg}`);
        }
      })
      .catch((e) => {
        message.error(`删除用户失败-2: ${e}`);
        console.log(`删除用户失败-2: ${e}`);
      });
  };

  const handleUserEnabledStateChange = (check: boolean, user: UserListItem, index: number) => {
    // eslint-disable-next-line no-param-reassign
    user.enabled = check;
    handleUpdateUser(user, index);
  };

  const handleUserLockedStateChange = (check: boolean, user: UserListItem, index: number) => {
    // eslint-disable-next-line no-param-reassign
    user.locked = check;
    handleUpdateUser(user, index);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handlePagination = (page: number, pageSize: number | undefined) => {
    const nickname = ref.current!.getFieldValue('nickname');
    const username = ref.current!.getFieldValue('username');
    const mobilePhone = ref.current!.getFieldValue('mobilePhone');
    const params = {};
    if (nickname) {
      // @ts-ignore
      params.nickname = nickname;
    }
    if (username) {
      // @ts-ignore
      params.username = username;
    }
    if (mobilePhone) {
      // @ts-ignore
      params.mobilePhone = mobilePhone;
    }
    handleUsers({
      current: page,
      pageSize,
      ...params,
    });
  };

  useEffect(() => {
    handleUsers({ current, pageSize });
  }, []);

  const columns: ProColumns<UserListItem>[] = [
    {
      align: 'center',
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      align: 'center',
      title: '头像',
      dataIndex: 'avatarURL',
      search: false,
      render: (text: any, record: any) => {
        return <Avatar shape={'square'} src={record.avatarURL} />;
      },
    },
    {
      align: 'center',
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      align: 'center',
      title: '用户名',
      dataIndex: 'username',
    },
    {
      align: 'center',
      title: '移动电话',
      dataIndex: 'mobilePhone',
    },
    {
      align: 'center',
      title: '创建日期',
      dataIndex: 'createDateTime',
      search: false,
    },
    {
      align: 'center',
      title: '启用',
      dataIndex: 'enabled',
      search: false,
      render: (text: any, record, index) => {
        return (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="禁用"
            checked={text}
            onChange={(check) => {
              handleUserEnabledStateChange(check, record, index);
            }}
          />
        );
      },
    },
    {
      align: 'center',
      title: '锁定',
      dataIndex: 'locked',
      search: false,
      render: (text: any, record, index) => {
        return (
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            checked={text}
            onChange={(checked) => {
              handleUserLockedStateChange(checked, record, index);
            }}
          />
        );
      },
    },
    {
      align: 'center',
      title: '操作',
      render: (text: any, record) => {
        return (
          <Space>
            <Button type="primary" icon={<EditOutlined />}>
              编辑
            </Button>
            <Button type="primary" icon={<SettingOutlined />}>
              设置
            </Button>
            <Button
              type="primary"
              danger={true}
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDeleteUser(record);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    /*
    PageContainer会根据当前的路由填入title和breadcrumb
     */
    <PageContainer>
      {/* ProTable支持Antd Table所有的API, 并且新增了一些API */}
      {/* 默认情况下, request并不会发送请求, */}
      <ProTable
        rowKey={'id'}
        columns={columns}
        formRef={ref}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Button key="button" icon={<MinusOutlined />} type="primary" danger={true}>
            删除
          </Button>,
          <Button key="button" icon={<ImportOutlined />} type="primary">
            导入
          </Button>,
          <Button key="button" icon={<ExportOutlined />} type="primary">
            导出
          </Button>,
        ]}
        pagination={{
          current,
          pageSize,
          total,
          // eslint-disable-next-line @typescript-eslint/no-shadow
          onChange: (page, pageSize) => {
            handlePagination(page, pageSize);
          },
        }}
        onSubmit={(params) => {
          handleUsers({
            current,
            pageSize,
            ...params,
          });
        }}
        onReset={() => {
          handleUsers({
            current,
            pageSize,
          });
        }}
        // 默认情况下通过request获取到的数据并不是双向绑定的
        // request={async (params, sort, filter)
        /*
        request={async (params) => {
          const result = await getUsers({
            ...params
          });

          console.log(result);
          return {
            data: result.data.content, // 需要渲染的数据
            success: true, // 获取数据是否成功
            total: result.data.totalElements, // 总共有多少行数据,以便分页
          };
        }}
        */
        dataSource={users}
      ></ProTable>
    </PageContainer>
  );
};
