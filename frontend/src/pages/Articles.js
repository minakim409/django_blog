// export default Articles;
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Article from './Article';
// import sanityClient from "../client.js";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Avatar, List, Space, Layout, Divider, Col, Row } from 'antd';
import LayoutApp from "../Layout";

const { Content, Footer } = Layout;

// https://ant.design/components/layout/


const AllPosts = () =>{
  const [posts, setPosts] = useState();
  // const [post, setPost] = useState();
  const navigate = useNavigate();

  const activeStyle = {
    color: 'green',
    fontSize: 21,
  };

  const gocreatePost = () => {
    navigate('/createpost');
  }
  
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  
  useEffect(() => {
    const fetchData = async ()=>{
        let res;
        try {
            res = await axios.get("http://127.0.0.1:8000/post/posts/");

            if(res.status === 200){
                console.log("res.data:", res.data); 
                setPosts(res.data); 
            } 
            
            return;
        }catch(e){
            console.log(e);
        }
    }
    fetchData();
}, [])

  return (
    <Layout className="layout">
      <LayoutApp>
          <div className="logo" />
      </LayoutApp>

    <Content
      style={{
        padding: '0 50px',
      }}
    >
    <div className="site-layout-content">
    <Row>
      {/* <Col span={8}>col-8</Col> */}
      <Col span={21} offset={21}>
      <Button size = "large" type="primary" onClick={gocreatePost}> Post Create </Button>
      </Col>
    </Row>
    
    <Divider></Divider>
      <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={posts}
      
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text={item.like_users} key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={`/articles/${item.id}`}>{item.title}</a>}
            description={item.author.username}
          />
          {item.content}
        </List.Item>
      )}
    />
    </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Mina Kim Made
    </Footer>
    </Layout>
    // <div>
    //   <h2>Blog Posts</h2>
    //   <h3>Welcome to blog posts page!</h3>
    //   <button onClick={gocreatePost}> Post Create </button>
    //   <div class = "container">
    //     {posts &&
    //       posts.map((item) => (
    //         <div> 
              
    //           {/* <ul> */}
    //             <li>
                  
    //                 <div key={item.id}>
    //                   <h1>{item.id}</h1>
    //                     <span>{item.content}</span>
    //                 </div>
    //                 {/* <Article data={item.id} />    */}
    //                 {/* <button  onClick={onePost} type="button">
    //                   Send state 
    //                 </button>  */}
                
    //             <Link to={`/articles/${item.id}`} >
    //                 Link {item.id}
    //             </Link>
    //             </li>            
    //         </div>
           
    //       ))}
    //   </div>
    // </div>
  );
}


// const imageSizes = [
//   2  { name: "horizontal", width: 600, height: 380 },
//   3  { name: "vertical", width: 400, height: 650 },
//   4  { name: "thumbnail", width: 300, height: 300 },
//   5];

//   imageSizes.map((a) => {
//     2  const capitalizedName = a.name[0].toUpperCase() + a.name.slice(1);
//     3  return `${captalizedName} image - ${a.width} x ${a.height}`;
//     4});

export default AllPosts;