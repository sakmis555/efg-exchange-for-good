import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Divider from '../../components/Divider'


const rules = [
  {
    required: true,
    message: "required"
  }
]
function Register() {

  const onFinish = (values) => {
    console.log("success",values);
  }
  return (
    <div className='h-screen bg-primary flex justify-center items-center'>
      <div className='bg-whiteLike p-5 rounded w-[450px]'>
        <h1 className='text-primary '>
          EFG -  
          <span className='text-lightGray'>
            {" "}REGISTER
          </span>
        </h1>
        <Divider />
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder='Name'/>
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder='Email'/>
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type='password' placeholder='Password'/>
          </Form.Item>

          <Button className="mt-2" type='primary' htmlType='submit' block>
            Register
          </Button >
          <div className='mt-5 text-center'>
            <span className='text-lightGray'>
              Already have an account? <Link className='text-primary font-bold' to="/login">Login</Link>
            </span>
          </div>

        </Form>
      </div>
    </div>
  )
}

export default Register

