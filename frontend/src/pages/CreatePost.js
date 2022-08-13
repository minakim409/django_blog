import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout, Upload } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LayoutApp from "../Layout";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const validateMessages = {
  required: "${label} is required!",
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState([]);

  const navigate = useNavigate();

  const goArticles = () => {
    navigate("/articles");
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const createPost = async () => {
    let res;

    try {
      console.log("fileList:", fileList);

      // res = await axios.post(`http://127.0.0.1:8000/post/posts/`, {
      //   title: title,
      //   content: content,
      //   images: [image],
      //   author: window.sessionStorage.getItem("userid"),
      // });

      const formData = new FormData();

      for (let file of fileList) {
        formData.append("images", file.originFileObj);
      }

      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", window.sessionStorage.getItem("userid"));
      
      res = await axios.post(`http://127.0.0.1:8000/post/posts/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })

      // console.log(window.sessionStorage.getItem('userid'));

      if (res.status === 201) {
        console.log("success");
        console.log(res.data[-1]);
        // setUsername("");
        alert("Post Created!");
        goArticles();
      }
      return;
    } catch (e) {
      console.log(e.response.data);
      // setError("此帳號名稱已存在")
    }
  };

  return (
    <Layout>
      <LayoutApp></LayoutApp>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="Title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="Content"
          label="Content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Photo">
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            // value={image}
            onChange={(e) => {
              console.log('onChange:', e)
              setFileList(e.fileList)
            }}
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" onClick={createPost}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
    // <div>
    //     <div>
    //         <label>
    //             Title
    //             <br></br>
    //             <input
    //                 // className="searchBarInput"
    //                 placeholder="Title"
    //                 value = {title}//curly bracket 은 아마 변해도 되는 값인듯.
    //                 onChange = {(e)=>setTitle(e.target.value)}></input>
    //         </label>

    //         <br></br>
    //         <label>
    //             Content
    //             <br></br>
    //             <input
    //                 // className="searchBarInput"
    //                 placeholder="Content"
    //                 value = {content}//curly bracket 은 아마 변해도 되는 값인듯.
    //                 onChange = {(e)=>setContent(e.target.value)}></input>
    //         </label>

    //         <br></br>
    //         <label>
    //             Images
    //             <input
    //                 // className="searchBarInput"
    //                 type = "file"
    //                 // value = {image}//curly bracket 은 아마 변해도 되는 값인듯.
    //                 onChange = {(e)=>setImage(e.target.files[0])}>

    //             </input>
    //         </label>

    //         <br></br>
    //         <button onClick = {createPost}> Create Post! </button>
    //         {

    //         }
    //     </div>
    // </div>
  );
};

export default CreatePost;
