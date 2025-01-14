import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { useNavigate, useParams, Link } from 'react-router-dom';

const UsersUpdate = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}users/getuser/${userid}`
        );
        if (response.data) {
          setFormValues({
            userid: userid,
            name: response.data[0].name,
            email: response.data[0].email,
            gender: response.data[0].gender,
            mobile: response.data[0].mobile,
            usertype: response.data[0].usertype,
          });
        } else {
          alert('User data not found');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };
    fetchUserDetails();
  }, [userid]);

  const updateUser = async (values) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}users/updateuser/${userid}`,
        values
      );
      if (response.status === 200) {
        navigate('/userslist');  
      }
    } catch (err) {
      console.error('Error updating user:', err);
      alert('There was an error updating the user.');
    }
  };

  return (
    <div className="container">
      <h2>Update User</h2>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={updateUser} 
      >
        <Form className="user-form">
          <div className="form-group">
            <label>Name:</label>
            <Field
              name="name"
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <Field
              name="email"
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <Field as="select" name="gender" className="form-control" required>
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Field>
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <Field
              name="mobile"
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>User Type:</label>
            <Field as="select" name="usertype" className="form-control" required>
              <option value="">Select User Type</option>
              <option value="1">Admin</option>
              <option value="2">Principal</option>
              <option value="3">Teacher</option>
              <option value="4">Student</option>
              <option value="5">Parent</option>
            </Field>
          </div>
          <div className="mt-3">
            <button type="submit" className="submit-button">
              Submit
            </button>
            &nbsp; &nbsp;
            <Link to="/userslist" className="submit-button">
              Cancel
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UsersUpdate;
