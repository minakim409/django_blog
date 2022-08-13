import "./style.css";

import React, { useState } from "react";
// import "../csses/input.css";
// import "../csses/button.css";
// import { useHistory } from "react-router";
// import "../csses/App.css";
import { Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import 'antd/dist/antd.css';
import LayoutApp from "../Layout";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Layout } from 'antd';


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

const LogIn = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [userId, setuserId] = useState("");
    const [error, setError] = useState("");
    // {login, setLogin}
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/articles');
    };

    async function handleLogIn(){
        let res;
        try {
            res = await axios.post("http://127.0.0.1:8000/user/login/",{
                username: username,
                password: password,
            });

            if(res.status === 200){
                // console.log("success");
                console.log("res data:", res.data);
                sessionStorage.clear();
                
                window.sessionStorage.setItem('userid', res.data);
                // window.sessionStorage.setItem('id', userId);
                // window.sessionStorage.getItem('id');
                
                //object filter 로 아이디 얻을 수 있지 않을까?
                console.log(res.data);
                // setLogin(true);
                setPassword("");
                setError("");

                alert("Login successfully!")

                goHome();
            } 
            return;
        }
        catch (e) {
            console.log(e.response.data);
            alert(e.response.data.status)
            // console.error(e.response.data);     // NOTE - use "error.response.data` (not "error")
        }
        // catch(e){
        //     console.log(e);
        //     if(e.response.status === 400){
        //         setError("帳號不存在");
        //     }
        //     else if(e.response.status === 401){
        //         setError("Incorrect Password");
        //     }
            
        // }
    }

    return (
        <Layout className="layout">
            <LayoutApp></LayoutApp>
            {/* <Form {...layout}  ></Form> */}
            <Form
            {...layout} 
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleLogIn}
                
        >
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
        value = {username}//curly bracket 은 아마 변해도 되는 값인듯.
        onChange = {(e)=>setUsername(e.target.value)}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
        value = {password}//curly bracket 은 아마 변해도 되는 값인듯.
        onChange = {(e)=>setPassword(e.target.value)}
        
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {/* <a className="login-form-forgot" href="">
          Forgot password
        </a> */}
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" className="login-form-button" >
          Log in
        </Button>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </Form>
        {/* <div>
            <div>
                
                <input 
                    // className="searchBarInput" 
                    placeholder="帳號"
                    value = {username}//curly bracket 은 아마 변해도 되는 값인듯.
                    onChange = {(e)=>setUsername(e.target.value)}></input>
                <input 
                    // className="searchBarInput" 
                    type = "password"
                    placeholder="密碼"
                    value = {password}
                    onChange = {(e)=>setPassword(e.target.value)}></input>
               
                <Button type='primary' onClick = {handleLogIn}> Login </Button>
                {
                    error === ""?null:(<div className = "errorMes">{error}</div>)
                }
            </div>
        </div> */}
    </Layout>
    )
}

export default LogIn;



