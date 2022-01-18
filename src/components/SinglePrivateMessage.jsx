import React from "react";
import styled from "styled-components";

function SinglePrivateMessage(props) {
  return (
    <Container>
      <Content>
        <ShareBox>
          <UserIcon>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
          </UserIcon>
          <div>
            <span>{props.message}</span>
          </div>
        </ShareBox>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const ShareBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 15px;
  div {
    span {
      overflow: auto;
      padding: 15px;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: start;
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
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  background-color: #242526;
  width: 93%;
  border-radius: 7px;
`;

const UserIcon = styled.div`
  display: flex;
  padding-right: 8px;
  border-radius: 8px;
  img {
    width: 40px;
    border-radius: 50%;
  }
`;

export default SinglePrivateMessage;
