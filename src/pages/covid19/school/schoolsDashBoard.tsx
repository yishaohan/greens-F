// import {CaretDownOutlined} from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
// import type {RadioChangeEvent} from 'antd/es/radio';
// import type {RangePickerProps} from 'antd/es/date-picker/generatePicker';
// import type moment from 'moment';
import type { Dispatch } from 'umi';
import { FormattedMessage, connect } from 'umi';
import PageLoading from './components/PageLoading';

// import {getTimeDistance} from './utils/utils';
import type { AnalysisData } from './data.d';
import styles from './style.less';

import { Map } from './components/Charts2';
// import ActiveChart from './components/ActiveChart';
// import {ChartCard, Field} from '@/pages/covid19/school/components/Charts1';
// import {InfoCircleOutlined} from '@ant-design/icons';
// import Yuan from "@/pages/covid19/school/utils/Yuan";
// import numeral from 'numeral';
// import Trend from './components/Trend';

const BCSchoolsCOVID19TotalSummary = React.lazy(
  () => import('./components/BCSchoolsCOVID19TotalSummary'),
);
const BCSchoolsDistrictsHealthsSummary = React.lazy(
  () => import('./components/BCSchoolsDistrictsHealthsSummary'),
);
const BCSchoolsCOVID19 = React.lazy(() => import('./components/BCSchoolsCOVID19'));
const BCSchoolsCOVID19MonthlySummary = React.lazy(
  () => import('./components/BCSchoolsCOVID19MonthlySummary'),
);
// const OfflineData = React.lazy(() => import('./components/OfflineData'));

// type RangePickerValue = RangePickerProps<moment.Moment>['value'];

// 所有的数据接口定义, 任务定义
interface DashboardAnalysisProps {
  dashboardAnalysis: AnalysisData;
  dispatch: Dispatch;
  loading: boolean;
}

// 所有的数据过滤条件
interface DashboardAnalysisState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  // rangePickerValue: RangePickerValue;
}

class DashboardAnalysis extends Component<DashboardAnalysisProps, DashboardAnalysisState> {
  state: DashboardAnalysisState = {
    salesType: 'all',
    currentTabKey: '',
    // rangePickerValue: getTimeDistance('year'),
  };

  reqRef: number = 0;

  timeoutId: number = 0;

  // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 组件是否安装
  componentDidMount() {
    const { dispatch } = this.props;
    // 请求动画帧
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardAnalysis/fetch',
      });
    });
  }

  // 组件将被卸载
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAnalysis/clear',
    });
    // 取消动画帧
    cancelAnimationFrame(this.reqRef);
    // 取消setTimeout设置的定时器
    clearTimeout(this.timeoutId);
  }

  // 监听Tab改变事件(Stores0 - Stores9)
  handleTabChange = (key: string) => {
    // console.log('TAB改变事件');
    this.setState({
      currentTabKey: key,
    });
  };

  render() {
    // const {currentTabKey} = this.state;
    const { loading } = this.props;
    // const {
    //   offlineData,
    //   offlineChartData,
    //   // visitData,
    //   // salesData,
    //   // salesTypeData,
    //   // salesTypeDataOnline,
    //   // salesTypeDataOffline,
    // } = dashboardAnalysis;

    // 销售额类别占比(饼图)
    // let salesPieData;
    // if (salesType === 'all') {
    //   salesPieData = salesTypeData;
    // } else {
    //   salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    // }

    // const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    return (
      <GridContent>
        <React.Fragment>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* Map自定义组件 | ActiveChart自定义组件 | Gauge自定义组件 : 第一行的三个信息块 */}
          <Row gutter={24}>
            <Col xl={16} lg={24} md={24} sm={24} xs={24}>
              <Card
                bordered={false}
                title={
                  <FormattedMessage
                    id="bc-covid19-summary"
                    defaultMessage="Real-Time COVID19 Summary"
                  />
                }
              >
                <div className={styles.mapChart}>
                  <Map />
                </div>
              </Card>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={<PageLoading />}>
                <BCSchoolsCOVID19TotalSummary loading={loading} />
              </Suspense>
              <Suspense fallback={<PageLoading />}>
                <BCSchoolsCOVID19MonthlySummary loading={loading} />
              </Suspense>
            </Col>
          </Row>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* SalesCard自定义组件: 第二行的一个信息块 */}
          <Row gutter={24} style={{ marginTop: 24 }}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={<PageLoading />}>
                <BCSchoolsDistrictsHealthsSummary loading={loading} />
              </Suspense>
            </Col>
          </Row>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Row gutter={24} style={{ marginTop: 24 }}>
            {/* TopSearch自定义组件: 第三行第一个信息块 */}
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={<PageLoading />}>
                <BCSchoolsCOVID19 loading={loading} />
              </Suspense>
            </Col>
          </Row>
          {/* OfflineData自定义组件: 第四行一个信息块 */}
          {/* <Suspense fallback={PageLoading}> */}
          {/*  <OfflineData */}
          {/*    activeKey={activeKey} */}
          {/*    loading={loading} */}
          {/*    offlineData={offlineData} */}
          {/*    offlineChartData={offlineChartData} */}
          {/*    handleTabChange={this.handleTabChange} */}
          {/*  /> */}
          {/* </Suspense> */}
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    dashboardAnalysis,
    loading,
  }: {
    dashboardAnalysis: any;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    dashboardAnalysis,
    loading: loading.effects['dashboardAnalysis/fetch'],
  }),
)(DashboardAnalysis);
