import { Button, Table, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { UpdateProductStatus } from "../../apicalls/products";
import moment from "moment";
import { GetAllRegisteredUsers } from "../../apicalls/users";

function Users() {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();


  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllRegisteredUsers(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setUsers(response.data);
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
        title: "Role",
        dataIndex: "role",
        render: (text, record) => {
            return record.role.toUpperCase();
          }
      },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      }
    },
    {
      title: "Created At",
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
      <Table columns={columns} dataSource={users} />
      
    </div>
  );
}

export default Users;
