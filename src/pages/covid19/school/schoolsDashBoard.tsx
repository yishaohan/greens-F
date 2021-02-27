// import {CaretDownOutlined} from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import type { Dispatch } from 'umi';
import { FormattedMessage, connect } from 'umi';

import { getTimeDistance } from './utils/utils';
import type { AnalysisData } from './data.d';
import styles from './style.less';

import { Map } from './components/Charts2';
import ActiveChart from './components/ActiveChart';

// const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));
const BCSchoolsCOVID19 = React.lazy(() => import('./components/BCSchoolsCOVID19'));
const ProportionSales = React.lazy(() => import('./components/ProportionSales'));
// const OfflineData = React.lazy(() => import('./components/OfflineData'));

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

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
  rangePickerValue: RangePickerValue;
}

class DashboardAnalysis extends Component<DashboardAnalysisProps, DashboardAnalysisState> {
  state: DashboardAnalysisState = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  reqRef: number = 0;

  timeoutId: number = 0;

  // handleBCSchoolsCOVID19Pagination(page: number, pageSize: number | undefined) {
  //   console.log(pageSize, page);
  // }

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

  // 监听SalesType改变事件(all:全部渠道 | online:线上 | stores:门店)
  handleChangeSalesType = (e: RadioChangeEvent) => {
    // console.log(`SalesType改变事件: ${e.target.value}`);
    this.setState({
      salesType: e.target.value,
    });
  };

  // 监听Tab改变事件(Stores0 - Stores9)
  handleTabChange = (key: string) => {
    // console.log('TAB改变事件');
    this.setState({
      currentTabKey: key,
    });
  };

  // 监听Date改变事件(today:今日 | week:本周 | month:本月 | year:全年)
  selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
    // console.log('进入selectDate方法');
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'dashboardAnalysis/fetchSalesData',
    });
  };

  // 监听RangePicker改变事件(时间日期选择器) 关联 - 上一个方法
  handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
    // console.log('RangePicker改变事件');
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'dashboardAnalysis/fetchSalesData',
    });
  };

  // 是否激活(关联 - 上一个方法)
  isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    // console.log(`type: ${type}`);
    const { rangePickerValue } = this.state;
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
      rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, salesType } = this.state;
    const { dashboardAnalysis, loading } = this.props;
    const {
      // visitData,
      // visitData2,
      salesData,
      // bcSchoolsCOVID19Data,
      // offlineData,
      // offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = dashboardAnalysis;

    // 销售额类别占比(饼图)
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }

    // const menu = (
    //   <Menu>
    //     <Menu.Item>自定义菜单一</Menu.Item>
    //     <Menu.Item>自定义菜单二</Menu.Item>
    //   </Menu>
    // );

    // const dropdownGroup = (
    //   <span className={styles.iconGroup}>
    //     <Dropdown overlay={menu} placement="bottomRight">
    //       <CaretDownOutlined/>
    //     </Dropdown>
    //   </span>
    // );

    // const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    // console.log('activeKey');
    // console.log(activeKey);
    return (
      <GridContent>
        <React.Fragment>
          <>
            {/* IntroduceRow自定义组件: 第一行的4个信息块 */}
            {/* <Suspense fallback={<PageLoading/>}> */}
            {/*  <IntroduceRow loading={loading} visitData={visitData}/> */}
            {/* </Suspense> */}
          </>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* Map自定义组件 | ActiveChart自定义组件 | Gauge自定义组件 : 第一行的三个信息块 */}
          <Row gutter={24}>
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="dashboardmonitor.monitor.trading-activity"
                    defaultMessage="Real-Time Trading Activity"
                  />
                }
                bordered={false}
              >
                <>
                  {/* <Row> */}
                  {/*  <Col md={6} sm={12} xs={24}> */}
                  {/*    <Statistic */}
                  {/*      title={ */}
                  {/*        <FormattedMessage */}
                  {/*          id="dashboardmonitor.monitor.total-transactions" */}
                  {/*          defaultMessage="Total transactions today" */}
                  {/*        /> */}
                  {/*      } */}
                  {/*      suffix="元" */}
                  {/*      value={numeral(124543233).format('0,0')} */}
                  {/*    /> */}
                  {/*  </Col> */}
                  {/*  <Col md={6} sm={12} xs={24}> */}
                  {/*    <Statistic */}
                  {/*      title={ */}
                  {/*        <FormattedMessage */}
                  {/*          id="dashboardmonitor.monitor.sales-target" */}
                  {/*          defaultMessage="Sales target completion rate" */}
                  {/*        /> */}
                  {/*      } */}
                  {/*      value="92%" */}
                  {/*    /> */}
                  {/*  </Col> */}
                  {/*  <Col md={6} sm={12} xs={24}> */}
                  {/*    <Countdown */}
                  {/*      title={ */}
                  {/*        <FormattedMessage */}
                  {/*          id="dashboardmonitor.monitor.remaining-time" */}
                  {/*          defaultMessage="Remaining time of activity" */}
                  {/*        /> */}
                  {/*      } */}
                  {/*      value={deadline} */}
                  {/*      format="HH:mm:ss:SSS" */}
                  {/*    /> */}
                  {/*  </Col> */}
                  {/*  <Col md={6} sm={12} xs={24}> */}
                  {/*    <Statistic */}
                  {/*      title={ */}
                  {/*        <FormattedMessage */}
                  {/*          id="dashboardmonitor.monitor.total-transactions-per-second" */}
                  {/*          defaultMessage="Total transactions per second" */}
                  {/*        /> */}
                  {/*      } */}
                  {/*      suffix="元" */}
                  {/*      value={numeral(234).format('0,0')} */}
                  {/*    /> */}
                  {/*  </Col> */}
                  {/* </Row> */}
                </>
                <div className={styles.mapChart}>
                  <Map />
                </div>
              </Card>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card
                title={
                  <FormattedMessage
                    id="dashboardmonitor.monitor.activity-forecast"
                    defaultMessage="Activity forecast"
                  />
                }
                style={{ marginBottom: 24 }}
                bordered={false}
              >
                <ActiveChart />
              </Card>
              <>
                {/* <Card */}
                {/*  title={ */}
                {/*    <FormattedMessage */}
                {/*      id="dashboardmonitor.monitor.efficiency" */}
                {/*      defaultMessage="Efficiency" */}
                {/*    /> */}
                {/*  } */}
                {/*  style={{marginBottom: 24}} */}
                {/*  bodyStyle={{textAlign: 'center'}} */}
                {/*  bordered={false} */}
                {/* > */}
                {/* <Gauge */}
                {/*  title={formatMessage({ */}
                {/*    id: 'dashboardmonitor.monitor.ratio', */}
                {/*    defaultMessage: 'Ratio', */}
                {/*  })} */}
                {/*  height={172} */}
                {/*  percent={87} */}
                {/* /> */}
              </>
              <Suspense fallback={null}>
                <ProportionSales
                  // dropdownGroup={dropdownGroup}
                  salesType={salesType}
                  loading={loading}
                  salesPieData={salesPieData}
                  handleChangeSalesType={this.handleChangeSalesType}
                />
              </Suspense>
              {/* </Card> */}
            </Col>
          </Row>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* SalesCard自定义组件: 第二行的一个信息块 */}
          <Suspense fallback={null}>
            <SalesCard
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              loading={loading}
              selectDate={this.selectDate}
            />
          </Suspense>
          <Row
            gutter={24}
            style={{
              marginTop: 24,
            }}
          >
            {/* TopSearch自定义组件: 第三行第一个信息块 */}
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <BCSchoolsCOVID19
                  loading={loading}
                  // bcSchoolsCOVID19DataType={bcSchoolsCOVID19DataType}
                  // handleBCSchoolsCOVID19Pagination={this.handleBCSchoolsCOVID19Pagination}
                />
              </Suspense>
            </Col>
            <>
              {/* ProportionSales自定义组件: 第三行第二个信息块 */}
              {/* <Col xl={6} lg={24} md={24} sm={24} xs={24}> */}
              {/*  <Suspense fallback={null}> */}
              {/*    <ProportionSales */}
              {/*      dropdownGroup={dropdownGroup} */}
              {/*      salesType={salesType} */}
              {/*      loading={loading} */}
              {/*      salesPieData={salesPieData} */}
              {/*      handleChangeSalesType={this.handleChangeSalesType} */}
              {/*    /> */}
              {/*  </Suspense> */}
              {/* </Col> */}
            </>
          </Row>
          <>
            {/* OfflineData自定义组件: 第四行一个信息块 */}
            {/* <Suspense fallback={null}> */}
            {/*  <OfflineData */}
            {/*    activeKey={activeKey} */}
            {/*    loading={loading} */}
            {/*    offlineData={offlineData} */}
            {/*    offlineChartData={offlineChartData} */}
            {/*    handleTabChange={this.handleTabChange} */}
            {/*  /> */}
            {/* </Suspense> */}
          </>
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
