import { auth, provider, storage } from "../firebase";
import db from "../firebase";

export const setUser = (payload) => ({
  type: "SET_USER",
  user: payload,
});

// export function signInAPI() {
//   return (dispatch) => {
//     auth
//       .signInWithPopup(provider)
//       .then((payload) => {
//         console.log(payload.user);
//         dispatch(setUser(payload.user));
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   };
// }

export function signInAPI() {
  return async (dispatch) => {
    try {
      const res = await auth.signInWithPopup(provider);
      const user = res.user;
      const query = await db
        .collection("users")
        .where("uid", "==", user.uid)
        .get();
      if (query.docs.length === 0) {
        await db.collection("users").add({
          uid: user.uid,
          displayName: user.displayName,
          authProvider: "google",
          email: user.email,
          photoURL: user.photoURL,
        });
      }
      dispatch(setUser(user));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
}

// export async function signInAPI() {
//   try {
//     const res = await auth.signInWithPopup(provider);
//     const user = res.user;
//     const query = await db
//       .collection("users")
//       .where("uid", "==", user.uid)
//       .get();
//     if (query.docs.length === 0) {
//       await db.collection("users").add({
//         uid: user.uid,
//         displayName: user.displayName,
//         authProvider: "google",
//         email: user.email,
//         photoURL: user.photoURL,
//       });
//       alert("User created successfully");
//     }
//     return (dispatch) => {
//       dispatch(setUser(user));
//     };
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// }

export const getUsers = (payload) => ({
  type: "GET_USERS",
  payload: payload,
});

export function getUsersAPI() {
  return (dispatch) => {
    let payload;

    db.collection("users").onSnapshot((snapshot) => {
      payload = snapshot.docs;
      dispatch(getUsers(payload));
    });
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const query = await db
          .collection("users")
          .where("uid", "==", user.uid)
          .get()
          .then((abc) => abc.docs.map((e) => dispatch(setUser(e.data()))));
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

export const getComments = (payload) => ({
  type: "GET_COMMENTS",
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
          comments: [],
          likes: [],
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
        comments: [],
        likes: [],
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
        comments: [],
        likes: [],
        description: payload.description,
      });
    }
  };
}

export function commentAPI(payload) {
  return (dispatch) => {
    db.collection("comments").add({
      user: {
        description: payload.user.email,
        title: payload.user.displayName,
        date: payload.timestamp,
        uid: payload.user.uid,
      },
      postID: payload.postID,
      comment: payload.comment,
      likes: [],
    });
  };
}

export function getCommentsAPI() {
  return (dispatch) => {
    let payload;

    db.collection("comments")
      .orderBy("user.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs;
        dispatch(getComments(payload));
      });
  };
}

export function getPostsAPI() {
  return (dispatch) => {
    let payload;

    db.collection("posts")
      .orderBy("user.date", "desc")
      .onSnapshot((snapshot) => {
        // payload = snapshot.docs.map((doc) => doc.data());
        payload = snapshot.docs;
        dispatch(getPosts(payload));
      });
  };
}
