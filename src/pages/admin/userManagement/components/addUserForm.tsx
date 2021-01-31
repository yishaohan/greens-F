import React, { useState } from 'react';
import { Form, Input, message, Modal, Popover, Progress, Select, Upload } from 'antd';
import styles from '@/pages/user/register/style.less';
import { FormattedMessage, useIntl } from 'umi';
import { createUser, UserListItem, uploadUserAvatarURL } from '../services/userList';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/lib/upload/interface';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userregister.strength.short" />
    </div>
  ),
};
const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

export type UserRegisterParams = {
  username: string;
  password: string;
  confirmPassword: string;
  mobilePhone: string;
  smsCaptcha: string;
  mobilePhonePrefix: string;
};

interface AddUserFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setvisible]: [boolean, any] = useState(false);
  const [prefix, setprefix]: [string, any] = useState('1');
  const [popover, setpopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  const [form] = Form.useForm(); // 创建用于管理antd表单数据的实例对象,表单中所有数据都会保存于此
  const intl = useIntl();

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(intl.formatMessage({ id: 'userregister.password.twice' }));
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setvisible(!!value);
      return promise.reject(intl.formatMessage({ id: 'userregister.password.required' }));
    }
    // 有值的情况
    if (!visible) {
      setvisible(!!value);
    }
    setpopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const changePrefix = (value: string) => {
    setprefix(value);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        // form.resetFields();
        // 提交数据到远程服务器
        createUser(values as UserListItem)
          .then((response) => {
            if (response.status === 201) {
              message.success('新建用户成功!').then(() => {
                setConfirmLoading(false);
                onCancel();
              });
            } else {
              message.error(`新建用户失败-1: ${response.msg}`).then(() => {
                setConfirmLoading(false);
              });
            }
          })
          .catch((e) => {
            message.error(`新建用户失败-2: ${e}`).then(() => {
              setConfirmLoading(false);
            });
          });
      })
      .catch((info) => {
        console.log(info);
        setConfirmLoading(false);
      });
  };

  // const {loading, imageUrl} = this.state;  // 类组件使用此方式, 因为这里是函数式组件, 所以使用以下的方式
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl('');
      console.log(info.file.response);
    }
  };

  return (
    <Modal
      destroyOnClose
      title="新建用户"
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      <Form form={form} name="UserRegister">
        <FormItem name={'avatarURL'}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={uploadUserAvatarURL()}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </FormItem>
        <FormItem
          name="nickname" // mail ???????????????????????????????????????????????????????//
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
        <FormItem
          name="username" // mail ???????????????????????????????????????????????????????//
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'createuser.email.required' }),
            },
            {
              type: 'email',
              message: intl.formatMessage({ id: 'createuser.email.wrong-format' }),
            },
          ]}
        >
          <Input
            size="large"
            placeholder={intl.formatMessage({ id: 'createuser.email.placeholder' })}
          />
        </FormItem>
        <Popover
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }
            return node;
          }}
          content={
            visible && (
              <div style={{ padding: '4px 0' }}>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div style={{ marginTop: 10 }}>
                  <FormattedMessage id="createuser.strength.msg" />
                </div>
              </div>
            )
          }
          overlayStyle={{ width: 240 }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input
              size="large"
              type="password"
              placeholder={intl.formatMessage({ id: 'createuser.password.placeholder' })}
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirmPassword" // confirm ??????????????????????????????????????????????
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'createuser.confirm-password.required' }),
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder={intl.formatMessage({ id: 'createuser.confirm-password.placeholder' })}
          />
        </FormItem>
        <InputGroup compact>
          <Select size="large" value={prefix} onChange={changePrefix} style={{ width: '20%' }}>
            <Option value="1">+1</Option>
            <Option value="86">+86</Option>
          </Select>
          <FormItem
            style={{ width: '80%' }}
            name="mobilePhone" // mobile ???????????????????????????????????????????????????????????
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'createuser.phone-number.required' }),
              },
              {
                pattern: /^\d{10}$/,
                message: intl.formatMessage({ id: 'createuser.phone-number.wrong-format' }),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={intl.formatMessage({ id: 'createuser.phone-number.placeholder' })}
            />
          </FormItem>
        </InputGroup>
      </Form>
    </Modal>
  );
};

export default AddUserForm;
