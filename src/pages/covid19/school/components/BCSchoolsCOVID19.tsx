// import {InfoCircleOutlined} from '@ant-design/icons';
// import {Card, Col, Row, Table, Tooltip} from 'antd';
// import numeral from 'numeral';
// import {VisitDataType} from '../data.d';
// import {MiniArea} from './Charts1';
// import NumberInfo from './NumberInfo';
// import Trend from './Trend';
// import styles from '../style.less';
import { FormattedMessage } from 'umi';
import React, { useEffect, useRef, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { Badge, message, Tag } from 'antd';
import { getBCSchoolsCOVID19 } from '../services/schoolsDashBoard';
import { FormInstance } from 'antd/lib/form';

const columns: ProColumns<API.BCSchoolsCOVID19ListItem>[] = [
  {
    title: <FormattedMessage id="bc-schools-covid19.table.index" defaultMessage="Index" />,
    align: 'right',
    dataIndex: 'index',
    valueType: 'index',
    key: 'index',
    search: false,
    width: 48,
  },
  {
    title: (
      <FormattedMessage id="bc-schools-covid19.table.school-name" defaultMessage="School Name" />
    ),
    align: 'right',
    dataIndex: 'schoolName',
    key: 'schoolName',
    copyable: true,
    width: 180,
    render(text: any, record: API.BCSchoolsCOVID19ListItem) {
      const url = `/info/schools/${record.schoolId}`;
      return <a href={url}>{text}</a>;
    },
  },
  {
    title: (
      <FormattedMessage
        id="bc-schools-covid19.table.notification-date"
        defaultMessage="Notification Date"
      />
    ),
    align: 'center',
    dataIndex: 'notificationDate',
    key: 'notificationDate',
    width: 100,
  },
  {
    title: (
      <FormattedMessage
        id="bc-schools-covid19.table.exposure-number"
        defaultMessage="Exposure Number"
      />
    ),
    align: 'center',
    dataIndex: 'exposureNumber',
    key: 'exposureNumber',
    valueType: 'digit',
    width: 75,
    search: false,
    sorter: (a: { exposureNumber: number }, b: { exposureNumber: number }) =>
      a.exposureNumber - b.exposureNumber,
    render(text: any, record: API.BCSchoolsCOVID19ListItem) {
      if (record.exposureNumber <= 3) {
        return <Badge status={'warning'} text={text} />;
      }
      return <Badge status={'error'} text={text} />;
    },
  },
  {
    title: (
      <FormattedMessage
        id="bc-schools-covid19.table.exposure-date"
        defaultMessage="Exposure Date"
      />
    ),
    align: 'left',
    dataIndex: 'exposureDate',
    key: 'exposureDate',
    width: 180,
    ellipsis: true,
    search: false,
  },
  {
    title: (
      <FormattedMessage
        id="bc-schools-covid19.table.district-name"
        defaultMessage="District Name"
      />
    ),
    align: 'right',
    dataIndex: 'districtAbb',
    key: 'districtAbb',
    // sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    // className: styles.alignRight,
    width: 180,
    render(text: any, record: API.BCSchoolsCOVID19ListItem) {
      return (
        <a href={record.districtId} title={record.districtName}>
          {record.districtAbb}
        </a>
      );
    },
  },
  {
    title: (
      <FormattedMessage
        id="bc-schools-covid19.table.notification-method"
        defaultMessage="Notification Method"
      />
    ),
    align: 'center',
    dataIndex: 'notificationMethod',
    key: 'notificationMethod',
    width: 120,
    ellipsis: true,
    render(text) {
      return (
        <Tag color="green" style={{ width: '120px' }}>
          {text}
        </Tag>
      );
    },
  },
  {
    title: (
      <FormattedMessage
        id="bc-schools-covid19.table.documentation"
        defaultMessage="Documentation"
      />
    ),
    align: 'center',
    dataIndex: 'documentation',
    key: 'documentation',
    search: false,
    width: 80,
    render(text: any, record: API.BCSchoolsCOVID19ListItem) {
      return <a href={record.documentation}>{record.id}</a>;
    },
  },
  {
    title: (
      <FormattedMessage id="bc-schools-covid19.table.extra-info" defaultMessage="Extra Info" />
    ),
    align: 'left',
    dataIndex: 'extraInfo',
    key: 'extraInfo',
    search: false,
    width: 180,
    ellipsis: true,
  },
  {
    title: (
      <FormattedMessage
        id="bc-schools-covid19.table.health-region-name"
        defaultMessage="Health Region"
      />
    ),
    align: 'right',
    dataIndex: 'healthRegionName',
    key: 'healthRegionName',
    copyable: true,
    width: 180,
    filters: true,
    onFilter: true,
    valueEnum: {
      'Fraser Health Authority': {
        text: 'Fraser Health Authority',
      },
      'Interior Health Authority': {
        text: 'Interior Health Authority',
      },
      'Northern Health': {
        text: 'Northern Health',
      },
      'Vancouver Coastal Health': {
        text: 'Vancouver Coastal Health',
      },
      'Vancouver Island Health': {
        text: 'Vancouver Island Health',
      },
      unknown: {
        text: 'unknown',
      },
    },
    render(text: any, record: API.BCSchoolsCOVID19ListItem) {
      return <a href={record.healthId}>{text}</a>;
    },
  },
  {
    title: <FormattedMessage id="bc-schools-covid19.table.city-name" defaultMessage="City Name" />,
    align: 'right',
    dataIndex: 'cityName',
    key: 'cityName',
    copyable: true,
    width: 120,
    render(text: any, record: API.BCSchoolsCOVID19ListItem) {
      return <a href={record.cityId}>{text}</a>;
    },
  },
];
const BCSchoolsCOVID19 = ({
  loading,
}: // visitData2,
// bcSchoolsCOVID19DataType,
// handleBCSchoolsCOVID19Pagination,
{
  loading: boolean;
  // bcSchoolsCOVID19DataType: API.BCSchoolsCOVID19DataType;
  // handleBCSchoolsCOVID19Pagination: (page: number, pageSize: number | undefined) => void;
}) => {
  // 全局变量
  const currentPage = useRef(1);
  const sizePerPage = useRef<number | undefined>(15);

  // 获取表单的ref
  const ref = useRef<FormInstance>();

  // 双向数据绑定(响应式数据)
  const [bcSchoolsCOVID19, setBCSchoolsCOVID19] = useState<API.BCSchoolsCOVID19ListItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  // 根据页码和搜索参数获取学校的COVID19信息
  const handleGetBCSchoolsCOVID19 = (params: API.BCSchoolsCOVID19SearchParams) => {
    getBCSchoolsCOVID19(params)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getUsers - ${response.status}`);
          throw new Error(`Error: getUsers - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setBCSchoolsCOVID19(data.content);
        setTotal(data.totalElements);
      })
      .catch((e) => {
        console.log(`获取学校的COVID19信息出错 - ${e}`);
        message.error(`获取学校的COVID19信息出错!${e}`).then(() => {});
      });
  };

  // 处理分页请求
  const handlePagination = (page: number, pageSize: number | undefined) => {
    const schoolName = ref.current!.getFieldValue('schoolName');
    const districtName = ref.current!.getFieldValue('districtName');
    const cityName = ref.current!.getFieldValue('cityName');
    const healthRegionName = ref.current!.getFieldValue('healthRegionName');
    const notificationDate = ref.current!.getFieldValue('notificationDate');
    console.log(notificationDate);
    const notificationMethod = ref.current!.getFieldValue('notificationMethod');
    const params = {};
    if (schoolName) {
      params['schoolName'] = schoolName;
    }
    if (districtName) {
      params['districtName'] = districtName;
    }
    if (cityName) {
      params['cityName'] = cityName;
    }
    if (healthRegionName) {
      params['healthRegionName'] = healthRegionName;
    }
    if (notificationDate) {
      params['notificationDate'] = notificationDate;
    }
    if (notificationMethod) {
      params['notificationMethod'] = notificationMethod;
    }
    currentPage.current = page;
    sizePerPage.current = pageSize;
    // 根据条件获取数据
    handleGetBCSchoolsCOVID19({
      current: currentPage.current,
      pageSize: sizePerPage.current,
      ...params,
    });
  };

  // 新建用户弹窗 | 编辑用户弹窗, 关闭或新建时触发
  useEffect(() => {
    handleGetBCSchoolsCOVID19({ current: currentPage.current, pageSize: sizePerPage.current });
  }, []);

  return (
    <ProCard
      loading={loading}
      style={{
        // height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProTable
        rowKey={(record) => record.id}
        size="small"
        // headerTitle="表头"
        // footer={() => "Here is footer"}
        columns={columns}
        // scroll={{x: false}}
        dataSource={bcSchoolsCOVID19}
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
          handleGetBCSchoolsCOVID19({
            // current: currentPage.current,
            pageSize: sizePerPage.current,
            ...params,
          });
        }}
        // 重置表单(点击"重置")事件处理
        onReset={() => {
          handleGetBCSchoolsCOVID19({
            // current: currentPage.current,
            pageSize: sizePerPage.current,
          });
        }}
        cardBordered={true}
        // 防抖时间
        debounceTime={10}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
        }}
        search={
          {
            // span: 0,
            // split: false
          }
        }
        toolbar={
          {
            // title: "TEST",
            // subTitle: "TEST",
            // tooltip: "TEST",
            // settings: [{
            //   tooltip: "TEST",
            //   key: "TEST",
            // }],
          }
        }
      />
    </ProCard>
  );
};

export default BCSchoolsCOVID19;
