import { HomeOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';

export default () => (
  <DefaultFooter
    copyright="2021 by Prickles & Co. Proudly created by Henry Yi"
    links={[
      // {
      //   key: 'ProjectY',
      //   title: 'Project Y',
      //   href: 'https://projecty.highspeed.vip',
      //   blankTarget: true,
      // },
      {
        key: 'Home',
        title: <HomeOutlined />,
        href: 'https://greens.highspeed.vip',
        blankTarget: true,
      },
      // {
      //   key: 'IP',
      //   title: 'Prickles & Co. Proudly created by Henry Yi',
      //   href: 'https://greens.highspeed.vip',
      //   blankTarget: true,
      // },
    ]}
  />
);
