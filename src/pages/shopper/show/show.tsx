import React, { useRef, useState } from 'react';
import { Button, Modal, Divider, Row, Col, Image, Tooltip, Alert, Slider, Tag } from 'antd';
import { MoneyCollectTwoTone } from '@ant-design/icons';
// @ts-ignore
import CustomPaypalButtons from './components/CustomPaypalButtons';
import './show.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { history } from 'umi';
import ProCard from '@ant-design/pro-card';
import {
  StepsForm,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormField,
  // ProFormSlider,
} from '@ant-design/pro-form';
import GreenPage from '@/pages/shopper/show/components/GreenPage';

export default (): React.ReactNode => {
  const price: number = 30;
  const initialOptions = {
    'client-id': 'AYsnjLgEmwy2RIhy0QdO335NCySWCFKnxecxVmVhTVUxLE8hdw_ZNs1LvGD5sH61BErt2JxRuTc7I9Pn',
    currency: 'CAD',
    intent: 'capture',
    // "data-client-token": "abc123xyz=="
  };

  const [visibleStepsForm, setVisibleStepsForm] = useState(false);
  const [visiblePaypalFrom, setVisiblePaypalFrom] = useState(false);
  const [receiverInfo, setReceiverInfo] = useState<API.ReceiverInfoItem>({});
  const [orderInfo, setOrderInfo] = useState<API.OrderInfoItem>({
    quantity: 1,
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
  });
  const orderInfoRef = useRef<API.OrderInfoItem>({
    quantity: 1,
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
  });
  const [total, setTotal] = useState(price);
  // const [selectedCount, setSelectedCount] = useState(0);
  const selectedCountRef = useRef<number>(0);
  const [errorInfo, setErrorInfo] = useState('');

  // const handleSelectedCount = (value: boolean) => {
  //   console.log(value);
  //   console.log(selectedCount);
  //   if (value === true) {
  //     setSelectedCount(selectedCount + 1);
  //   } else {
  //     setSelectedCount(selectedCount - 1);
  //   }
  //   if (selectedCount > 4) {
  //     setErrorInfo('只能选择4件商品')
  //   } else {
  //     setErrorInfo('')
  //   }
  // }

  const handleSelectedCount = (value: boolean) => {
    if (value) {
      selectedCountRef.current += 1;
    } else {
      selectedCountRef.current -= 1;
    }
    console.log(value);
    console.log(selectedCountRef.current);
    if (selectedCountRef.current > 4) {
      setErrorInfo('you can only select 4 items!');
    } else {
      setErrorInfo('');
    }
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <GreenPage myFunc={setVisibleStepsForm} />
      {/* <section id="two" className="wrapper"> */}
      {/*  <div className="inner alt"> */}
      {/*    <section className="spotlight"> */}
      {/*      <div className="image"><img src="/images/pic01.jpg" alt=""/></div> */}
      {/*      <div className="content"> */}
      {/*        <h3>Magna sed ultrix's</h3> */}
      {/*        <p>Morbi mattis ornare ornare. Duis quam turpis, gravida at leo elementum elit fusce accumsan dui libero, quis vehicula lectus ultricies eu. In convallis amet leo non sapien iaculis efficitur consequat lorem ipsum.</p> */}
      {/*        <Button type="default" onClick={() => setVisibleStepsForm(true)} shape="round" style={{minWidth: 120}} icon={<ShoppingTwoTone twoToneColor="#FF8800"/>}>Buy</Button> */}
      {/*      </div> */}
      {/*    </section> */}
      {/*    <section className="spotlight"> */}
      {/*      <div className="image"><img src="/images/pic02.jpg" alt=""/></div> */}
      {/*      <div className="content"> */}
      {/*        <h3>Ultrices nullam aliquam</h3> */}
      {/*        <p>Morbi mattis ornare ornare. Duis quam turpis, gravida at leo elementum elit fusce accumsan dui libero, quis vehicula lectus ultricies eu. In convallis amet leo non sapien iaculis efficitur consequat lorem ipsum.</p> */}
      {/*        <Button type="default" shape="round" style={{minWidth: 120}} icon={<ShoppingTwoTone/>}>Buy</Button> */}
      {/*      </div> */}
      {/*    </section> */}
      {/*    <section className="special"> */}
      {/*      <ul className="icons labeled"> */}
      {/*        <li><span className="icon solid fa-phone"><span className="label">604 992-9366</span></span></li> */}
      {/*        <li><span className="icon solid fa-mail-bulk"><span className="label">yishaohan@icloud.com</span></span></li> */}
      {/*        <li><span className="icon solid fa-home"><span className="label">shooper.highspeed.vip</span></span></li> */}
      {/*      </ul> */}
      {/*    </section> */}
      {/*  </div> */}
      {/* </section> */}
      <StepsForm
        // onFinish={async (values) => {
        //   // console.log(values);
        //   setVisibleStepsForm(false);
        //   message.success('提交成功');
        // }}

        formProps={{
          validateMessages: {
            required: 'this is a required field',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="thank you for your support!"
              width={800}
              onCancel={() => setVisibleStepsForm(false)}
              visible={visibleStepsForm}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
        submitter={{
          render: (props) => {
            if (props.step === 0) {
              return (
                <Button type="primary" onClick={() => props.onSubmit?.()}>
                  Next
                </Button>
              );
            }
            if (props.step === 1) {
              return [
                <Button key="backToOne" onClick={() => props.onPre?.()}>
                  Previous
                </Button>,
                <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                  Next
                </Button>,
              ];
            }
            if (props.step === 2) {
              return [
                <Button key="backToThree" onClick={() => props.onPre?.()}>
                  Previous
                </Button>,
                <Button type="primary" key="goToFour" onClick={() => props.onSubmit?.()}>
                  Next
                </Button>,
              ];
            }
            return [
              // <Button key="goToThree" onClick={() => props.onPre?.()}>
              //   Previous
              // </Button>,
              // <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
              //   Submit
              // </Button>,
            ];
          },
        }}
      >
        <StepsForm.StepForm
          name="address"
          title="receiver address"
          onFinish={async (values: API.ReceiverInfoItem) => {
            // await waitTime(2000);
            console.log(values);
            setReceiverInfo({ ...values });
            return true;
          }}
          initialValues={receiverInfo}
          layout={'horizontal'}
        >
          <ProFormText
            name="name"
            fieldProps={{ addonBefore: 'name', size: 'large' }}
            width="lg"
            // label="name"
            labelAlign="right"
            placeholder="please enter your name"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="telePhone"
            fieldProps={{ addonBefore: 'phone', size: 'large' }}
            width="lg"
            // label="phone number"
            labelAlign="right"
            placeholder="please enter contact number"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="email"
            fieldProps={{ addonBefore: 'email', size: 'large' }}
            width="lg"
            // label="email"
            labelAlign="right"
            placeholder="please enter your email"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="postcode"
            fieldProps={{ addonBefore: 'postcode', size: 'large' }}
            width="lg"
            // label="postal code"
            labelAlign="right"
            placeholder="please enter postal code"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="address"
            fieldProps={{ addonBefore: 'address', size: 'large' }}
            width="lg"
            // label="address"
            labelAlign="right"
            placeholder="please enter mailing address"
            rules={[{ required: true }]}
          />
          <Divider plain={true} orientation={'left'} style={{ minWidth: '500px' }}>
            comment
          </Divider>
          <ProFormTextArea name="remark" width="lg" placeholder="comment" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="" title="verify address" initialValues={receiverInfo}>
          <ProFormField width="lg">
            <Tag
              style={{
                textAlign: 'right',
                minWidth: '120px',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,1)',
              }}
            >
              name:
            </Tag>
            <Tag color={'green'} style={{ textAlign: 'center', minWidth: '280px' }}>
              {receiverInfo.name}
            </Tag>
          </ProFormField>
          <ProFormField width="lg">
            <Tag
              style={{
                textAlign: 'right',
                minWidth: '120px',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,1)',
              }}
            >
              phone:
            </Tag>
            <Tag color={'green'} style={{ textAlign: 'center', minWidth: '280px' }}>
              {receiverInfo.telePhone}
            </Tag>
          </ProFormField>
          <ProFormField width="lg">
            <Tag
              style={{
                textAlign: 'right',
                minWidth: '120px',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,1)',
              }}
            >
              email:
            </Tag>
            <Tag color={'green'} style={{ textAlign: 'center', minWidth: '280px' }}>
              {receiverInfo.email}
            </Tag>
          </ProFormField>
          <ProFormField width="lg">
            <Tag
              style={{
                textAlign: 'right',
                minWidth: '120px',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,1)',
              }}
            >
              postcode:
            </Tag>
            <Tag color={'green'} style={{ textAlign: 'center', minWidth: '280px' }}>
              {receiverInfo.postcode}
            </Tag>
          </ProFormField>
          <ProFormField width="lg">
            <Tag
              style={{
                textAlign: 'right',
                minWidth: '120px',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,1)',
              }}
            >
              address:
            </Tag>
            <Tag color={'green'} style={{ textAlign: 'center', minWidth: '280px' }}>
              {receiverInfo.address}
            </Tag>
          </ProFormField>
          <ProFormField width="lg">
            <Tag
              style={{
                textAlign: 'right',
                minWidth: '120px',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,1)',
              }}
            >
              comment:
            </Tag>
            <Tag color={'green'} style={{ textAlign: 'center', minWidth: '280px' }}>
              {receiverInfo.remark}
            </Tag>
          </ProFormField>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name=""
          title="verify order"
          initialValues={orderInfo}
          // initialValues={orderInfoRef.current}
          onFinish={async () => {
            // let temp = 1;
            // if (value >= 1) {
            //   temp = value;
            // }
            if (selectedCountRef.current > 4) {
              return false;
            }
            if (selectedCountRef.current === 0) {
              setErrorInfo('please select your desired item');
              return false;
            }
            setTotal(orderInfo.quantity * price);
            setVisiblePaypalFrom(true);
            return true;
          }}
        >
          <ProFormField>
            <MoneyCollectTwoTone twoToneColor="#FF8800" /> {total} CAD
          </ProFormField>
          <Slider
            defaultValue={1}
            onChange={(value: number) => {
              setOrderInfo({ ...orderInfo, quantity: value });
              // orderInfoRef.current.quantity = value;
              setTotal(value * price);
            }}
            // fieldProps={{
            //   defaultValue: 1,
            //   onChange: (value) => {
            //     setOrderInfo({...orderInfo, quantity: value});
            //     // orderInfoRef.current.quantity = value;
            //     setTotal(value * price);
            //   },
            // }}
            value={orderInfo.quantity}
            // initialValue={orderInfoRef.current.quantity}
            marks={{
              1: '1',
              2: '2',
              3: '3',
              4: '4',
              5: '5',
              6: '6',
              7: '7',
              8: '8',
              9: '9',
              10: '10',
            }}
            min={1}
            max={10}
            step={1}
            // width={'xl'}
          />
          <Row>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={'tomato'}>
                    <Image
                      src="/images/1.jpg"
                      className={orderInfo.item1 ? '' : 'gray'}
                      // className={orderInfoRef.current.item1 ? '' : 'gray'}
                      onClick={() => {
                        setOrderInfo({ ...orderInfo, item1: !orderInfo.item1 });
                        // handleSelectedCount(orderInfo.item1);
                        orderInfoRef.current.item1 = !orderInfoRef.current.item1;
                        handleSelectedCount(orderInfoRef.current.item1);
                      }}
                      preview={false}
                      style={{ width: 70, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <ProFormCheckbox
                  fieldProps={{
                    checked: orderInfo.item1,
                    onClick: () => {
                      setOrderInfo({ ...orderInfo, item1: !orderInfo.item1 });
                      // handleSelectedCount(orderInfo.item1);
                      orderInfoRef.current.item1 = !orderInfoRef.current.item1;
                      handleSelectedCount(orderInfoRef.current.item1);
                    },
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={'apple'}>
                    <Image
                      src="/images/2.jpg"
                      className={orderInfo.item2 ? '' : 'gray'}
                      onClick={() => {
                        setOrderInfo({ ...orderInfo, item2: !orderInfo.item2 });
                        // handleSelectedCount(orderInfo.item2);
                        orderInfoRef.current.item2 = !orderInfoRef.current.item2;
                        handleSelectedCount(orderInfoRef.current.item2);
                      }}
                      preview={false}
                      style={{ width: 70, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <ProFormCheckbox
                  fieldProps={{
                    checked: orderInfo.item2,
                    onClick: () => {
                      setOrderInfo({ ...orderInfo, item2: !orderInfo.item2 });
                      // handleSelectedCount(orderInfo.item2);
                      orderInfoRef.current.item2 = !orderInfoRef.current.item2;
                      handleSelectedCount(orderInfoRef.current.item2);
                    },
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={'peach'}>
                    <Image
                      src="/images/3.jpg"
                      className={orderInfo.item3 ? '' : 'gray'}
                      onClick={() => {
                        setOrderInfo({ ...orderInfo, item3: !orderInfo.item3 });
                        // handleSelectedCount(orderInfo.item3);
                        orderInfoRef.current.item3 = !orderInfoRef.current.item3;
                        handleSelectedCount(orderInfoRef.current.item3);
                      }}
                      preview={false}
                      style={{ width: 70, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <ProFormCheckbox
                  fieldProps={{
                    checked: orderInfo.item3,
                    onClick: () => {
                      setOrderInfo({ ...orderInfo, item3: !orderInfo.item3 });
                      // handleSelectedCount(orderInfo.item3);
                      orderInfoRef.current.item3 = !orderInfoRef.current.item3;
                      handleSelectedCount(orderInfoRef.current.item3);
                    },
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={'watermelon'}>
                    <Image
                      src="/images/4.jpg"
                      className={orderInfo.item4 ? '' : 'gray'}
                      onClick={() => {
                        setOrderInfo({ ...orderInfo, item4: !orderInfo.item4 });
                        // handleSelectedCount(orderInfo.item4);
                        orderInfoRef.current.item4 = !orderInfoRef.current.item4;
                        handleSelectedCount(orderInfoRef.current.item4);
                      }}
                      preview={false}
                      style={{ width: 70, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <ProFormCheckbox
                  fieldProps={{
                    checked: orderInfo.item4,
                    onClick: () => {
                      setOrderInfo({ ...orderInfo, item4: !orderInfo.item4 });
                      // handleSelectedCount(orderInfo.item4);
                      orderInfoRef.current.item4 = !orderInfoRef.current.item4;
                      handleSelectedCount(orderInfoRef.current.item4);
                    },
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={'mango'}>
                    <Image
                      src="/images/5.jpg"
                      className={orderInfo.item5 ? '' : 'gray'}
                      onClick={() => {
                        setOrderInfo({ ...orderInfo, item5: !orderInfo.item5 });
                        // handleSelectedCount(orderInfo.item5);
                        orderInfoRef.current.item5 = !orderInfoRef.current.item5;
                        handleSelectedCount(orderInfoRef.current.item5);
                      }}
                      preview={false}
                      style={{ width: 70, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <ProFormCheckbox
                  fieldProps={{
                    checked: orderInfo.item5,
                    onClick: () => {
                      setOrderInfo({ ...orderInfo, item5: !orderInfo.item5 });
                      // handleSelectedCount(orderInfo.item5);
                      orderInfoRef.current.item5 = !orderInfoRef.current.item5;
                      handleSelectedCount(orderInfoRef.current.item5);
                    },
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={'pineapple'}>
                    <Image
                      src="/images/6.jpg"
                      className={orderInfo.item6 ? '' : 'gray'}
                      onClick={() => {
                        setOrderInfo({ ...orderInfo, item6: !orderInfo.item6 });
                        // handleSelectedCount(orderInfo.item6);
                        orderInfoRef.current.item6 = !orderInfoRef.current.item6;
                        handleSelectedCount(orderInfoRef.current.item6);
                      }}
                      preview={false}
                      style={{ width: 70, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <ProFormCheckbox
                  fieldProps={{
                    checked: orderInfo.item6,
                    onClick: () => {
                      setOrderInfo({ ...orderInfo, item6: !orderInfo.item6 });
                      // handleSelectedCount(orderInfo.item6);
                      orderInfoRef.current.item6 = !orderInfoRef.current.item6;
                      handleSelectedCount(orderInfoRef.current.item6);
                    },
                  }}
                />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>{errorInfo !== '' && <Alert message={errorInfo} type="error" />}</Col>
          </Row>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="payment">
          {visiblePaypalFrom && (
            <PayPalScriptProvider options={initialOptions}>
              <CustomPaypalButtons
                total={total}
                receiverInfo={receiverInfo}
                orderInfo={orderInfo}
                setVisibleStepsForm={() => {
                  setVisibleStepsForm(false);
                }}
              />
            </PayPalScriptProvider>
          )}
          <Divider style={{ backgroundColor: '#FF8800' }} />
          <Button
            type="default"
            shape="round"
            style={{ width: '500px' }}
            onClick={() => {
              history.push('/');
            }}
          >
            RESET
          </Button>
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
