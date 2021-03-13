import { HomeOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="© 2021 ProjectY, Inc."
    links={[
      {
        key: 'ProjectY',
        title: 'Project Y',
        href: 'https://projecty.highspeed.vip',
        blankTarget: true,
      },
      {
        key: 'Home',
        title: <HomeOutlined />,
        href: 'https://projecty.highspeed.vip',
        blankTarget: true,
      },
      {
        key: 'IP',
        title: '192.168.0.61',
        href: 'http://192.168.0.61:50080',
        blankTarget: true,
      },
    ]}
  />
);
