import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { DeleteProduct, GetProduct } from "../../../apicalls/products";
import moment from "moment";

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = React.useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const dispatch = useDispatch();

  const deleteProduct = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteProduct(id);
      dispatch(SetLoader(false));
      if( response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }
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
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render : (text, record) => {
        return <div className="flex gap-5">
          <i className="ri-delete-bin-7-fill cursor-pointer"
            onClick={() => {
              deleteProduct(record._id);
            }}
          ></i>
          <i className="ri-edit-fill cursor-pointer"
            onClick={() => {
              setSelectedProduct(record);
              setShowProductForm(true);
            }}
          ></i>
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
        <Button type="primary" onClick={() => {
          setSelectedProduct(null);
          setShowProductForm(true);
          }}>
          <div className="text-whiteLike">Add Product</div>
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}
    </div>
  );
}

export default Products;
