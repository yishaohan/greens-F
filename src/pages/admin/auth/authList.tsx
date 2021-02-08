import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAuths, updateAuth, deleteAuth, deleteAuths } from './services/authList';
import { Switch, Space, Button, message, Tag } from 'antd';
import { PlusOutlined, MinusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import type { FormInstance } from 'antd/lib/form';
import AddAuthForm from './components/addAuthForm';
import EditAuthForm from './components/editAuthForm';

// 定义函数式组件
export default (): React.ReactNode => {
  // 全局变量
  const currentPage = useRef(1);
  const sizePerPage = useRef<number | undefined>(5);

  // 获取表单的ref
  const ref = useRef<FormInstance>();

  // 双向数据绑定(响应式数据)
  const [auths, setAuths] = useState<API.AuthListItem[]>([]);
  const [allAuths, setAllAuths] = useState<API.AuthListItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentSelectedRowKeys, setCurrentSelectedRowKeys] = useState<React.ReactText[]>([]);
  const [addAuthModalVisible, setAddAuthModalVisible] = useState<boolean>(false);
  const [editAuthModalVisible, setEditAuthModalVisible] = useState<boolean>(false);
  const [currentEditAuth, setCurrentEditAuth] = useState<API.AuthListItem>();

  // 根据页码和搜索参数获取用户
  const handleGetAuths = (params: API.AuthSearchParams) => {
    getAuths(params)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getAuths - ${response.status}`);
          throw new Error(`Error: getAuths - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setAuths(data.content);
        setTotal(data.totalElements);
      })
      .catch((e) => {
        console.log(`获取权限信息出错 - ${e}`);
        message.error(`获取权限信息出错!${e}`).then(() => {});
      });
  };

  // 根据页码和搜索参数获取用户
  const handleGetAllAuths = () => {
    getAuths({ pageSize: 1000 })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getAllAuths - ${response.status}`);
          throw new Error(`Error: getAllAuths - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setAllAuths(data.content);
      })
      .catch((e) => {
        console.log(`获取所有权限信息出错 - ${e}`);
        message.error(`获取所有权限信息出错!${e}`).then(() => {});
      });
  };

  // 新建权限弹窗 | 编辑权限弹窗, 关闭或新建时触发
  useEffect(() => {
    handleGetAuths({ current: currentPage.current, pageSize: sizePerPage.current });
  }, [addAuthModalVisible, editAuthModalVisible]);

  // 生命周期钩子, 页面加载时, 自动触发获取所有权限列表
  useEffect(() => {
    handleGetAllAuths();
  }, []);

  // 更新用户信息
  const handleUpdateAuth = (auth: API.AuthListItem, index: number) => {
    // 修改服务器中的状态
    updateAuth(auth)
      .then((response) => {
        if (response.status === 201) {
          message.success('更新权限状态成功!').then(() => {});
          // 修改本地状态
          const data = [...auths];
          data[index] = auth;
          setAuths(data);
        } else {
          message.error(`更新权限状态失败: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`更新权限状态失败: ${e}`).then(() => {});
      });
  };

  // 更新用户[enabled]属性
  const handleAuthEnabledStateChange = (check: boolean, auth: API.AuthListItem, index: number) => {
    // eslint-disable-next-line no-param-reassign
    auth.enabled = check;
    handleUpdateAuth(auth, index);
  };

  // 删除单个用户
  const handleDeleteAuth = (auth: API.AuthListItem) => {
    deleteAuth(auth)
      .then((response) => {
        if (response.status === 204) {
          message.success('删除权限成功!').then(() => {});
          // 修改本地状态
          // const data = [...users];
          // data[index] = user;
          // setUsers(data);
          handleGetAuths({ current: currentPage.current, pageSize: sizePerPage.current });
        } else {
          message.error(`删除权限失败-1: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`删除权限失败-2: ${e}`).then(() => {});
      });
  };

  // 定义界面上ProTable的列信息
  const columns: ProColumns<API.AuthListItem>[] = [
    {
      align: 'center',
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
      width: 48,
    },
    {
      align: 'center',
      title: 'ID',
      dataIndex: 'id',
      search: false,
      hideInTable: true,
    },
    {
      align: 'center',
      title: '权限等级',
      dataIndex: 'authGrade',
      search: false,
      render: (text: any) => {
        if (text === 1) {
          return <Tag color={'red'}>一级权限</Tag>;
        }
        if (text === 2) {
          return <Tag color={'green'}>二级权限</Tag>;
        }
        if (text === 3) {
          return <Tag color={'green'}>三级权限</Tag>;
        }
        return <Tag color={'red'}>权限错误</Tag>;
      },
    },
    {
      align: 'center',
      title: '父权限',
      dataIndex: 'parentId',
      render: (text: any) => {
        let desc = '';
        allAuths.forEach((auth) => {
          if (text === auth.id) {
            desc = auth.authName;
          }
        });
        return <Tag color={'green'}>{desc}</Tag>;
      },
    },
    {
      align: 'center',
      title: '权限名称',
      dataIndex: 'authName',
    },
    {
      align: 'center',
      title: '权限描述',
      dataIndex: 'authDescript',
      search: false,
    },
    {
      align: 'center',
      title: '权限路径',
      dataIndex: 'requestUrl',
      render: (text: any) => {
        if (text === '-') {
          return <Tag color={'red'}></Tag>;
        }
        return <Tag color={'green'}>{text}</Tag>;
      },
    },
    {
      align: 'center',
      title: '请求方法',
      dataIndex: 'requestMethod',
      render: (text: any) => {
        if (text === '-') {
          return <Tag color={'red'}></Tag>;
        }
        return <Tag color={'green'}>{text}</Tag>;
      },
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
              handleAuthEnabledStateChange(check, record, index);
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
                setEditAuthModalVisible(true);
                setCurrentEditAuth(record);
              }}
            >
              编辑
            </Button>
            <Button
              type="primary"
              danger={true}
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDeleteAuth(record);
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
  const handleDeleteAuths = () => {
    const ids: (string | number | undefined)[] = [];
    const values = currentSelectedRowKeys.values();
    let i = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const value of values) {
      // eslint-disable-next-line no-plusplus
      ids[i++] = value;
    }
    deleteAuths(ids)
      .then((response) => {
        if (response.status === 204) {
          message.success('批量删除权限成功!').then(() => {});
          // 修改本地状态
          // const data = [...users];
          // data[index] = user;
          // setUsers(data);
          setCurrentSelectedRowKeys([]);
          handleGetAuths({ current: currentPage.current, pageSize: sizePerPage.current });
        } else {
          message.error(`批量删除权限失败: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`批量删除权限失败: ${e}`).then(() => {});
      });
  };

  // 处理分页请求
  const handlePagination = (page: number, pageSize: number | undefined) => {
    const authName = ref.current!.getFieldValue('authName');
    const requestMethod = ref.current!.getFieldValue('requestMethod');
    const requestUrl = ref.current!.getFieldValue('requestUrl');
    const params = {};
    if (authName) {
      params['authName'] = authName;
    }
    if (requestMethod) {
      params['requestMethod'] = requestMethod;
    }
    if (requestUrl) {
      params['requestUrl'] = requestUrl;
    }
    currentPage.current = page;
    sizePerPage.current = pageSize;
    // 根据条件获取数据
    handleGetAuths({
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
      {addAuthModalVisible && (
        <AddAuthForm
          onCancel={() => setAddAuthModalVisible(false)}
          modalVisible={addAuthModalVisible}
        />
      )}
      {editAuthModalVisible && (
        <EditAuthForm
          onCancel={() => setEditAuthModalVisible(false)}
          modalVisible={editAuthModalVisible}
          currentEditAuth={currentEditAuth!}
        />
      )}
      {/* ProTable支持Antd Table所有的API, 并且新增了一些API */}
      {/* 默认情况下, request并不会发送请求, */}
      <ProTable
        rowKey={'id'}
        columns={columns}
        dataSource={auths}
        // 表单引用
        formRef={ref}
        // 工具栏
        toolBarRender={() => [
          <Button
            key="new"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setAddAuthModalVisible(true);
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
              handleDeleteAuths();
            }}
          >
            删除
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
          handleGetAuths({
            // current: currentPage.current,
            // pageSize: sizePerPage.current,
            ...params,
          });
        }}
        // 重置表单(点击"重置")事件处理
        onReset={() => {
          handleGetAuths({
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
