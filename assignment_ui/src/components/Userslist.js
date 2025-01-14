import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const UsersList = () => {
  const [userList, setUserList] = useState([]);
  const [currentUserType, setCurrentUserType] = useState(null);

  useEffect(() => {
    callUsersList();
    fetchCurrentUserType();
  }, []);

  const fetchCurrentUserType = async () => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:4000/users/getuser/${userId}`);
        setCurrentUserType(response.data[0]?.usertype);
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    }
  };

  const callUsersList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users/allusers');
      setUserList(response.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/users/removeuser/${id}`);
      callUsersList();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const getUserTypeLabel = (type) => {
    switch (type) {
      case 1: return 'Admin';
      case 2: return 'Principal';
      case 3: return 'Teacher';
      case 4: return 'Student';
      case 5: return 'Parent';
      default: return 'Unknown';
    }
  };

  return (
    <div className="container">
      {(currentUserType === 1 || currentUserType === 2) && (
        <button className="submit-button">
          <Link to="/usersadd">Create New User</Link>
        </button>
      )}
      <button className="submit-button">
        <Link to="/">Back</Link>
      </button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>User Id</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>User Type</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList
            .filter(item => currentUserType !== 4 ||currentUserType !== 4 || item.userid === parseInt(localStorage.getItem('user_id')))
            .map((item, index) => (
              <tr key={item.userid}>
                <td>{index + 1}</td>
                <td>{item.userid}</td>
                <td>{item.username}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.mobile}</td>
                <td>{getUserTypeLabel(item.usertype)}</td>
                <td>
                  {(currentUserType === 1 || currentUserType === 2) && (
                    <>
                      <button className="submit-button">
                        <Link to={`/users/usersupdate/${item.userid}`}>Edit</Link>
                      </button>
                      <button className="submit-button" onClick={() => deleteUser(item.userid)}>
                        Delete User
                      </button>
                      <button className="submit-button">
                        <Link to={`/users/usersview/${item.userid}`}>View</Link>
                      </button>
                    </>
                  )}
                  {currentUserType === 3 && (
                    <>
                      <button className="submit-button">
                        <Link to={`/users/usersupdate/${item.userid}`}>Edit</Link>
                      </button>
                      <button className="submit-button">
                        <Link to={`/users/usersview/${item.userid}`}>View</Link>
                      </button>
                    </>
                  )}
                  {(currentUserType === 4 || currentUserType === 5) && (
                    <button className="submit-button">
                      <Link to={`/users/usersview/${item.userid}`}>View</Link>
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
