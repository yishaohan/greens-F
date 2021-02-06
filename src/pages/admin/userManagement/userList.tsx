import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  getUsers,
  updateUser,
  deleteUser,
  deleteUsers,
  importUsers,
  exportUsers,
} from './services/userList';
import { Switch, Avatar, Space, Button, message, Upload, Tag } from 'antd';
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
import type { UploadChangeParam } from 'antd/lib/upload';
import AddUserForm from './components/addUserForm';
import EditUserForm from './components/editUserForm';
import SetUserRoleForm from './components/setUserRoleForm';

// 定义函数式组件
export default (): React.ReactNode => {
  // 全局变量
  const currentPage = useRef(1);
  const sizePerPage = useRef<number | undefined>(5);

  // 获取表单的ref
  const ref = useRef<FormInstance>();

  // 双向数据绑定(响应式数据)
  const [users, setUsers] = useState<API.UserListItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentSelectedRowKeys, setCurrentSelectedRowKeys] = useState<React.ReactText[]>([]);
  const [addUserModalVisible, setAddUserModalVisible] = useState<boolean>(false);
  const [editUserModalVisible, setEditUserModalVisible] = useState<boolean>(false);
  const [setUserRoleModalVisible, setSetUserRoleModalVisible] = useState<boolean>(false);
  const [currentEditUser, setCurrentEditUser] = useState<API.UserListItem>();

  // 根据页码和搜索参数获取用户
  const handleGetUsers = (params: API.UserSearchParams) => {
    getUsers(params)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getUsers - ${response.status}`);
          throw new Error(`Error: getUsers - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setUsers(data.content);
        setTotal(data.totalElements);
      })
      .catch((e) => {
        console.log(`获取用户信息出错 - ${e}`);
        message.error(`获取用户信息出错!${e}`).then(() => {});
      });
  };

  // 新建用户弹窗 | 编辑用户弹窗, 关闭或新建时触发
  useEffect(() => {
    handleGetUsers({ current: currentPage.current, pageSize: sizePerPage.current });
  }, [addUserModalVisible, editUserModalVisible, setUserRoleModalVisible]);

  // 更新用户信息
  const handleUpdateUser = (user: API.UserListItem, index: number) => {
    // 修改服务器中的状态
    updateUser(user)
      .then((response) => {
        if (response.status === 201) {
          message.success('更新用户状态成功!').then(() => {});
          // 修改本地状态
          const data = [...users];
          data[index] = user;
          setUsers(data);
        } else {
          message.error(`更新用户状态失败: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`更新用户状态失败: ${e}`).then(() => {});
      });
  };

  // 更新用户[enabled]属性
  const handleUserEnabledStateChange = (check: boolean, user: API.UserListItem, index: number) => {
    // eslint-disable-next-line no-param-reassign
    user.enabled = check;
    handleUpdateUser(user, index);
  };

  // 更新用户[locked]属性
  const handleUserLockedStateChange = (check: boolean, user: API.UserListItem, index: number) => {
    // eslint-disable-next-line no-param-reassign
    user.locked = check;
    handleUpdateUser(user, index);
  };

  // 删除单个用户
  const handleDeleteUser = (user: API.UserListItem) => {
    deleteUser(user)
      .then((response) => {
        if (response.status === 204) {
          message.success('删除用户成功!').then(() => {});
          // 修改本地状态
          // const data = [...users];
          // data[index] = user;
          // setUsers(data);
          handleGetUsers({ current: currentPage.current, pageSize: sizePerPage.current });
        } else {
          message.error(`删除用户失败-1: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`删除用户失败-2: ${e}`).then(() => {});
      });
  };

  // 定义界面上ProTable的列信息
  const columns: ProColumns<API.UserListItem>[] = [
    {
      align: 'center',
      title: 'ID',
      search: false,
      dataIndex: 'id',
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
      title: '角色',
      render: (text: any, record: API.UserListItem) => {
        if (record.roles && record.roles.length === 0) {
          return <Tag color={'red'}>{'未分配角色'}</Tag>;
        }
        return record.roles.map((role: API.RoleListItem) => {
          return (
            <Tag key={role.id} color={'green'}>
              {role.roleDescript}
            </Tag>
          );
        });
      },
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
            unCheckedChildren="启用"
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
            checkedChildren="锁定"
            unCheckedChildren="锁定"
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
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setEditUserModalVisible(true);
                setCurrentEditUser(record);
              }}
            >
              编辑
            </Button>
            <Button
              type="primary"
              icon={<SettingOutlined />}
              onClick={() => {
                setSetUserRoleModalVisible(true);
                setCurrentEditUser(record);
              }}
            >
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

  // 批量删除用户
  const handleDeleteUsers = () => {
    const ids: (string | number | undefined)[] = [];
    const values = currentSelectedRowKeys.values();
    let i = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const value of values) {
      // eslint-disable-next-line no-plusplus
      ids[i++] = value;
    }
    deleteUsers(ids)
      .then((response) => {
        if (response.status === 204) {
          message.success('批量删除用户成功!').then(() => {});
          // 修改本地状态
          // const data = [...users];
          // data[index] = user;
          // setUsers(data);
          setCurrentSelectedRowKeys([]);
          handleGetUsers({ current: currentPage.current, pageSize: sizePerPage.current });
        } else {
          message.error(`批量删除用户失败: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`批量删除用户失败: ${e}`).then(() => {});
      });
  };

  // 处理分页请求
  const handlePagination = (page: number, pageSize: number | undefined) => {
    const nickname = ref.current!.getFieldValue('nickname');
    const username = ref.current!.getFieldValue('username');
    const mobilePhone = ref.current!.getFieldValue('mobilePhone');
    const params = {};
    if (nickname) {
      params['nickname'] = nickname;
    }
    if (username) {
      params['username'] = username;
    }
    if (mobilePhone) {
      params['mobilePhone'] = mobilePhone;
    }
    currentPage.current = page;
    sizePerPage.current = pageSize;
    // 根据条件获取数据
    handleGetUsers({
      current: currentPage.current,
      pageSize: sizePerPage.current,
      ...params,
    });
  };

  // 组件的界面定义
  return (
    /*
    PageContainer会根据当前的路由填入title和breadcrumb
     */
    <PageContainer>
      {addUserModalVisible && (
        <AddUserForm
          onCancel={() => setAddUserModalVisible(false)}
          modalVisible={addUserModalVisible}
        />
      )}
      {editUserModalVisible && (
        <EditUserForm
          onCancel={() => setEditUserModalVisible(false)}
          modalVisible={editUserModalVisible}
          currentEditUser={currentEditUser!}
        />
      )}
      {setUserRoleModalVisible && (
        <SetUserRoleForm
          onCancel={() => setSetUserRoleModalVisible(false)}
          modalVisible={setUserRoleModalVisible}
          currentEditUser={currentEditUser!}
          // roles={roles}
        />
      )}
      {/* ProTable支持Antd Table所有的API, 并且新增了一些API */}
      {/* 默认情况下, request并不会发送请求, */}
      <ProTable
        rowKey={'id'}
        columns={columns}
        dataSource={users}
        // 表单引用
        formRef={ref}
        // 工具栏
        toolBarRender={() => [
          <Button
            key="new"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setAddUserModalVisible(true);
            }}
          >
            新建
          </Button>,
          <Button
            key="delete"
            icon={<MinusOutlined />}
            type="primary"
            danger={true}
            onClick={() => {
              handleDeleteUsers();
            }}
          >
            删除
          </Button>,
          <Upload
            key="upload"
            name="file"
            accept=".xls, .xlsx"
            showUploadList={false}
            action={importUsers()}
            onChange={(info: UploadChangeParam) => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully!`).then();
                currentPage.current = 1;
                handleGetUsers({});
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed!`).then();
              }
            }}
          >
            <Button key="import" icon={<ImportOutlined />} type="primary">
              导入
            </Button>
          </Upload>,
          <Button
            key="export"
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => {
              exportUsers().then(() => {});
            }}
          >
            导出
          </Button>,
        ]}
        // 分页器
        pagination={{
          current: currentPage.current,
          pageSize: sizePerPage.current,
          total,
          // 分页器事件处理
          onChange: (page, pageSize) => {
            handlePagination(page, pageSize);
          },
        }}
        // 提交表单(点击"查询")事件处理
        onSubmit={(params) => {
          handleGetUsers({
            // current: currentPage.current,
            // pageSize: sizePerPage.current,
            ...params,
          });
        }}
        // 重置表单(点击"重置")事件处理
        onReset={() => {
          handleGetUsers({
            // current: currentPage.current,
            // pageSize: sizePerPage.current,
          });
        }}
        // 行选择处理器
        rowSelection={{
          selectedRowKeys: currentSelectedRowKeys,
          onChange: (selectedRowKeys) => {
            setCurrentSelectedRowKeys([...selectedRowKeys]);
          },
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
      ></ProTable>
    </PageContainer>
  );
};
