import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductApi from "../common/product";
import VerticalSearchCard from "../components/VerticalSearchCard";

function Search(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = useLocation();
  
  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(ProductApi.SearchProduct.url + query.search);

    const dataResponse = await response.json();
    setLoading(false);
    console.log("dataResponse", dataResponse);
    setData(dataResponse.data);
    
  };
  useEffect(() => {
    fetchProduct();
  }, [query]);
  return (
    <div className="container mx-auto p-4">
      {loading && (
        <p className=" text-2xl font-medium text-center">Loading...</p>
      )}

      <p className=" text-xl text-slate-500">
        Total Results are available :{" "}
        <b className="text-black text-xl">{data.length}</b>
      </p>

      {data.length === 0 && !loading && (
        <p className=" bg-white text-center p-4 shadow-sm text-3xl">
          No Result found...
        </p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalSearchCard loading={loading} data={data}/>
      )}
    </div>
  );
}

export default Search;
