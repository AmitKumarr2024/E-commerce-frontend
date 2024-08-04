const domain = import.meta.env.VITE_REACT_APP_BACKEND_DOMAIN;

const PaymentOrderApi = {
  payment: {
    url: `${domain}api/payment/checkout`,
    method: "post",
  },
  getOrder: {
    url: `${domain}api/payment/order-list`,
    method: "get",
  },
  cancelOrder: {
    url: `${domain}api/payment/orders`,
    method: "post",
  },
  allOrder: {
    url: `${domain}api/payment/all-order`,
    method: "get",
  },
  emailConfirmOrder: {
    url: `${domain}api/payment/send-order-confirmation`,
    method: "post",
  },
};

export default PaymentOrderApi;
