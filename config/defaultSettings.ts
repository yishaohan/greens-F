import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'realDark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  // primaryColor: '#FF8800',
  contentWidth: 'Fluid',
  layout: 'top',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: true,
  title: 'Project Y',
  pwa: false,
  // Pro5通过此配置文件指定logo有Bug
  // logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
};

export default Settings;
