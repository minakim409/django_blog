// import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
// import { Avatar, Comment, Tooltip } from 'antd';
// import moment from 'moment';
// import React, { createElement, useState } from 'react';

// const App = () => {
//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);
//   const [action, setAction] = useState(null);

//   const like = () => {
//     setLikes(1);
//     setDislikes(0);
//     setAction('liked');
//   };

//   const dislike = () => {
//     setLikes(0);
//     setDislikes(1);
//     setAction('disliked');
//   };

//   const actions = [
//     <Tooltip key="comment-basic-like" title="Like">
//       <span onClick={like}>
//         {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
//         <span className="comment-action">{likes}</span>
//       </span>
//     </Tooltip>,
//     <Tooltip key="comment-basic-dislike" title="Dislike">
//       <span onClick={dislike}>
//         {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
//         <span className="comment-action">{dislikes}</span>
//       </span>
//     </Tooltip>,
//     <span key="comment-basic-reply-to">Reply to</span>,
//   ];
//   return (
//     <Comment
//       actions={actions}
//       author={<a>Han Solo</a>}
//       avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
//       content={
//         <p>
//           We supply a series of design principles, practical patterns and high quality design
//           resources (Sketch and Axure), to help people create their product prototypes beautifully
//           and efficiently.
//         </p>
//       }
//       datetime={
//         <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
//           <span>{moment().fromNow()}</span>
//         </Tooltip>
//       }
//     />
//   );
// };

// export default App;
import { Button, Popconfirm } from 'antd';
import React, { useState } from 'react';

const App = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <Popconfirm
      title="Title"
      visible={visible}
      onConfirm={handleOk}
      okButtonProps={{
        loading: confirmLoading,
      }}
      onCancel={handleCancel}
    >
      <Button type="primary" onClick={showPopconfirm}>
        Open Popconfirm with async logic
      </Button>
    </Popconfirm>
  );
};

export default App;