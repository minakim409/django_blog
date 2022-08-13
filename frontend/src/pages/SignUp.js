import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import LayoutApp from "../Layout";

import { Layout, Button, Form, Input} from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const validateMessages = {
    required: '${label} is required!',
  };

const Register = () =>{
    const [username, setUsername] = useState("");
    const [realname, setRealname] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // {login, setLogin}
    const navigate = useNavigate();

    const goLogin = () => {
        navigate('/login');
    };

    const onFinish = (values) => {
        console.log(values);
      };

    async function handleRegister(){
        let res;
        try {
            res = await axios.post("http://127.0.0.1:8000/user/register/",{
                username: username,
                realname: realname,
                password: password,
            });

            if(res.status === 201){
                console.log("success");
                setUsername("");
                setRealname("");
                setPassword("");
                setError("");

                alert("successfully registered")
                
                goLogin();
                
            } 
            return;
        }
        catch (e) {
            // console.log(e.response.data);
            // alert("successfully registered")
            setError("此帳號名稱已存在")
            alert(error)
        }
    }

    return (
        <Layout className="layout">
            <LayoutApp></LayoutApp>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'id']}
        label="UserID"
        rules={[
          {
            required: true,
          },
        ]}
        value = {username}
        onChange = {(e)=>setUsername(e.target.value)}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'realname']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
        value = {realname}
        onChange = {(e)=>setRealname(e.target.value)}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
          },
        ]}
        value = {password}
        onChange = {(e)=>setPassword(e.target.value)}
      >
        <Input 
        type="password"
        />
      </Form.Item>
      {/* <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item> */}
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" onClick = {handleRegister}>
          Submit
        </Button>
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
                    placeholder="名字"
                    value = {realname}//curly bracket 은 아마 변해도 되는 값인듯.
                    onChange = {(e)=>setRealname(e.target.value)}></input>
                <input 
                    // className="searchBarInput" 
                    type = "password"
                    placeholder="密碼"
                    value = {password}
                    onChange = {(e)=>setPassword(e.target.value)}></input>
               
                <button onClick = {handleRegister}>Sign Up</button>
                {
                    error === ""?null:(<div className = "errorMes">{error}</div>)
                }
            </div>
        </div> */}
    </Layout>
    )
}

export default Register;