import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { postAPI } from "../actions";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function AddPostModal(props) {
  const [publishText, setPublishText] = useState("");
  const [shareImage, setShareImage] = useState("");

  function handlePublishText(e) {
    setPublishText(e.target.value);
  }

  function handleImageChange(event) {
    setShareImage(event.target.files[0]);
  }

  function makePost(event) {
    if (event.target !== event.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: "",
      user: props.user,
      description: publishText,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.handleModalOpen();
    props.post(payload);
  }

  return (
    <Container>
      <Content>
        <Header>
          Make a post
          <button onClick={() => props.handleModalOpen()}>
            <img src="/images/x.png" alt="" />
          </button>
        </Header>
        <SharedPerson>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} alt="" />
          ) : (
            <img src="images/user.svg" alt="" />
          )}
          <PersonInfo>
            <h3>{props.user && props.user.displayName}</h3>
            <div>
              <img src="/images/public.png" alt="" /> Public
            </div>
          </PersonInfo>
        </SharedPerson>
        <Editor>
          <textarea
            onChange={(e) => handlePublishText(e)}
            value={publishText}
            placeholder="What are you thinking about?"
            autoFocus={true}
          ></textarea>
        </Editor>
        <ImageDisplay>
          {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
        </ImageDisplay>
        <ContentAdd>
          <input
            type="file"
            accept="image/gif, image/jpeg, image/png"
            name="image"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => {
              handleImageChange(e);
            }}
          />
          Add to post{" "}
          <label htmlFor="file" style={{ cursor: "pointer" }}>
            <div>
              <img src="/images/leftside/video.png" alt="" />
              <img src="/images/middle/photo-video.png" alt="" />
            </div>
          </label>
        </ContentAdd>
        <PublishButton disabled={!publishText} onClick={(e) => makePost(e)}>
          Publish
        </PublishButton>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  animation: fadeIn 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  color: black;
  background-color: rgba(0, 0, 0, 0.6);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: #242526;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;

  top: 80px;
  margin: 0 auto;
`;

const ImageDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 80%;
  }
`;

const Header = styled.div`
  display: flex;
  padding: 16px 20px;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 700;
  display: flex;
  justify-content: center;
  color: #b0b3b8;
  align-items: center;
  width: 93%;
  border-bottom: 1px solid #3a3b3c;

  button {
    position: absolute;
    right: 0;
    margin-right: 10px;
    background-color: #3a3b3c;
    border: none;
    width: 35px;
    height: 35px;
    padding: 7px;
    border-radius: 50%;

    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
`;

const SharedPerson = styled.div`
  display: flex;
  align-items: center;
  margin: 18px 15px 10px;

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
  }
  h3:hover {
    text-decoration: underline;
  }
  div {
    display: flex;
    align-items: center;
    background-color: #3a3b3c;
    color: #b0b3b8;
    padding: 3px 10px;
    border-radius: 7px;
    img {
      width: 20px;
    }
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    background-color: #242526;
    border: none;
    color: #b0b3b8;
    overflow: auto;
    outline: none;
    font-size: 17px;
  }
  input {
    width: 100%;
    height: 34px;
    margin-bottom: 20px;
  }
`;

const ContentAdd = styled.div`
  color: #e4e6eb;
  margin: 15px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #3a3b3c;
  align-items: center;
  div {
    margin: 0;
    padding: 0;
    img {
      width: 30px;
      margin-right: 10px;
    }
  }
`;

const PublishButton = styled.button`
  margin: 15px;
  background-color: #2374e1;
  border: none;
  padding: 13px;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #3982e4;
  }

  &:disabled {
    background-color: #505151;
    cursor: default;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  post: (payload) => dispatch(postAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostModal);
