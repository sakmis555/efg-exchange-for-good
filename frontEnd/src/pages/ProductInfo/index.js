import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { GetAllBids, GetProductById } from "../../apicalls/products";
import { Button, message } from "antd";
import Divider from "../../components/Divider";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BidModal from "./BidModal";

function ProductInfo() {
  const [showAddNewBid, setShowAddNewBid] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        });
      } else {
        throw new Error(response.message);
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
    product && (
      <div className="h-screen">
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/* Image */}
          <div className="flex flex-col gap-6">
            <img
              className=" rounded-md w-full h-96 object-cover"
              src={product.images[selectedImageIndex]}
              alt=""
            />

            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer" +
                      (selectedImageIndex === index
                        ? "border-1 border-green-600 border-dashed p-2"
                        : "")
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>
            <div>
              <h1>Added On</h1>
              <span>
                {moment(product.createdAt).format("DD-MM-YYYY  hh:mm A")}
              </span>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold text-secondary">
                {product.name}
              </h1>
              <p className="text-gray-600">{product.description}</p>
              <Divider />
              <div className="flex flex-col pr-5">
                <h1 className="text-3xl font-bold text-secondary">
                  Product Details
                </h1>
                <div className="flex justify-between mt-3">
                  <span>Price</span>
                  <span>₹ {product.price}</span>
                </div>
                <div className="flex justify-between mt-3">
                  <span>Category</span>
                  <span className="uppercase">{product.category}</span>
                </div>
                <div className="flex justify-between mt-3">
                  <span>Bill available</span>
                  <span>{product.billAvailable ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between mt-3">
                  <span>Box available</span>
                  <span>{product.boxAvailable ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between mt-3">
                  <span>Accessories available</span>
                  <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between mt-3">
                  <span>Warranty available</span>
                  <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between mt-3">
                  <span>Purchased Year</span>
                  <span>{moment().subtract(product.age, 'years').format("YYYY")} ({product.age} Years Old)</span>
                </div>
              </div>

              <Divider />

              <div className="flex flex-col pr-5">
                <h1 className="text-3xl font-bold text-secondary">
                  Owner Details
                </h1>
                <div className="flex justify-between mt-3">
                  <span>Name</span>
                  <span>{product.seller.name}</span>
                </div>
                <div className="flex justify-between mt-3">
                  <span>Email</span>
                  <span className="">{product.seller.email}</span>
                </div>
              </div>
              <Divider />

              <div className="flex flex-col">
                <div className="flex justify-between mt-3">
                  <h1 className="text-3xl font-bold text-secondary">Bids</h1>
                  <Button
                    type="primary"
                    className="rounded"
                    onClick={() => setShowAddNewBid(!showAddNewBid)}
                    disabled={user._id === product.seller._id}
                  >
                    New Bid
                  </Button>
                </div>

                {product.showBidsOnProductPage &&
                  product.bids.map((bid) => {
                    return (
                      <div className="border border-gray-300 border-solid p-2 mt-5 rounded">
                        <div className="flex justify-between mt-2 text-gray-700">
                          <span>Name</span>
                          <span>{bid.buyer.name}</span>
                        </div>
                        <div className="flex justify-between mt-2 text-gray-500">
                          <span>Bid Amount</span>
                          <span>₹ {bid.bidAmount}</span>
                        </div>
                        <div className="flex justify-between mt-2 text-gray-500">
                          <span>Bid Placed On</span>
                          <span>
                            {moment(bid.createdAt).format(
                              "MMM D, YYYY hh:mm A"
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {showAddNewBid && (
            <BidModal
              showBidModal={showAddNewBid}
              setShowBidModal={setShowAddNewBid}
              product={product}
              getData={getData}
            />
          )}
        </div>
      </div>
    )
  );
}

export default ProductInfo;
