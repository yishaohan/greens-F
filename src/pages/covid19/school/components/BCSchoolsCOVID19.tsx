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
import { Badge, message, Tag, Divider, Row, Col, Image } from 'antd';
import { getBCSchoolsCOVID19 } from '../services/schoolsDashBoard';
import { FormInstance } from 'antd/lib/form';
import styles from '@/pages/covid19/school/style.less';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Bar } from '@ant-design/charts';
import { ContactsOutlined } from '@ant-design/icons';

const columns: ProColumns<API.BCSchoolsCOVID19ListItem>[] = [
  {
    title: <FormattedMessage id="bc-schools-covid19.table.index" defaultMessage="Index" />,
    align: 'center',
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
    ellipsis: true,
    width: 205,
    render(text: any, record: API.BCSchoolsCOVID19ListItem) {
      const url = `/info/schools/${record.schoolId}`;
      return (
        <a href={url} style={{ textDecoration: 'underline' }}>
          {text}
        </a>
      );
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
    render(text: any, record: API.BCSchoolsCOVID19ListItem) {
      return (
        <Tag color="orange" style={{ width: '120px' }}>
          {record.notificationDate}
        </Tag>
      );
    },
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
    width: 100,
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
    // ellipsis: true,
    search: false,
  },
  {
    title: (
      <FormattedMessage
        id="bc-schools-covid19.table.district-name"
        defaultMessage="District Name"
      />
    ),
    align: 'center',
    dataIndex: 'districtAbb',
    key: 'districtAbb',
    // sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    // className: styles.alignRight,
    width: 60,
    render(text: any, record: API.BCSchoolsCOVID19ListItem) {
      return (
        <Tag color="green" style={{ width: '120px' }}>
          {record.districtAbb}
        </Tag>
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
    // ellipsis: true,
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
      return (
        // <Popover content={documentationContent} title="Title">
        //   <a href={record.documentation} style={{textDecoration: 'underline'}} onClick={(e) => {
        //     e.preventDefault()
        //   }}>
        //     {record.id}
        //   </a>
        // </Popover>
        <Image width={30} height={15} src={`${record.documentation}.jpeg`} />
      );
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
    // ellipsis: true,
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
    // copyable: true,
    width: 200,
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
    // render(text: any, record: API.BCSchoolsCOVID19ListItem) {
    //   return (
    //     <a href={record.healthId} style={{textDecoration: 'underline'}}>
    //       {text}
    //     </a>
    //   );
    // },
  },
  {
    title: <FormattedMessage id="bc-schools-covid19.table.city-name" defaultMessage="City Name" />,
    align: 'right',
    dataIndex: 'cityName',
    key: 'cityName',
    // copyable: true,
    width: 140,
    // render(text: any, record: API.BCSchoolsCOVID19ListItem) {
    //   return (
    //     <a href={record.cityId} style={{textDecoration: 'underline'}}>
    //       {text}
    //     </a>
    //   );
    // },
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

  //
  useEffect(() => {
    handleGetBCSchoolsCOVID19({ current: currentPage.current, pageSize: sizePerPage.current });
  }, []);

  // 处理表格展开渲染
  const expandedRowRender = (record: API.BCSchoolsCOVID19ListItem) => {
    const config = {
      data: [
        {
          grade: '1年级',
          number: record.schoolsInfo.grade1Enrolment,
        },
        {
          grade: '2年级',
          number: record.schoolsInfo.grade2Enrolment,
        },
        {
          grade: '3年级',
          number: record.schoolsInfo.grade3Enrolment,
        },
        {
          grade: '4年级',
          number: record.schoolsInfo.grade4Enrolment,
        },
        {
          grade: '5年级',
          number: record.schoolsInfo.grade5Enrolment,
        },
        {
          grade: '6年级',
          number: record.schoolsInfo.grade6Enrolment,
        },
        {
          grade: '7年级',
          number: record.schoolsInfo.grade7Enrolment,
        },
        {
          grade: '8年级',
          number: record.schoolsInfo.grade8Enrolment,
        },
        {
          grade: '9年级',
          number: record.schoolsInfo.grade9Enrolment,
        },
        {
          grade: '10年级',
          number: record.schoolsInfo.grade10Enrolment,
        },
        {
          grade: '11年级',
          number: record.schoolsInfo.grade11Enrolment,
        },
        {
          grade: '12年级',
          number: record.schoolsInfo.grade12Enrolment,
        },
      ],
      xField: 'number',
      yField: 'grade',
      seriesField: 'grade',
      legend: false,
      // legend: {position: 'top-left'},
      // minBarWidth: 5,
      // maxBarWidth: 5,
      label: {
        position: 'middle',
        layout: [
          { type: 'interval-adjust-position' },
          { type: 'interval-hide-overlap' },
          { type: 'adjust-color' },
        ],
      },
      xAxis: false,
    };
    return (
      <>
        <Divider style={{ border: '#FF8800' }}>
          <ContactsOutlined style={{ color: '#FF8800', fontSize: 25 }} />
        </Divider>
        <Row>
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <ProDescriptions column={1} title={'学校信息'} size={'small'}>
              <ProDescriptions.Item label="名称">
                {record.schoolsInfo.schoolName}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="类别">
                <Tag color={'green'} style={{ width: '120px', textAlign: 'center' }}>
                  {record.schoolsInfo.schoolCategory}
                </Tag>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="类型">
                <Tag color={'green'} style={{ width: '120px', textAlign: 'center' }}>
                  {record.schoolsInfo.schoolType}
                </Tag>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="年级">
                <Tag color={'green'} style={{ width: '120px', textAlign: 'center' }}>
                  {record.schoolsInfo.gradeRange}
                </Tag>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="人数">
                <Tag color={'green'} style={{ width: '120px', textAlign: 'center' }}>
                  {record.schoolsInfo.enrolmentTotal}
                </Tag>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="编码">
                <Tag color={'green'} style={{ width: '120px', textAlign: 'center' }}>
                  {record.schoolsInfo.postalCode}
                </Tag>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="地址">
                <a href="geopoint:108.954823,34.275891">{record.schoolsInfo.schoolAddress}</a>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="城市">
                {record.schoolsInfo.city} {record.schoolsInfo.province}
              </ProDescriptions.Item>
            </ProDescriptions>
          </Col>
          <Col xl={1} lg={1} md={1} sm={1} xs={1}>
            <Divider type={'vertical'} style={{ height: '150px' }}></Divider>
          </Col>
          <Col xl={5} lg={5} md={5} sm={5} xs={5}>
            <ProDescriptions column={1} title={'联系人信息'} size={'small'}>
              <ProDescriptions.Item label=" 联系人">
                {record.schoolsInfo.principalFirstName} {record.schoolsInfo.principalLastName}{' '}
                {record.schoolsInfo.principalTitle}.
              </ProDescriptions.Item>
              <ProDescriptions.Item label="移动电话">
                <a href={`tel:${record.schoolsInfo.schoolPhone}`}>
                  {record.schoolsInfo.schoolPhone}
                </a>
              </ProDescriptions.Item>
              {/* eslint-disable-next-line no-template-curly-in-string */}
              <ProDescriptions.Item label="电子邮件">
                <a href={`mailto:${record.schoolsInfo.schoolEmail}`}>
                  {record.schoolsInfo.schoolEmail}
                </a>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="电子传真">
                {record.schoolsInfo.schoolFax}
              </ProDescriptions.Item>
            </ProDescriptions>
          </Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <Row>
              <ProDescriptions column={1} title={'各年级在校人数'} size={'small'}></ProDescriptions>
            </Row>
            <Row>
              <Col>
                <Bar {...config} style={{}} />
              </Col>
            </Row>
          </Col>
          <Col xl={1} lg={1} md={1} sm={1} xs={1}>
            <Divider type={'vertical'} style={{ height: '150px' }}></Divider>
          </Col>
          <Col xl={5} lg={5} md={5} sm={5} xs={5} style={{ paddingLeft: '20px' }}>
            <ProDescriptions column={1} title={'教育局信息'} size={'small'}>
              <ProDescriptions.Item label="名称">
                {record.schoolsInfo.schoolDistrict.districtName} (
                {record.schoolsInfo.schoolDistrict.districtAbb})
              </ProDescriptions.Item>
              <ProDescriptions.Item label="网址">
                <a target={'_blank'} href={record.schoolsInfo.schoolDistrict.districtWebAddress}>
                  {record.schoolsInfo.schoolDistrict.districtWebAddress}
                </a>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="电话">
                <a href={`tel:${record.schoolsInfo.schoolDistrict.districtPhone}`}>
                  {record.schoolsInfo.schoolDistrict.districtPhone}
                </a>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="传真">
                {record.schoolsInfo.schoolDistrict.districtFax}
              </ProDescriptions.Item>
              <ProDescriptions.Item label="邮编">
                <Tag color={'green'} style={{ width: '120px', textAlign: 'center' }}>
                  {record.schoolsInfo.schoolDistrict.postalCode}
                </Tag>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="地址">
                {record.schoolsInfo.schoolDistrict.address}
              </ProDescriptions.Item>
            </ProDescriptions>
          </Col>
        </Row>
        <Divider style={{ border: '1px solid #FF8800' }} />
      </>
    );
  };
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
        rowClassName={(record, index) => {
          if (index % 2 === 0) {
            return styles.b1;
          }
          return '';
        }}
        size="small"
        sticky={false}
        // headerTitle="表头"
        // footer={() => "Here is footer"}
        columns={columns}
        bordered={false}
        scroll={{ x: true }}
        dataSource={bcSchoolsCOVID19}
        // 表单引用
        formRef={ref}
        // 分页器
        pagination={{
          style: { color: '#FF8800' },
          showLessItems: false,
          current: currentPage.current,
          pageSize: sizePerPage.current,
          position: ['bottomCenter'],
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
        expandable={{
          expandedRowRender: (record) => {
            return expandedRowRender(record);
          },
          rowExpandable: () => {
            return true;
          },
        }}
        // onExpand={(expanded, record) => {
        //   console.log(expanded, record.schoolName, record.schoolId);
        // }}
      />
    </ProCard>
  );
};
export default BCSchoolsCOVID19;
