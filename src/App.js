import "./App.css";
import Main from "./components/Main";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
