const cartDomain = import.meta.env.VITE_REACT_APP_BACKEND_DOMAIN;

const CartApi = {
  addtoCart: {
    url: `${cartDomain}/api/cart/addToCart`,
    method: "post",
  },

  itemInCart: {
    url: `${cartDomain}/api/cart/cart-items`,
    method: "get",
  },
  CartItemView: {
    url: `${cartDomain}/api/cart/cart-final`,
    method: "get",
  },
  UpdateCartProduct: {
    url: `${cartDomain}/api/cart/update-cart`,
    method: "post",
  },
  DeleteCartProduct: {
    url: `${cartDomain}/api/cart/delete-cart`,
    method: "post",
  },
};

export default CartApi;
