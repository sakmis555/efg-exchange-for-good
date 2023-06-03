import { Button, Table, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { GetProducts, UpdateProductStatus } from "../../apicalls/products";
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

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateProductStatus(id, status)
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
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
      render: (text, record) => {
        return record.status.toUpperCase();
      }
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY  hh:mm A");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "pending" && (
              <Button type="primary"
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                Approve
              </Button>
            )}
            {status === "pending" && (
              <Button type="primary"
                className="rounded"
                onClick={() => onStatusUpdate(_id, "rejected")}
              >
                Reject
              </Button>
            )}
            {status === "approved" && (
              <Button type="primary"
                className="rounded"
                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                Block
              </Button>
            )}
            {status === "blocked" && (
              <Button type="primary"
                className="rounded"
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                Unblock
              </Button>
            )}
          </div>
        );
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
