import { Col, Form, Input, Modal, Row, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { AddProduct, EditProduct } from "../../../apicalls/products";
import {SetLoader} from "../../../redux/loadersSlice";

const additionalThings = [
  {
    label : "Bill available",
    name : "billAvailable",
  },
  {
    label : "Warreanty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];

const rules = [
  {
    required: true,
    message: "required",
  }
];

function ProductsForm({ showProductForm, setShowProductForm, selectedProduct, getData }) {








  const dispatch = useDispatch();
  const {user} = useSelector(state => state.users);
  const onFinish = async (values) => {
    try {
      
      dispatch(SetLoader(true));

      let response = null;
      if(selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }
      dispatch(SetLoader(false));
      if(response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }
  const formRef = React.useRef(null);

  useEffect(() => {
    if(selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  },[selectedProduct]);
  return (
    <div>
      <Modal
        title=""
        open={showProductForm}
        onCancel={() => setShowProductForm(false)}
        centered
        width={1000}
        okText="Save"
        onOk={() => {
          formRef.current.submit();
        }}
      >
        <div>
          <h1 className="text-3xl text-primary text-center font-semibold uppercase">
            {selectedProduct ? "Edit Product" : "Add Product"}
          </h1>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef}
              onFinish={onFinish}
            >
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type="text" placeholder="Name" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type="text" placeholder="Description" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" placeholder="Price" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number" placeholder="Age" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select name="" id="">
                    <option value="">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="sports">Sports</option>
                      <option value="properties">Properties</option>
                      <option value="furniture">Furniture</option>
                    </select>
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex gap-10">
                  {additionalThings.map((item) => {
                    return (
                    <Form.Item label={item.label} name={item.name} valuePropName="checked">
                       <Input type="checkbox" value={item.name}
                        onChange={(event) => {
                          formRef.current.setFieldsValue({
                            [item.name] : event.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue(item.name)}
                       />
                    </Form.Item>
                    )
                  })}
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2">
            Images
          </Tabs.TabPane>
        </Tabs>
        </div>
      </Modal>
    </div>
  );
}

export default ProductsForm;
