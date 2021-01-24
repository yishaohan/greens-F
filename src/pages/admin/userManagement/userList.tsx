import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getUsers } from './services/userList';
import { Switch, Avatar, Space, Button } from 'antd';
import {
  PlusOutlined,
  MinusOutlined,
  ExportOutlined,
  ImportOutlined,
  EditOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

export default (): React.ReactNode => {
  const columns = [
    {
      align: 'center',
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
      render: (text: any) => {
        return <Switch checkedChildren="启用" unCheckedChildren="禁用" checked={text} />;
      },
    },
    {
      align: 'center',
      title: '锁定',
      dataIndex: 'locked',
      search: false,
      render: (text: any) => {
        return <Switch checkedChildren="是" unCheckedChildren="否" checked={text} />;
      },
    },
    {
      align: 'center',
      title: '操作',
      render: () => {
        return (
          <Space>
            <Button type="primary" icon={<EditOutlined />}>
              编辑
            </Button>
            <Button type="primary" icon={<SettingOutlined />}>
              设置
            </Button>
            <Button type="primary" danger={true} icon={<DeleteOutlined />}>
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
        pagination={{
          pageSize: 6,
        }}
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
        // request={async (params, sort, filter)
        request={async (params) => {
          const result = await getUsers({
            current: params.current,
            pageSize: params.pageSize,
          });
          console.log(result);
          return {
            data: result.data.content, // 需要渲染的数据
            success: true, // 获取数据是否成功
            total: result.data.totalElements, // 总共有多少行数据,以便分页
          };
        }}
      ></ProTable>
    </PageContainer>
  );
};
