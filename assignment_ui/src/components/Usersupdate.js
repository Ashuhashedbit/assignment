import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UsersUpdate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    mobile: '',
    usertype: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // To handle loading state
  const { userid } = useParams(); // Get user id from URL
  const navigate = useNavigate();

  // Fetch user data for the selected user to populate the form
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/getuser/${userid}`);
        console.log("Fetched User Data:", response.data); // Log the response data to verify it's correct
        if (response.data) {
          setFormData({
            name: response.data.name,
            email: response.data.email,
            gender: response.data.gender,
            mobile: response.data.mobile,
            usertype: response.data.usertype,
          });
        } else {
          setError('User data not found');
        }
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.log(error);
        setError('Error fetching user details');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userid]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/users/updateuser/${userid}`, formData);
      setMessage(response.data.message);
      setError('');
      // Navigate to users list page after successful update
      if (response.status === 200) {
        navigate('/userslist');
      }
    } catch (err) {
      setError('Error updating user: ' + (err.response?.data?.message || err.message));
      setMessage('');
    }
  };

  // Render loading state or form once data is available
  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Update User</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>User Type:</label>
          <select name="usertype" value={formData.usertype} onChange={handleChange} required>
            <option value="">Select User Type</option>
            <option value="1">Admin</option>
            <option value="2">Principal</option>
            <option value="3">Teacher</option>
            <option value="4">Student</option>
            <option value="5">Parent</option>
          </select>
        </div>

        <button className="submit-button" type="submit">
          Update User
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UsersUpdate;
