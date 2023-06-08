import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Divider from "../../../components/Divider";
import { GetAllBids } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loadersSlice";

function UserBids() {
  const [bidsData, setBidsData] = useState([]);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setBidsData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(true));
      message.error(error.message);
    }
  };

  const columns = [
    {
        title: "Product",
        dataIndex: "image",
        render: (text, record) => {
            console.log(record)
          return (
            <img
              src={record?.product.images?.length > 0 ? record.product.images[0] : ""}
              alt=""
              className="w-20 h-20 object-cover rounded-md"
            />
            
          );
        },
      },
    {
      title: "Product",
      dataIndex: "product",
      render: (text, record) => {
        return record.product.name;
      },
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Original Amount",
      dataIndex: "originalAmount",
      render: (text, record) => {
        return record.product.price;
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid placed on",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm A");
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex gap-5 flex-col w-full bg-whiteLike">
      <h1 className="text-secondary text-2xl ml-5">Bids</h1>
      <Divider />
      <Table
        className="flex items-center justify-center w-full"
        style={{ width: "1400px", marginLeft: "50px" }}
        columns={columns}
        dataSource={bidsData}
      />
    </div>
  );
}

export default UserBids;
