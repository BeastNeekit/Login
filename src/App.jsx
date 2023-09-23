// App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccountSettings from './AccountSettings';

function App() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const announcements = [
        {
            id: 1,
            title: 'Important Update',
            content: 'We have released a new version of our platform with exciting features!',
        },
        {
            id: 2,
            title: 'Holiday Closure',
            content: 'Our office will be closed for the holidays from December 24th to January 2nd.',
        },
    ];

    const handleLogin = () => {
        // You can add authentication logic here
        // For this example, we're just checking if name and password are not empty
        if (name !== '' && password !== '') {
            setLoggedIn(true);
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };

    return (
        <Router>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h2>{loggedIn ? 'Welcome' : 'Login'}</h2>
                            </div>
                            <div className="card-body">
                                {loggedIn ? (
                                    <div>
                                        <h3 className="welcome-message">Hey, {name}!</h3>
                                        <button className="btn btn-danger" onClick={handleLogout}>
                                            Logout
                                        </button>

                                        {/* Announcements section */}
                                        <div className="mt-3 announcement-container">
                                            <h4>Announcements</h4>
                                            <ul className="list-group">
                                                {announcements.map((announcement) => (
                                                    <li key={announcement.id} className="list-group-item announcement-item">
                                                        <strong>{announcement.title}</strong>
                                                        <p>{announcement.content}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Full Name"
                                                value={name}
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
                                            Login
                                        </button>
                                    </div>

                                )}
                            </div>
                            <Switch>
                                <Route path="/account-settings" component={AccountSettings} />
                                {/* Add other routes as needed */}
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
</Router>
    );
}

export default App;
