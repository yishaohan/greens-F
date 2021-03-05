import { Card, message } from 'antd';

// import {FormattedMessage} from 'umi';
// import type {RadioChangeEvent} from 'antd/es/radio';
import React, { useEffect, useState } from 'react';
// import type {VisitDataType} from '../data.d';
// import {Pie} from './Charts1';
// import Yuan from '../utils/Yuan';
import styles from '../style.less';
import { getBCSchoolsCOVID19MonthlySummary } from '@/pages/covid19/school/services/schoolsDashBoard';
import { Pie } from '@ant-design/charts';

const BCSchoolsCOVID19MonthlySummary = ({
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
  const [bcSchoolsCOVID19MonthlySummary, setBCSchoolsCOVID19MonthlySummary] = useState<
    API.BCSchoolsMonthlySummaryListItem[]
  >([]);

  const bcSchoolsCOVID19MonthlySummaryConfig = {
    height: 293,
    autoFit: true,
    appendPadding: [30, 0, 30, 0],
    data: bcSchoolsCOVID19MonthlySummary,
    angleField: 'count',
    colorField: 'month',
    radius: 1,
    innerRadius: 0.5,
    meta: {
      // count: {
      //   formatter: function formatter(v) {
      //     // return ''.concat(v, ' \xA5');
      //     return `${v}个`;
      //   },
      // },
    },
    legend: false,
    statistic: {
      title: false,
      // content: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fill: '#FF8800',
        },
        formatter: function formatter() {
          return 'Y\nProject';
        },
      },
    },
    tooltip: {
      // fields: ['month', 'count'],
      formatter: (datum) => {
        return { name: datum.month, value: datum.count };
      },
    },
    label: {
      // type: 'inner',
      // offset: '-50%',
      // style: {textAlign: 'center'},
      // autoRotate: false,
      // content: '{value}\n{name}',
      type: 'spider',
      labelHeight: 28,
      content: '{value}\n{name}',
      style: {
        fontSize: 14,
        textColor: '#FF8800',
        textAlign: 'center',
      },
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
      { type: 'pie-statistic-active' },
    ],
  };

  const handleGetBCSchoolsCOVID19MonthlySummary = (
    params: API.BCSchoolsMonthlySummarySearchParams,
  ) => {
    getBCSchoolsCOVID19MonthlySummary(params)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getBCSchoolsCOVID19MonthlySummary - ${response.status}`);
          throw new Error(`Error: getBCSchoolsCOVID19MonthlySummary - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        setBCSchoolsCOVID19MonthlySummary(data);
      })
      .catch((e) => {
        console.log(`获取BC省COVID19按月统计信息出错 - ${e}`);
        message.error(`获取BC省COVID19按月统计信息出错!${e}`).then(() => {});
      });
  };

  //
  useEffect(() => {
    handleGetBCSchoolsCOVID19MonthlySummary({});
  }, []);

  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      // title={
      //   <FormattedMessage
      //     id="bc-healths-covid19.statistics.percentage"
      //     defaultMessage="HealthRegion Percentage"
      //   />
      // }
      // style={{height: '340px'}}
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
      {/* <div style={{marginTop: -20, marginLeft: 0}}> */}
      <Pie {...bcSchoolsCOVID19MonthlySummaryConfig} />
      {/* <h4 style={{marginTop: -80, marginBottom: 32}}> */}
      {/*  <FormattedMessage id="dashboardanalysis.analysis.sales" defaultMessage="Sales"/> */}
      {/* </h4> */}
      {/* <Pie */}
      {/*  hasLegend */}
      {/*  subTitle={ */}
      {/*    <FormattedMessage id="bc-healths-covid19.statistics.total" defaultMessage="Total"/> */}
      {/*  } */}
      {/*  total={() => { */}
      {/*    return <>{bcSchoolsCOVID19MonthlySummary.reduce((pre, now) => now.count + pre, 0)}</>; */}
      {/*  }} */}
      {/*  data={bcSchoolsCOVID19MonthlySummary} */}
      {/*  // valueFormat={(value) => <Yuan>{value}</Yuan>} */}
      {/*  height={248} */}
      {/*  lineWidth={4} */}
      {/* /> */}
      {/* </div> */}
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

export default BCSchoolsCOVID19MonthlySummary;
