import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function UsersView() {
  const { userid } = useParams();
  const [UserData, setUserData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log('Fetching data for user ID:', userid);  
        const response = await axios.get(`http://localhost:4000/users/getuser/${userid}`);
        
        if (response && response.data) {
          setUserData(response.data[0]);
        } else {
          setError('User data not found.');
        }
      } catch (err) {
        setError('Error fetching user details: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);  
      }
    };

    fetchUserDetails();
  }, [userid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>View User Details</h2>

      <form className="user-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={UserData.name} disabled />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={UserData.email} disabled />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select value={UserData.gender} disabled>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Mobile:</label>
          <input type="text" value={UserData.mobile} disabled />
        </div>

        <div className="form-group">
          <label>User Type:</label>
          <select value={UserData.usertype} disabled>
            <option value="1">Admin</option>
            <option value="2">Principal</option>
            <option value="3">Teacher</option>
            <option value="4">Student</option>
            <option value="5">Parent</option>
          </select>
        </div>

        <div className="col-6 text-end">
                <Link to="/userslist" className="btn btn-dark">
            Back to Users List
            </Link>
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UsersView;
