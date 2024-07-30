import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helper/productCategory";
import VerticalSearchCard from "../components/VerticalSearchCard";
import ProductApi from "../common/product";

function CategoryProduct(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach((element) => {
    urlCategoryListObject[element] = true;
  });

  const [selected, setSelected] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState(
    urlCategoryListInArray
  );

  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(ProductApi.FilterProduct.url, {
      method: ProductApi.FilterProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse.data || []);
    setLoading(false);
  };

  const handleSlectedCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelected((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selected)
      .map((SelectedCategoryName) =>
        selected[SelectedCategoryName] ? SelectedCategoryName : null
      )
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el) => `category=${el}`).join("&&");
    navigate("/get-category?" + urlFormat);
  }, [selected, navigate]);

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  const handleOnChangeByShort = (e) => {
    const { value } = e.target;
    setSortBy(value)

    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.selling - b.selling));
    }

    if (value === "dsc") {
      setData((prev) => prev.sort((a, b) => b.selling - a.selling));
    }
  };
useEffect(()=>{

},[sortBy])
  return (
    <div className="container mx-auto p-6">
      <div className=" md:grid grid-cols-[260px,1fr] gap-4">
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          <div>
            <h3 className="text-base font-medium uppercase text-slate-500 border-b border-slate-300 pb-2">
              Sort By
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="sortBy"
                  value={"asc"}
                  checked={sortBy==="asc"}
                  onChange={handleOnChangeByShort}
                />
                <label className="text-base">Price- Low To High</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="sortBy"
                  value={"dsc"}
                  checked={sortBy==="dsc"}
                  onChange={handleOnChangeByShort}
                />
                <label className="text-base">Price- High To Low</label>
              </div>
            </form>
          </div>
          <div>
            <h3 className="text-base font-medium uppercase text-slate-500 border-b border-slate-300 pb-2 py-6">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div key={index} className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    name="category"
                    id={categoryName?.value}
                    value={categoryName?.value}
                    checked={selected[categoryName?.value] || false}
                    onChange={handleSlectedCategory}
                  />
                  <label htmlFor={categoryName?.value}>
                    {categoryName?.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>
        {/* right side screen */}
        <div>
          <h3 className=" text-base text-slate-500">
            Total Results are available :{" "}
            <b className="text-black text-lg">{data.length}</b>
          </h3>

          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {loading ? (
              <div>Loading...</div>
            ) : data.length ? (
              <VerticalSearchCard data={data} loading={loading} />
            ) : (
              <div>No products found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
