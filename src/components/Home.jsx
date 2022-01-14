import React from "react";
import styled from "styled-components";
import LeftSide from "./LeftSide";
import Middle from "./Middle";
import RightSide from "./RightSide";

function Home() {
  return (
    <Container>
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

export default Home;
