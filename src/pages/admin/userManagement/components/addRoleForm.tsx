import React, { useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import { createRole } from '../services/roleList';
import { useIntl } from 'umi';

const FormItem = Form.Item;

interface AddRoleFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const AddRoleForm: React.FC<AddRoleFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm(); // 创建用于管理antd表单数据的实例对象,表单中所有数据都会保存于此
  const intl = useIntl();

  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        // form.resetFields();
        // 提交数据到远程服务器
        createRole(values as API.RoleListItem)
          .then((response) => {
            if (response.status === 201) {
              setConfirmLoading(false);
              onCancel();
              message.success('新建角色成功!').then(() => {});
            } else {
              setConfirmLoading(false);
              message.error(`新建角色失败-1: ${response.msg}`).then(() => {});
            }
          })
          .catch((e) => {
            setConfirmLoading(false);
            message.error(`新建角色失败-2: ${e}`).then(() => {});
          });
      })
      .catch((info) => {
        console.log(info);
        setConfirmLoading(false);
      });
  };

  return (
    <Modal
      destroyOnClose
      title="新建角色"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      <Form form={form} name="AddRole">
        <FormItem
          name="roleName"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'createuser.nickname.required' }),
            },
          ]}
        >
          <Input
            size="large"
            placeholder={intl.formatMessage({ id: 'createuser.nickname.placeholder' })}
          />
        </FormItem>
        <FormItem name="roleDescript">
          <Input
            size="large"
            placeholder={intl.formatMessage({ id: 'createuser.email.placeholder' })}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddRoleForm;
