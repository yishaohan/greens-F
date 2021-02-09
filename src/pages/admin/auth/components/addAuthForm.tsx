import React, { useState } from 'react';
import { Form, Input, message, Modal, Select } from 'antd';
import { createAuth, getHigherAuths } from '../services/authList';
import { useIntl } from 'umi';

const FormItem = Form.Item;
const { Option } = Select;

interface AddAuthFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const AddAuthForm: React.FC<AddAuthFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const [higherAuths, setHigherAuths] = useState<API.AuthListItem[]>([]);
  const [authGrade, setAuthGrade] = useState<number>(2);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); // 创建用于管理antd表单数据的实例对象,表单中所有数据都会保存于此
  const intl = useIntl();

  const handleSubmit = () => {
    setConfirmLoading(true);
    if (authGrade === 1) {
      form.setFieldsValue({
        parentId: 0,
        requestMethod: '-',
      });
    }
    form
      .validateFields()
      .then((values) => {
        // form.resetFields();
        // 提交数据到远程服务器
        createAuth(values as API.AuthListItem)
          .then((response) => {
            if (response.status === 201) {
              setConfirmLoading(false);
              onCancel();
              message.success('新建权限成功!').then(() => {});
            } else {
              setConfirmLoading(false);
              message.error(`新建权限失败-1: ${response.msg}`).then(() => {});
            }
          })
          .catch((e) => {
            setConfirmLoading(false);
            message.error(`新建权限失败-2: ${e}`).then(() => {});
          });
      })
      .catch((info) => {
        console.log(info);
        setConfirmLoading(false);
      });
  };

  // 获取当前权限的上一级权限列表
  const handleGetHigherAuths = (authGradeId: number) => {
    getHigherAuths(authGradeId)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('出错了!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
        return response.data;
      })
      .then((data) => {
        setHigherAuths(data);
      })
      .catch((e) => {
        message.error(`获取权限信息出错!${e}`).then(() => {});
      });
  };

  // 处理父权限选择
  const handleParentIdSelectChange = (value: number) => {
    form.setFieldsValue({
      parentId: value,
    });
  };

  // 处理权限等级选择
  const handleAuthGradeSelectChange = (value: number) => {
    form.setFieldsValue({
      authGrade: value,
    });
    setAuthGrade(value);
    handleGetHigherAuths(value);
  };

  // 生命周期钩子, 页面加载时, 自动触发获取权限列表
  // useEffect(() => {
  //   handleGetHigherAuths();
  // }, []);

  return (
    <Modal
      destroyOnClose
      title="新建权限"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
    >
      <Form form={form} name="AddAuth">
        <FormItem
          name="authGrade"
          rules={[
            {
              required: true,
              message: '请选择权限等级',
            },
          ]}
        >
          <Select size={'large'} placeholder="权限等级" onChange={handleAuthGradeSelectChange}>
            <Option value={1} key={1}>
              一级权限
            </Option>
            <Option value={2} key={2}>
              二级权限
            </Option>
          </Select>
        </FormItem>
        <FormItem
          name="parentId"
          rules={[
            {
              required: true,
              message: '请选择父权限',
            },
          ]}
          hidden={authGrade === 1}
        >
          <Select size={'large'} placeholder="上级权限" onChange={handleParentIdSelectChange}>
            {/* { */}
            {/*  <Option value={0} key={0}>无</Option> */}
            {/* } */}
            {higherAuths.map((auth) => {
              return (
                <Option value={auth.id} key={auth.id}>
                  {auth.authName}
                </Option>
              );
            })}
          </Select>
        </FormItem>
        <FormItem
          name="authName"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'createAuth.authName.required' }),
            },
          ]}
        >
          <Input
            size="large"
            placeholder={intl.formatMessage({ id: 'createAuth.authName.placeholder' })}
          />
        </FormItem>
        <FormItem
          name="authDescript"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'createAuth.authDescript.required' }),
            },
          ]}
        >
          <Input
            size="large"
            placeholder={intl.formatMessage({ id: 'createAuth.authDescript.placeholder' })}
          />
        </FormItem>
        <FormItem
          name="requestUrl"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'createAuth.requestUrl.required' }),
            },
          ]}
        >
          <Input
            size="large"
            placeholder={intl.formatMessage({ id: 'createAuth.requestUrl.placeholder' })}
          />
        </FormItem>
        <FormItem
          name="requestMethod"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'createAuth.requestMethod.required' }),
            },
          ]}
          hidden={authGrade === 1}
        >
          <Select size={'large'} placeholder={'请求类型'}>
            <Option value="GET" key="GET">
              GET
            </Option>
            <Option value="POST" key="POST">
              POST
            </Option>
            <Option value="PUT" key="PUT">
              PUT
            </Option>
            <Option value="DELETE" key="DELETE">
              DELETE
            </Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddAuthForm;
