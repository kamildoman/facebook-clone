import React, { useState } from "react";
import styled from "styled-components";
import SingleContact from "./SingleContact";
import ChatBox from "./ChatBox";

function RightSide() {
  const [chatOpen, setChatOpen] = useState(false);

  function handleChatOpen() {
    setChatOpen(!chatOpen);
  }

  return (
    <Container>
      <Content>Contacts</Content>
      <SingleContact handleChatOpen={handleChatOpen} />
      {chatOpen && <ChatBox handleChatOpen={handleChatOpen} />}
    </Container>
  );
}

const Container = styled.div`
  grid-area: rightside;
  height: 80%;
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

const Content = styled.div`
  color: #a9acb0;
  font-size: 20px;
  font-weight: 700;
`;

export default RightSide;
