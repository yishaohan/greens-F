import React, { useRef, useState } from 'react';
import { Button, Modal, Divider, Row, Col, Image, Tooltip, Alert } from 'antd';
import { ShoppingTwoTone, MoneyCollectTwoTone } from '@ant-design/icons';
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
  ProFormSlider,
} from '@ant-design/pro-form';
import './style.css';
import './bootstrap.rtl.css';

export default (): React.ReactNode => {
  const price: number = 3;
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
      setErrorInfo('只能选择 4 件商品');
    } else {
      setErrorInfo('');
    }
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <header className="container-fluid text-center">
        <div className="row subtitle">
          <div className="col w-100 ">
            <span>ESTB</span>
            <img src="/images/title.png" height="180" width="180" alt={''} />
            <span>2021</span>
          </div>
        </div>
        <div className="row title">
          <h2>PRICKLES & CO</h2>
        </div>
        <div className="row subtitle2">
          <h4>BRING NATURE INDOOR</h4>
        </div>
      </header>

      <section className="container-fluid intro">
        <div className="row">
          <div className="col-lg-6 col-sm-12 text-center text-block">
            <h4 className="title-2">ABOUT US</h4>
            <div className="slash"></div>
            <p>
              I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click
              “Edit Text” or double click me to add your own content and make changes to the font.
              Feel free to drag and drop me anywhere you like on your page. I’m a great place for
              you to tell a story and let your users know a little more about you. his is a great
              space to write long text about your company and your services.
            </p>
          </div>
          <div className="col-lg-3 col-sm-6 " style={{ height: '456', width: '460' }}>
            <img src="/images/leave.webp" />
          </div>
          <div
            className="col-lg-3 col-sm-6 overflow-hidden"
            style={{ height: '456', width: '442' }}
          >
            <img src="/images/workspace.webp" />
          </div>
        </div>
      </section>

      <section className="container-fluid order">
        <div className="row">
          <div className="col">
            <div
              id="carouselExampleFade"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
              data-bs-interval="5000"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="/images/plant.webp" className="d-block w-80" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="/images/cacti.webp" className="d-block w-80" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src="/images/succulents.webp" className="d-block w-80" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col text-center text-block">
            <h4 className="title-2">ABOUT THE KIT</h4>
            <hr />
            <p>
              I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click
              “Edit Text” or double click me to add your own content and make changes to the font.
              Feel free to drag and drop me anywhere you like on your page. I’m a great place for
              you to tell a story and let your users know a little more about you. his is a great
              space to write long text about your company and your services. You can use this space
              to go into a little more detail about your company. Talk about your team and what
              services you provide.
            </p>
            {/* <button type="button" className="btn btn-outline-warning">Order Now</button> */}
            <Button
              type="default"
              onClick={() => setVisibleStepsForm(true)}
              shape="round"
              style={{ minWidth: 120 }}
              icon={<ShoppingTwoTone twoToneColor="#FF8800" />}
            >
              Order Now
            </Button>
          </div>
        </div>
      </section>

      <footer className="container-fluid">
        <div className="row info justify-content-center">
          <div className="col-4">
            <div className="title">OUR STORE</div>
            <div className="list">
              <ul>
                <li>Address: 500 Terry Francois</li>
                <li>Street San Francisco, CA 94158</li>
                <li>Phone: 123-456-7890</li>
                <li>Email: info@mysite.com</li>
              </ul>
            </div>
          </div>
          <div className="col-4">
            <div className="title">OUR STORE</div>
            <div className="list">
              <ul>
                <li>Address: 500 Terry Francois Street San Francisco, CA 94158</li>
                <li>Phone: 123-456-7890</li>
                <li>Email: info@mysite.com</li>
              </ul>
            </div>
          </div>
          <div className="col-4">
            <div className="title">OUR STORE</div>
            <div className="list">
              <ul>
                <li>Address: 500 Terry Francois Street San Francisco, CA 94158</li>
                <li>Phone: 123-456-7890</li>
                <li>Email: info@mysite.com</li>
              </ul>
            </div>
          </div>
          <div className="socialMedia text-center">
            <a href="#">
              <img src="/images/facebook.webp" height="24" width="24" />
            </a>
            <a href="#">
              <img src="/images/pinterest.webp" height="24" width="24" />
            </a>
            <a href="#">
              <img src="/images/instagram.webp" height="24" width="24" />
            </a>
          </div>
        </div>
        <div className="row copyright">
          <div className="col text-center">
            © 2021 by Prickles & Co. Proudly created by Henry Yi
          </div>
        </div>
      </footer>

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
            required: '此项为必填项',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="谢谢购买"
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
          title="收件人地址"
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
            width="md"
            label="姓名"
            placeholder="请输入姓名"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="telePhone"
            width="md"
            label="电话"
            placeholder="请输入联系电话"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="email"
            width="md"
            label="邮件"
            placeholder="请输入电子邮件"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="postcode"
            width="md"
            label="邮编"
            placeholder="请输入邮编"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="address"
            width="md"
            label="地址"
            placeholder="请输入邮寄地址"
            rules={[{ required: true }]}
          />
          <ProFormTextArea name="remark" width="lg" placeholder="请输入备注" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="" title="确认地址" initialValues={receiverInfo}>
          <ProFormField width="lg">姓名: {receiverInfo.name}</ProFormField>
          <ProFormField width="lg">电话: {receiverInfo.telePhone}</ProFormField>
          <ProFormField width="lg">邮件: {receiverInfo.email}</ProFormField>
          <ProFormField width="lg">邮编: {receiverInfo.postcode}</ProFormField>
          <ProFormField width="lg">地址: {receiverInfo.address}</ProFormField>
          <ProFormField width="lg">备注: {receiverInfo.remark}</ProFormField>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name=""
          title="确认订单"
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
              setErrorInfo('请选择商品');
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
          <ProFormSlider
            fieldProps={{
              defaultValue: 1,
              onChange: (value) => {
                setOrderInfo({ ...orderInfo, quantity: value });
                // orderInfoRef.current.quantity = value;
                setTotal(value * price);
              },
            }}
            initialValue={orderInfo.quantity}
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
            width={'xl'}
          />
          <Row>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={'西红柿'}>
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
                  <Tooltip placement="top" title={'西红柿'}>
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
                  <Tooltip placement="top" title={'西红柿'}>
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
                  <Tooltip placement="top" title={'西红柿'}>
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
                  <Tooltip placement="top" title={'西红柿'}>
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
                  <Tooltip placement="top" title={'西红柿'}>
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
        <StepsForm.StepForm name="time" title="支付">
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
            REST
          </Button>
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
