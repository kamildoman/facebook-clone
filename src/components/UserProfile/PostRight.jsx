import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Middle from "../Middle";
import { connect } from "react-redux";
import SinglePost from "../SinglePost";

function PostRight(props) {
  const [myPosts, setMyPosts] = useState([]);

  async function handleMyPosts() {
    setMyPosts(
      props.posts.filter((post) => {
        return post.data().user.description === props.user.email;
      })
    );
  }

  useEffect(() => {
    handleMyPosts();
  }, [props.posts]);

  console.log(myPosts);

  return (
    <Container>
      {props.isOwner && <Middle showPosts={false} />}
      <UsersPosts>Posts</UsersPosts>
      <Posts>
        {myPosts.map((post, key) => (
          <SinglePost key={key} post={post.data()} id={post.id} />
        ))}
      </Posts>
    </Container>
  );
}

const Container = styled.div`
  grid-area: rightside;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UsersPosts = styled.div`
  margin-top: 15px;
  background-color: #242526;
  width: 85%;
  padding: 15px;
  color: #e2e4e9;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const Posts = styled.div`
  width: 100%;
`;

const mapStateToProps = (state) => {
  return {
    posts: state.postState.posts,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PostRight);
