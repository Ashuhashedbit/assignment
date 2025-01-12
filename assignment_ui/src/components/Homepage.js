import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const checkLoggedIn = () => {
  const user = localStorage.getItem("user"); 
  return user ? JSON.parse(user) : null; 
};

const Homepage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = checkLoggedIn();
    setUser(loggedInUser);
  }, []);

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
    <div className="homepage">
      <header className="hero">
        <div>
          {user ? (
            <>
              <h3>Welcome, {user.username}!</h3>
              <h4>Your Access Level:</h4>
              <ul>
                {getAccessLevel(user.usertype).map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </>
          ) : (
            <button>
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
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
