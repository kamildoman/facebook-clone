import React from "react";
import styled from "styled-components";
import SinglePost from "./SinglePost";

function Middle() {
  return (
    <Container>
      <Content>
        <ShareBox>
          <UserIcon>
            <img src="/images/user.svg" alt="user" />
          </UserIcon>
          <button>What are you thinking about, Name?</button>
        </ShareBox>
        <UploadImage>
          <img src="/images/middle/photo-video.png" alt="" /> Photo/Video
        </UploadImage>
      </Content>
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
    </Container>
  );
}

const Container = styled.div`
  grid-area: middle;
  max-height: calc(100vh - 80px);

  z-index: 99999;
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ShareBox = styled.div`
  display: inline-flex;
  align-items: center;
  width: 93%;
  margin-bottom: 15px;
  border-bottom: 1px solid #3a3b3c;

  button {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 300;
    width: 85%;
    margin-right: 10px;
    border-radius: 22px;
    border: none;
    padding-left: 15px;
    background-color: #3a3b3c;
    color: #b0b3b8;
    cursor: pointer;

    &:hover {
      background-color: #4e4f50;
    }
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

const UploadImage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #b0b3b8;
  cursor: pointer;
  padding: 5px;
  border-radius: 15px;
  &:hover {
    background-color: #4e4f50;
  }
  img {
    margin-right: 3px;
  }
`;

export default Middle;
