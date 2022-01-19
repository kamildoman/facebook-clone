import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { getPostsAPI } from "../actions";
import { getUsersAPI } from "../actions";
import ProfileHeader from "./UserProfile/ProfileHeader";
import { Navigate } from "react-router-dom";

function UserProfile(props) {
  const { email } = useParams();
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  function findUser() {
    props.users.map((user) => {
      if (user.data().email === email) {
        setUser(user.data());
        setId(user.id);
        if (user.data().uid === props.user.uid) {
          setIsOwner(true);
        }
        return;
      }
    });
  }

  useEffect(() => {
    props.getUsers();
    props.getPosts();
  }, []);

  useEffect(() => {
    findUser();
  }, [props.users]);

  return (
    <div>
      {!props.user && <Navigate to="/" />}
      <Header />
      <Content>
        <ProfileHeader user={user} id={id} isOwner={isOwner} />
      </Content>
    </div>
  );
}

const Content = styled.div`
  padding-top: 52px;
  max-width: 100%;
  position: absolute;
  height: 100vh;
  left: 0;
  right: 0;
  overflow-y: auto;
  background-color: #18191a;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    posts: state.postState.posts,
    users: state.usersState.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPostsAPI()),
  getUsers: () => dispatch(getUsersAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
