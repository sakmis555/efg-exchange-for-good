import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await RegisterUser(values);
      navigate("/login");
      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-whiteLike p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          EFG -<span className="text-lightGray"> REGISTER</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button className="mt-2" type="primary" htmlType="submit" block>
            Register
          </Button>
          <div className="mt-5 text-center">
            <span className="text-lightGray">
              Already have an account?{" "}
              <Link className="text-primary font-bold" to="/login">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
