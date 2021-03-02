import { Card, message } from 'antd';

import { FormattedMessage } from 'umi';
// import type {RadioChangeEvent} from 'antd/es/radio';
import React, { useEffect, useState } from 'react';
// import type {VisitDataType} from '../data.d';
import { Pie } from './Charts1';
// import Yuan from '../utils/Yuan';
import styles from '../style.less';
import { getBCSchoolsHealthsCOVID19Summary } from '@/pages/covid19/school/services/schoolsDashBoard';

const BCSchoolsDistrictSummary = ({
  loading,
}: // dropdownGroup,
// salesType,
// salesPieData,
// handleChangeSalesType,
{
  loading: boolean;
  // dropdownGroup: React.ReactNode;
  // salesType: 'all' | 'online' | 'stores';
  // salesPieData: VisitDataType[];
  // handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => {
  // let salesType: 'all' | 'online' | 'stores' = 'all';

  // 监听SalesType改变事件(all:全部渠道 | online:线上 | stores:门店)
  // const handleChangeSalesType = (e: RadioChangeEvent) => {
  //   console.log(`SalesType改变事件: ${e.target.value}`);
  //   salesType = e.target.value;
  // };

  // 双向数据绑定(响应式数据)
  const [bcHealthsCOVID19Summary, setBCHealthsCOVID19Summary] = useState<
    API.BCSchoolsHealthsSummaryListItem[]
  >([]);

  const handleGetBCHealthsCOVID19Summary = (params: API.BCSchoolsHealthsSummarySearchParams) => {
    getBCSchoolsHealthsCOVID19Summary(params)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getBCHealthsCOVID19Summary - ${response.status}`);
          throw new Error(`Error: getBCHealthsCOVID19Summary - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setBCHealthsCOVID19Summary(data);
      })
      .catch((e) => {
        console.log(`获取BC省卫生局COVID19统计信息(1)出错 - ${e}`);
        message.error(`获取BC省卫生局COVID19统计信息(1)出错!${e}`).then(() => {});
      });
  };

  //
  useEffect(() => {
    handleGetBCHealthsCOVID19Summary({ startDate: '2020-01-01', endDate: '2021-12-31' });
  }, []);

  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title={
        <FormattedMessage
          id="bc-healths-covid19.statistics.percentage"
          defaultMessage="HealthRegion Percentage"
        />
      }
      style={{ height: '340px' }}
      // extra={
      //   <div className={styles.salesCardExtra}>
      //     <div className={styles.salesTypeRadio}>
      //       <Radio.Group value={salesType} onChange={handleChangeSalesType}>
      //         <Radio.Button value="all">
      //           <FormattedMessage id="dashboardanalysis.channel.all" defaultMessage="ALL"/>
      //         </Radio.Button>
      //         <Radio.Button value="online">
      //           <FormattedMessage id="dashboardanalysis.channel.online" defaultMessage="Online"/>
      //         </Radio.Button>
      //         <Radio.Button value="stores">
      //           <FormattedMessage id="dashboardanalysis.channel.stores" defaultMessage="Stores"/>
      //         </Radio.Button>
      //       </Radio.Group>
      //     </div>
      //   </div>
      // }
    >
      <div style={{ marginTop: -20, marginLeft: 0 }}>
        {/* <h4 style={{marginTop: -80, marginBottom: 32}}> */}
        {/*  <FormattedMessage id="dashboardanalysis.analysis.sales" defaultMessage="Sales"/> */}
        {/* </h4> */}
        <Pie
          hasLegend
          subTitle={
            <FormattedMessage id="bc-healths-covid19.statistics.total" defaultMessage="Total" />
          }
          total={() => {
            return <>{bcHealthsCOVID19Summary.reduce((pre, now) => now.count + pre, 0)}</>;
          }}
          data={bcHealthsCOVID19Summary}
          // valueFormat={(value) => <Yuan>{value}</Yuan>}
          height={248}
          lineWidth={4}
        />
      </div>
    </Card>
  );
};

// ProportionSales.defaultProps = {
//   salesType: 'onlineYYY',
// }
//
// ProportionSales.propTypes = {
//   salesType: Number,
// }

export default BCSchoolsDistrictSummary;
