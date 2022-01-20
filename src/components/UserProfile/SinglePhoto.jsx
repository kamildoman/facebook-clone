import React from "react";
import styled from "styled-components";

function SinglePhoto(props) {
  console.log(props.post);
  console.log("AAAA");
  return (
    <Container>
      <Image>
        <img src={props.post.sharedIMG} alt="" />
      </Image>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 15vh;
  display: block;
`;

const Image = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 90%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default SinglePhoto;
