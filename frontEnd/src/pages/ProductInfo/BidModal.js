import { Form, Input, Modal } from "antd";
import React, { useRef } from "react";

function BidModal({showBidModal, setShowBidModal, product, getData}) {

  const formRef = useRef(null);
  const rules = [
    {
      required: true,
      message: "required",
    }
  ]
  const onFinish = () => {
    try {
      
    } catch (error) {
      
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
