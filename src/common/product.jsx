const productDomain =import.meta.env.BACKEND_RENDER_API_DOMAIN;

const ProductApi = {
  createProduct: {
    url: `${productDomain}/api/products/create`,
    method: "post",
  },
  allProduct: {
    url: `${productDomain}/api/products/all-product`,
    method: "get",
  },
  updateProduct: {
    url: `${productDomain}/api/products/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${productDomain}/api/products/get-category`,
    method: "get",
  }, 
  SelectCategoryProduct: {
    url: `${productDomain}/api/products/select-category`,
    method: "post",
  },
  ProductDetails: {
    url: `${productDomain}/api/products/product`,
    method: "post",
  },
  SearchProduct: {
    url: `${productDomain}/api/products/search`,
    method: "get",
  },
  FilterProduct: {
    url: `${productDomain}/api/products/category`,
    method: "post",
  }
};

export default ProductApi;
