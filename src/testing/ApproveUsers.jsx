import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ApproveUsers() {
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/adminCollector/getPendingUsers')
            .then((response) => setPendingUsers(response.data))
            .catch((error) => console.error(error));
    }, []);

    const approveUser = (id) => {
        axios.post(`http://localhost:8080/api/adminCollector/approvePendingUser/${id}`)
            .then(() => {
                setPendingUsers(pendingUsers.filter(user => user._id !== id));
                toast.success('User approved successfully!');
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to approve user. Please try again.');
            });
    };

    return (
        <div>
            <ToastContainer />
            <h1>Approve Users</h1>
            <div>
                <h2>Pending Collectors</h2>
                {pendingUsers.filter(user => user.role === 'collector').map(user => (
                    <div key={user._id}>
                        <p>{user.fullName}</p>
                        <button onClick={() => approveUser(user._id)}>Approve</button>
                    </div>
                ))}
            </div>
            <div>
                <h2>Pending Vendors</h2>
                {pendingUsers.filter(user => user.role === 'vendor').map(user => (
                    <div key={user._id}>
                        <p>{user.fullName}</p>
                        <button onClick={() => approveUser(user._id)}>Approve</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApproveUsers;
