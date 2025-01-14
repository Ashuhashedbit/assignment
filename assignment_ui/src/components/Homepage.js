import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Helper function to get user info from local storage
const getUserInfo = () => {
  const userId = localStorage.getItem("user_id");
  const userType = localStorage.getItem("user_type");
  return userId ? { userId, userType } : null;
};

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserInfo();

    if (userInfo) {
      setUser(userInfo);

      // Fetch user type if not already in local storage
      if (!userInfo.userType) {
        fetchUserType(userInfo.userId);
      } else {
        setUserType(userInfo.userType);
      }
    }
  }, []);

  // Function to fetch user type from the backend
  const fetchUserType = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${userId}`);
      const { userType } = response.data;
      console.log(userType)
      localStorage.setItem("user_type", userType);
      setUserType(userType);
    } catch (err) {
      console.error("Error fetching user type:", err);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type");
    setUser(null);
    setUserType(null);
  };

  return (
    <div className="homepage">
      
      <header className="hero">
        <div>
          {user ? (
            <>
              {/* <h1>Hello, User #{user.userId}!</h1> */}
              {/* <h4>Your User Type: {userType || "Loading..."}</h4> */}
              <button className="submit-button">
                <Link to="/userslist">User </Link>
              </button>
              {/* Logout Button */}
              <button onClick={handleLogout} className="submit-user">Logout</button>
            </>
          ) : (
            <button className="submit-button">
              <Link to="/login" >Login</Link>
            </button>
          )}
        </div>
        </header>
    </div>
  );
};

export default Homepage;
