import React, { useState } from 'react';
import {faSignIn} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function LogIn({ onLogin }) {

        const [username, setName] = useState('');
        const [password, setPassword] = useState('');

        const handleLogin = () => {
            const isValidUser = validateUser(username, password);

            if (isValidUser) {
                onLogin(username);
            } else {

                alert('Invalid username or password');
            }
        };
        const validateUser = (username, password) => {
            const validUsers = [
                { username: 'Neekit', password: 'password1' },
                { username: 'user2', password: 'password2' },
            ];

            return validUsers.some((user) => user.username === username && user.password === password);
        };


    return (
        <div>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>
                <FontAwesomeIcon icon={faSignIn} className="mr-1" />
                Login
            </button>
        </div>
    );
}

export default LogIn;
