import { Badge, Card, Col, DatePicker, message, Row, Tabs } from 'antd';
import { FormattedMessage } from 'umi';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import moment from 'moment';

import React, { useEffect, useRef, useState } from 'react';
import numeral from 'numeral';
import { Bar } from './Charts1';
import styles from '../style.less';
import { getTimeDistance } from '@/utils/utils';
import {
  getBCDistrictsCOVID19Summary,
  getBCSchoolsCOVID19Summary,
  getBCHealthsCOVID19Summary,
} from '../services/schoolsDashBoard';
import ProTable, { ProColumns } from '@ant-design/pro-table';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const columns: ProColumns<API.BCSchoolsSummaryListItem>[] = [
  {
    title: (
      <FormattedMessage
        id="bc-schools-covid19-summary.table.school-name"
        defaultMessage="School Name"
      />
    ),
    align: 'left',
    dataIndex: 'schoolName',
    key: 'schoolName',
    search: false,
    // width: 48,
  },
  {
    title: (
      <FormattedMessage
        id="bc-schools-covid19-summary.table.school-count"
        defaultMessage="School Count"
      />
    ),
    align: 'right',
    dataIndex: 'count',
    key: 'count',
    search: false,
    // width: 48,
    sorter: (a: { count: number }, b: { count: number }) => {
      return a.count - b.count;
    },
    render(text: any, record: API.BCSchoolsSummaryListItem) {
      if (record.count <= 3) {
        return <Badge status={'warning'} text={text} />;
      }
      return <Badge status={'error'} text={text} />;
    },
  },
];

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

const DistrictsHealthsSummary = ({ loading }: { loading: boolean }) => {
  // 双向数据绑定(响应式数据)
  const [districtsSummary, setDistrictsSummary] = useState<API.BCDistrictsSummaryListItem[]>([]);
  const [schoolsSummary, setSchoolsSummary] = useState<API.BCSchoolsSummaryListItem[]>([]);
  const [healthsSummary, setHealrhsSummary] = useState<API.BCHealthsSummaryListItem[]>([]);
  // const [rangePicker, setRangePicker] = useState<RangePickerValue>(getTimeDistance('week'));
  const rangePicker = useRef<RangePickerValue>(getTimeDistance('year'));

  // 监听Date改变事件(today:今日 | week:本周 | month:本月 | year:全年)
  const handleSelectDate = (type: 'today' | 'week' | 'month' | 'year') => {
    console.log(`进入selectDate方法${type}`);
    // setRangePicker(getTimeDistance(type));
    rangePicker.current = getTimeDistance(type);
    let startDate = '';
    let endDate = '';
    // @ts-ignore
    startDate = rangePicker.current[0].format('YYYY-MM-DD');
    // @ts-ignore
    endDate = rangePicker.current[1].format('YYYY-MM-DD');
    console.log(startDate, endDate);
    getBCDistrictsCOVID19Summary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: GetBCDistrictCOVID19BySelectDate - ${response.status}`);
          throw new Error(`Error: GetBCDistrictCOVID19BySelectDate - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setDistrictsSummary(data);
      })
      .catch((e) => {
        console.log(`获取BC省教育局COVID19统计信息(1)出错 - ${e}`);
        message.error(`获取BC省教育局COVID19统计信息(1)出错!${e}`).then(() => {});
      });
    getBCSchoolsCOVID19Summary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: GetBCDistrictCOVID19BySelectDate - ${response.status}`);
          throw new Error(`Error: GetBCDistrictCOVID19BySelectDate - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setSchoolsSummary(data);
      })
      .catch((e) => {
        console.log(`获取BC省教育局COVID19统计信息(1)出错 - ${e}`);
        message.error(`获取BC省教育局COVID19统计信息(1)出错!${e}`).then(() => {});
      });
    getBCHealthsCOVID19Summary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getBCHealthsCOVID19Summary - ${response.status}`);
          throw new Error(`Error: getBCHealthsCOVID19Summary - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setHealrhsSummary(data);
      })
      .catch((e) => {
        console.log(`获取BC省卫生局COVID19统计信息(1)出错 - ${e}`);
        message.error(`获取BC省卫生局COVID19统计信息(1)出错!${e}`).then(() => {});
      });
  };

  // 监听RangePicker改变事件(时间日期选择器) 关联 - 上一个方法
  const handleRangePickerChange = (rangePickerTemp: RangePickerValue) => {
    console.log('RangePicker改变事件');
    // setRangePicker(rangePickerTemp);
    rangePicker.current = rangePickerTemp;
    let startDate = '';
    let endDate = '';
    // @ts-ignore
    startDate = rangePicker.current[0].format('YYYY-MM-DD');
    // @ts-ignore
    endDate = rangePicker.current[1].format('YYYY-MM-DD');
    console.log(startDate, endDate);
    getBCDistrictsCOVID19Summary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: GetBCDistrictCOVID19ByRangePickerChange - ${response.status}`);
          throw new Error(`Error: GetBCDistrictCOVID19ByRangePickerChange - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setDistrictsSummary(data);
      })
      .catch((e) => {
        console.log(`获取BC省教育局COVID19统计信息(2)出错 - ${e}`);
        message.error(`获取BC省教育局COVID19统计信息(2)出错!${e}`).then(() => {});
      });
    getBCSchoolsCOVID19Summary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: GetBCDistrictCOVID19BySelectDate - ${response.status}`);
          throw new Error(`Error: GetBCDistrictCOVID19BySelectDate - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setSchoolsSummary(data);
      })
      .catch((e) => {
        console.log(`获取BC省教育局COVID19统计信息(1)出错 - ${e}`);
        message.error(`获取BC省教育局COVID19统计信息(1)出错!${e}`).then(() => {});
      });
    getBCHealthsCOVID19Summary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getBCHealthsCOVID19Summary - ${response.status}`);
          throw new Error(`Error: getBCHealthsCOVID19Summary - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setHealrhsSummary(data);
      })
      .catch((e) => {
        console.log(`获取BC省卫生局COVID19统计信息(1)出错 - ${e}`);
        message.error(`获取BC省卫生局COVID19统计信息(1)出错!${e}`).then(() => {});
      });
  };

  // 是否激活(关联 - 上一个方法)
  const isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    // console.log(`isActive: ${type}`);
    // console.log(rangePicker);
    if (!rangePicker.current) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePicker.current[0] || !rangePicker.current[1]) {
      return '';
    }
    if (
      rangePicker.current[0].isSame(value[0] as moment.Moment, 'day') &&
      rangePicker.current[1].isSame(value[1] as moment.Moment, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  //
  useEffect(() => {
    handleSelectDate('year');
  }, []);

  return (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <a className={isActive('today')} onClick={() => handleSelectDate('today')}>
                  <FormattedMessage
                    id="dashboardanalysis.analysis.all-day"
                    defaultMessage="All Day"
                  />
                </a>
                <a className={isActive('week')} onClick={() => handleSelectDate('week')}>
                  <FormattedMessage
                    id="dashboardanalysis.analysis.all-week"
                    defaultMessage="All Week"
                  />
                </a>
                <a className={isActive('month')} onClick={() => handleSelectDate('month')}>
                  <FormattedMessage
                    id="dashboardanalysis.analysis.all-month"
                    defaultMessage="All Month"
                  />
                </a>
                <a className={isActive('year')} onClick={() => handleSelectDate('year')}>
                  <FormattedMessage
                    id="dashboardanalysis.analysis.all-year"
                    defaultMessage="All Year"
                  />
                </a>
              </div>
              <RangePicker
                value={rangePicker.current}
                onChange={handleRangePickerChange}
                style={{ width: 256 }}
              />
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 0 }}
        >
          <TabPane
            tab={
              <FormattedMessage
                id="bc-districts-covid19.statistics.summary"
                defaultMessage="School Districts"
              />
            }
            key="schoolDistricts"
          >
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={486}
                    // title={<FormattedMessage id="dashboardanalysis.analysis.sales-trend" defaultMessage="Sales Trend"/>}
                    title={'districtsSummary'}
                    data={districtsSummary}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <ProTable
                  rowKey={(record) => record.schoolName}
                  size="small"
                  search={false}
                  // headerTitle="表头"
                  // footer={() => "Here is footer"}
                  columns={columns}
                  // scroll={{x: true}}
                  dataSource={schoolsSummary}
                  // 表单引用
                  // formRef={ref}
                  // 分页器
                  pagination={{
                    // position: ['topRight'],
                    defaultPageSize: 10,
                    pageSize: 10,
                    showSizeChanger: false,
                    showQuickJumper: false,
                    showTitle: false,
                    showLessItems: true,
                    // showTotal: false,
                  }}
                  // 提交表单(点击"查询")事件处理
                  // onSubmit={(params) => {
                  //   handleGetBCSchoolsCOVID19({
                  //     // current: currentPage.current,
                  //     pageSize: sizePerPage.current,
                  //     ...params,
                  //   });
                  // }}
                  // 重置表单(点击"重置")事件处理
                  // onReset={() => {
                  //   handleGetBCSchoolsCOVID19({
                  //     // current: currentPage.current,
                  //     pageSize: sizePerPage.current,
                  //   });
                  // }}
                  // cardBordered={true}
                  // 防抖时间
                  debounceTime={10}
                  toolBarRender={false}
                  toolbar={{}}
                  // options={{
                  //   fullScreen: false,
                  //   reload: false,
                  //   setting: false,
                  //   density: false,
                  // }}
                  // toolbar={
                  //   {
                  //     // title: "TEST",
                  //     // subTitle: "TEST",
                  //     // tooltip: "TEST",
                  //     // settings: [{
                  //     //   tooltip: "TEST",
                  //     //   key: "TEST",
                  //     // }],
                  //   }
                  // }
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane
            tab={
              <FormattedMessage
                id="bc-healths-covid19.statistics.summary"
                defaultMessage="Health Region"
              />
            }
            key="healthRegion"
          >
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={486}
                    // title={<FormattedMessage id="dashboardanalysis.analysis.visits-trend" defaultMessage="Visits Trend"/>}
                    title={'healthsSummary'}
                    data={healthsSummary}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank} style={{ height: '486px' }}>
                  {/* <h4 className={styles.rankingTitle}> */}
                  {/*  <FormattedMessage id="dashboardanalysis.analysis.visits-ranking" defaultMessage="Visits Ranking"/> */}
                  {/* </h4> */}
                  <ul className={styles.rankingList}>
                    {healthsSummary.map((item, i) => (
                      <li key={item.healthName}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={`${item.count}`}>
                          {item.healthName}
                        </span>
                        <span>{numeral(item.count).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
};

export default DistrictsHealthsSummary;
