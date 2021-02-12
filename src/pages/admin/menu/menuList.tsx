import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getMenus, updateMenu, deleteMenu, deleteMenus } from './services/menuList';
import { Switch, Space, Button, message, Tag } from 'antd';
import { PlusOutlined, MinusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import type { FormInstance } from 'antd/lib/form';
import AddMenuForm from './components/addMenuForm';
import EditMenuForm from './components/editMenuForm';
import { useAccess } from 'umi';
import * as Icon from '@ant-design/icons/lib/icons';

// 定义函数式组件
export default (): React.ReactNode => {
  // 全局变量
  const currentPage = useRef(1);
  const sizePerPage = useRef<number | undefined>(5);
  const access = useAccess();

  // 获取表单的ref
  const ref = useRef<FormInstance>();

  // 双向数据绑定(响应式数据)
  const [menus, setMenus] = useState<API.MenuListItem[]>([]);
  const [allMenus, setAllMenus] = useState<API.MenuListItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentSelectedRowKeys, setCurrentSelectedRowKeys] = useState<React.ReactText[]>([]);
  const [addMenuModalVisible, setAddMenuModalVisible] = useState<boolean>(false);
  const [editMenuModalVisible, setEditMenuModalVisible] = useState<boolean>(false);
  const [currentEditMenu, setCurrentEditMenu] = useState<API.MenuListItem>();

  // 根据页码和搜索参数获取菜单
  const handleGetMenus = (params: API.MenuSearchParams) => {
    getMenus(params)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getMenus - ${response.status}`);
          throw new Error(`Error: getMenus - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setMenus(data.content);
        setTotal(data.totalElements);
      })
      .catch((e) => {
        console.log(`获取菜单信息出错 - ${e}`);
        message.error(`获取菜单信息出错!${e}`).then(() => {});
      });
  };

  // 获取所有菜单
  const handleGetAllMenus = () => {
    getMenus({ pageSize: 1000 })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getAllMenus - ${response.status}`);
          throw new Error(`Error: getAllMenus - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setAllMenus(data.content);
      })
      .catch((e) => {
        console.log(`获取所有权限信息出错 - ${e}`);
        message.error(`获取所有权限信息出错!${e}`).then(() => {});
      });
  };

  // 新建菜单弹窗 | 编辑菜单弹窗, 关闭或新建时触发
  useEffect(() => {
    handleGetMenus({ current: currentPage.current, pageSize: sizePerPage.current });
  }, [addMenuModalVisible, editMenuModalVisible]);

  // 生命周期钩子, 页面加载时, 自动触发获取所有菜单列表
  useEffect(() => {
    handleGetAllMenus();
  }, []);

  // 更新菜单信息
  const handleUpdateMenu = (menu: API.MenuListItem, index: number) => {
    // 修改服务器中的状态
    updateMenu(menu)
      .then((response) => {
        if (response.status === 201) {
          message.success('更新菜单状态成功!').then(() => {});
          // 修改本地状态
          const data = [...menus];
          data[index] = menu;
          setMenus(data);
        } else {
          message.error(`更新菜单状态失败: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`更新菜单状态失败: ${e}`).then(() => {});
      });
  };

  // 更新菜单[enabled]属性
  const handleMenuEnabledStateChange = (check: boolean, menu: API.MenuListItem, index: number) => {
    // eslint-disable-next-line no-param-reassign
    menu.enabled = check;
    handleUpdateMenu(menu, index);
  };

  // 删除单个菜单
  const handleDeleteMenu = (menu: API.MenuListItem) => {
    deleteMenu(menu)
      .then((response) => {
        if (response.status === 204) {
          message.success('删除菜单成功!').then(() => {});
          // 修改本地状态
          // const data = [...users];
          // data[index] = user;
          // setUsers(data);
          handleGetMenus({ current: currentPage.current, pageSize: sizePerPage.current });
        } else {
          message.error(`删除菜单失败-1: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`删除菜单失败-2: ${e}`).then(() => {});
      });
  };

  // 定义界面上ProTable的列信息
  const columns: ProColumns<API.MenuListItem>[] = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
      width: 48,
    },
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id',
      search: false,
      hideInTable: true,
    },
    {
      title: '等级',
      align: 'center',
      dataIndex: 'menuGrade',
      search: false,
      render: (text: any) => {
        if (text === 1) {
          return <Tag color={'red'}>一级菜单</Tag>;
        }
        if (text === 2) {
          return <Tag color={'green'}>二级菜单</Tag>;
        }
        return <Tag color={'red'}>菜单错误</Tag>;
      },
    },
    {
      title: '父菜单',
      align: 'center',
      dataIndex: 'parentId',
      search: false,
      render: (text: any) => {
        let desc = '';
        allMenus.forEach((menu) => {
          if (text === menu.id) {
            desc = menu.menuName;
          }
        });
        if (desc === '') {
          return <Tag color={'red'} />;
        }
        return <Tag color={'green'}>{desc}</Tag>;
      },
    },
    {
      title: '图标',
      align: 'center',
      dataIndex: 'menuIcon',
      search: false,
      render: (text: any) => {
        return React.createElement(Icon[text]);
      },
    },
    {
      title: '名称',
      align: 'center',
      dataIndex: 'menuName',
    },
    {
      title: '描述',
      align: 'left',
      dataIndex: 'menuDescript',
    },
    {
      title: '显示顺序',
      align: 'center',
      dataIndex: 'sortId',
      search: false,
    },
    {
      title: '路径',
      align: 'left',
      dataIndex: 'menuPath',
      render: (text: any) => {
        return <Tag color={'green'}>{text}</Tag>;
      },
    },
    {
      title: '国际化',
      align: 'left',
      dataIndex: 'menuComponent',
      search: false,
      render: (text: any) => {
        if (text === '-') {
          return <Tag color={'red'}></Tag>;
        }
        return <Tag color={'green'}>{text}</Tag>;
      },
    },
    {
      title: '启用',
      align: 'center',
      dataIndex: 'enabled',
      search: false,
      render: (text: any, record, index) => {
        return (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="启用"
            checked={text}
            onChange={(check) => {
              handleMenuEnabledStateChange(check, record, index);
            }}
            disabled={!access['UPDATE_MENU']}
          />
        );
      },
    },
    {
      title: '操作',
      align: 'center',
      render: (text: any, record) => {
        return (
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setEditMenuModalVisible(true);
                setCurrentEditMenu(record);
              }}
              disabled={!access['UPDATE_MENU']}
            >
              编辑
            </Button>
            <Button
              type="primary"
              danger={true}
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDeleteMenu(record);
              }}
              disabled={!access['DELETE_MENU']}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  // 批量删除用户
  const handleDeleteMenus = () => {
    const ids: (string | number | undefined)[] = [];
    const values = currentSelectedRowKeys.values();
    let i = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const value of values) {
      // eslint-disable-next-line no-plusplus
      ids[i++] = value;
    }
    deleteMenus(ids)
      .then((response) => {
        if (response.status === 204) {
          message.success('批量删除菜单成功!').then(() => {});
          // 修改本地状态
          // const data = [...users];
          // data[index] = user;
          // setUsers(data);
          setCurrentSelectedRowKeys([]);
          handleGetMenus({ current: currentPage.current, pageSize: sizePerPage.current });
        } else {
          message.error(`批量删除菜单失败: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`批量删除菜单失败: ${e}`).then(() => {});
      });
  };

  // 处理分页请求
  const handlePagination = (page: number, pageSize: number | undefined) => {
    const menuName = ref.current!.getFieldValue('menuName');
    const menuDescript = ref.current!.getFieldValue('menuDescript');
    const menuPath = ref.current!.getFieldValue('menuPath');
    const params = {};
    if (menuName) {
      params['menuName'] = menuName;
    }
    if (menuDescript) {
      params['menuDescript'] = menuDescript;
    }
    if (menuPath) {
      params['menuPath'] = menuPath;
    }
    currentPage.current = page;
    sizePerPage.current = pageSize;
    // 根据条件获取数据
    handleGetMenus({
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
      {addMenuModalVisible && (
        <AddMenuForm
          onCancel={() => setAddMenuModalVisible(false)}
          modalVisible={addMenuModalVisible}
        />
      )}
      {editMenuModalVisible && (
        <EditMenuForm
          onCancel={() => setEditMenuModalVisible(false)}
          modalVisible={editMenuModalVisible}
          currentEditMenu={currentEditMenu!}
        />
      )}
      {/* ProTable支持Antd Table所有的API, 并且新增了一些API */}
      {/* 默认情况下, request并不会发送请求, */}
      <ProTable
        rowKey={'id'}
        columns={columns}
        dataSource={menus}
        // 表单引用
        formRef={ref}
        // 工具栏
        toolBarRender={() => [
          <Button
            key="new"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setAddMenuModalVisible(true);
            }}
            disabled={!access['CREATE_MENU']}
          >
            新建
          </Button>,
          <Button
            key="delete"
            icon={<MinusOutlined />}
            type="primary"
            danger={true}
            onClick={() => {
              handleDeleteMenus();
            }}
            disabled={!access['DELETE_MENUS']}
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
          handleGetMenus({
            // current: currentPage.current,
            pageSize: sizePerPage.current,
            ...params,
          });
        }}
        // 重置表单(点击"重置")事件处理
        onReset={() => {
          handleGetMenus({
            // current: currentPage.current,
            pageSize: sizePerPage.current,
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
      />
    </PageContainer>
  );
};
