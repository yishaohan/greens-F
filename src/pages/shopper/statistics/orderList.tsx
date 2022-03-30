// 定义函数式组件
import React, { useEffect, useRef, useState } from 'react';
import type { FormInstance } from 'antd/lib/form';
import { message, Switch, Tag, Row, Col } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getOrders, updateOrder } from './services/statisics';
import ProDescriptions from '@ant-design/pro-descriptions';

const OrderList: React.FC = () => {
  // 全局变量
  const currentPage = useRef(1);
  const sizePerPage = useRef<number | undefined>(10);

  // 获取表单的ref
  const ref = useRef<FormInstance>();

  // 双向数据绑定(响应式数据)
  const [orders, setOrders] = useState<API.OrderListItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentSelectedRowKeys, setCurrentSelectedRowKeys] = useState<React.ReactText[]>([]);
  // const [currentEditOrder, setCurrentEditOrder] = useState<API.OrderListItem>();

  // 根据页码和搜索参数获取菜单
  const handleGetOrders = (params: API.OrderListItemSearchParams) => {
    getOrders(params)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getOrders - ${response.status}`);
          throw new Error(`Error: getOrders - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setOrders(data.content);
        setTotal(data.totalElements);
      })
      .catch((e) => {
        console.log(`receiving order error - ${e}`);
        message.error(`receiving order error!${e}`).then(() => {});
      });
  };

  useEffect(() => {
    handleGetOrders({ current: currentPage.current, pageSize: sizePerPage.current });
  }, []);

  // 更新菜单信息
  const handleUpdateOrder = (order: API.OrderListItem, index: number) => {
    // 修改服务器中的状态
    updateOrder(order)
      .then((response) => {
        if (response.status === 201) {
          message.success('update order success!').then(() => {});
          // 修改本地状态
          const data = [...orders];
          data[index] = order;
          setOrders(data);
        } else {
          message.error(`update order error: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`update order error: ${e}`).then(() => {});
      });
  };

  // 更新订单[status]属性
  const handleOrderStateChange = (check: boolean, order: API.OrderListItem, index: number) => {
    // eslint-disable-next-line no-param-reassign
    order.status = check;
    handleUpdateOrder(order, index);
  };

  // 定义界面上ProTable的列信息
  const columns: ProColumns<API.OrderListItem>[] = [
    {
      title: 'Index',
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
      title: 'Name',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: 'Phone',
      align: 'center',
      dataIndex: 'telePhone',
    },
    {
      title: 'email',
      align: 'center',
      dataIndex: 'email',
    },
    {
      title: 'shipped',
      align: 'center',
      dataIndex: 'status',
      search: false,
      render: (text: any, record, index) => {
        return (
          <Switch
            checkedChildren="true"
            unCheckedChildren="false"
            checked={text}
            onChange={(check) => {
              handleOrderStateChange(check, record, index);
            }}
          />
        );
      },
    },
    {
      title: 'quantity1',
      align: 'center',
      dataIndex: 'clientQuantity1',
      search: false,
    },
    /*{
      title: 'items',
      align: 'center',
      dataIndex: '', // item1 - item6
      search: false,
      render: (text: any, record) => {
        return (
          <>
            {
              [
                ...Array(record.item1_1),
              ].map((value: undefined, index: number) => (
                <Tag color={'green'} key={index+1} style={{ textAlign: 'center', minWidth: '100px' }}>
                  basil
                </Tag>
              ))
            }
            {
              [
                ...Array(record.item1_2),
              ].map((value: undefined, index: number) => (
                <Tag color={'green'} key={index+1} style={{ textAlign: 'center', minWidth: '100px' }}>
                  parsley
                </Tag>
              ))
            }
            {
              [
                ...Array(record.item1_3),
              ].map((value: undefined, index: number) => (
                <Tag color={'green'} key={index+1} style={{ textAlign: 'center', minWidth: '100px' }}>
                  mint
                </Tag>
              ))
            }
            {
              [
                ...Array(record.item1_4),
              ].map((value: undefined, index: number) => (
                <Tag color={'green'} key={index+1} style={{ textAlign: 'center', minWidth: '100px' }}>
                  rosemary
                </Tag>
              ))
            }
          </>
        );
      },
    },*/
    {
      title: 'quantity2',
      align: 'center',
      dataIndex: 'clientQuantity2',
      search: false
    },
    /*{
      title: 'items',
      align: 'center',
      dataIndex: '', // item1 - item6
      search: false,
      render: (text: any, record) => {
        return (
          <>
            {
              [
                ...Array(record.item2_1),
              ].map((value: undefined, index: number) => (
                <Tag color={'green'} key={index+1} style={{ textAlign: 'center', minWidth: '100px' }}>
                  nantes carrot
                </Tag>
              ))
            }
            {
              [
                ...Array(record.item2_2),
              ].map((value: undefined, index: number) => (
                <Tag color={'green'} key={index+1} style={{ textAlign: 'center', minWidth: '100px' }}>
                  red radish
                </Tag>
              ))
            }
            {
              [
                ...Array(record.item2_3),
              ].map((value: undefined, index: number) => (
                <Tag color={'green'} key={index+1} style={{ textAlign: 'center', minWidth: '100px' }}>
                  lettuce
                </Tag>
              ))
            }
          </>
        );
      },
    },*/
    {
      title: 'create Date',
      align: 'center',
      dataIndex: 'createDateTime',
      search: false,
    },
    {
      title: 'remark',
      align: 'center',
      dataIndex: 'remark',
      search: false,
    },
    {
      title: 'postcode',
      align: 'center',
      dataIndex: 'postcode',
      search: false,
    },
    {
      title: 'address',
      align: 'right',
      dataIndex: 'address',
      search: false,
    },
    // {
    //   title: 'order ID',
    //   align: 'center',
    //   dataIndex: 'orderID',
    // },
    // {
    //   title: 'amount',
    //   align: 'center',
    //   dataIndex: 'amountValue',
    //   search: false,
    // },
    // {
    //   title: 'payer name',
    //   align: 'center',
    //   dataIndex: '',
    //   search: false,
    // },
    // {
    //   title: 'payer phone',
    //   align: 'center',
    //   dataIndex: 'payerPhoneNumber',
    //   search: false,
    // },
    // {
    //   title: 'payer email',
    //   align: 'center',
    //   dataIndex: 'payerEmail',
    //   search: false,
    // },
    // {
    //   title: 'payer postcode',
    //   align: 'center',
    //   dataIndex: 'payerPostalCode',
    //   search: false,
    // },
    // {
    //   title: 'payer admin area',
    //   align: 'center',
    //   dataIndex: '',
    //   search: false,
    // },
    // {
    //   title: 'payer address',
    //   align: 'center',
    //   dataIndex: '',
    //   search: false,
    // },
    // {
    //   title: 'payee email',
    //   align: 'center',
    //   dataIndex: 'payeeEmail',
    //   search: false,
    // },
  ];

  // 处理分页请求
  const handlePagination = (page: number, pageSize: number | undefined) => {
    const name = ref.current!.getFieldValue('name');
    const telePhone = ref.current!.getFieldValue('telePhone');
    const email = ref.current!.getFieldValue('email');
    const status = ref.current!.getFieldValue('status');
    const orderId = ref.current!.getFieldValue('orderId');
    const params = {
      name: undefined,
      telePhone: undefined,
      email: undefined,
      status: undefined,
      orderId: undefined,
    };
    if (name) {
      params.name = name;
    }
    if (telePhone) {
      params.telePhone = telePhone;
    }
    if (email) {
      params.email = email;
    }
    if (status) {
      params.status = status;
    }
    if (orderId) {
      params.orderId = orderId;
    }
    currentPage.current = page;
    sizePerPage.current = pageSize;
    // 根据条件获取数据
    handleGetOrders({
      current: currentPage.current,
      pageSize: sizePerPage.current,
      ...params,
    });
  };

  // 处理表格展开渲染
  const expandedRowRender = (record: API.OrderListItem) => {
    return (
      <>
        <Row>
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <ProDescriptions column={1} title={'order detail'} size={'small'}>
              <ProDescriptions.Item label="ID">{record.orderID}</ProDescriptions.Item>
              <ProDescriptions.Item label="kit1_number">
                <Tag color={'green'} style={{ textAlign: 'center', minWidth: '100px' }}>
                  {record.clientQuantity1}
                </Tag>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="kit2_number">
                <Tag color={'green'} style={{ textAlign: 'center', minWidth: '100px' }}>
                  {record.clientQuantity2}
                </Tag>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="amount">
                <Tag color={'green'} style={{ textAlign: 'center', minWidth: '100px' }}>
                  {record.amountValue} $
                </Tag>
              </ProDescriptions.Item>
            </ProDescriptions>
          </Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <ProDescriptions column={1} title={'payer info'} size={'small'}>
              <ProDescriptions.Item label="name">
                {/* { */}
                {/*  record.payerFullName && record.payerFullName */}
                {/* } */}
                {record.payerGivenName !== 'unknown' && `${record.payerGivenName}, `}
                {record.payerSurname !== 'unknown' && record.payerSurname}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="phone">
                {record.payerPhoneNumber !== 'unknown' && record.payerPhoneNumber}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="email">
                {record.payerEmail !== 'unknown' && record.payerEmail}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="area">
                {record.payerAdminArea1 !== 'unknown' && `${record.payerAdminArea1}, `}
                {record.payerAdminArea2 !== 'unknown' && `${record.payerAdminArea2}, `}
                {record.payerAdminArea3 !== 'unknown' && `${record.payerAdminArea3}, `}
                {record.payerAdminArea4 !== 'unknown' && record.payerAdminArea4}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="address">
                {record.payerAddressLine1 !== 'unknown' && `${record.payerAddressLine1}, `}
                {record.payerAddressLine2 !== 'unknown' && `${record.payerAddressLine2}, `}
                {record.payerAddressLine3 !== 'unknown' && `${record.payerAddressLine3}, `}
              </ProDescriptions.Item>
            </ProDescriptions>
          </Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <ProDescriptions column={1} title={'herb kit detail'} size={'small'}>
              {/*<ProDescriptions.Item label="kit1_number">*/}
              {/*  <Tag color={'green'} style={{ textAlign: 'center', minWidth: '100px' }}>*/}
              {/*    {record.clientQuantity1}*/}
              {/*  </Tag>*/}
              {/*</ProDescriptions.Item>*/}
              <>
                {
                  [
                    ...Array(record.item1_1),
                  ].map((value: undefined, index: number) => (
                    // <ProDescriptions.Item key={index + 1}>
                      <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                        basil
                      </Tag>
                    // </ProDescriptions.Item>
                  ))
                }
                {
                  [
                    ...Array(record.item1_2),
                  ].map((value: undefined, index: number) => (
                    // <ProDescriptions.Item key={index + 1}>
                      <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                        parsley
                      </Tag>
                    // </ProDescriptions.Item>
                  ))
                }
                {
                  [
                    ...Array(record.item1_3),
                  ].map((value: undefined, index: number) => (
                    // <ProDescriptions.Item key={index + 1}>
                      <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                        mint
                      </Tag>
                    // </ProDescriptions.Item>
                  ))
                }
                {
                  [
                    ...Array(record.item1_4),
                  ].map((value: undefined, index: number) => (
                    // <ProDescriptions.Item key={index + 1}>
                      <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                        thyme
                      </Tag>
                    // </ProDescriptions.Item>
                  ))
                }
                {
                  [
                    ...Array(record.item1_5),
                  ].map((value: undefined, index: number) => (
                    // <ProDescriptions.Item key={index + 1}>
                    <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                      cilantro
                    </Tag>
                    // </ProDescriptions.Item>
                  ))
                }
                {
                  [
                    ...Array(record.item1_6),
                  ].map((value: undefined, index: number) => (
                    // <ProDescriptions.Item key={index + 1}>
                    <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                      green onion
                    </Tag>
                    // </ProDescriptions.Item>
                  ))
                }
              </>
            </ProDescriptions>
          </Col>
          {console.log(record)}
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <ProDescriptions column={1} title={'crunchy kit detail'} size={'small'}>
              <>
                {
                  [
                    ...Array(record.item2_1),
                  ].map((value: undefined, index: number) => (
                    <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                      nantes carrot
                    </Tag>
                  ))
                }
                {
                  [
                    ...Array(record.item2_2),
                  ].map((value: undefined, index: number) => (
                    <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                      red radish
                    </Tag>
                  ))
                }
                {
                  [
                    ...Array(record.item2_3),
                  ].map((value: undefined, index: number) => (
                    <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                      butter lettuce
                    </Tag>
                  ))
                }
                {
                  [
                    ...Array(record.item2_4),
                  ].map((value: undefined, index: number) => (
                    <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                      iceberg lettuce
                    </Tag>
                  ))
                }
                {
                  [
                    ...Array(record.item2_5),
                  ].map((value: undefined, index: number) => (
                    <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                      gourmet lettuce
                    </Tag>
                  ))
                }
                {
                  [
                    ...Array(record.item2_6),
                  ].map((value: undefined, index: number) => (
                    <Tag color={'green'} key={index + 1} style={{ textAlign: 'center', minWidth: '100px' }}>
                      red leaf lettuce
                    </Tag>
                  ))
                }
              </>
            </ProDescriptions>
          </Col>
        </Row>
      </>
    );
  };
  // 组件的界面定义
  return (
    <PageContainer>
      <ProTable
        rowKey={'id'}
        columns={columns}
        dataSource={orders}
        // 表单引用
        formRef={ref}
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
          handleGetOrders({
            // current: currentPage.current,
            pageSize: sizePerPage.current,
            ...params,
          });
        }}
        // 重置表单(点击"重置")事件处理
        onReset={() => {
          handleGetOrders({
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
export default OrderList;
