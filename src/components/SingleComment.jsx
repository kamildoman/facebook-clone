import React from "react";
import styled from "styled-components";

function SingleComment(props) {
  console.log(props.comment.data().comment);
  return (
    <Container>
      <Content>
        <ShareBox>
          <UserIcon>
            <img src={props.comment.data().user.image} alt="userphoto" />
          </UserIcon>
          <div>
            <span>
              <h5>{props.comment.data().user.title}</h5>
              {props.comment.data().comment}
            </span>
          </div>
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
  width: 100%;
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
      overflow: hidden;

      h5 {
        margin-bottom: 5px;
      }
    }
  }
`;

const Content = styled.div`
  display: flex;

  justify-content: space-between;
  margin: auto;
  background-color: #242526;
  width: 90%;
  border-radius: 7px;
`;

const UserIcon = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 9px;
  border-radius: 8px;
  img {
    width: 40px;
    border-radius: 50%;
  }
`;
export default SingleComment;
