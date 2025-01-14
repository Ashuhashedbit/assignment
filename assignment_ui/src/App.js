import React from "react";
import { BrowserRouter as Router, Route, Routes, UNSAFE_RouteContext } from "react-router-dom";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import OTPTablePage from "./components/OTPTablePage";
import UsersList from "./components/Userslist";
import UsersAdd from "./components/Usersadd";
import UsersUpdate from "./components/Usersupdate";
import UsersView from "./components/Usersview";

import Header from "./components/Header";
function App() {
  return (
    <div className="container px-5 py-4">
      <Router>
        {/* <header className="App-header"> 
      </header>*/}
        <div className="row">
          <Header />
        </div>

        <div className="row">

          <Routes>
            <Route path="/userslist" element={<UsersList />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp-table" element={<OTPTablePage />} />
            {/* <Route path="/userlist" element={<UserList />} /> */}
            <Route path="/usersadd" element={<UsersAdd />} />
            <Route path="/users/usersupdate/:userid" element={<UsersUpdate />} />
            <Route path="/users/usersview/:userid" element={<UsersView />} />
          </Routes>

        </div>
        <div className="row">

        </div>
      </Router>
    </div>
  );
}

export default App;
