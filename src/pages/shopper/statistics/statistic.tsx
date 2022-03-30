import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Pie } from '@ant-design/charts';
import { Row, Col, message } from 'antd';
import { Table } from 'antd';
import { getStatistics } from '@/pages/shopper/statistics/services/statisics';

// @ts-ignore
let stats: API.Statistics = [];

const PlantPie: React.FC = () => {
  var data = [
    {
      type: 'Basil',
      value: stats.item1_1,
    },
    {
      type: 'Parsley',
      value: stats.item1_2,
    },
    {
      type: 'Mint',
      value: stats.item1_3,
    },
    {
      type: 'Thyme',
      value: stats.item1_4,
    },
    {
      type: 'Cilantro',
      value: stats.item1_5,
    },
    {
      type: 'Green Onion',
      value: stats.item1_6,
    },
    {
      type: 'Nantes Carrot',
      value: stats.item2_1,
    },
    {
      type: 'Red Radish',
      value: stats.item2_2,
    },
    {
      type: 'Butter Lettuce',
      value: stats.item2_3,
    },
    {
      type: 'Iceberg Lettuce',
      value: stats.item2_4,
    },
    {
      type: 'Gourmet Lettuce',
      value: stats.item2_5,
    },
    {
      type: 'Red Leaf Lettuce',
      value: stats.item2_6,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    legend: false,
    autoHide: true,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  };
  return <Pie {...config} />;
};

const KitPie: React.FC = () => {
  var data = [
    {
      sex: 'Herb Kit',
      sold: stats.quantity1,
    },
    {
      sex: 'Crunchy Kit',
      sold: stats.quantity2,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'sold',
    colorField: 'sex',
    radius: 0.8,
    legend: {
      layout: 'horizontal',
      position: 'bottom',
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        fill: '#fff',
        fontSize: 18,
        textAlign: 'center',
      },
    },
    pieStyle: function pieStyle(_ref) {
      var sex = _ref.sex;
      if (sex === 'Herb Kit') {
        return { fill: 'p(a)https://gw.alipayobjects.com/zos/rmsportal/nASTPWDPJDMgkDRlAUmw.jpeg' };
      }
      return { fill: 'p(a)https://gw.alipayobjects.com/zos/rmsportal/ziMWHpHSTlTzURSzCarw.jpeg' };
    },
  };
  return <Pie {...config} />;
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Number Of Order',
    dataIndex: 'number',
    key: 'number',
  },
];

let data_table = [
  {
    key: '1',
    name: 'Basil',
    number: stats.item1_1,
  },
  {
    key: '2',
    name: 'Parsley',
    number: stats.item1_2,
  },
  {
    key: '3',
    name: 'Mint',
    number: stats.item1_3,
  },
  {
    key: '4',
    name: 'Thyme',
    number: stats.item1_4,
  },
  {
    key: '5',
    name: 'Cilantro',
    number: stats.item1_5,
  },
  {
    key: '6',
    name: 'Green Onion',
    number: stats.item1_6,
  },
  {
    key: '7',
    name: 'Nantes Carrot',
    number: stats.item2_1,
  },
  {
    key: '8',
    name: 'Red Radish',
    number: stats.item2_2,
  },
  {
    key: '9',
    name: 'Butter Lettuce',
    number: stats.item2_3,
  },
  {
    key: '10',
    name: 'Iceberg Lettuce',
    number: stats.item2_4,
  },
  {
    key: '11',
    name: 'Gourmet Lettuce',
    number: stats.item2_5,
  },
];

class statistic extends React.PureComponent {
  render() {
    return (
      <>
        <PageContainer>
          <Table columns={columns} dataSource={data_table} pagination={{pageSize: 5}}/>
          <Row style={{ backgroundColor: 'white' }}>
            <Col span={12} style={{ height: '500px' }}>
              <PlantPie />
            </Col>
            <Col span={12} style={{ height: '500px' }}>
              <KitPie />
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }


  componentDidMount() {
    this.handleGetStats();
  }

  handleGetStats() {
    getStatistics()
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: getStats - ${response.status}`);
          throw new Error(`Error: getStats - ${response.status}`);
        }
        return response.data;
      })
      .then((data) => {
        stats = data;
        data_table = [
          {
            key: '1',
            name: 'Basil',
            number: stats.item1_1,
          },
          {
            key: '2',
            name: 'Parsley',
            number: stats.item1_2,
          },
          {
            key: '3',
            name: 'Mint',
            number: stats.item1_3,
          },
          {
            key: '4',
            name: 'Thyme',
            number: stats.item1_4,
          },
          {
            key: '5',
            name: 'Cilantro',
            number: stats.item1_5,
          },
          {
            key: '6',
            name: 'Green Onion',
            number: stats.item1_6,
          },
          {
            key: '7',
            name: 'Nantes Carrot',
            number: stats.item2_1,
          },
          {
            key: '8',
            name: 'Red Radish',
            number: stats.item2_2,
          },
          {
            key: '9',
            name: 'Butter Lettuce',
            number: stats.item2_3,
          },
          {
            key: '10',
            name: 'Iceberg Lettuce',
            number: stats.item2_4,
          },
          {
            key: '11',
            name: 'Gourmet Lettuce',
            number: stats.item2_5,
          },
        ];
        this.forceUpdate();
      })
      .catch((e) => {
        console.log(`receiving stats error - ${e}`);
        message.error(`receiving stats error!${e}`).then(() => {
        });
      });
  }
}

export default statistic;
