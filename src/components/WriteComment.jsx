import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { commentAPI } from "../actions";
import db from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function WriteComment(props) {
  const [newComment, setNewComment] = useState("");
  function handleNewComment(e) {
    setNewComment(e.target.value);
  }
  function comment() {
    const payload = {
      comment: newComment,
      user: props.user,
      postID: props.id,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.comment(payload);
    setNewComment("");
  }
  return (
    <Container>
      <Content>
        <ShareBox>
          <UserIcon>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="images/user.svg" alt="" />
            )}
          </UserIcon>
          <input
            type="text"
            placeholder="Write your comment"
            onChange={(e) => handleNewComment(e)}
            value={newComment}
            onKeyPress={(e) => {
              if (e.key === "Enter" && newComment.length > 0) {
                comment();
              }
            }}
          ></input>
        </ShareBox>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ShareBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;

  input {
    overflow: auto;
    padding: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    resize: none;
    font-size: 16px;
    font-weight: 300;
    width: 85%;
    border-radius: 22px;
    border: none;
    background-color: #3a3b3c;
    color: #b0b3b8;
    cursor: text;
  }
`;

const UserIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 9px;
  border-radius: 8px;
  img {
    width: 40px;
    border-radius: 50%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  background-color: #242526;
  width: 90%;
  border-radius: 7px;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  comment: (payload) => dispatch(commentAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteComment);
