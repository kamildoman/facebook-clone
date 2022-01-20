import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostLeft from "./PostLeft";
import PostRight from "./PostRight";
import { connect } from "react-redux";
import { getPostsAPI } from "../../actions";

function ProfilePosts(props) {
  // console.log(postsToDisplay);

  return (
    <Container>
      <Layout>
        <PostLeft user={props.user} isOwner={props.isOwner} />
        <PostRight user={props.user} isOwner={props.isOwner} />
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 70vh;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside rightside";
  grid-template-columns: minmax(0, 8fr) minmax(0, 12fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin: 25px auto;
  width: 60%;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    posts: state.postState.posts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPostsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePosts);
