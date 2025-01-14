import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function OTPTablePage() {
  const { state } = useLocation(); 
  const navigate = useNavigate(); 
  const [otpData, setOtpData] = useState([state?.user]); 

  useEffect(() => {
    if (!state?.user) {
      console.error("User data not passed correctly!");
    }
  }, [state]);

  const handleAccept = () => {
    if (otpData && otpData.length > 0) {
      const user = otpData[0]; 
      navigate("/login", {
        state: {
          username: user.username,
          password: user.password, 
          otp: user.tempotp,
        },
      });
    }
  };

  return (
    <div>
      <h2>OTP Table for Users</h2>
      <table
      className="table table-responsive"
      >
        <thead>
          <tr>
            {/* <th>User ID</th> */}
            <th>Username</th>
            <th>Generated OTP</th>
            {/* <th>Status</th> */}
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {otpData?.map((item) => (
            <tr key={item.id}>
              {/* <td>{item.id}</td> */}
              <td>{item.username}</td>
              <td>{item.tempotp}</td>
              {/* <td>{item.status || "Pending"}</td> */}
              <td>
                <button onClick={handleAccept}>Accept</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OTPTablePage;
