import "./App.css";
import Main from "./components/Main";
import Login from "./components/Login";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
import UserProfile from "./components/UserProfile";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, [props.users]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Main />} />
          <Route path="/profile/:email" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { users: state.usersState.users };
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
