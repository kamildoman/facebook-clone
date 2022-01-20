import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import db from "../../firebase";

function EditInfoModal(props) {
  const [school, setSchool] = useState("none");
  const [city, setCity] = useState("none");
  const schoolInput = useRef(null);
  const cityInput = useRef(null);
  const [id, setId] = useState("");

  //   to make inputs always controlled
  function setCitySchool() {
    if (props.user.school) {
      setSchool(props.user.school);
    }
    if (props.user.city) {
      setCity(props.user.city);
    }
  }

  useEffect(() => {
    setCitySchool();
  }, [props.user]);

  async function save() {
    //   find user id first
    db.collection("users").onSnapshot((snapshot) =>
      snapshot.docs.map(async (user) => {
        if (user.data().uid === props.user.uid) {
          console.log("ERRRRR");
          await db
            .collection("users")
            .doc(user.id)
            .update({ city: city, school: school });
          props.handleEditInfoModal();
          window.location.reload(false);
        }
      })
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          Edit details{" "}
          <img
            onClick={() => props.handleEditInfoModal()}
            src="/images/x.png"
            alt=""
          />
        </Header>
        <InfoEdit>
          <h4>School:</h4>
          <div>
            <input
              type="text"
              ref={schoolInput}
              onChange={(e) => setSchool(e.target.value)}
              value={school}
            ></input>
            <img
              onClick={() => schoolInput.current.focus()}
              src="/images/edit.png"
              alt=""
            />
          </div>
        </InfoEdit>
        <InfoEdit>
          <h4>City:</h4>
          <div>
            <input
              type="text"
              ref={cityInput}
              onChange={(e) => setCity(e.target.value)}
              value={city}
            ></input>
            <img
              onClick={() => cityInput.current.focus()}
              src="/images/edit.png"
              alt=""
            />
          </div>
        </InfoEdit>
        <Buttons>
          <ButtonCancel onClick={() => props.handleEditInfoModal()}>
            Cancel
          </ButtonCancel>
          <ButtonSave onClick={() => save()}>Save</ButtonSave>
        </Buttons>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  animation: fadeIn 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  color: black;
  background-color: rgba(0, 0, 0, 0.6);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: #242526;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px;
  color: #e2e4e9;

  top: 80px;
  margin: 0 auto;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 40%;
  padding-bottom: 8px;
  border-bottom: 1px solid #3a3b3c;
  img {
    cursor: pointer;
    background-color: #3a3b3c;
    padding: 5px;
    border-radius: 50%;
  }
  img:hover {
    background-color: #4e4f50;
  }
`;

const InfoEdit = styled.div`
  display: flex;
  font-size: 20px;
  margin: 10px 20px;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      margin-top: 5px;
      background: transparent;
      border: none;
      color: #e2e4e9;
      font-size: 18px;
      width: 90%;
    }
    img {
      cursor: pointer;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
`;

const ButtonCancel = styled.button`
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

  &:hover {
    background-color: #4e4f50;
  }
`;

const ButtonSave = styled(ButtonCancel)`
  background-color: #2374e1;

  &:hover {
    background-color: #3982e4;
  }
`;

export default EditInfoModal;
