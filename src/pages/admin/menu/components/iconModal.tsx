import React from 'react';
import { Popover } from 'antd';
import * as Icon from '@ant-design/icons/lib/icons';

interface IconModalProps {
  setIconName: (name: string) => void;
}

const IconModal: React.FC<IconModalProps> = (props) => {
  const { setIconName } = props;
  const iconNames: string[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const key in Icon) {
    if (key.endsWith('Outlined')) {
      iconNames.push(key);
    }
  }
  // 处理图标选择
  const handleIconClick = (name: string) => {
    setIconName(name);
  };
  return (
    <Popover
      title="菜单图标"
      trigger="focus"
      placement="bottomLeft"
      content={() => {
        return (
          <ul
            style={{
              margin: '0',
              padding: '0',
              width: '448px',
              height: '200px',
              overflow: 'auto',
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            {iconNames.map((name) => {
              return (
                <li
                  key={name}
                  onClick={() => {
                    handleIconClick(name);
                  }}
                >
                  {React.createElement(Icon[name], { style: { fontSize: '20px' } })}
                </li>
              );
            })}
          </ul>
        );
      }}
    >
      {props.children}
    </Popover>
  );
};
export default IconModal;
