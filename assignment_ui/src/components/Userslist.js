import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [userList, setUserList] = useState([]);
  const callUserslist = async () => {
    try {
      const url = 'http://localhost:4000/users/allusers';
      const response = await axios.get(url);
      //console.log(response);
      console.log(response.data);
      setUserList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callUserslist();
  }, []);
  const deleteUser = async (id) => {
    try {
      const url =  "http://localhost:4000/users/removeuser/" + id;
      const response = await axios.delete(url);
      callUserslist();
      //console.log(response);
    } catch (err) {
      console.log('error');
    }
    
  };
  
  return (
    <div>
      <Link to='/usersadd' className='btn btn-primary'>
        Create New User
      </Link>
      <br></br>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>User Id</th>
            <th>UserName</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Password</th>
            <th>User Type</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.map((item, index) => (
              <tr key={index + item.exam_id}>
                <td>{index + 1}</td>
                <td>{item.userid}</td>   
                <td>{item.username}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.mobile}</td>
                <td>{item.password}</td>
                <td>{item.usertype}</td>
                
                <td>
                    <button>
                    <Link
                        to={`/users/usersupdate/${item.userid}`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>
                    
                    </button>
                 
                </td>
                <td>
                <button
                    onClick={() => deleteUser(item.userid)}
                    className='btn btn-danger'
                  >
                    Delete User
                  </button>
                 
                </td>
                <td>
                    <button>
                    <Link
                    to={`/users/usersview/${item.userid}`}
                    className='btn btn-warning'
                  >
                    View
                  </Link>
                    </button>
                 
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br></br>
    </div>
   
  );
};

export default UsersList;
