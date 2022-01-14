import React from "react";
import styled from "styled-components";

function SingleContact() {
  return (
    <Container>
      <UserIcon>
        <img src="/images/user.svg" alt="user" /> Name Surname
      </UserIcon>
    </Container>
  );
}

const Container = styled.div`
  margin: 3px 0;
`;

const UserIcon = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 8px 4px;
  color: #a9acb0;
  font-weight: 600;
  cursor: pointer;
  img {
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  &:hover {
    background-color: #303031;
  }
`;

export default SingleContact;
