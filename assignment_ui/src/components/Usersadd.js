import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function UsersAdd() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    mobile: '',
    password: '',
    usertype: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/users/adduser', formData);
      setMessage(response.data.message);
      setError('');
      setFormData({
        name: '',
        email: '',
        gender: '',
        mobile: '',
        password: '',
        usertype: '',
      });

      // Navigate to users list page after successful submission
      if (response.status === 200) {
        navigate('/userslist');
      }
    } catch (err) {
      setError('Error adding user: ' + (err.response?.data?.message || err.message));
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Add New User</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
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
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
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

        <button className="submit-button" type="submit">Add User</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}


      <button className="submit-button">
        <Link to="/userslist">Back</Link>
      </button>
    </div>
  );
}

export default UsersAdd;
