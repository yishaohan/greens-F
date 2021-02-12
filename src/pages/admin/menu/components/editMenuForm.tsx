import React, { useEffect, useState } from 'react';
import { Form, Input, message, Modal, Select } from 'antd';
import { useIntl } from 'umi';
import { updateMenu, getHigherMenus } from '../services/menuList';
import * as Icon from '@ant-design/icons/lib/icons';
import IconModal from './iconModal';

const FormItem = Form.Item;
const { Option } = Select;

interface EditMenuFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  currentEditMenu: API.MenuListItem;
}

const EditMenuForm: React.FC<EditMenuFormProps> = (props) => {
  const { modalVisible, onCancel, currentEditMenu } = props;
  const [higherMenus, setHigherMenus] = useState<API.MenuListItem[]>([]);
  const [menuGrade, setMenuGrade] = useState<number>(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [iconName, setIconName] = useState<string>(currentEditMenu.menuIcon);
  const [form] = Form.useForm(); // 创建用于管理antd表单数据的实例对象,表单中所有数据都会保存于此
  const intl = useIntl();

  useEffect(() => {
    form.setFieldsValue({
      menuIcon: iconName,
    });
  }, [iconName]);

  const handleSubmit = () => {
    setConfirmLoading(true);
    if (menuGrade === 1) {
      form.setFieldsValue({
        parentId: 0,
      });
    }
    form
      .validateFields()
      .then((values) => {
        // eslint-disable-next-line no-param-reassign
        values.id = currentEditMenu.id;
        // 提交数据到远程服务器
        updateMenu(values as API.MenuListItem)
          .then((response) => {
            if (response.status === 201) {
              setConfirmLoading(false);
              onCancel();
              message.success('编辑菜单成功!').then(() => {});
            } else {
              setConfirmLoading(false);
              message.error(`编辑菜单失败-1: ${response.msg}`).then(() => {});
            }
          })
          .catch((e) => {
            setConfirmLoading(false);
            message.error(`编辑菜单失败-2: ${e}`).then(() => {});
          });
      })
      .catch((info) => {
        console.log(info);
        setConfirmLoading(false);
      });
  };

  // 处理父菜单选择
  const handleParentIdSelectChange = (value: number) => {
    form.setFieldsValue({
      parentId: value,
    });
  };

  // 获取当前菜单的上一级菜单列表
  const handleGetHigherMenus = (menuGradeId: number) => {
    getHigherMenus(menuGradeId)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('出错了!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
        return response.data;
      })
      .then((data) => {
        setHigherMenus(data);
      })
      .catch((e) => {
        message.error(`获取菜单信息出错!${e}`).then(() => {});
      });
  };

  // 处理菜单等级选择
  const handleMenuGradeSelectChange = (value: number) => {
    form.setFieldsValue({
      menuGrade: value,
    });
    setMenuGrade(value);
    handleGetHigherMenus(value);
  };

  // 生命周期钩子, 页面加载时, 自动触发获取菜单列表
  useEffect(() => {
    setMenuGrade(currentEditMenu.menuGrade);
    handleGetHigherMenus(currentEditMenu.menuGrade);
  }, []);

  // @ts-ignore
  return (
    <Modal
      destroyOnClose
      title="编辑菜单"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
    >
      <Form form={form} name="EditMenu" initialValues={currentEditMenu}>
        <FormItem
          name="parentId"
          rules={[
            {
              required: true,
              message: '请选择父权限',
            },
          ]}
          hidden={menuGrade === 1}
        >
          <Select size={'large'} placeholder="上级菜单" onChange={handleParentIdSelectChange}>
            {
              <Option value={0} key={0}>
                无
              </Option>
            }
            {higherMenus.map((menu) => {
              if (menu.menuGrade === 1) {
                return (
                  <Option value={menu.id} key={menu.id}>
                    {menu.menuName}
                  </Option>
                );
              }
              return (
                <Option value={menu.id} key={menu.id} disabled={true}>
                  {menu.menuName}
                </Option>
              );
            })}
          </Select>
        </FormItem>
        <FormItem
          name="menuGrade"
          rules={[
            {
              required: true,
              message: '请选择菜单等级',
            },
          ]}
        >
          <Select size={'large'} placeholder="菜单等级" onChange={handleMenuGradeSelectChange}>
            <Option value={1} key={1}>
              一级菜单
            </Option>
            <Option value={2} key={2}>
              二级菜单
            </Option>
          </Select>
        </FormItem>
        <FormItem
          name="sortId"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'createMenu.sortId.required' }),
            },
          ]}
        >
          <Select size={'large'} placeholder={'请选择显示顺序'}>
            <Option value="1" key="1">
              1
            </Option>
            <Option value="2" key="2">
              2
            </Option>
            <Option value="3" key="3">
              3
            </Option>
            <Option value="4" key="4">
              4
            </Option>
            <Option value="5" key="5">
              5
            </Option>
            <Option value="6" key="6">
              6
            </Option>
            <Option value="7" key="7">
              7
            </Option>
            <Option value="8" key="8">
              8
            </Option>
            <Option value="9" key="9">
              9
            </Option>
          </Select>
        </FormItem>
        <FormItem
          name="menuIcon"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'editMenu.menuIcon.required' }),
            },
          ]}
          // initialValue={iconName}
        >
          <IconModal setIconName={setIconName}>
            <Input
              size="large"
              placeholder={'菜单图标'}
              prefix={iconName && React.createElement(Icon[iconName])}
              value={iconName}
            />
          </IconModal>
        </FormItem>
        <FormItem
          name="menuName"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'editMenu.menuName.required' }),
            },
          ]}
        >
          <Input size="large" placeholder={'菜单名称'} />
        </FormItem>
        <FormItem
          name="menuDescript"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'editMenu.menuDescript.required' }),
            },
          ]}
        >
          <Input size="large" placeholder={'菜单描述'} />
        </FormItem>
        <FormItem
          name="menuPath"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'editMenu.menuPath.required' }),
            },
          ]}
        >
          <Input size="large" placeholder={'菜单路径'} />
        </FormItem>
        <FormItem
          name="menuComponent"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'editMenu.menuComponent.required' }),
            },
          ]}
        >
          <Input
            size="large"
            placeholder={intl.formatMessage({ id: 'editMenu.menuComponent.placeholder' })}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default EditMenuForm;
