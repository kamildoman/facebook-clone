import React, { useState } from "react";
import styled from "styled-components";
import db from "../../firebase";
import { storage } from "../../firebase";

function ProfileHeader(props) {
  const [activeItem, setActiveItem] = useState("posts");
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState("");

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  function uploadProfilePhoto() {
    const upload = storage.ref(`images/${image.name}`).put(image);
    upload.on("state_changed", async () => {
      const downloadURL = await upload.snapshot.ref.getDownloadURL();
      db.collection("users").doc(props.id).update({ photoURL: downloadURL });
    });
    setShowPopup(false);
  }

  return (
    <Container>
      <Content>
        <TopSquare onClick={() => setShowPopup(false)}></TopSquare>
        {showPopup && props.isOwner && (
          <UploadPhoto>
            <input
              type="file"
              accept="image/gif, image/jpeg, image/png"
              name="image"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
            <label htmlFor="file" style={{ cursor: "pointer" }}>
              <img src="/images/upload-image.png" alt="" />
              Upload profile photo
            </label>

            <ImageDisplay>
              {image && <img src={URL.createObjectURL(image)} alt="" />}
              {image && (
                <button
                  onClick={() => {
                    uploadProfilePhoto();
                  }}
                >
                  Upload
                </button>
              )}
            </ImageDisplay>
          </UploadPhoto>
        )}
        <UserPhoto>
          <img
            onClick={() => setShowPopup(!showPopup)}
            src={props.user.photoURL}
            alt="profile"
          />
        </UserPhoto>
        <UserName onClick={() => setShowPopup(false)}>
          <span>{props.user.displayName}</span>
        </UserName>
        <Menu onClick={() => setShowPopup(false)}>
          <button
            onClick={() => setActiveItem("posts")}
            style={
              activeItem === "posts"
                ? {
                    color: "#2e87fc",
                    borderBottom: "2px solid #2e87fc",
                  }
                : {}
            }
          >
            Posts
          </button>
          <button
            onClick={() => setActiveItem("info")}
            style={
              activeItem === "info"
                ? {
                    color: "#2e87fc",
                    borderBottom: "2px solid #2e87fc",
                  }
                : {}
            }
          >
            Informations
          </button>
          <button
            onClick={() => setActiveItem("photos")}
            style={
              activeItem === "photos"
                ? {
                    color: "#2e87fc",
                    borderBottom: "2px solid #2e87fc",
                  }
                : {}
            }
          >
            Photos
          </button>
          <button
            onClick={() => setActiveItem("liked")}
            style={
              activeItem === "liked"
                ? {
                    color: "#2e87fc",
                    borderBottom: "2px solid #2e87fc",
                  }
                : {}
            }
          >
            Liked posts
          </button>
        </Menu>
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Content = styled.div`
  padding-top: 54px;
  margin-top: 1px;
  max-width: 100%;
  background-color: #242526;
  position: absolute;
  height: 60vh;
  left: 0;
  right: 0;
  overflow: hidden;
  border-top: 2px solid #393a3b;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopSquare = styled.div`
  background-color: #18191a;

  width: 65%;
  height: 50vh;
  top: 0;
  margin-top: 1px;
  border-radius: 6px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserPhoto = styled.div`
  position: absolute;
  bottom: 23%;

  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
  }
  img:hover {
    opacity: 0.7;
  }
`;

const UploadPhoto = styled.div`
  position: absolute;
  font-size: 14px;
  bottom: 20%;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 99;
  background-color: #242526;
  border-radius: 10px;
  border: 2px solid #2f3031;
  color: #e2e4e9;
  font-weight: 600;
  img {
    margin-right: 4px;
  }
  label {
    display: flex;
    align-items: center;
  }
`;

const ImageDisplay = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    object-fit: cover;
    border-radius: 50%;
    width: 200px;
    height: 200px;
  }
  button {
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 2px 20px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background: #303031;
    color: #b0b3b8;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
  }
`;

const UserName = styled.div`
  color: #e4e6eb;
  font-size: 38px;
  height: 50px;
  position: absolute;
  bottom: 10%;
  width: 60%;
  text-align: center;
  border-bottom: 2px solid #393a3b;
`;

const Menu = styled.div`
  position: absolute;
  bottom: 0;
  left: 20%;

  button {
    background: transparent;
    border: none;
    color: #b0b3b8;
    font-size: 18px;
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;
  }

  button:hover {
    background: #3a3b3c;
  }
`;

export default ProfileHeader;
