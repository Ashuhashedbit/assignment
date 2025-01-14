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
      );
      navigate("/userslist");

    } catch (err) {
      setError("Error during login. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-6 text-end">
          <button
            type="button"
            onClick={handleGenerateOtp}
            className="submit-button"
          >
            Generate OTP
          </button>
        </div>

        <div className="form-group">
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
        
        <div className="col-6 text-end">
          <button type="submit" className="submit-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
