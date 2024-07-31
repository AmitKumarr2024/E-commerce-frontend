import ProductApi from "../common/product";

const fetchCategoryWise = async (category) => {
  const response = await fetch(ProductApi.SelectCategoryProduct.url, {
    method: ProductApi.SelectCategoryProduct.method,
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });
  const dataRespose = await response.json();
  return dataRespose.data;
};

export default fetchCategoryWise;
