import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { GetProducts } from "../../apicalls/products";
import { Input, message } from "antd";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

function Home() {
  const [showFilters, setShowFilters] = useState(true);
  const { user } = useSelector((state) => state.users);
  const firstName = user.name.split(" ")[0];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    age: [],
  });

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);
  return (
    <div className="flex gap-5 bg-whiteLike min-h-screen">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="w-full p-5 px-10">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ml-3 cursor-pointer text-3xl ri-equalizer-line"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
            type="text"
            placeholder="Search products..."
            className="border-2 border-gray-400 rounded w-full p-2 h-14"
          />
        </div>
        <div className="">
          <div
            className={`mt-5 grid gap-5 ${
              showFilters ? "grid-cols-4" : "grid-cols-5"
            }`}
          >
            {products?.map((product) => {
              return (
                <div
                  className="border-2 border-solid border-gray-300 rounded flex flex-col gap-2 cursor-pointer"
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-full h-60 p-2 pb-0 rounded"
                  />
                  <div className="p-2 flex flex-col gap-0">
                    <h1 className="text-lg font-bold">{product.name}</h1>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                    <Divider />
                    <span className="text-green-700 text-xl text-bold mt-0">
                      ₹ {product.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
