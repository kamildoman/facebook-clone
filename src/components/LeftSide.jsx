import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

function LeftSide(props) {
  return (
    <Container>
      <Icons>
        <CircleIcon>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} alt="" />
          ) : (
            <img src="images/user.svg" alt="" />
          )}{" "}
          {props.user ? props.user.displayName : "name"}
        </CircleIcon>
        <Icon>
          <img src="/images/leftside/friends.png" alt="" /> Friends
        </Icon>
        <Icon>
          <img src="/images/leftside/groups.png" alt="" /> Groups
        </Icon>
        <Icon>
          <img src="/images/leftside/marketplace.png" alt="" /> Marketplace
        </Icon>
        <Icon>
          <img src="/images/leftside/video.png" alt="" /> Watch
        </Icon>
        <Icon>
          <img src="/images/leftside/events.png" alt="" /> Events
        </Icon>
        <Icon>
          <img src="/images/leftside/memories.png" alt="" /> Memories
        </Icon>
        <Icon>
          <img src="/images/leftside/pages.png" alt="" /> Pages
        </Icon>
        <Icon>
          <img src="/images/leftside/saved.png" alt="" /> Saved
        </Icon>
        <Icon>
          <img src="/images/leftside/jobs.png" alt="" /> Jobs
        </Icon>
        <Icon>
          <img src="/images/leftside/business.png" alt="" /> Business
        </Icon>
      </Icons>
    </Container>
  );
}

const Container = styled.div`
  grid-area: leftside;
  height: 80%;
  width: 100%;
  float: left;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  &:hover {
    ::-webkit-scrollbar {
      display: flex;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Icons = styled.div`
  margin: 10px 15px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  cursor: pointer;
  padding: 9px;
  border-radius: 8px;
  img {
    margin-right: 7px;
    width: 30px;
  }
  &:hover {
    background-color: #303031;
  }
`;

const CircleIcon = styled(Icon)`
  img {
    border-radius: 50%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide);
