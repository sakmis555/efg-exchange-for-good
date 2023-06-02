import { Button, Table, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { GetProducts } from "../../apicalls/products";
import moment from "moment";

function Products() {
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();


  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onUpdateStatus = (id, status) => {

  }
  const columns = [
    {
      title: "Product",
      dataIndex: "name",
    },
    {
        title: "Seller",
        dataIndex: "name",
        render : (text, record) => {
            return record.seller.name;
        }
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
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const {status, _id} = record;
        return <div className="flex gap-5">
          {status === "pending" && (
            <Button type="primary" className="rounded"
              onClick={onUpdateStatus(_id, "approved")}
            >
              Approve
            </Button>
          )}
          {status === "pending" && (
            <Button type="primary" className="rounded"
              onClick={onUpdateStatus(_id, "rejected")}
            >
              Reject
            </Button>
          )}
          {status === "approved" && (
            <Button type="primary" className="rounded"
              onClick={onUpdateStatus(_id, "blocked")}
            >
              Block
            </Button>
          )}
          {status === "blocked" && (
            <Button type="primary" className="rounded"
              onClick={onUpdateStatus(_id, "approved")}
            >
              Unblock
            </Button>
          )}

        </div>;
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={products} />
      
    </div>
  );
}

export default Products;
