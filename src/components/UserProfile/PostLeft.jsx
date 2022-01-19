import React from "react";
import styled from "styled-components";

function PostLeft(props) {
  console.log(props.posts);
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
        <button>Edit details</button>
      </Presentation>
    </Container>
  );
}

const Container = styled.div`
  grid-area: leftside;
  height: 100vh;
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

export default PostLeft;
