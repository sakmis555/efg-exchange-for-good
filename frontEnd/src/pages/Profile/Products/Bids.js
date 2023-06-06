import { Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { GetAllBids } from "../../../apicalls/products";
import moment from "moment";
import Divider from "../../../components/Divider";

function Bids({ showBidsModel, setShowBidModel, selectedProduct }) {
  const [bidsData, setBidsData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({
        product: selectedProduct._id,
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
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.buyer.name;
      }
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Data",
      dataIndex: "bidData",
      render: (text, record) => {
        return moment(text).format("MMMM D YYYY, h:mm A");
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone: {record.mobileNumber}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <Modal
      open={showBidsModel}
      onCancel={() => setShowBidModel(false)}
      centered
      width={1000}
      footer={null}
    >
      <div className="flex gap-5 flex-col">
        <h1 className="text-secondary text-2xl">Bids</h1>
        <Divider />
        <h1 className="text-grayLike text-xl mt-2">
          Product Name : {selectedProduct.name}
        </h1>
        <Table columns={columns} dataSource={bidsData} />
      </div>
    </Modal>
  );
}

export default Bids;
