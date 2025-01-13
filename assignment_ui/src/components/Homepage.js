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
              <button>
                <Link to="/userlist">User</Link>
              </button>
              {/* Logout Button */}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button>
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
        {/* <h1>Hello, User {userType.name}!</h1> */}
        <h1>Welcome to ExamHub!</h1>
        <p>Your ultimate destination for exam preparation and study resources.</p>
      </header>

      <section className="article-section">
        <h2>Why Choose ExamHub?</h2>
        <p>
          At ExamHub, we understand the challenges of preparing for competitive exams and academic assessments.
          Our platform offers a comprehensive set of tools and resources to help students excel in their studies.
        </p>

        <h3>Features and Benefits</h3>
        <ul>
          <li>Access to a vast collection of practice tests and sample questions.</li>
          <li>Detailed analytics to track your progress and identify areas for improvement.</li>
          <li>Expert tips and strategies to tackle even the toughest questions.</li>
        </ul>

        <h3>Our Mission</h3>
        <p>
          We believe that every student deserves the best chance to succeed. That’s why we’ve built ExamHub to be
          user-friendly, affordable, and packed with valuable content curated by education experts.
        </p>

        <h3>Get Started Today</h3>
        <p>
          Ready to take your exam preparation to the next level? Sign up for ExamHub and unlock your full potential.
          Join thousands of students who trust ExamHub for their exam success.
        </p>
      </section>

      <footer className="homepage-footer">
        <p>&copy; 2025 ExamHub. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
