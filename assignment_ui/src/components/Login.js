import React, { useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";

const usersData = [
  { id: "user001", username: "Admin", password: "123456", usertype: "admin" },
  { id: "user002", username: "Principal", password: "123456", usertype: "principal" },
  { id: "user003", username: "Teacher", password: "123456", usertype: "teacher" },
  { id: "user004", username: "Parent", password: "123456", usertype: "parent" },
  { id: "user005", username: "Student", password: "123456", usertype: "student" },
];

function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [credentials, setCredentials] = useState({
    username: state?.username || "",
    password: state?.password || "",
    otp: state?.otp || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleGenerateOtp = () => {
    const user = usersData.find(
      (user) => user.username === credentials.username && user.password === credentials.password
    );

    if (user) {
      const otp = Math.floor(Math.random() * 1000000);
      user.tempotp = otp;
      setCredentials({ ...credentials, otp });

      // Navigate to OTP page
      navigate("/otp-table", { state: { user: user } });
    } else {
      setError("Invalid username or password!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = usersData.find(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password &&
        user.tempotp === credentials.otp
    );

    if (user) {
      const accessLevel = getAccessLevel(user.usertype);
      navigate("/", { state: { user, accessLevel } }); 
    } else {
      setError("Login failed. Incorrect OTP or credentials.");
    }
  };

  const getAccessLevel = (usertype) => {
    const accessLevels = {
      admin: ["createuser", "modifyuser", "removeuser", "adddepartment", "addcourse"],
      principal: ["modifyuser", "addcourse"],
      teacher: ["addcourse", "modifycourse", "removecourse", "addexamresult"],
      parent: ["viewcourse", "viewexamresult"],
      student: ["viewcourse", "viewexamresult"],
    };
    return accessLevels[usertype] || [];
  };

  return (
    <div style={{ margin: "50px" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>OTP:</label>
          <input
            type="text"
            name="otp"
            value={credentials.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "15px" }}>
          Login
        </button>
      </form>
      <button
        type="button"
        onClick={handleGenerateOtp}
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Generate OTP
      </button>
    </div>
  );
}

export default Login;
