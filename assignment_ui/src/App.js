import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import OTPTablePage from "./components/OTPTablePage"; 
// import UserList from "./components/Userlist";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp-table" element={<OTPTablePage />} />
            {/* <Route path="/userlist" element={<UserList />} /> */}
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
