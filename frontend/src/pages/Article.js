import "./General.css";

import { useParams, useNavigate } from "react-router-dom";
import React, { createElement, useEffect, useState } from "react";
import axios from "axios";
import LayoutApp from "../Layout";

import {
  Breadcrumb,
  Layout,
  Avatar,
  Comment,
  Tooltip,
  List,
  Divider,
  Form,
  Input,
  Button,
  Popconfirm,
} from "antd";
// import React from 'react';
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
const { Content, Footer } = Layout;
const { TextArea } = Input;

const Article = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [postImg, setpostImg] = useState();
  const [allComment, setallComment] = useState();
  const [username, setUsername] = useState("");
  const [commentContent, setcommentContent] = useState("");
  const [error, setError] = useState("");

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const navigate = useNavigate();

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  //post fetch
  useEffect(() => {
    const fetchData = async () => {
      let res;
      try {
        res = await axios.get(`http://127.0.0.1:8000/post/posts/${id}`);
        if (res.status === 200) {
          console.log("res.data:", res.data);
          // let t = window.sessionStorage.getItem('username');
          // console.log("images:", res.data.images[0].image);
          console.log("images:", res.data.images);

          setPost([res.data]);
          setpostLikes(res.data.like_users);
        }

        return;
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const [postLikes, setpostLikes] = useState(0);
  const [postDislikes, setpostDislikes] = useState(0);
  const [postAction, setpostAction] = useState(null);

  // const postlike = () => {
  //   setpostLikes(postLikes + 1);
  //   // setpostDislikes(0);
  //   setpostAction('postliked');
  // };

  const handlePostLike = async (event, id) => {
    let res;
    try {
      res = await axios.post(`http://127.0.0.1:8000/post/posts/like/${id}/`, {
        // pk: id,
        // like_users : window.sessionStorage.getItem("userid"),
      });

      if (res.status === 200) {
        console.log("res.data:", res.data);
        // let t = window.sessionStorage.getItem('username');
        // console.log("images:", res.data.images[0].image);
        // console.log("images:", res.data.images);

        // setPost([res.data]);
        setpostLikes(res.data.like_users);
      }

      return;
    } catch (e) {
      console.log(e);
    }
  };

  // const postActions = [
  //   <Tooltip key="post-basic-like" title="postLike">
  //     <span onClick={handlePostLike}>
  //       {createElement(postAction === 'postliked' ? LikeFilled : LikeOutlined)}
  //       <span>{postLikes}</span>
  //     </span>
  //   </Tooltip>,
  // ];


  const fetchComments = async () => {
    let res;
    // console.log("comments fetch data!!");
    try {
      console.log("comments fetch data!!");
      res = await axios.post("http://127.0.0.1:8000/post/post_comments/", {
        post_id: id,
      });

      if (res.status === 200) {
        console.log("success fetch");
        console.log("comments in this post:", res.data);
        setallComment(res.data);
      }
      return;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // console.log("comments use effect!!!");
    
    fetchComments();
  }, []);

  // useEffect(() => {
  //   fetchData()
  // }, [trigger])
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  async function createComment() {
    let res;
    try {
      res = await axios.post(`http://127.0.0.1:8000/post/comments/`, {
        content: commentContent,
        author: window.sessionStorage.getItem("userid"),
        post: id,
      });

      if (res.status === 201) {
        console.log("success");
        setUsername("");
        alert("Comment created!");
        setcommentContent("");
        fetchComments();
      }
      return;
    } catch (e) {
      alert(e.response.data);
      console.log(e.response.data);
      // setError("此帳號名稱已存在")
    }
  }

  const deleteComment = async (event, id) => {
    let res;

    try {
      // console.log("comments fetch data!!");
      res = await axios.delete(`http://127.0.0.1:8000/post/comments/${id}`, {
        // comment_id: id,
      });

      if (res.status === 204) {
        console.log("Comment Deleted.");
        setallComment(
          allComment.filter((comment) => {
            return comment.id !== id;
          })
        );
      }
      return;
    } catch (e) {
      console.log(e);
    }
  };

  const deletePost = async (event, id) => {
    let res;
    console.log("Clicked yes button");
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    console.log("comments fetch data!!");
    try {
      // console.log("POST DELETE IN");
      res = await axios.delete(`http://127.0.0.1:8000/post/posts/${id}`, {});

      if (res.status === 204) {
        console.log("Post Deleted.");
        navigate("/articles");
      }
      return;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout className="layout">
      <LayoutApp>{/* <div className="logo" /> */}</LayoutApp>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <div className="site-layout-content">
          {post &&
            post.map((item) => (
              <div>
                <h2> Title: {item.title} </h2>
                <h2> Content: {item.content} </h2>
                {/* <img alt="image" src={item.images[0].image} width={800} height={600} /> */}

                {/* <h2> Author: {item.author} </h2> */}
                <h2> Author: {item.author_username} </h2>
                {item.images &&
                    item.images.map((img) => (
                      <img src={img.image} alt="" />
                      
                  ))
                }
                
                
                {/* <img src={item.images[0].image} alt="" /> */}

                {/* {fetchImages} */}
                
                <Popconfirm
                  title="Do you wanna delete？"
                  visible={visible}
                  okText="Yes"
                  cancelText="No"
                  onCancel={handleCancel}
                  onConfirm={(event) => deletePost(event, item.id)}
                >
                  <Button type="primary" onClick={showPopconfirm}>
                    Delete Post
                  </Button>
                </Popconfirm>

                <Tooltip key="post-basic-like" title="postLike">
                  <span onClick={(event) => handlePostLike(event, item.id)}>
                    {createElement(
                      postAction === "postliked" ? LikeFilled : LikeOutlined
                    )}
                    <span>{postLikes}</span>
                  </span>
                </Tooltip>
              </div>
            ))}
          {/* {postActions}  */}
        </div>

        <Divider />
        <div className="site-layout-content">
          <List
            className="comment-list"
            // header={`${allComment.length} replies`}
            itemLayout="horizontal"
            dataSource={allComment}
            renderItem={(item) => (
              <li>
                <Comment
                  actions={actions}
                  author={item.author.username}
                  // avatar={item.avatar}
                  content={item.content}
                  datetime={item.created_at}
                />

                <Popconfirm
                  title="Do you wanna delete？"
                  visible={visible}
                  okText="Yes"
                  cancelText="No"
                  onCancel={handleCancel}
                  onConfirm={(event) => deleteComment(event, item.id)}
                >
                  <Button type="primary" onClick={showPopconfirm}>
                    Delete
                  </Button>
                </Popconfirm>
              </li>
            )}
          />
        </div>
        <TextArea
          placeholder="Write a comment"
          value={commentContent} //curly bracket 은 아마 변해도 되는 값인듯.
          onChange={(e) => setcommentContent(e.target.value)}
        ></TextArea>

        <Button onClick={createComment}> Submit </Button>
      </Content>

      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Mina Kim Made
      </Footer>
    </Layout>
    // <div>
    //   <div>
    //     {post &&
    //       post.map((item) => (

    //         <div>
    //           <h2> Title: {item.title} </h2>
    //           <h2> Content: {item.content} </h2>
    //           {/* <img alt="image" src={item.images[0].image} width={800} height={600} /> */}

    //           <h2> Author: {item.author.username} </h2>
    //         </div>
    //       ))}
    //   </div>
    //   <div>
    //     <div>
    //       {allComment &&
    //         allComment.map((comment) => (
    //           <div key={comment.id}>
    //             <h2> comment: {comment.content} </h2>
    //             <h2> author: {comment.author.username} </h2>
    //             {/* <h2> Author: {comment.author.username} </h2> */}
    //           </div>
    //         ))}
    //     </div>
    //   </div>

    //   <div>
    //     <input
    //       placeholder="Write a comment"
    //       value={commentContent} //curly bracket 은 아마 변해도 되는 값인듯.
    //       onChange={(e) => setcommentContent(e.target.value)}
    //     ></input>

    //     <button onClick={createComment}> Submit </button>
    //     {error === "" ? null : <div className="errorMes">{error}</div>}
    //   </div>
    // </div>
  );
};

export default Article;
