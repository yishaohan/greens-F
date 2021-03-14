import {
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  // TaobaoCircleOutlined,
  UserOutlined,
  // WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import type { LoginParamsType } from './services/login';
import { doLogin, getSmsCaptcha } from './services/login';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import styles from './index.less';
import { generatorMenuTree, generatorMenuData, getUserMenus } from '@/utils/utils';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    // const {query} = history.location;
    // const {redirect} = query as { redirect: string };
    // history.push(redirect || '/commodity/statistics');
    history.push('/commodity/statistics');
  }, 10);
};

// 在TS中如何定义常量/变量
// const 常量名称: 数据类型 = 值 ;
// React.FC === React.FunctionComponent === 函数式组件
const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();
  const [form] = ProForm.useForm();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      // ?????????????????????????????????????????????????????
      // 登录成功后,获取用户菜单
      let menus: API.MenuListItem[] = [];
      if (userInfo !== undefined) {
        menus = getUserMenus(userInfo);
        menus = generatorMenuTree(menus);
        // 根据获取到的菜单生成AntD Pro MenuDataItem[]
        const menuData = generatorMenuData(menus);
        setInitialState({
          ...initialState,
          currentUser: userInfo,
          menuData,
          // settings: {
          //   menu: {
          //     loading: false,
          //   },
          // },
        });
      }
      console.log(initialState!.currentUser);
      // ?????????????????????????????????????????????????????

      // setInitialState({
      //   ...initialState,
      //   currentUser: userInfo,
      // });
    }
  };

  useEffect(() => {
    const autoLogin = Cookies.get('autoLogin');
    console.log('autoLogin', autoLogin);
    if (autoLogin === 'true') {
      goto();
    }
  }, []);

  // 提交登录表单
  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await doLogin({ ...values, type });
      if (msg.status === 200) {
        message.success('login success！');
        await fetchUserInfo();
        console.log(msg);
        Cookies.set('autoLogin', `${values.autoLogin}`, { expires: 7 });
        goto(); // 登录成功后跳转
        return;
      }
      message.error(msg.msg, 10);

      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      console.log(`login fained，please try again!${error}`);
      message.error(`login failed, please try again!${error}`);
    }
    setSubmitting(false);
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={'/logo.png'} />
              <span className={styles.title}>Project Y</span>
            </Link>
          </div>
          <div className={styles.desc}>Greens ......</div>
        </div>

        <div className={styles.main}>
          <ProForm
            form={form}
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: 'login',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(values as LoginParamsType);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: 'account password login',
                })}
              />
              <Tabs.TabPane
                key="mobile"
                tab={intl.formatMessage({
                  id: 'pages.login.phoneLogin.tab',
                  defaultMessage: 'phone number login',
                })}
              />
            </Tabs>

            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: 'username or password failed',
                })}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: 'username: admin or user',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="please enter username!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockTwoTone className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: 'password: ant.design',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="please enter password！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}

            {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
            {type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileTwoTone className={styles.prefixIcon} />,
                  }}
                  name="mobilePhone"
                  placeholder={intl.formatMessage({
                    id: 'pages.login.phoneNumber.placeholder',
                    defaultMessage: 'phone number',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.required"
                          defaultMessage="please enter phone number！"
                        />
                      ),
                    },
                    {
                      pattern: /^\d{10}$/,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.invalid"
                          defaultMessage="phone number format error！"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <MailTwoTone className={styles.prefixIcon} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.captcha.placeholder',
                    defaultMessage: 'please enter verification code',
                  })}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${intl.formatMessage({
                        id: 'pages.getCaptchaSecondText',
                        defaultMessage: 'get verification code',
                      })}`;
                    }
                    return intl.formatMessage({
                      id: 'pages.login.phoneLogin.getVerificationCode',
                      defaultMessage: 'get verification code',
                    });
                  }}
                  name="smsCaptcha"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.captcha.required"
                          defaultMessage="please enter verification code！"
                        />
                      ),
                    },
                  ]}
                  onGetCaptcha={async (mobilePhone) => {
                    console.log('mobilePhone', mobilePhone);
                    const tempMobilePhone = form.getFieldValue('mobilePhone');
                    if (!tempMobilePhone) {
                      message.error('please enter phone number!', 10);
                      return;
                    }
                    const m = form.getFieldsError(['mobilePhone']);
                    if (m[0].errors.length > 0) {
                      message.error('phone number format error', 10);
                      return;
                    }
                    const result = await getSmsCaptcha(tempMobilePhone);
                    console.log(result);
                    if (result.status !== 201) {
                      message.error('did not receive verification code!');
                      message.error(result.msg);
                      return;
                    }
                    message.success('received verification code');
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              {/* <ProFormCheckbox noStyle name="autoLogin"> */}
              {/*  <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录"/> */}
              {/* </ProFormCheckbox> */}
              {/* <a */}
              {/*  style={{ */}
              {/*    float: 'right', */}
              {/*  }} */}
              {/* > */}
              {/*  <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码"/> */}
              {/* </a> */}
            </div>
          </ProForm>
          {/* <Space className={styles.other}> */}
          {/*  <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式"/> */}
          {/*  /!* <TaobaoCircleOutlined className={styles.icon}/> *!/ */}
          {/*  /!* <WeiboCircleOutlined className={styles.icon}/> *!/ */}
          {/*  <GoogleOutlined className={styles.icon}/> */}
          {/*  <GithubOutlined className={styles.icon}/> */}
          {/*  <AlipayCircleOutlined className={styles.icon}/> */}
          {/* </Space> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
