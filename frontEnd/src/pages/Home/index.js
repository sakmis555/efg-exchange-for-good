import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { GetProducts } from "../../apicalls/products";
import { message } from "antd";
import Divider from "../../components/Divider";
import {useNavigate} from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.users);
  const firstName = user.name.split(" ")[0];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ status: "approved" });

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
  }, []);
  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        {products?.map((product) => {
          return (
            <div className="border border-solid border-grayLike rounded flex flex-col gap-2 cursor-pointer"
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.images[0]}
                alt=""
                className="w-full h-40 object-cover"
              />
              <div className="p-2 flex flex-col gap-0">
                <h1 className="text-lg font-bold">{product.name}</h1>
                <p className="text-sm text-gray-500">{product.description}</p>
                <Divider />
                <span className="text-green-600 text-lg text-semibold mt-0">₹ {product.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
