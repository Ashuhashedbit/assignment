import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    const userId = localStorage.getItem("user_id");
    const userType = localStorage.getItem("user_type");

    const navigate = useNavigate();

    console.log('userId', userId)

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_type");
        // setUser(null);
        // setUserType(null);
        navigate('/login')
    };

    return (
        <>
            <div className='col-6'>
                <h1>Assignment</h1>
            </div>

            <div className='col-6 text-end'>
                <div>
                    {userId ? (
                        <>
                            {/* <h1>Hello, User #{user.userId}!</h1> */}
                            {/* <h4>Your User Type: {userType || "Loading..."}</h4> */}

                            {/* Logout Button */}
                            <button onClick={handleLogout} className="submit-user">Logout</button>
                        </>
                    ) : (
                        <button className="submit-button">
                            <Link to="/login" >Login</Link>
                        </button>
                    )}
                </div>

            </div>

        </>
    )
}

export default Header
