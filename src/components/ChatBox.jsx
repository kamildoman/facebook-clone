import React, { useState } from "react";
import styled from "styled-components";
import SinglePrivateMessage from "./SinglePrivateMessage";
import { connect } from "react-redux";

function ChatBox(props) {
  const [newMessage, setNewMessage] = useState("");
  const [messageToRender, setMessageToRender] = useState("");
  const [renderMessage, setRenderMessage] = useState(false);
  const [botAnswer, setBotAnswer] = useState(false);
  function handleNewMessage(e) {
    setNewMessage(e.target.value);
  }

  function submitMessage() {
    setMessageToRender(newMessage);
    setNewMessage("");
    setRenderMessage(true);
    setTimeout(() => {
      setBotAnswer(true);
    }, 1500);
  }
  return (
    <Container>
      <Content>
        <ShareBox>
          <UserIcon>
            <img src="images/user.svg" alt="" />
          </UserIcon>
          <Menu>
            <Name>Chat Bot</Name>
            <img
              onClick={() => props.handleChatOpen()}
              src="/images/close-chat.png"
              alt="close"
            />
          </Menu>
        </ShareBox>
        <MessageArea>
          {botAnswer && (
            <SinglePrivateMessage
              user="Chat Bot"
              message="Just kidding, I don't know what to answer. If you have any question please ask the guy who created me. His email: domanweb1@gmail.com, phone number: 667 431 156. Thanks :)"
            />
          )}
          {renderMessage && (
            <SinglePrivateMessage user={props.user} message={messageToRender} />
          )}
          <SinglePrivateMessage
            user="Chat Bot"
            message="Welcome to my website. I'm not advanced enough to have a conversation with you, but I can tell you how to use the website. Right now you can add posts, likes and comments. You can also delete your own posts. The website is made by React/Redux/Firebase, so all your posts and comments will be stored on the server. Do you have any questions?"
          />
          <SinglePrivateMessage user="Chat Bot" message="Hello" />
        </MessageArea>
        <WriteBox>
          <input
            onChange={(e) => handleNewMessage(e)}
            value={newMessage}
            placeholder={renderMessage ? "Chat disabled" : "Write your message"}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                submitMessage();
              }
            }}
            disabled={renderMessage}
          />
          <button onClick={() => submitMessage()} disabled={renderMessage}>
            <img src="/images/send-message.png" alt="send" />
          </button>
        </WriteBox>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  color: #e4e6eb;
  background-color: #242526;
  height: 600px;
  margin-right: 40px;
  width: 320px;
  z-index: 9999999999;
  overflow-y: auto;
`;

const ShareBox = styled.div`
  display: inline-flex;
  align-items: center;
  width: 93%;
  padding-bottom: 10px;
  border-bottom: 1px solid #3a3b3c;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  img {
    position: absolute;
    right: 0;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  img {
    width: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  background-color: #242526;
  width: 100%;
  border-radius: 7px;
  margin-top: 10px;
`;

const Name = styled.div`
  display: flex;
`;

const WriteBox = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    overflow: auto;
    margin-right: 20px;
    padding: 15px;
    height: 15px;
    resize: none;
    font-size: 16px;
    font-weight: 300;
    border-radius: 22px;
    border: none;
    background-color: #3a3b3c;
    color: #b0b3b8;
    outline: none;
    cursor: text;
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  button:hover {
    background-color: #3a3b3c;
  }
`;

const MessageArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 350px;
  overflow: auto;
  flex-direction: column-reverse;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
