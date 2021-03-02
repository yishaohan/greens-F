import moment from 'moment';
import { AnalysisData, RadarData, VisitDataType } from './data.d';

// mock data
const visitData: VisitDataType[] = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const searchData = [];
for (let i = 0; i < 10; i += 1) {
  searchData.push({
    index: i + 1,
    id: `${i}`,
    schoolId: 1,
    schoolName: 'school name',
    districtId: 2,
    districtName: 'district name',
    districtAbb: 'district abb',
    cityId: 3,
    cityName: 'city name',
    healthId: 4,
    healthRegionName: 'health region name',
    notificationDate: '1977-05-19 00:00:00',
    notificationMethod: 'notification method',
    exposureDate: 'exposure date',
    exposureNumber: 5,
    extraInfo: 'extra info',
    documentation: 'documentation',
  });
}

const salesTypeData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

const salesTypeDataOnline = [
  {
    x: '家用电器',
    y: 244,
  },
  {
    x: '食用酒水',
    y: 321,
  },
  {
    x: '个护健康',
    y: 311,
  },
  {
    x: '服饰箱包',
    y: 41,
  },
  {
    x: '母婴产品',
    y: 121,
  },
  {
    x: '其他',
    y: 111,
  },
];

const salesTypeDataOffline = [
  {
    x: '家用电器',
    y: 99,
  },
  {
    x: '食用酒水',
    y: 188,
  },
  {
    x: '个护健康',
    y: 344,
  },
  {
    x: '服饰箱包',
    y: 255,
  },
  {
    x: '其他',
    y: 65,
  },
];

const offlineData = [];

for (let i = 0; i < 9; i += 1) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData = [];
// offlineChartData.push({x: 1614668029743, y1: 12, y2: 13});
// offlineChartData.push({x: 1617346429743, y1: 39, y2: 72});
// offlineChartData.push({x: 1620024829743, y1: 28, y2: 31});
// offlineChartData.push({x: 1622703229743, y1: 10, y2: 67});
// offlineChartData.push({x: 1625381629743, y1: 108, y2: 72});
// offlineChartData.push({x: 1628060029743, y1: 90, y2: 38});
// offlineChartData.push({x: 1630738429743, y1: 33, y2: 48});
// offlineChartData.push({x: 1633416829743, y1: 21, y2: 71});
// offlineChartData.push({x: 1636095229743, y1: 59, y2: 80});
// offlineChartData.push({x: 1638773629743, y1: 11, y2: 64});
// offlineChartData.push({x: 1641452029743, y1: 50, y2: 82});
// offlineChartData.push({x: 1644130429743, y1: 80, y2: 56});
// offlineChartData.push({x: 1646808829743, y1: 50, y2: 60});
// offlineChartData.push({x: 1649487229743, y1: 55, y2: 86});
// offlineChartData.push({x: 1652165629743, y1: 101, y2: 60});
// offlineChartData.push({x: 1654844029743, y1: 81, y2: 74});
// offlineChartData.push({x: 1657522429743, y1: 84, y2: 48});
// offlineChartData.push({x: 1660200829743, y1: 43, y2: 27});
// offlineChartData.push({x: 1662879229743, y1: 11, y2: 33});
// offlineChartData.push({x: 1665557629743, y1: 63, y2: 34});
// offlineChartData.push({x: 1668236029743, y1: 14, y2: 102});
// offlineChartData.push({x: 1670914429743, y1: 109, y2: 70});
// offlineChartData.push({x: 1673592829743, y1: 37, y2: 65});
// offlineChartData.push({x: 1676271229743, y1: 59, y2: 55});
// offlineChartData.push({x: 1678949629743, y1: 11, y2: 104});
// offlineChartData.push({x: 1681628029743, y1: 57, y2: 52});
// offlineChartData.push({x: 1684306429743, y1: 88, y2: 105});
// offlineChartData.push({x: 1686984829743, y1: 28, y2: 78});
// offlineChartData.push({x: 1689663229743, y1: 82, y2: 91});
// offlineChartData.push({x: 1692341629743, y1: 57, y2: 26});
// offlineChartData.push({x: 1695020029743, y1: 82, y2: 94});
for (let i = 0; i < 31; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

const radarData: RadarData[] = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const getFakeChartData: AnalysisData = {
  visitData,
  visitData2,
  // salesData,
  // searchData,
  // bcSchoolsCOVID19Data,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData,
};

export default {
  'GET  /api/fake_chart_data': getFakeChartData,
};
