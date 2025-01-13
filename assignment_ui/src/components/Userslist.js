import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [userList, setUserList] = useState();
  const callApiExamsList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'users/allusers';
      const response = await axios.get(url);
      console.log(response);
      console.log(response.data);
      setUserList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApiExamsList();
  }, []);

  

  return (
    <div>
      <Link to='/useradd' className='btn btn-primary'>
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
            <th>Mobile</th>
            <th>Password</th>
            <th>Status</th>
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
                <td>{item.mobile}</td>
                <td>{item.password}</td>
                {/* <td>{item.status}</td> */}
                <td>
                    <button>
                    <Link
                    to={`/useredit/${item.userid}`}
                    className='btn btn-warning'
                  >
                    Edit
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
