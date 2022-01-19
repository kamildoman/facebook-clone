import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUsersAPI } from "../actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function SingleComment(props) {
  const [userPhoto, setUserPhoto] = useState("");

  const navigate = useNavigate();
  function navigateTo() {
    navigate("/profile/" + props.comment.data().user.description);
  }

  async function getUserPhoto() {
    props.users.map((singleUser) => {
      if (singleUser.data().uid === props.comment.data().user.uid) {
        setUserPhoto(singleUser.data().photoURL);
      }
    });
  }

  useEffect(() => {
    props.getUsers();
  }, []);

  useEffect(() => {
    getUserPhoto();
  }, [props.users]);

  return (
    <Container>
      <Content>
        <ShareBox>
          <UserIcon onClick={() => navigateTo()}>
            <img src={userPhoto} alt="userphoto" />
          </UserIcon>
          <div>
            <span>
              <h5 onClick={() => navigateTo()}>
                {props.comment.data().user.title}
              </h5>
              {props.comment.data().comment}
            </span>
          </div>
        </ShareBox>
      </Content>
    </Container>
  );
}
const Container = styled.div`
  width: 95%;
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
      width: 100%;
      border-radius: 22px;
      border: none;
      background-color: #3a3b3c;
      color: #b0b3b8;
      cursor: text;
      overflow: hidden;

      h5 {
        margin-bottom: 5px;
      }
      h5:hover {
        cursor: pointer;
        text-decoration: underline;
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
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const mapStateToProps = (state) => {
  return {
    users: state.usersState.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsersAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment);
