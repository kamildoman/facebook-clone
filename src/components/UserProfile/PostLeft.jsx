import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EditInfoModal from "./EditInfoModal";
import SinglePhoto from "./SinglePhoto";
import { connect } from "react-redux";
import { getPostsAPI } from "../../actions";

function PostLeft(props) {
  const [editInfoModal, setEditInfoModal] = useState(false);
  const [postsWithPhoto, setPostsWithPhoto] = useState([]);

  function handleEditInfoModal() {
    setEditInfoModal(!editInfoModal);
  }

  async function handlePostsWithPhoto() {
    setPostsWithPhoto(
      props.posts.filter((post) => {
        return (
          post.data().user.description === props.user.email &&
          post.data().sharedIMG
        );
      })
    );
  }

  useEffect(() => {
    handlePostsWithPhoto();
  }, [props.posts]);

  return (
    <Container>
      <Presentation>
        <p>Presentation</p>
        <span>
          <img src="/images/school.png" alt="" />
          School: {props.user.school ? props.user.school : "none"}
        </span>
        <span>
          <img src="/images/city.png" alt="" />
          Lives in: {props.user.city ? props.user.city : "none"}
        </span>
        {props.isOwner && (
          <button onClick={() => handleEditInfoModal()}>Edit details</button>
        )}
      </Presentation>
      {editInfoModal && (
        <EditInfoModal
          user={props.user}
          handleEditInfoModal={handleEditInfoModal}
        />
      )}
      <PhotoArea>
        <p>Photos</p>
        <Photos>
          {postsWithPhoto &&
            postsWithPhoto.map((post, key) => (
              <SinglePhoto key={key} post={post.data()} />
            ))}
        </Photos>
      </PhotoArea>
    </Container>
  );
}

const Container = styled.div`
  grid-area: leftside;
  height: 100vh;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Presentation = styled.div`
  background-color: #242526;
  padding: 20px;
  color: #e2e4e9;
  border-radius: 10px;
  p {
    font-size: 18px;
    font-weight: 600;
  }
  span {
    margin-top: 7px;
    display: flex;
    align-items: center;
  }
  button {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 300;
    width: 85%;
    margin-right: 10px;
    border-radius: 8px;
    border: none;
    padding-left: 15px;
    background-color: #3a3b3c;
    color: #e2e4e9;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
    justify-content: center;
    font-size: 15px;
    font-weight: 600;
  }

  button:hover {
    background-color: #4e4f50;
  }
`;

const PhotoArea = styled.div`
  p {
    font-size: 18px;
    font-weight: 600;
  }
  margin-top: 15px;
  background-color: #242526;
  padding: 20px 10px 20px 20px;
  color: #e2e4e9;
  border-radius: 10px;
`;
const Photos = styled.div`
  margin-top: 15px;
  background-color: #242526;

  color: #e2e4e9;
  border-radius: 10px;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(3, 1fr);
`;

const mapStateToProps = (state) => {
  return {
    posts: state.postState.posts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPostsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostLeft);
