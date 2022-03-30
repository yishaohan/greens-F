import React, { useRef, useState } from 'react';
import { Button, Modal, Divider, Row, Col, Image, Tooltip, Alert, Slider, Tag } from 'antd';
import { LeftCircleOutlined, MoneyCollectTwoTone, RightCircleOutlined } from '@ant-design/icons';
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
  var initialOptions = {
    'client-id': 'AViXcCKHnqll0J1Lh6mZNFeZ626CepBfscyBpuhV3jed0e8ZCvcMzP4n10eB2qx_gKtSfoZYxMOQgb1y',
    currency: 'CAD',
    intent: 'capture',
    // "data-client-token": "abc123xyz=="
  };
  if (process.env.NODE_ENV === 'development') {
    initialOptions = {
      'client-id': 'AYsnjLgEmwy2RIhy0QdO335NCySWCFKnxecxVmVhTVUxLE8hdw_ZNs1LvGD5sH61BErt2JxRuTc7I9Pn',
      currency: 'CAD',
      intent: 'capture',
    }

    // console.log(initialOptions);
  }
  const [closable, setClosable] = useState(true);
  const [visibleArrow, setVisibleArrow] = useState(false);
  const [visibleArrow2, setVisibleArrow2] = useState(false);
  const [imageIndexes, setImageIndexes] = useState([0, 1, 2, 3]);
  const [imageIndexes2, setImageIndexes2] = useState([0, 1, 2, 3]);
  const [visibleStepsForm, setVisibleStepsForm] = useState(false);
  const [visiblePaypalForm, setVisiblePaypalForm] = useState(false);
  const [receiverInfo, setReceiverInfo] = useState<API.ReceiverInfoItem>({});
  const orderInfoRef = useRef<API.OrderInfoItem>({
    quantity1: 0,
    item1_1: 1,
    item1_2: 1,
    item1_3: 1,
    item1_4: 1,
    item1_5: 0,
    item1_6: 0,
    quantity2: 0,
    item2_1: 1,
    item2_2: 1,
    item2_3: 1,
    item2_4: 1,
    item2_5: 0,
    item2_6: 0
  });
  const [isGray, setIsGray] = useState(true);
  const [isGray2, setIsGray2] = useState(true);
  const [total, setTotal] = useState(0);
  const [total2, setTotal2] = useState(0);
  // const [selectedCount, setSelectedCount] = useState(0);
  const [errorInfo, setErrorInfo] = useState('');
  const imageURLs = ["/images/basil.jpeg", "/images/parsley.jpeg", "/images/mint.jpeg", "/images/thyme.jpeg", "/images/cilantro.jpeg", "/images/greenOnion.jpeg"];
  const labels = ["Basil", "Parsley", "Mint", "Thyme", "Cilantro", "Green Onion"];
  const imageURLs2 = ["/images/nantesCarrot.jpeg", "/images/redRadish.jpeg", "/images/butterLettuce.jpeg", "/images/icebergLettuce.jpeg", "/images/gourmetLettuce.jpeg", "/images/redLeafLettuce.jpeg"];
  const labels2 = ["Nantes Carrot", "Red Radish", "Butter Lettuce", "Iceberg Lettuce", "Gourmet Lettuce", "Red Leaf Lettuce"];

  function updateItem(index: number, c: number) {
    if (index === 0) {
      orderInfoRef.current.item1_1 = orderInfoRef.current.item1_1 - 1;
    } else if (index === 1) {
      orderInfoRef.current.item1_2 = orderInfoRef.current.item1_2 - 1;
    } else if (index === 2) {
      orderInfoRef.current.item1_3 = orderInfoRef.current.item1_3 - 1;
    } else if (index === 3) {
      orderInfoRef.current.item1_4 = orderInfoRef.current.item1_4 - 1;
    } else if (index === 4) {
      orderInfoRef.current.item1_5 = orderInfoRef.current.item1_5 - 1;
    } else {
      orderInfoRef.current.item1_6 = orderInfoRef.current.item1_6 - 1;
    }
    index = ((index + c) % 6 + 6) % 6;
    if (index === 0) {
      orderInfoRef.current.item1_1 = orderInfoRef.current.item1_1 + 1;
    } else if (index === 1) {
      orderInfoRef.current.item1_2 = orderInfoRef.current.item1_2 + 1;
    } else if (index === 2) {
      orderInfoRef.current.item1_3 = orderInfoRef.current.item1_3 + 1;
    } else if (index === 3) {
      orderInfoRef.current.item1_4 = orderInfoRef.current.item1_4 + 1;
    } else if (index === 4) {
      orderInfoRef.current.item1_5 = orderInfoRef.current.item1_5 + 1;
    } else {
      orderInfoRef.current.item1_6 = orderInfoRef.current.item1_6 + 1;
    }
  }

  function updateItem2(index: number, c: number) {
    if (index === 0) {
      orderInfoRef.current.item2_1 = orderInfoRef.current.item2_1 - 1;
    } else if (index === 1) {
      orderInfoRef.current.item2_2 = orderInfoRef.current.item2_2 - 1;
    } else if (index === 2) {
      orderInfoRef.current.item2_3 = orderInfoRef.current.item2_3 - 1;
    } else if (index === 3) {
      orderInfoRef.current.item2_4 = orderInfoRef.current.item2_4 - 1;
    } else if (index === 4) {
      orderInfoRef.current.item2_5 = orderInfoRef.current.item2_5 - 1;
    } else {
      orderInfoRef.current.item2_6 = orderInfoRef.current.item2_6 - 1;
    }
    index = ((index + c) % 4 + 4) % 4;
    if (index === 0) {
      orderInfoRef.current.item2_1 = orderInfoRef.current.item2_1 + 1;
    } else if (index === 1) {
      orderInfoRef.current.item2_2 = orderInfoRef.current.item2_2 + 1;
    } else if (index === 2) {
      orderInfoRef.current.item2_3 = orderInfoRef.current.item2_3 + 1;
    } else if (index === 3) {
      orderInfoRef.current.item2_4 = orderInfoRef.current.item2_4 + 1;
    } else if (index === 4) {
      orderInfoRef.current.item2_5 = orderInfoRef.current.item2_5 + 1;
    } else {
      orderInfoRef.current.item2_6 = orderInfoRef.current.item2_6 + 1;
    }
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <GreenPage myFunc={setVisibleStepsForm} />
      <StepsForm

        formProps={{
          validateMessages: {
            required: 'this is a required field',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="Order Form"
              width={800}
              onCancel={() => setVisibleStepsForm(false)}
              visible={visibleStepsForm}
              footer={submitter}
              destroyOnClose
              maskClosable={false}
              closable={closable}
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
                <Button type="primary" key="goToThree" onClick={() => props.onSubmit?.()}>
                  Next
                </Button>,
              ];
            }
            if (props.step === 2) {
              return [
                <Button key="backToTwo" onClick={() => props.onPre?.()}>
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
            name="telephone"
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
        <StepsForm.StepForm name="" title="verify address" initialValues={receiverInfo} >
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
              {receiverInfo.telephone}
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
          initialValues={orderInfoRef.current}
          // initialValues={orderInfoRef.current}
          onFinish={async () => {
            if (orderInfoRef.current.quantity1 === 0 && orderInfoRef.current.quantity2 === 0) {
              setErrorInfo('please select your desired item');
              return false;
            }

            if (orderInfoRef.current.quantity1 === 0) {
              orderInfoRef.current.item1_1 = 0;
              orderInfoRef.current.item1_2 = 0;
              orderInfoRef.current.item1_3 = 0;
              orderInfoRef.current.item1_4 = 0;
              orderInfoRef.current.item1_5 = 0;
              orderInfoRef.current.item1_6 = 0;
            }

            if (orderInfoRef.current.quantity2 === 0) {
              orderInfoRef.current.item2_1 = 0;
              orderInfoRef.current.item2_2 = 0;
              orderInfoRef.current.item2_3 = 0;
              orderInfoRef.current.item2_4 = 0;
              orderInfoRef.current.item2_5 = 0;
              orderInfoRef.current.item2_6 = 0;
            }

            setClosable(false);
            setTotal(orderInfoRef.current.quantity1 * price);
            setTotal2(orderInfoRef.current.quantity2 * price)
            setVisiblePaypalForm(true);
            return true;
          }}
        >

          <Row>
            Herb Kit : 4 pots + blooming manual + plant fertilizer
          </Row>

          <Row justify={'space-between'}>
            <Col>
              <MoneyCollectTwoTone twoToneColor="#FF8800" /> {total} CAD
            </Col>
            <Col>
              {visibleArrow && <Image src={'/images/arrow.png'} style={{ width: 40 }} preview={false} className={'bounce-top'}></Image>}
            </Col>
          </Row>


          <Slider
            defaultValue={0}
            onChange={(value: number) => {
              orderInfoRef.current.quantity1 = value;
              setTotal(value * price);
              if (orderInfoRef.current.quantity1 === 0) {
                setIsGray(true);
              } else {
                setIsGray(false);
              }
              setErrorInfo("");
            }}
            // fieldProps={{
            //   defaultValue: 1,
            //   onChange: (value) => {
            //     setOrderInfo({...orderInfo, quantity: value});
            //     // orderInfoRef.current.quantity = value;
            //     setTotal(value * price);
            //   },
            // }}
            value={orderInfoRef.current.quantity1}
            // initialValue={orderInfoRef.current.quantity}
            marks={{
              0: '0',
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
            min={0}
            max={10}
            step={1}
            // width={'xl'}
          />
          <Row>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={labels[imageIndexes[0]]}>
                    <Image
                      className={isGray ? 'gray' : ''}
                      src={imageURLs[imageIndexes[0]]}
                      preview={false}
                      style={{ width: 100, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <LeftCircleOutlined
                  className={'fb-button'}
                  onClick={() => {
                    if (orderInfoRef.current.quantity1 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem(imageIndexes[0], -1);
                    // ((imageIndexes[0] - 1) % 4 + 4) % 4
                    const temp = [];
                    imageIndexes.map((value) => {
                      temp.push(value);
                    })
                    temp[0] = ((imageIndexes[0] - 1) % 6 + 6) % 6;
                    setImageIndexes(temp);
                  }}
                />
                <RightCircleOutlined
                  className={'fb-button'}
                  onClick={()=>{
                    if (orderInfoRef.current.quantity1 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem(imageIndexes[0], 1);
                    const temp = [];
                    imageIndexes.map((value) => {
                      temp.push(value);
                    })
                    temp[0] = ((imageIndexes[0] + 1) % 6 + 6) % 6;
                    setImageIndexes(temp);
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={labels[imageIndexes[1]]}>
                    <Image
                      className={isGray ? 'gray' : ''}
                      src={imageURLs[imageIndexes[1]]}
                      preview={false}
                      style={{ width: 100, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <LeftCircleOutlined
                  className={'fb-button'}
                  onClick={() => {
                    if (orderInfoRef.current.quantity1 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem(imageIndexes[1], -1);
                    // ((imageIndexes[0] - 1) % 4 + 4) % 4
                    const temp = [];
                    imageIndexes.map((value) => {
                      temp.push(value);
                    })
                    temp[1] = ((imageIndexes[1] - 1) % 6 + 6) % 6;
                    setImageIndexes(temp);
                  }}
                />
                <RightCircleOutlined
                  className={'fb-button'}
                  onClick={()=>{
                    if (orderInfoRef.current.quantity1 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem(imageIndexes[1], 1);
                    const temp = [];
                    imageIndexes.map((value) => {
                      temp.push(value);
                    })
                    temp[1] = ((imageIndexes[1] + 1) % 6 + 6) % 6;
                    setImageIndexes(temp);
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={labels[imageIndexes[2]]}>
                    <Image
                      className={isGray ? 'gray' : ''}
                      src={imageURLs[imageIndexes[2]]}
                      preview={false}
                      style={{ width: 100, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <LeftCircleOutlined
                  className={'fb-button'}
                  onClick={() => {
                    if (orderInfoRef.current.quantity1 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem(imageIndexes[2], -1);
                    // ((imageIndexes[0] - 1) % 4 + 4) % 4
                    const temp = [];
                    imageIndexes.map((value) => {
                      temp.push(value);
                    })
                    temp[2] = ((imageIndexes[2] - 1) % 6 + 6) % 6;
                    setImageIndexes(temp);
                  }}
                />
                <RightCircleOutlined
                  className={'fb-button'}
                  onClick={()=>{
                    if (orderInfoRef.current.quantity1 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem(imageIndexes[2], 1);
                    const temp = [];
                    imageIndexes.map((value) => {
                      temp.push(value);
                    })
                    temp[2] = ((imageIndexes[2] + 1) % 6 + 6) % 6;
                    setImageIndexes(temp);
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={labels[imageIndexes[3]]}>
                    <Image
                      className={isGray ? 'gray' : ''}
                      src={imageURLs[imageIndexes[3]]}
                      preview={false}
                      style={{ width: 100, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <LeftCircleOutlined
                  className={'fb-button'}
                  onClick={() => {
                    if (orderInfoRef.current.quantity1 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem(imageIndexes[3], -1);
                    // ((imageIndexes[0] - 1) % 4 + 4) % 4
                    const temp = [];
                    imageIndexes.map((value) => {
                      temp.push(value);
                    })
                    temp[3] = ((imageIndexes[3] - 1) % 6 + 6) % 6;
                    setImageIndexes(temp);
                  }}
                />
                <RightCircleOutlined
                  className={'fb-button'}
                  onClick={()=>{
                    if (orderInfoRef.current.quantity1 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem(imageIndexes[3], 1);
                    const temp = [];
                    imageIndexes.map((value) => {
                      temp.push(value);
                    })
                    temp[3] = ((imageIndexes[3] + 1) % 6 + 6) % 6;
                    setImageIndexes(temp);
                  }}
                />
              </Row>
            </Col>
          </Row>
          <Row>
            Crunchy Kit : 4 pots + blooming manual + plant fertilizer
          </Row>
          <Row justify={'space-between'}>
            <Col>
              <MoneyCollectTwoTone twoToneColor="#FF8800" /> {total2} CAD
            </Col>
            <Col >
              {visibleArrow2 && <Image src={'/images/arrow.png'} style={{ width: 40 }} preview={false} className={'bounce-top'}></Image>}
            </Col>
          </Row>
          <Slider
            defaultValue={0}
            onChange={(value: number) => {
              // setOrderInfo({ ...orderInfo, quantity2: value });
              orderInfoRef.current.quantity2 = value;
              setTotal2(value * price);
              if (orderInfoRef.current.quantity2 === 0) {
                setIsGray2(true);
              } else {
                setIsGray2(false);
              }
              setErrorInfo("");
            }}
            // fieldProps={{
            //   defaultValue: 1,
            //   onChange: (value) => {
            //     setOrderInfo({...orderInfo, quantity: value});
            //     // orderInfoRef.current.quantity = value;
            //     setTotal(value * price);
            //   },
            // }}
            value={orderInfoRef.current.quantity2}
            // initialValue={orderInfoRef.current.quantity}
            marks={{
              0: '0',
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
            min={0}
            max={10}
            step={1}
            // width={'xl'}
          />
          <Row>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={labels2[imageIndexes2[0]]}>
                    <Image
                      src={imageURLs2[imageIndexes2[0]]}
                      className={isGray2 ? 'gray' : ''}
                      preview={false}
                      style={{ width: 100, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <LeftCircleOutlined
                  className={'fb-button'}
                  onClick={() => {
                    if (orderInfoRef.current.quantity2 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem2(imageIndexes2[0], -1);
                    // ((imageIndexes[0] - 1) % 4 + 4) % 4
                    const temp = [];
                    imageIndexes2.map((value) => {
                      temp.push(value);
                    })
                    temp[0] = ((imageIndexes2[0] - 1) % 4 + 4) % 4;
                    setImageIndexes2(temp);
                  }}
                />
                <RightCircleOutlined
                  className={'fb-button'}
                  onClick={()=>{
                    if (orderInfoRef.current.quantity2 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem2(imageIndexes2[0], 1);
                    const temp = [];
                    imageIndexes2.map((value) => {
                      temp.push(value);
                    })
                    temp[0] = ((imageIndexes2[0] + 1) % 4 + 4) % 4;
                    setImageIndexes2(temp);
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={labels2[imageIndexes2[1]]}>
                    <Image
                      className={isGray2 ? 'gray' : ''}
                      src={imageURLs2[imageIndexes2[1]]}
                      preview={false}
                      style={{ width: 100, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <LeftCircleOutlined
                  className={'fb-button'}
                  onClick={() => {
                    if (orderInfoRef.current.quantity2 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem2(imageIndexes2[1], -1);
                    // ((imageIndexes[0] - 1) % 4 + 4) % 4
                    const temp = [];
                    imageIndexes2.map((value) => {
                      temp.push(value);
                    })
                    temp[1] = ((imageIndexes2[1] - 1) % 4 + 4) % 4;
                    setImageIndexes2(temp);
                  }}
                />
                <RightCircleOutlined
                  className={'fb-button'}
                  onClick={()=>{
                    if (orderInfoRef.current.quantity2 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem2(imageIndexes2[1], 1);
                    const temp = [];
                    imageIndexes2.map((value) => {
                      temp.push(value);
                    })
                    temp[1] = ((imageIndexes2[1] + 1) % 4 + 4) % 4;
                    setImageIndexes2(temp);
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={labels2[imageIndexes2[2]]}>
                    <Image
                      className={isGray2 ? 'gray' : ''}
                      src={imageURLs2[imageIndexes2[2]]}
                      preview={false}
                      style={{ width: 100, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <LeftCircleOutlined
                  className={'fb-button'}
                  onClick={() => {
                    if (orderInfoRef.current.quantity2 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem2(imageIndexes2[2], -1);
                    // ((imageIndexes[0] - 1) % 4 + 4) % 4
                    const temp = [];
                    imageIndexes2.map((value) => {
                      temp.push(value);
                    })
                    temp[2] = ((imageIndexes2[2] - 1) % 4 + 4) % 4;
                    setImageIndexes2(temp);
                  }}
                />
                <RightCircleOutlined
                  className={'fb-button'}
                  onClick={()=>{
                    if (orderInfoRef.current.quantity2 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem2(imageIndexes2[2], 1);
                    const temp = [];
                    imageIndexes2.map((value) => {
                      temp.push(value);
                    })
                    temp[2] = ((imageIndexes2[2] + 1) % 4 + 4) % 4;
                    setImageIndexes2(temp);
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row justify={'center'}>
                <ProCard style={{}} size="small">
                  <Tooltip placement="top" title={labels2[imageIndexes2[3]]}>
                    <Image
                      className={isGray2 ? 'gray' : ''}
                      src={imageURLs2[imageIndexes2[3]]}
                      preview={false}
                      style={{ width: 100, borderRadius: 100, cursor: 'pointer' }}
                    />
                  </Tooltip>
                </ProCard>
              </Row>
              <Row justify={'center'}>
                <LeftCircleOutlined
                  className={'fb-button'}
                  onClick={() => {
                    if (orderInfoRef.current.quantity2 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem2(imageIndexes2[3], -1);
                    // ((imageIndexes[0] - 1) % 4 + 4) % 4
                    const temp = [];
                    imageIndexes2.map((value) => {
                      temp.push(value);
                    })
                    temp[3] = ((imageIndexes2[3] - 1) % 4 + 4) % 4;
                    setImageIndexes2(temp);
                  }}
                />
                <RightCircleOutlined
                  className={'fb-button'}
                  onClick={()=>{
                    if (orderInfoRef.current.quantity2 === 0) {
                      setErrorInfo("please choose a quantity before choosing your combination!");
                      return;
                    }
                    updateItem2(imageIndexes2[3], 1);
                    const temp = [];
                    imageIndexes2.map((value) => {
                      temp.push(value);
                    })
                    temp[3] = ((imageIndexes2[3] + 1) % 4 + 4) % 4;
                    setImageIndexes2(temp);
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
          {visiblePaypalForm && (
            <PayPalScriptProvider options={initialOptions}>
              <CustomPaypalButtons
                total={total + total2}
                receiverInfo={receiverInfo}
                orderInfo={orderInfoRef.current}
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
            style={{ width: '500px'}}
            onClick={() => {
              setTimeout(()=>{
                history.push('/');
              }, 2000);
            }}
          >
            RESET
          </Button>
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
