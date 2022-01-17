import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI } from "../actions";
import { Navigate } from "react-router-dom";

function Login(props) {
  console.log(props.user);
  return (
    <Container>
      {props.user && <Navigate to="/home" />}
      <Content>
        <Heading>
          <img src="/images/long-logo.png" alt="" />
          <span>
            Connect with your friends and the world around you on Facebook
          </span>
        </Heading>
        <Form>
          <Google onClick={() => props.signIn()}>
            <img src="/images/google.svg" alt="google" />
            Sign in with Google
          </Google>
        </Form>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f0f2f5;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin: 5% 20%;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  span {
    margin-top: 10px;
    font-size: 30px;
  }
  img {
    height: 90px;
  }
  @media (max-width: 768px) {
    img {
      height: 60px;
    }
    span {
      font-size: 20px;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 22px;
    width: 100%;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 26px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 /0%);
  vertical-align: middle;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
