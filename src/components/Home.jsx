import React from "react";
import styled from "styled-components";
import LeftSide from "./LeftSide";
import Middle from "./Middle";
import RightSide from "./RightSide";
import { connect } from "react-redux";
import { signOutAPI } from "../actions";
import { Navigate } from "react-router-dom";

function Home(props) {
  return (
    <Container>
      {!props.user && <Navigate to="/" />}
      <Layout>
        <LeftSide />
        <Middle />
        <RightSide />
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
  background-color: #18191a;
  position: absolute;
  left: 0;
  right: 0;
  overflow-y: auto;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside middle rightside";
  grid-template-columns: minmax(0, 6fr) minmax(0, 12fr) minmax(0, 6fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
