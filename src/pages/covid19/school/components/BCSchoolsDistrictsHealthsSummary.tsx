import { Badge, Card, Col, DatePicker, message, Row, Tabs } from 'antd';
import { FormattedMessage } from 'umi';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';

import React, { useEffect, useRef, useState } from 'react';
import numeral from 'numeral';
// import {Bar} from './Charts1';
import styles from '../style.less';
import { getTimeDistance } from '@/utils/utils';
import {
  getBCSchoolsDistrictsCOVID19Summary,
  getBCSchoolsCOVID19Summary,
  getBCSchoolsHealthsCOVID19Summary,
  getBCSchoolsCOVID19DailySummary,
  getBCSchoolsHealthsCitiesCOVID19Summary,
} from '../services/schoolsDashBoard';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Line, Column } from '@ant-design/charts';

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

const BCSchoolsDistrictsHealthsSummary = ({ loading }: { loading: boolean }) => {
  // 双向数据绑定(响应式数据)
  const [dailySummaryLoading, setDailySummaryLoading] = useState<boolean>(true);
  const [dailySummary, setDailySummary] = useState<API.BCSchoolsDailySummaryListItem[]>([]);
  const [districtsSummary, setDistrictsSummary] = useState<API.BCSchoolsDistrictsSummaryListItem[]>(
    [],
  );
  const [schoolsSummary, setSchoolsSummary] = useState<API.BCSchoolsSummaryListItem[]>([]);
  const [healthsCitiesSummary, setHealthsCitiesSummary] = useState<
    API.BCSchoolsHealthsCitiesSummaryListItem[]
  >([]);
  const [healthsSummary, setHealthsSummary] = useState<API.BCSchoolsHealthsSummaryListItem[]>([]);
  // const [rangePicker, setRangePicker] = useState<RangePickerValue>(getTimeDistance('week'));
  const rangePicker = useRef<RangePickerValue>(getTimeDistance('year'));

  // 监听Date改变事件(today:今日 | week:本周 | month:本月 | year:全年)
  const handleSelectDate = (type: 'today' | 'week' | 'month' | 'year') => {
    // console.log(`进入selectDate方法${type}`);
    // setRangePicker(getTimeDistance(type));
    rangePicker.current = getTimeDistance(type);
    let startDate: string;
    let endDate: string;
    // eslint-disable-next-line prefer-const
    startDate = rangePicker.current[0].format('YYYY-MM-DD');
    // eslint-disable-next-line prefer-const
    endDate = rangePicker.current[1].format('YYYY-MM-DD');
    // console.log(startDate, endDate);
    getBCSchoolsCOVID19DailySummary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getBCSchoolsCOVID19DailySummary - ${response.status}`);
          throw new Error(`Error: getBCSchoolsCOVID19DailySummary - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setDailySummary(data);
        setDailySummaryLoading(false);
      })
      .catch((e) => {
        console.log(`获取学校的COVID19按天统计信息出错 - ${e}`);
        message.error(`获取学校的COVID19按天统计信息出错!${e}`).then(() => {});
      });
    getBCSchoolsDistrictsCOVID19Summary({ startDate, endDate })
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
    getBCSchoolsHealthsCitiesCOVID19Summary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getBCSchoolsHealthsCitiesCOVID19Summary - ${response.status}`);
          throw new Error(`Error: getBCSchoolsHealthsCitiesCOVID19Summary - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setHealthsCitiesSummary(data);
      })
      .catch((e) => {
        console.log(`获取BC省卫生局,城市COVID19统计信息(1)出错 - ${e}`);
        message.error(`获取BC省卫生局,城市COVID19统计信息(1)出错!${e}`).then(() => {});
      });
    getBCSchoolsHealthsCOVID19Summary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getBCSchoolsHealthsCOVID19Summary - ${response.status}`);
          throw new Error(`Error: getBCSchoolsHealthsCOVID19Summary - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setHealthsSummary(data);
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
    getBCSchoolsCOVID19DailySummary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getBCSchoolsCOVID19DailySummary - ${response.status}`);
          throw new Error(`Error: getBCSchoolsCOVID19DailySummary - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setDailySummary(data);
        setDailySummaryLoading(false);
      })
      .catch((e) => {
        console.log(`获取学校的COVID19按天统计信息出错 - ${e}`);
        message.error(`获取学校的COVID19按天统计信息出错!${e}`).then(() => {});
      });
    getBCSchoolsDistrictsCOVID19Summary({ startDate, endDate })
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
    getBCSchoolsHealthsCitiesCOVID19Summary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getBCHealthsCOVID19Summary - ${response.status}`);
          throw new Error(`Error: getBCHealthsCOVID19Summary - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setHealthsCitiesSummary(data);
      })
      .catch((e) => {
        console.log(`获取BC省卫生局COVID19统计信息(1)出错 - ${e}`);
        message.error(`获取BC省卫生局COVID19统计信息(1)出错!${e}`).then(() => {});
      });
    getBCSchoolsHealthsCOVID19Summary({ startDate, endDate })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getBCHealthsCOVID19Summary - ${response.status}`);
          throw new Error(`Error: getBCHealthsCOVID19Summary - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setHealthsSummary(data);
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

  const dailySummaryConfig = {
    height: 486,
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    data: dailySummary,
    xField: 'day',
    yField: 'count',
    seriesField: 'healthRegionName',
    legend: {
      layout: 'horizontal',
      position: 'top',
    },
    loading: dailySummaryLoading,
    meta: {
      count: {
        type: 'log',
        base: 2,
      },
    },
    tooltip: {
      showTitle: true,
      title: 'day',
      shared: true,
      // showCrosshairs: true,
      formatter: (datum: { healthRegionName: string; count: number }) => {
        return { name: datum.healthRegionName, value: datum.count };
      },
      crosshairs: {
        type: 'xy',
      },
    },
    lineStyle: {
      // stroke: '#FF8800',
      // lineWidth: 2,
      lineDash: [4, 5],
      // strokeOpacity: 0.8,
      // shadowColor: 'black',
      // shadowBlur: 6,
      // shadowOffsetX: 2,
      // shadowOffsetY: 2,
      cursor: 'pointer',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 8000,
      },
    },
  };

  const districtsSummaryConfig = {
    data: districtsSummary,
    height: 486,
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
      { type: 'column-click' },
    ],
    label: {
      style: {
        // fill: '#FF0000',
        opacity: 0.8,
        fontSize: 12,
      },
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
      rotate: false,
      position: 'middle',
      animate: true,
    },
    columnStyle: {
      // radius: [20, 20, 0, 0],
      // fill: 'red',
      fillOpacity: 0.5,
      stroke: '#FF8800',
      lineWidth: 0,
      // lineDash: [4, 5],
      strokeOpacity: 0.1,
      shadowColor: '#FF8800',
      shadowBlur: 5,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      cursor: 'pointer',
    },
    meta: {
      count: {
        type: 'pow',
        base: 1,
      },
      maxColumnWidth: 2,
    },
    xField: 'districtAbb',
    yField: 'count',
    seriesField: 'districtName',
    xAxis: { label: { autoRotate: false } },
    // scrollbar: {type: 'horizontal'},
    slider: {
      start: 0,
      end: 1,
      // height: 100,
      backgroundStyle: {},
      foregroundStyle: {
        fill: '#FF8800',
      },
    },
    // theme: 'dark',
    legend: false,
    animation: {
      appear: {
        // animation: 'grow-in-y',
        duration: 200,
      },
      update: {
        // animation: 'grow-in-y',
        duration: 200,
      },
      enter: {
        // animation: 'grow-in-y',
        duration: 200,
      },
      leave: {
        // animation: 'grow-in-y',
        duration: 200,
      },
    },
  };

  const healthsCitiesSummaryConfig1 = {
    data: healthsCitiesSummary,
    isStack: true,
    xField: 'healthRegionName',
    yField: 'count',
    seriesField: 'cityName',
    meta: {
      count: {
        type: 'pow',
        base: 2,
      },
      maxColumnWidth: 2,
    },
    legend: false,
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const healthsCitiesSummaryConfig2 = {
    data: [healthsCitiesSummary, healthsSummary],
    meta: {
      // count: {
      //   type: 'pow',
      //   base: 2,
      // },
      // maxColumnWidth: 2,
    },
    tooltip: {
      fields: ['cityName', 'count'],
    },
    limitInPlot: false,
    legend: false,
    xField: 'healthRegionName',
    yField: ['count', 'count'],
    yAxis: {
      count: {
        tickCount: 5,
      },
    },
    geometryOptions: [
      {
        geometry: 'column',
        isStack: true,
        isPercent: true,
        seriesField: 'cityName',
      },
      { geometry: 'line' },
    ],
  };

  return (
    <Card loading={loading} bordered={false} bodyStyle={{ paddingLeft: 25, paddingRight: 25 }}>
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
                id="bc-districts-covid19.statistics.dailySummary"
                defaultMessage="Daily Summary"
              />
            }
            key="???"
          >
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div style={{ height: 486 }}>
                  <Line {...dailySummaryConfig} />
                </div>
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
              <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                <div style={{ height: 486 }}>
                  <Column {...healthsCitiesSummaryConfig1} />
                  {/* <DualAxes {...healthsCitiesSummaryConfig2}/> */}
                </div>
              </Col>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                <div className={styles.salesRank} style={{ height: '486px' }}>
                  {/* <h4 className={styles.rankingTitle}> */}
                  {/*  <FormattedMessage id="dashboardanalysis.analysis.visits-ranking" defaultMessage="Visits Ranking"/> */}
                  {/* </h4> */}

                  <ul className={styles.rankingList}>
                    {healthsSummary.map((item, i) => (
                      <li key={item.healthRegionName}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 10 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={`${item.count}`}>
                          {item.healthRegionName}
                        </span>
                        <span>{numeral(item.count).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
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
              <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                <div style={{ height: 486 }}>
                  <Column {...districtsSummaryConfig} />
                </div>
              </Col>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                <ProTable
                  style={{ paddingLeft: 20 }}
                  rowClassName={(record, index) => {
                    if (index % 2 === 0) {
                      return styles.b1;
                    }
                    return '';
                  }}
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
                    // position: ['bottomCenter'],
                    defaultPageSize: 15,
                    pageSize: 10,
                    showSizeChanger: false,
                    showQuickJumper: false,
                    showTitle: false,
                    showLessItems: false,
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
        </Tabs>
      </div>
    </Card>
  );
};

export default BCSchoolsDistrictsHealthsSummary;
