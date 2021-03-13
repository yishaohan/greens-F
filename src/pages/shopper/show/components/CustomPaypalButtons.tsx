// import {useState} from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js';
import { history } from 'umi';
import React from 'react';
import { submitOrder, cancelOrder, errorOrder } from '../services/show';
import { message, notification } from 'antd';

interface PaypalProps {
  total: number;
  receiverInfo?: API.ReceiverInfoItem;
  orderInfo: API.OrderInfoItem;
  setVisibleStepsForm: () => void;
}

const CustomPaypalButtons: React.FC<PaypalProps> = (props) => {
  const { total, receiverInfo, orderInfo, setVisibleStepsForm } = props;
  // const initialOptions = {
  //   "client-id": "AYsnjLgEmwy2RIhy0QdO335NCySWCFKnxecxVmVhTVUxLE8hdw_ZNs1LvGD5sH61BErt2JxRuTc7I9Pn",
  //   currency: "USD",
  //   intent: "capture",
  //   // "data-client-token": "abc123xyz=="
  // };

  // const [{options}, dispatch] = usePayPalScriptReducer();

  // const [currency, setCurrency] = useState(options.currency);

  // function reload() {
  //   dispatch({
  //     type: "resetOptions",
  //     value: {
  //       ...initialOptions,
  //       "data-order-id": Date.now(),
  //     },
  //   });
  // }

  // function onCurrencyChange({target: {value}}) {
  //     console.log(options);
  //     setCurrency(value);
  //     dispatch({
  //         type: "resetOptions",
  //         value: {
  //             ...options,
  //             currency: value,
  //         },
  //     });
  // }

  const handleSubmitOrder = (orderId: string) => {
    const order: API.SubmitOrder = {
      address: '',
      email: '',
      error: '',
      name: '',
      postcode: '',
      remark: '',
      telePhone: '',
      orderId,
      ...receiverInfo,
      ...orderInfo,
    };
    submitOrder(order)
      .then((response) => {
        if (response.status === 201) {
          notification.open({
            type: 'success',
            message: 'Thank You !',
            duration: 10,
            description: 'Thank You ... ...',
          });
        } else {
          notification.open({
            type: 'error',
            message: '提交订单失败-1 !',
            duration: 0,
            description: response.msg,
          });
          // message.error(`提交订单失败-1: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        notification.open({
          type: 'error',
          message: '提交订单失败-2 !',
          duration: 0,
          description: e,
        });
        // message.error(`提交订单失败-2: ${e}`).then(() => {});
      });
  };

  const handleCancelOrder = (orderId: string) => {
    notification.open({
      type: 'warning',
      message: 'Cancel Order !',
      duration: 3,
      description: '可以一会重新支付当前订单!',
    });
    const order: API.SubmitOrder = {
      address: '',
      email: '',
      error: '',
      name: '',
      postcode: '',
      remark: '',
      telePhone: '',
      orderId,
      ...receiverInfo,
      ...orderInfo,
    };
    cancelOrder(order)
      .then((response) => {
        if (response.status === 201) {
          console.log('记录取消的订单成功');
        } else {
          message.error(`记录取消的订单失败-1: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`记录取消的订单失败-2: ${e}`).then(() => {});
      });
  };

  const handleErrorOrder = (error: string) => {
    notification.open({
      type: 'error',
      message: 'anything was wrong !',
      duration: 0,
      description: 'Please try again ! please yishaohan@icloud.com',
    });
    const order: API.SubmitOrder = {
      address: '',
      email: '',
      name: '',
      orderId: '',
      postcode: '',
      remark: '',
      telePhone: '',
      error,
      ...receiverInfo,
      ...orderInfo,
    };
    errorOrder(order)
      .then((response) => {
        if (response.status === 201) {
          console.log('记录失败的订单成功');
        } else {
          message.error(`记录失败的订单失败-1: ${response.msg}`).then(() => {});
        }
      })
      .catch((e) => {
        message.error(`记录失败的订单失败-2: ${e}`).then(() => {});
      });
  };

  const items = [
    {
      description: 'YYY',
      amount: {
        currency_code: 'CAD',
        value: total,
      },
    },
  ];

  const onInit = (data: any, actions: any) => {
    console.log('Into onInit ... ...');
    console.log(data);
    console.log(actions);
  };

  const onClick = (data: any, actions: any) => {
    console.log('Into onClick ... ...');
    console.log(data);
    console.log(actions);
  };

  const createOrder = (data: any, actions: any) => {
    console.log('Into createOrder ... ...');
    console.log(data);
    console.log(actions);
    return actions.order.create({
      purchase_units: items,
    });
  };

  const onShippingChange = () => {
    console.log('Into onShippingChange');
  };

  const onApprove = (data: any, actions: { order: { capture: () => Promise<any> } }) => {
    console.log('Into onApprove ... ...');
    console.log(data);
    console.log(actions);
    actions.order.capture().then((details: any) => {
      console.log('Into onApprove - capture ...');
      console.log(details);
      handleSubmitOrder(details.id);
      setVisibleStepsForm();
      history.push('/');
      // this.setState({showButtons: false, paid: true});
    });
  };

  const onCancel = (data: any) => {
    console.log('Into onCancel ...');
    console.log(data);
    setVisibleStepsForm();
    handleCancelOrder(data.orderID);
    // reload();
  };

  const onError = (err: any) => {
    console.log('Into onError ...');
    setVisibleStepsForm();
    handleErrorOrder(err.message);
    history.push('/');
  };

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    // <PayPalScriptProvider options={initialOptions}>
    <PayPalButtons
      style={{ layout: 'vertical', height: 35 }}
      onInit={onInit}
      onClick={onClick}
      createOrder={createOrder}
      onShippingChange={onShippingChange}
      // @ts-ignore
      onApprove={onApprove}
      onCancel={onCancel}
      onError={onError}
    />
    // </PayPalScriptProvider>
  );
};

export default CustomPaypalButtons;
