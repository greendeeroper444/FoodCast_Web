import React, { useState, useEffect } from 'react'
import styles from './ManageUserComponent.module.css';
import RequestTableComponent from './RequestTableComponent';
import ApprovedTableComponent from './ApprovedTableComponent';
import { toast } from 'react-toastify';
import api from '../../../../../api/api';

function ManageUserComponent({setHasNotification}) {
    const [activeTab, setActiveTab] = useState('request');
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [positionFilter, setPositionFilter] = useState('All');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    //fetch users on component mount and position filter change
    useEffect(() => {
        fetchUsers();
    }, [positionFilter]);

    const fetchUsers = async () => {
        try {
            const {data} = await api.get(`/adminUser/getUsers`);
            setApprovedUsers(
                data.approvedUsers.filter(user => positionFilter === 'All' || user.position === positionFilter)
            );
            setPendingUsers(data.pendingUsers.filter(user => positionFilter === 'All' || user.position === positionFilter));

            setHasNotification(data.pendingUsers.length > 0);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };



    //aprove pending users
    const onApprove = async (userId) => {
        const loadingToast = toast.loading('Approving user...');
        try {
            const response = await api.post(`/adminUser/approvePendingUser/${userId}`);
            toast.update(loadingToast, {
                render: response.data.message,
                type: 'success',
                isLoading: false,
                autoClose: 5000
            });

            //remove approved user from list
            setPendingUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

            fetchUsers() //refresh approved users
        } catch (error) {
            console.error('Error approving user:', error);
            const errorMessage = error.response?.data?.message || 'Failed to approve user.';

            toast.update(loadingToast, {
                render: errorMessage,
                type: 'error',
                isLoading: false,
                autoClose: 5000
            });
        }
    };

    //decline pending user
    const onDecline = async (userId) => {
        const loadingToast = toast.loading('Declining user...');
        try {
            const response = await api.delete(`/adminUser/deletePendingUser/${userId}`);
            toast.update(loadingToast, {
                render: response.data.message,
                type: 'success',
                isLoading: false,
                autoClose: 5000
            });

            setPendingUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            fetchUsers() //refresh declined users
        } catch (error) {
            console.error('Error declining user:', error);
            toast.update(loadingToast, {
                render: 'Failed to decline user.',
                type: 'error',
                isLoading: false,
                autoClose: 5000
            });
        }
    };

    const onViewUpdateApprovedUser = async (updatedUserData) => {

        const toastId = toast.loading('Updating user...');
        
        try {
            const response = await api.put(`/adminUser/viewAndUpdateApprovedUser/${selectedUser._id}`, updatedUserData);
            console.log(response.data.message);
            setIsModalOpen(false);

            toast.update(toastId, { 
                render: 'User updated successfully!', 
                type: 'success', 
                isLoading: false, 
                autoClose: 3000 
            });

            fetchUsers() //refresh approved users
        } catch (error) {
            console.error('Error updating user:', error);
            toast.update(toastId, { 
                render: 'Failed to update user.', 
                type: 'error', 
                isLoading: false, 
                autoClose: 3000 
            });
        }
    };

    //view and update pending user
    const onViewUpdatePendingUser = async (updatedUserData) => {

        const toastId = toast.loading('Updating user...');
        
        try {
            const response = await api.put(`/adminUser/viewAndUpdatePendingUser/${selectedUser._id}`, updatedUserData);
            console.log(response.data.message);
            setIsModalOpen(false);

            toast.update(toastId, { 
                render: 'User updated successfully!', 
                type: 'success', 
                isLoading: false, 
                autoClose: 3000 
            });

            fetchUsers() //refresh approved users
        } catch (error) {
            console.error('Error updating user:', error);
            toast.update(toastId, { 
                render: 'Failed to updated user.', 
                type: 'error', 
                isLoading: false, 
                autoClose: 3000 
            });
        }
    };

  return (
    <div className={styles.manageUsersComponent}>
        <h1>User&apos;s Approval</h1>
        <div className={styles.manageUsersContainer}>
            <div className={styles.tabs}>
                <span
                    className={`${styles.tab} ${activeTab === 'request' ? styles.active : ''}`}
                    onClick={() => setActiveTab('request')}
                >
                    Request
                </span>
                <span
                    className={`${styles.tab} ${activeTab === 'approved' ? styles.active : ''}`}
                    onClick={() => setActiveTab('approved')}
                >
                    Users
                </span>
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.filterContainer}>
                    <label htmlFor="adminApproval" className={styles.filterLabel}>User Type:</label>
                    <select
                        id="adminApproval"
                        className={styles.filterSelect}
                        value={positionFilter}
                        onChange={(e) => setPositionFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                        <option value="Collector">Collector</option>
                        <option value="Vendor">Vendor</option>
                    </select>
                </div>
                {
                    activeTab === 'request' && 
                    <RequestTableComponent 
                        users={pendingUsers} 
                        onApprove={onApprove} 
                        onDecline={onDecline}
                        onViewUpdate={onViewUpdatePendingUser}
                        setSelectedUser={setSelectedUser}
                        selectedUser={selectedUser}
                        setIsModalOpen={setIsModalOpen}
                        isModalOpen={isModalOpen}

                    />
                }
                {
                    activeTab === 'approved' && 
                    <ApprovedTableComponent 
                        users={approvedUsers} 
                        setUsers={setApprovedUsers} 
                        onViewUpdate={onViewUpdateApprovedUser}
                        setSelectedUser={setSelectedUser}
                        selectedUser={selectedUser}
                        setIsModalOpen={setIsModalOpen}
                        isModalOpen={isModalOpen}
                    />
                }
            </div>
        </div>
    </div>
  )
}

export default ManageUserComponent
