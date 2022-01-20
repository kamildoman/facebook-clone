import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { connect } from "react-redux";
import { getPostsAPI } from "../actions";
import db from "../firebase";
import WriteComment from "./WriteComment";
import SingleComment from "./SingleComment";
import { getCommentsAPI } from "../actions";
import Pluralize from "react-pluralize";
import ReactPlayer from "react-player";
import { getUsersAPI } from "../actions";
import { useNavigate } from "react-router-dom";

function SinglePost(props) {
  const [showComments, setShowComments] = useState(false);
  const [userPhoto, setUserPhoto] = useState("");

  function handleShowComments() {
    setShowComments(!showComments);
  }

  const navigate = useNavigate();
  function navigateTo() {
    navigate("/profile/" + props.post.user.description);
  }

  // if I change a user's profile the photo won't change on his previous posts. This function changes it
  function getUserPhoto() {
    props.users.map((singleUser) => {
      if (singleUser.data().email === props.post.user.description) {
        setUserPhoto(singleUser.data().photoURL);
      }
    });
  }

  useEffect(() => {
    props.getComments();
    props.getUsers();
  }, []);

  useEffect(() => {
    getUserPhoto();
  }, [props.users]);

  function like() {
    if (props.user) {
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
          <img src={userPhoto} alt="user" onClick={() => navigateTo()} />

          <PersonInfo onClick={() => navigateTo()}>
            <h3>{props.post.user.title}</h3>

            <h5>{howLongTimeAgo(props.post.user.date.toDate())}</h5>
          </PersonInfo>
        </SharedPerson>
        <Post>
          {props.post.description}
          {props.post.sharedIMG && <img src={props.post.sharedIMG} alt="" />}
          {props.post.video && (
            <div>
              <ReactPlayer width={"100%"} url={props.post.video} />
            </div>
          )}
        </Post>
        <SocialCount>
          <div onClick={() => like()}>
            <img src="/images/like.png" alt="like" /> {props.post.likes.length}
          </div>
          {props.user && props.user.email === props.post.user.description && (
            <div onClick={() => deletePost()}>
              <img src="/images/delete.png" alt="delete" />
            </div>
          )}

          <p onClick={() => handleShowComments()}>
            <Pluralize
              singular={"comment"}
              count={
                props.comments.filter((comment) => {
                  return comment.data().postID === props.id;
                }).length
              }
            />
          </p>
        </SocialCount>

        <SocialActions>
          <button onClick={() => like()}>
            <img src="/images/like-button.png" alt="" /> <span>Like</span>
          </button>
          <button onClick={() => handleShowComments()}>
            <img src="/images/comment-button.png" alt="" /> <span>Comment</span>
          </button>
          <button>
            <img src="/images/share-button.png" alt="" /> <span>Share</span>
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
    height: 40px;
    object-fit: cover;
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

  div {
    margin-top: 10px;
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
    text-decoration: underline;
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  overflow-wrap: anywhere;

  button {
    display: flex;
    align-items: center;
    padding: 2px 5px;
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
  @media (max-width: 380px) {
    span {
      display: none;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    posts: state.postState.posts,
    comments: state.commentState.comments,
    users: state.usersState.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPostsAPI()),
  getComments: () => dispatch(getCommentsAPI()),
  getUsers: () => dispatch(getUsersAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
