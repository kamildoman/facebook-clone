import { auth, provider, storage } from "../firebase";
import db from "../firebase";

export const setUser = (payload) => ({
  type: "SET_USER",
  user: payload,
});

export function signInAPI() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
        console.log(payload.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth.signOut().then(() => {
      dispatch(setUser(null));
    });
  };
}

export const getPosts = (payload) => ({
  type: "GET_POSTS",
  payload: payload,
});

export function postAPI(payload) {
  return (dispatch) => {
    if (payload.image !== "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on("state_changed", async () => {
        const downloadURL = await upload.snapshot.ref.getDownloadURL();
        db.collection("posts").add({
          user: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: payload.timestamp,
            image: payload.user.photoURL,
          },
          video: payload.video,
          sharedIMG: downloadURL,
          comments: 0,
          likes: 0,
          description: payload.description,
        });
      });
    } else if (payload.video) {
      db.collection("posts").add({
        user: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedIMG: "",
        comments: 0,
        likes: 0,
        description: payload.description,
      });
    } else {
      db.collection("posts").add({
        user: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: "",
        sharedIMG: "",
        comments: 0,
        likes: 0,
        description: payload.description,
      });
    }
  };
}

export function getPostsAPI() {
  return (dispatch) => {
    let payload;

    db.collection("posts")
      .orderBy("user.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        dispatch(getPosts(payload));
      });
  };
}
