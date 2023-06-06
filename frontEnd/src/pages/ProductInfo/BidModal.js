import { Form, Input, Modal, message } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { PlaceNewBid } from "../../apicalls/products";

function BidModal({showBidModal, setShowBidModal, product, getData}) {

  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const rules = [
    {
      required: true,
      message: "required",
    }
  ]
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = PlaceNewBid({
        ...values,
        product : product._id,
        seller : product.seller._id,
        buyer : user._id,
      });
      dispatch(SetLoader(false));
      if( response) {
        message.success("Bid placed successfully");
        getData();
        setShowBidModal(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <Modal 
      onCancel={() => setShowBidModal(false)} 
      open={showBidModal} 
      centered
      width={600}
      className="rounded bg-black"
      okText="Place"
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-secondary text-center">Place New Bid</h1>
      </div>
      <Form
        layout="vertical"
        ref={formRef}
        onFinish={onFinish}
      > 
        <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Mobile No." name="mobileNumber" rules={rules}>
          <Input />
        </Form.Item>
        <Form.Item label="Message" name="message" rules={rules}>
          <Input.TextArea type="number"/>
        </Form.Item>

      </Form>
    </Modal>
  );
}

export default BidModal;
