import "./style.css";

import React, { useState } from "react";
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

const Logout = () =>{
   
    const [userId, setuserId] = useState("");
   
    const navigate = useNavigate();

    
    // author: window.sessionStorage.getItem("userid"),
    async function handleLogout(){
        let res;
        // console.log("handle logout!!!")
        try {
            res = await axios.post("http://127.0.0.1:8000/user/logout/",{
                id: window.sessionStorage.getItem("userid"),
            });

            if(res.status === 200){
                console.log(res.data);
                window.sessionStorage.clear();
                alert("Logout from your account")
                navigate('/login');
                // window.location.replace('http://localhost:3000/user/login');
            } 
            return;
        }
        catch (e) {
            console.log(e.response.data);
            alert(e.response.data.status)
            navigate('/login');
            // console.error(e.response.data);     // NOTE - use "error.response.data` (not "error")
        }
    
    }

    return (
        <Layout className="layout">
            <LayoutApp></LayoutApp>
        <div> 
            <Button type="primary"  onClick={handleLogout}>
                Logout
            </Button>
        </div>
        </Layout>

        
    )
}

export default Logout;



