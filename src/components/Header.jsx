import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signOutAPI } from "../actions";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();
  function navigateTo() {
    navigate("/profile/" + props.user.email);
  }

  function homePage() {
    navigate("/home/");
  }
  return (
    <Container>
      <Logo onClick={() => homePage()}>
        <img src="/images/fb-icon.png" alt="icon" />
      </Logo>
      <SearchBar>
        <img src="/images/search-icon.png" alt="search" />
        <input type="text" placeholder="Search on Facebook"></input>
      </SearchBar>
      <NavigationIcons>
        <ActiveIcon>
          <img src="/images/home-icon.png" alt="home" />
        </ActiveIcon>
        <Icon>
          <img src="/images/video-icon.png" alt="video" />
        </Icon>
        <Icon>
          <img src="/images/marketplace-icon.png" alt="marketplace" />
        </Icon>
        <Icon>
          <img src="/images/group-icon.png" alt="group" />
        </Icon>
      </NavigationIcons>
      <RightIcons>
        <UserProfile
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
          onClick={() => navigateTo()}
        >
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} alt="" />
          ) : (
            <img src="images/user.svg" alt="" />
          )}{" "}
          {props.user ? props.user.displayName : "name"}
          {showLogout && (
            <LogoutButton onClick={() => props.signOut()}>Logout</LogoutButton>
          )}
        </UserProfile>

        <CommunicationIcon>
          <img src="/images/menu-icon.png" alt="menu" />
        </CommunicationIcon>
        <CommunicationIcon>
          <img src="/images/messenger-icon.png" alt="messenger" />
        </CommunicationIcon>
        <CommunicationIcon>
          <img src="/images/bell-icon.png" alt="bell" />
        </CommunicationIcon>
      </RightIcons>
    </Container>
  );
}

const Container = styled.div`
  background-color: #242526;
  left: 0;
  top: 0;
  width: 100vw;
  position: fixed;
  padding: 0 24px;
  z-index: 1000;
  display: flex;
  align-items: center;
  height: 62px;
`;

const Logo = styled.div`
  padding: 6px 0;
  cursor: pointer;
  img {
    border-radius: 50%;
    width: 45px;
  }
`;

const SearchBar = styled.div`
  margin-left: 15px;
  background-color: #3a3b3c;
  padding: 7px;
  display: flex;
  align-items: center;
  border-radius: 50px;
  img {
    background: transparent;
    width: 25px;
  }
  input {
    margin-left: 6px;
    color: #6a6468;
    background-color: #3a3b3c;
    border: none;
    font-size: 15px;
    font-weight: 700;
  }
  textarea:focus,
  input:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    margin-left: 5px;
    input {
      display: none;
    }
  }
`;

const NavigationIcons = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 35%;
  @media (max-width: 968px) {
    display: none;
  }
`;

const ActiveIcon = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;
  padding: 16px 25px;

  border-bottom: 3px solid #3290e7;
  img {
    width: 29px;
    background: transparent;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;
  padding: 10px 25px;
  img {
    width: 25px;
    background: transparent;
  }
  &:hover {
    background-color: #3a3b3c;
  }
`;

const RightIcons = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 80px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: 700;
  margin-right: 8px;
  cursor: pointer;
  img {
    border-radius: 50%;
    margin-right: 7px;
    width: 35px;
    height: 35px;
    object-fit: cover;
  }
`;

const CommunicationIcon = styled(Icon)`
  padding: 10px 10px;
  background-color: #3a3b3c;
  border-radius: 50%;
  &:hover {
    background-color: #4e4f50;
  }
  img {
    background: transparent;
    margin: 0;
    width: 20px;
    height: 20px;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  margin-top: 74px;
  border: none;
  background-color: #242526;
  color: white;
  padding: 10px 23px;
  cursor: pointer;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
