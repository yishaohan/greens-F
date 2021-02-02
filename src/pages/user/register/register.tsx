import { Form, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import type { Dispatch } from 'umi';
import { Link, connect, history, FormattedMessage, useIntl } from 'umi';
import type { StateType } from './services/model';
import styles from './style.less';
import { SelectLang } from '@@/plugin-locale/SelectLang';
import { getSmsCaptcha } from './services/register';

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

type UserRegisterProps = {
  dispatch: Dispatch;
  userRegister: StateType;
  submitting: boolean;
};

export type UserRegisterParams = {
  username: string;
  password: string;
  confirmPassword: string;
  mobilePhone: string;
  smsCaptcha: string;
  mobilePhonePrefix: string;
};

const UserRegister: FC<UserRegisterProps> = ({ dispatch, userRegister, submitting }) => {
  const [count, setcount]: [number, any] = useState(0);
  const [visible, setvisible]: [boolean, any] = useState(false);
  const [prefix, setprefix]: [string, any] = useState('1');
  const [popover, setpopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm(); // 创建用于管理antd表单数据的实例对象,表单中所有数据都会保存于此

  const intl = useIntl();

  useEffect(() => {
    if (!userRegister) {
      return;
    }
    const account = form.getFieldValue('username');
    if (userRegister.status === 201) {
      message.success(intl.formatMessage({ id: `${userRegister.msg}` }));
      history.push({
        pathname: '/user/login',
        state: {
          account,
        },
      });
    } else if (
      userRegister.status === 422 ||
      userRegister.status === 400 ||
      userRegister.status === 500
    ) {
      message.error(intl.formatMessage({ id: `${userRegister.msg}` }), 10);
      if (userRegister.data) {
        message.error(intl.formatMessage({ id: `${userRegister.data[0]}` }), 10);
      }
    }
  }, [userRegister]);

  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [],
  );

  // 获取验证码
  const onGetSmsCaptcha = async () => {
    const mobile = form.getFieldValue('mobilePhone');
    if (!mobile || mobile.length !== 10) {
      message.error(intl.formatMessage({ id: 'userregister.phone-number.required' }));
      return;
    }
    // 开始倒计时
    let counts = 59;
    setcount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setcount(counts);
      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
    // 发送网络请求
    const data = await getSmsCaptcha(mobile);
    if (data.status === 201) {
      message.success(intl.formatMessage({ id: `${data.msg}` }));
    } else if (data.status === 422 || data.status === 400 || data.status === 500) {
      message.error(intl.formatMessage({ id: `${data.msg}` }), 10);
      if (data.data) {
        message.error(intl.formatMessage({ id: `${data.data[0]}` }), 10);
      }
    }
  };

  //
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

  // 提交注册信息
  const onFinish = (values: Record<string, any>) => {
    dispatch({
      type: 'userRegister/submit',
      payload: {
        ...values,
        prefix,
      },
    });
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

  return (
    <div className={styles.container}>
      <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.png" />
              <span className={styles.title}>Project Y</span>
            </Link>
          </div>
          <div className={styles.desc}>Project Y 项目描述 ......</div>
        </div>
        <div className={styles.main}>
          <Form form={form} name="UserRegister" onFinish={onFinish}>
            <FormItem
              name="username" // mail ???????????????????????????????????????????????????????//
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'userregister.email.required' }),
                },
                {
                  type: 'email',
                  message: intl.formatMessage({ id: 'userregister.email.wrong-format' }),
                },
              ]}
            >
              <Input
                size="large"
                placeholder={intl.formatMessage({ id: 'userregister.email.placeholder' })}
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
                      <FormattedMessage id="userregister.strength.msg" />
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
                  placeholder={intl.formatMessage({ id: 'userregister.password.placeholder' })}
                />
              </FormItem>
            </Popover>
            <FormItem
              name="confirmPassword" // confirm ??????????????????????????????????????????????
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({ id: 'userregister.confirm-password.required' }),
                },
                {
                  validator: checkConfirm,
                },
              ]}
            >
              <Input
                size="large"
                type="password"
                placeholder={intl.formatMessage({
                  id: 'userregister.confirm-password.placeholder',
                })}
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
                    message: intl.formatMessage({ id: 'userregister.phone-number.required' }),
                  },
                  {
                    pattern: /^\d{10}$/,
                    message: intl.formatMessage({ id: 'userregister.phone-number.wrong-format' }),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={intl.formatMessage({ id: 'userregister.phone-number.placeholder' })}
                />
              </FormItem>
            </InputGroup>
            <Row gutter={8}>
              <Col span={16}>
                <FormItem
                  name="smsCaptcha" // captcha ????????????????????????????????????????????????????//
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: 'userregister.verification-code.required',
                      }),
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder={intl.formatMessage({
                      id: 'userregister.verification-code.placeholder',
                    })}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={!!count}
                  className={styles.getCaptcha}
                  onClick={onGetSmsCaptcha}
                >
                  {count
                    ? `${count} s`
                    : intl.formatMessage({ id: 'userregister.register.get-verification-code' })}
                </Button>
              </Col>
            </Row>
            <FormItem>
              <Button
                size="large"
                loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                <FormattedMessage id="userregister.register.register" />
              </Button>
              <Link className={styles.login} to="/user/login">
                <FormattedMessage id="userregister.register.sign-in" />
              </Link>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({
    userRegister,
    loading,
  }: {
    userRegister: StateType;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    userRegister,
    submitting: loading.effects['userRegister/submit'],
  }),
)(UserRegister);
