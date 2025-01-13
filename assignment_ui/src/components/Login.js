import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

  // Generate OTP by verifying username and password from DB
  const handleGenerateOtp = async () => {
    try {
      const { username, password } = credentials;
      const response = await axios.post("http://localhost:4000/users/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const user = response.data.find(
          (user) => user.username === username && user.password === password
        );

        if (user) {
          const otp = Math.floor(Math.random() * 1000000);
          user.tempotp = otp; // Assign temp OTP for verification
          setCredentials({ ...credentials, otp });

          // Store user ID in local storage
          localStorage.setItem("user_id", user.userid);

          // Navigate to OTP page with user info
          navigate("/otp-table", { state: { user } });
        } else {
          setError("Invalid username or password!");
        }
      }
    } catch (err) {
      setError("Error generating OTP. Please try again.");
    }
  };

  // Submit login with username, password, and OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password, otp } = credentials;
      const response = await axios.post("http://localhost:4000/users/login", {
        username,
        password,
      });

      const user = response.data.find(
        (user) => user.username === username && user.tempotp === otp
      )
      // localStorage.setItem("user_id", user.userid);
        navigate("/");;

      // if (user) {
      //   // Store user ID in local storage after successful login
      //   localStorage.setItem("user_id", user.userid);
      //   navigate("/");
      // } else {
      //   setError("Login failed. Incorrect OTP or credentials.");
      // }
    } catch (err) {
      setError("Error during login. Please try again.");
    }
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
          <button
            type="button"
            onClick={handleGenerateOtp}
            style={{ marginTop: "10px", marginLeft: "10px" }}
          >
            Generate OTP
          </button>
        </div>
        <button type="submit" style={{ marginTop: "15px" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
