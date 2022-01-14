import React from "react";
import styled from "styled-components";

function SinglePost(props) {
  return (
    <Container>
      <Content>
        <SharedPerson>
          <img src={props.post.user.image} alt="user" />
          <PersonInfo>
            <h3>{props.post.user.title}</h3>
            <h5>4h ago</h5>
          </PersonInfo>
        </SharedPerson>
        <Post>
          {props.post.description}
          {props.post.sharedIMG && <img src={props.post.sharedIMG} alt="" />}
        </Post>
        <SocialCount>
          <div>
            <img src="/images/like.png" alt="like" /> {props.post.likes}
          </div>
          <p>{props.post.comments} comments</p>
        </SocialCount>
        <SocialActions>
          <button>
            <img src="/images/like-button.png" alt="" /> Like
          </button>
          <button>
            <img src="/images/comment-button.png" alt="" /> Comment
          </button>
          <button>
            <img src="/images/share-button.png" alt="" /> Share
          </button>
        </SocialActions>
      </Content>
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
  }
  h3:hover {
    text-decoration: underline;
  }
  h5 {
    color: #b0b3b8;
    font-size: 12px;
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

export default SinglePost;
