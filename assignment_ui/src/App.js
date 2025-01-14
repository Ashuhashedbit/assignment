import React from "react";
import { BrowserRouter as Router, Route, Routes, UNSAFE_RouteContext } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import OTPTablePage from "./components/OTPTablePage"; 
import UsersList from "./components/UsersList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            {/* <Route path="/userslist" element={<UsersList />} />  */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp-table" element={<OTPTablePage />} />
            <Route path="/userlist" element={<UsersList />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
