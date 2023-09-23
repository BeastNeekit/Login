import React, { useState } from 'react';

function AccountSettings() {
    const [profilePicture, setProfilePicture] = useState(null);

    const handleProfilePictureChange = (e) => {
        // Handle profile picture upload here
        const file = e.target.files[0];
        // Process and set the profile picture using state
    };

    const handleSaveChanges = () => {
        // Handle saving changes to the user's account settings
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>Account Settings</h2>
                        </div>
                        <div className="card-body">
                            {/* Profile Picture */}
                            <div className="form-group">
                                <label>Profile Picture</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                />
                                {profilePicture && (
                                    <img
                                        src={URL.createObjectURL(profilePicture)}
                                        alt="Profile"
                                        className="mt-3"
                                        style={{ maxWidth: '150px' }}
                                    />
                                )}
                            </div>

                            {/* Other account settings inputs */}
                            {/* ... */}

                            {/* Save Changes button */}
                            <button className="btn btn-primary" onClick={handleSaveChanges}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;
