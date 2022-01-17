import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { connect } from "react-redux";
import { getPostsAPI } from "../actions";
import db from "../firebase";
import WriteComment from "./WriteComment";
import SingleComment from "./SingleComment";
import { getCommentsAPI } from "../actions";

function SinglePost(props) {
  const [showComments, setShowComments] = useState(false);

  function handleShowComments() {
    setShowComments(!showComments);
  }

  useEffect(() => {
    props.getComments();
  }, []);

  function like() {
    let peopleWhoLiked = props.post.likes;
    let user = props.user.email;
    if (peopleWhoLiked.indexOf(user) >= 0) {
      let newList = peopleWhoLiked.filter((e) => e !== user);
      db.collection("posts").doc(props.id).update({ likes: newList });
    } else {
      peopleWhoLiked.push(user);
      db.collection("posts").doc(props.id).update({ likes: peopleWhoLiked });
    }
  }

  function deletePost() {
    db.collection("posts").doc(props.id).delete();
  }

  function howLongTimeAgo(timeAdded) {
    let addedDate = timeAdded.toLocaleDateString();
    let now = new Date()
      .toISOString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join(".");
    if (addedDate === now) {
      let addedTime = timeAdded.toLocaleTimeString();
      let hourNow = new Date().getHours();
      if (addedTime.split(":")[0] == hourNow) {
        let minutesNow = new Date().getMinutes();
        return minutesNow - addedTime.split(":")[1] + "min ago";
      } else {
        return hourNow - addedTime.split(":")[0] + "h ago";
      }
    }

    return addedDate;
  }

  return (
    <Container>
      <Content>
        <SharedPerson>
          <img src={props.post.user.image} alt="user" />

          <PersonInfo>
            <h3>{props.post.user.title}</h3>

            <h5>{howLongTimeAgo(props.post.user.date.toDate())}</h5>
          </PersonInfo>
        </SharedPerson>
        <Post>
          {props.post.description}
          {props.post.sharedIMG && <img src={props.post.sharedIMG} alt="" />}
        </Post>
        <SocialCount>
          <div onClick={() => like()}>
            <img src="/images/like.png" alt="like" /> {props.post.likes.length}
          </div>
          {props.user.email === props.post.user.description && (
            <div onClick={() => deletePost()}>
              <img src="/images/delete.png" alt="delete" />
            </div>
          )}

          <p onClick={() => handleShowComments()}>
            {
              props.comments.filter((comment) => {
                return comment.data().postID === props.id;
              }).length
            }{" "}
            comments
          </p>
        </SocialCount>

        <SocialActions>
          <button onClick={() => like()}>
            <img src="/images/like-button.png" alt="" /> Like
          </button>
          <button onClick={() => handleShowComments()}>
            <img src="/images/comment-button.png" alt="" /> Comment
          </button>
          <button>
            <img src="/images/share-button.png" alt="" /> Share
          </button>
        </SocialActions>
      </Content>
      {showComments &&
        props.comments
          .filter((comment) => {
            return comment.data().postID === props.id;
          })
          .map((comment, key) => <SingleComment key={key} comment={comment} />)}
      {showComments && <WriteComment post={props.post} id={props.id} />}
    </Container>
  );
}

const Container = styled.div`
  background-color: #242526;
  width: 90%;
  border-radius: 7px;
  margin: 25px auto;
  overflow-y: visible;
`;

const Content = styled.div`
  padding: 11px 27px 3px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const SharedPerson = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 40px;
    border-radius: 50%;
    margin-right: 8px;
    cursor: pointer;
  }
`;

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  h3 {
    color: #e4e6eb;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h3:hover {
    text-decoration: underline;
  }
  h5 {
    color: #b0b3b8;
    font-size: 12px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Post = styled.div`
  font-size: 15px;
  color: #e4e6eb;
  line-height: 1.3;
  img {
    margin-top: 10px;
    width: 100%;
  }
`;

const SocialCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  color: #b0b3b8;
  font-size: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #3a3b3c;

  div {
    display: flex;
    align-items: center;
  }

  img {
    width: 20px;
    margin-right: 4px;
  }

  img:hover {
    cursor: pointer;
  }

  p:hover {
    cursor: pointer;
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;

  button {
    display: flex;
    align-items: center;
    padding: 2px 20px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background: none;
    color: #b0b3b8;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover {
    background-color: #303031;
  }

  img {
    margin-right: 6px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    posts: state.postState.posts,
    comments: state.commentState.comments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPostsAPI()),
  getComments: () => dispatch(getCommentsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
