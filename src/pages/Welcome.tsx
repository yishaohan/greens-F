import React from 'react';
import { Card, Alert } from 'antd';
import { useIntl } from 'umi';

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <Card>
      <Alert
        message={intl.formatMessage({
          id: 'pages.welcome.alertMessage',
          defaultMessage: 'under construction......',
        })}
        type="warning"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
    </Card>
  );
};
