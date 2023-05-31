import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { GetProduct } from "../../../apicalls/products";

function Products() {
  const [products, setProducts] = React.useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProduct();
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render : (text, record) => {
        return <div className="flex gap-5">
          <i className="ri-delete-bin-7-fill"></i>
          <i className="ri-edit-fill"></i>
        </div>
      }
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button type="primary" onClick={() => setShowProductForm(true)}>
          <div className="text-whiteLike">Add Product</div>
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
        />
      )}
    </div>
  );
}

export default Products;
