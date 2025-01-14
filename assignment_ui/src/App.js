import React from "react";
import { BrowserRouter as Router, Route, Routes, UNSAFE_RouteContext } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import OTPTablePage from "./components/OTPTablePage"; 
import UsersList from "./components/Userslist";
import UsersAdd from "./components/Usersadd";
import UsersUpdate from "./components/Usersupdate";
import UsersView from "./components/Usersview";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/userslist" element={<UsersList />} /> 
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp-table" element={<OTPTablePage />} />
            {/* <Route path="/userlist" element={<UserList />} /> */}
            <Route path="/usersadd" element={<UsersAdd />} />
            <Route path="/users/usersupdate/:userid" element={<UsersUpdate />} />
            <Route path="/users/usersview/:userid" element={<UsersView />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
