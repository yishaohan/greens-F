import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, message, Row, Tooltip } from 'antd';

import { FormattedMessage } from 'umi';
import React, { useEffect, useState } from 'react';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts1';
import Trend from './Trend';
// import Yuan from '../utils/Yuan';
import styles from '../style.less';
import { getBCSchoolsCOVID19TotalSummary } from '../services/schoolsDashBoard';

const BCSchoolsCOVID19TotalSummary = ({ loading }: { loading: boolean }) => {
  // 双向数据绑定(响应式数据)
  const [
    bcSchoolsCOVID19TotalSummary,
    setBCSchoolsCOVID19TotalSummary,
  ] = useState<API.BCSchoolsTotalSummary>();

  const handleGetBCSchoolsCOVID19TotalSummary = () => {
    getBCSchoolsCOVID19TotalSummary()
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getUsers - ${response.status}`);
          throw new Error(`Error: getUsers - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setBCSchoolsCOVID19TotalSummary(data);
      })
      .catch((e) => {
        console.log(`获取学校的COVID19信息出错 - ${e}`);
        message.error(`获取学校的COVID19信息出错!${e}`).then(() => {});
      });
  };

  //
  useEffect(() => {
    handleGetBCSchoolsCOVID19TotalSummary();
  }, []);

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <Row gutter={24}>
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <ChartCard
          style={{ marginBottom: 24 }}
          bordered={false}
          title={<FormattedMessage id="bc-covid19-summary.total" defaultMessage="Total" />}
          // action={
          //   <Tooltip title={<FormattedMessage id="bc-covid19-summary.introduce" defaultMessage="Introduce"/>}>
          //     <InfoCircleOutlined/>
          //   </Tooltip>
          // }
          loading={loading}
          total={() => {
            return `${numeral(bcSchoolsCOVID19TotalSummary?.total).format('0,0')}`;
          }}
          footer={
            <Field
              label={
                <FormattedMessage
                  id="bc-covid19-summary.updateDateTime"
                  defaultMessage="Update Date: "
                />
              }
              value={bcSchoolsCOVID19TotalSummary?.updateDateTime}
            />
          }
          contentHeight={64}
        >
          {bcSchoolsCOVID19TotalSummary?.weeklyChanges > 0 && (
            <Trend flag="up" style={{ marginRight: 32 }}>
              <FormattedMessage
                id="bc-covid19-summary.analysis.week"
                defaultMessage="Weekly Changes"
              />
              <Tooltip
                title={
                  <FormattedMessage
                    id="bc-covid19-summary.introduce-week"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
              <span className={styles.trendTextUp}>
                {bcSchoolsCOVID19TotalSummary?.weeklyChanges}%
              </span>
            </Trend>
          )}
          {bcSchoolsCOVID19TotalSummary?.weeklyChanges <= 0 && (
            <Trend flag="down" style={{ marginRight: 32 }}>
              <FormattedMessage
                id="bc-covid19-summary.analysis.week"
                defaultMessage="Weekly Changes"
              />
              <Tooltip
                title={
                  <FormattedMessage
                    id="bc-covid19-summary.introduce-week"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
              <span className={styles.trendTextDown}>
                {bcSchoolsCOVID19TotalSummary?.weeklyChanges}%
              </span>
            </Trend>
          )}
          {bcSchoolsCOVID19TotalSummary?.dailyChanges > 0 && (
            <Trend flag="up" style={{ marginRight: 0 }}>
              <FormattedMessage
                id="bc-covid19-summary.analysis.day"
                defaultMessage="Daily Changes"
              />
              <Tooltip
                title={
                  <FormattedMessage
                    id="bc-covid19-summary.introduce-day"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
              <span className={styles.trendTextUp}>
                {bcSchoolsCOVID19TotalSummary?.dailyChanges}%
              </span>
            </Trend>
          )}
          {bcSchoolsCOVID19TotalSummary?.dailyChanges <= 0 && (
            <Trend flag="down" style={{ marginLeft: 0 }}>
              <FormattedMessage
                id="bc-covid19-summary.analysis.day"
                defaultMessage="Daily Changes"
              />
              <Tooltip
                title={
                  <FormattedMessage
                    id="bc-covid19-summary.introduce-day"
                    defaultMessage="Introduce"
                  />
                }
              >
                <InfoCircleOutlined />
              </Tooltip>
              <span className={styles.trendTextDown}>
                {bcSchoolsCOVID19TotalSummary?.dailyChanges}%
              </span>
            </Trend>
          )}
        </ChartCard>
      </Col>
    </Row>
  );
};

export default BCSchoolsCOVID19TotalSummary;
