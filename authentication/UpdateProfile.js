
import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put('/api/profile', {
                name,
                email
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setStatus(response.data.message);
        } catch (error) {
            console.error('There was an error updating the profile!', error);
            setStatus('Error updating profile');
        }
    };

    return (
        <div>
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default UpdateProfile;
