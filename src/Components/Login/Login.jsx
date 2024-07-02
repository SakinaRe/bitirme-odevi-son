import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Logo from '../../assets/logo2.png';
import './Login.css';
const LoginForm = ({ onLogin }) => {
  const onFinish = (values) => {
    const { username, password } = values;
    if (username === 'admin' && password === 'admin') {
      onLogin(true);
    } else {
      onLogin(false);
    }
  };

  return (
    <div className="login-container">
      <div className="background-image" style={{ backgroundImage: `url(${Logo})` }}></div>
      <div className="login-form-container">
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please enter your username!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ accentColor: '#3d5cb8' }}>Remember me</Checkbox>
            </Form.Item>
            <a style={{ float: 'right' }} href="">
              Forgot password?
            </a>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" style={{ width: '100%', backgroundColor: '#3d5cb8', color: 'white' }}>
              Login
            </Button>
            Or <a href="">sign up now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;