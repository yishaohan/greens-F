import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Space, Switch, Upload, Row, Col, Tag } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  ImportOutlined,
  MinusOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { FormInstance } from 'antd/lib/form';
import {
  getRoles,
  updateRole,
  deleteRole,
  deleteRoles,
  importRoles,
  exportRoles,
} from './services/roleList';
import AddRoleForm from './components/addRoleForm';
import EditRoleForm from './components/editRoleForm';
import EditRoleAuthForm from './components/editRoleAuthForm';
import EditRoleMenuForm from './components/editRoleMenuForm';
import { generatorAuthTree } from '@/utils/utils';
import { generatorMenuTree } from '@/utils/utils';
import { useAccess } from 'umi';
import Style from './roleList.less';

export default (): React.ReactNode => {
  const intl = useIntl();

  // 全局变量
  const currentPage = useRef(1);
  const sizePerPage = useRef<number | undefined>(5);
  const access = useAccess();

  // 获取表单的ref
  const ref = useRef<FormInstance>();

  // 双向数据绑定(响应式数据)
  const [roles, setRoles] = useState<API.RoleListItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentSelectedRowKeys, setCurrentSelectedRowKeys] = useState<React.ReactText[]>([]);
  const [addRoleModalVisible, setAddRoleModalVisible] = useState<boolean>(false);
  const [editRoleModalVisible, setEditRoleModalVisible] = useState<boolean>(false);
  const [editRoleAuthsModalVisible, setEditRoleAuthsModalVisible] = useState<boolean>(false);
  const [editRoleMenusModalVisible, setEditRoleMenusModalVisible] = useState<boolean>(false);
  const [currentEditRole, setCurrentEditRole] = useState<API.RoleListItem>();

  // 根据页码和搜索参数获取用户
  const handleGetRoles = (params: API.RoleSearchParams) => {
    getRoles(params)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getRoles - ${response.status}`);
          throw new Error(`Error: getRoles - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setRoles(data.content);
        setTotal(data.totalElements);
      })
      .catch((e) => {
        console.log(`获取角色信息出错 - ${e}`);
        message.error(`获取角色信息出错!${e}`).then(() => {});
      });
  };

  // 更新角色信息
  const handleUpdateRole = (role: API.RoleListItem, index: number) => {
    // 修改服务器中的状态
    updateRole(role)
      .then((response) => {
        if (response.status === 201) {
          message.success('更新角色状态成功!').then(() => {});
          // 修改本地状态
          const data = [...roles];
          data[index] = role;
          setRoles(data);
        } else {
          message.error(`更新角色状态失败: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`更新角色状态失败: ${e}`).then(() => {});
      });
  };

  // 更新角色[enabled]属性
  const handleRoleEnabledStateChange = (check: boolean, role: API.RoleListItem, index: number) => {
    // eslint-disable-next-line no-param-reassign
    role.enabled = check;
    handleUpdateRole(role, index);
  };

  // 删除单个角色
  const handleDeleteRole = (role: API.RoleListItem) => {
    deleteRole(role)
      .then((response) => {
        if (response.status === 204) {
          intl.formatMessage({ id: 'xxx' });
          message.success('删除角色成功!').then(() => {});
          handleGetRoles({ current: currentPage.current, pageSize: sizePerPage.current });
        } else {
          message.error(`删除角色失败-1: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`删除角色失败-2: ${e}`).then(() => {});
      });
  };

  // 批量删除角色
  const handleDeleteRoles = () => {
    const ids: (string | number | undefined)[] = [];
    const values = currentSelectedRowKeys.values();
    let i = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const value of values) {
      // eslint-disable-next-line no-plusplus
      ids[i++] = value;
    }
    deleteRoles(ids)
      .then((response) => {
        if (response.status === 204) {
          message.success('批量删除角色成功!').then(() => {});
          setCurrentSelectedRowKeys([]);
          handleGetRoles({ current: currentPage.current, pageSize: sizePerPage.current });
        } else {
          message.error(`批量删除角色失败: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`批量删除角色失败: ${e}`).then(() => {});
      });
  };

  // 定义界面上ProTable的列信息
  const columns: ProColumns<API.RoleListItem>[] = [
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
      title: '名称',
      align: 'center',
      dataIndex: 'roleName',
    },
    {
      title: '描述',
      align: 'center',
      dataIndex: 'roleDescript',
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
              handleRoleEnabledStateChange(check, record, index);
            }}
            disabled={!access.UPDATE_ROLE}
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
                setEditRoleModalVisible(true);
                setCurrentEditRole(record);
              }}
              disabled={!access.UPDATE_ROLE}
            >
              编辑
            </Button>
            <Button
              type="primary"
              icon={<SettingOutlined />}
              onClick={() => {
                setEditRoleAuthsModalVisible(true);
                setCurrentEditRole(record);
              }}
              disabled={!access.ADD_ROLE_AUTHS || !access.DELETE_ROLE_AUTHS}
            >
              权限
            </Button>
            <Button
              type="primary"
              icon={<SettingOutlined />}
              onClick={() => {
                setEditRoleMenusModalVisible(true);
                setCurrentEditRole(record);
              }}
              disabled={!access.ADD_ROLE_MENUS || !access.DELETE_ROLE_MENUS}
            >
              菜单
            </Button>
            <Button
              type="primary"
              danger={true}
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDeleteRole(record);
              }}
              disabled={!access.DELETE_ROLE}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  // 生命周期钩子, 页面加载时, 自动触发获取角色列表
  // useEffect(() => {
  //   handleGetRoles({ current: currentPage.current, pageSize: sizePerPage.current });
  // }, []);

  // 新建角色弹窗 | 编辑角色弹窗, 关闭或新建时触发
  useEffect(() => {
    handleGetRoles({ current: currentPage.current, pageSize: sizePerPage.current });
  }, [
    addRoleModalVisible,
    editRoleModalVisible,
    editRoleAuthsModalVisible,
    editRoleMenusModalVisible,
  ]);

  // 处理分页请求
  const handlePagination = (page: number, pageSize: number | undefined) => {
    const roleName = ref.current!.getFieldValue('roleName');
    const roleDescript = ref.current!.getFieldValue('roleDescript');
    const params = {};
    if (roleName) {
      params.roleName = roleName;
    }
    if (roleDescript) {
      params.roleDescript = roleDescript;
    }
    currentPage.current = page;
    sizePerPage.current = pageSize;
    // 根据条件获取数据
    handleGetRoles({
      current: currentPage.current,
      pageSize: sizePerPage.current,
      ...params,
    });
  };

  // 处理表格展开渲染
  const expandedRowRender = (record: API.RoleListItem) => {
    return (
      <>
        {record.auths && record.auths.length !== 0 && (
          <Row className={Style.normal} align={'middle'}>
            <Col span={6} style={{ textAlign: 'center' }}>
              <Tag color="orange" style={{ width: '120px' }}>
                权限
              </Tag>
            </Col>
            <Col span={18}>
              {generatorAuthTree(record.auths).map((auth, index) => {
                return (
                  <Row
                    key={index}
                    className={index === 0 ? Style.special : Style.normal}
                    align={'middle'}
                  >
                    <Col span={6} style={{ textAlign: 'center' }}>
                      <Tag color="orange" style={{ width: '120px' }}>
                        {auth.authDescript}
                      </Tag>
                    </Col>
                    <Col span={18}>
                      {auth.children &&
                        auth.children.length !== 0 &&
                        auth.children.map((children) => {
                          return (
                            <Tag
                              key={`authDescript${children.id}`}
                              color="green"
                              style={{ textAlign: 'center', minWidth: '120px' }}
                            >
                              {children.authDescript}
                            </Tag>
                          );
                        })}
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        )}
        {record.menus && record.menus.length !== 0 && (
          <Row className={Style.normal} align={'middle'} style={{ borderBottom: '1px solid #ccc' }}>
            <Col span={6} style={{ textAlign: 'center' }}>
              <Tag color="orange" style={{ width: '120px' }}>
                菜单
              </Tag>
            </Col>
            <Col span={18}>
              {generatorMenuTree(record.menus).map((menu, index) => {
                return (
                  <Row
                    key={index}
                    className={index === 0 ? Style.special : Style.normal}
                    align={'middle'}
                  >
                    <Col span={6} style={{ textAlign: 'center' }}>
                      <Tag color="orange" style={{ width: '120px' }}>
                        {menu.menuName}
                      </Tag>
                    </Col>
                    <Col span={18}>
                      {menu.children &&
                        menu.children.length !== 0 &&
                        menu.children.map((children) => {
                          return (
                            <Tag
                              key={`menuDescript${children.id}`}
                              color="green"
                              style={{ textAlign: 'center', minWidth: '120px' }}
                            >
                              {children.menuName}
                            </Tag>
                          );
                        })}
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        )}
      </>
    );
  };

  return (
    <PageContainer>
      {addRoleModalVisible && (
        <AddRoleForm
          onCancel={() => setAddRoleModalVisible(false)}
          modalVisible={addRoleModalVisible}
        />
      )}
      {editRoleModalVisible && (
        <EditRoleForm
          onCancel={() => setEditRoleModalVisible(false)}
          modalVisible={editRoleModalVisible}
          currentEditRole={currentEditRole!}
        />
      )}
      {editRoleAuthsModalVisible && (
        <EditRoleAuthForm
          onCancel={() => {
            setEditRoleAuthsModalVisible(false);
          }}
          modalVisible={editRoleAuthsModalVisible}
          currentEditRole={currentEditRole!}
        />
      )}
      {editRoleMenusModalVisible && (
        <EditRoleMenuForm
          onCancel={() => {
            setEditRoleMenusModalVisible(false);
          }}
          modalVisible={editRoleMenusModalVisible}
          currentEditRole={currentEditRole!}
        />
      )}
      <ProTable
        rowKey={'id'}
        columns={columns}
        dataSource={roles}
        // 表单引用
        formRef={ref}
        // 工具栏
        toolBarRender={() => [
          <Button
            key="new"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setAddRoleModalVisible(true);
            }}
            disabled={!access.CREATE_ROLE}
          >
            新建
          </Button>,
          <Button
            key="delete"
            icon={<MinusOutlined />}
            type="primary"
            danger={true}
            onClick={() => {
              handleDeleteRoles();
            }}
            disabled={!access.DELETE_ROLES}
          >
            删除
          </Button>,
          <Upload
            key="upload"
            name="file"
            accept=".xls, .xlsx"
            showUploadList={false}
            action={importRoles()}
            onChange={(info: UploadChangeParam) => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully!`).then();
                currentPage.current = 1;
                handleGetRoles({});
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed!`).then();
              }
            }}
          >
            <Button
              key="import"
              icon={<ImportOutlined />}
              type="primary"
              disabled={!access.IMPORT_ROLES}
            >
              导入
            </Button>
          </Upload>,
          <Button
            key="export"
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => {
              exportRoles().then(() => {});
            }}
            disabled={!access.EXPORT_ROLES}
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
          handleGetRoles({
            // current: currentPage.current,
            pageSize: sizePerPage.current,
            ...params,
          });
        }}
        // 重置表单(点击"重置")事件处理
        onReset={() => {
          handleGetRoles({
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
        expandable={{
          expandedRowRender: (record) => {
            return expandedRowRender(record);
          },
          rowExpandable: () => {
            return true;
          },
        }}
      />
    </PageContainer>
  );
};
