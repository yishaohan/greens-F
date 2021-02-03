import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Space, Switch, Upload } from 'antd';
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
import AddRoleForm from '@/pages/admin/userManagement/components/addRoleForm';
import EditRoleForm from '@/pages/admin/userManagement/components/editRoleForm';

export default (): React.ReactNode => {
  const intl = useIntl();

  // 全局变量
  const currentPage = useRef(1);
  const sizePerPage = useRef<number | undefined>(5);

  // 获取表单的ref
  const ref = useRef<FormInstance>();

  // 双向数据绑定(响应式数据)
  const [roles, setRoles] = useState<API.RoleListItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentSelectedRowKeys, setCurrentSelectedRowKeys] = useState<React.ReactText[]>([]);
  const [addRoleModalVisible, setAddRoleModalVisible] = useState<boolean>(false);
  const [editRoleModalVisible, setEditRoleModalVisible] = useState<boolean>(false);
  const [currentEditRole, setCurrentEditRole] = useState<API.RoleListItem>();

  // 根据页码和搜索参数获取用户
  const handleRoles = (params: API.RoleSearchParams) => {
    getRoles(params)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('出错了!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
        return response.data;
      })
      .then((data) => {
        setRoles(data.content);
        setTotal(data.totalElements);
      })
      .catch((e) => {
        message.error(`获取用户信息出错!${e}`).then(() => {});
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
          handleRoles({ current: currentPage.current, pageSize: sizePerPage.current });
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
          handleRoles({ current: currentPage.current, pageSize: sizePerPage.current });
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
      align: 'center',
      title: 'ID',
      search: false,
      dataIndex: 'id',
    },
    {
      align: 'center',
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      align: 'center',
      title: '角色描述',
      dataIndex: 'roleDescript',
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
              handleRoleEnabledStateChange(check, record, index);
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
                setEditRoleModalVisible(true);
                setCurrentEditRole(record);
              }}
            >
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
                handleDeleteRole(record);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  // 生命周期钩子, 页面加载时, 自动触发获取角色列表
  useEffect(() => {
    handleRoles({ current: currentPage.current, pageSize: sizePerPage.current });
  }, []);

  // 新建角色弹窗 | 编辑角色弹窗, 关闭或新建时触发
  useEffect(() => {
    handleRoles({ current: currentPage.current, pageSize: sizePerPage.current });
  }, [addRoleModalVisible, editRoleModalVisible]);

  // 处理分页请求
  const handlePagination = (page: number, pageSize: number | undefined) => {
    const roleName = ref.current!.getFieldValue('roleName');
    const roleDescript = ref.current!.getFieldValue('roleDescript');
    const params = {};
    if (roleName) {
      params['roleName'] = roleName;
    }
    if (roleDescript) {
      params['roleDescript'] = roleDescript;
    }
    currentPage.current = page;
    sizePerPage.current = pageSize;
    // 根据条件获取数据
    handleRoles({
      current: currentPage.current,
      pageSize: sizePerPage.current,
      ...params,
    });
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
                handleRoles({});
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
              exportRoles().then(() => {});
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
          handleRoles({
            // current: currentPage.current,
            // pageSize: sizePerPage.current,
            ...params,
          });
        }}
        // 重置表单(点击"重置")事件处理
        onReset={() => {
          handleRoles({
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
      ></ProTable>
    </PageContainer>
  );
};
