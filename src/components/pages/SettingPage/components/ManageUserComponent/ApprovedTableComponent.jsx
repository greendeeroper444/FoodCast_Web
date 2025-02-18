import React from 'react'
import styles from './ManageUserComponent.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import api from '../../../../../api/api';

function ApprovedTableComponent({users, setUsers}) {

    const handleDelete = async (userId) => {
        const toastId = toast.loading('Deleting user...');
    
        try {
            await api.delete(`/adminUser/deleteUser/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
    
            toast.update(toastId, { 
                render: 'User deleted successfully!', 
                type: 'success', 
                isLoading: false, 
                autoClose: 3000 
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.update(toastId, { 
                render: 'Failed to delete user.', 
                type: 'error', 
                isLoading: false, 
                autoClose: 3000 
            });
        }
    };
    
    const handleEdit = async (userId) => {
        const newFullName = prompt('Enter new name:');
        if (!newFullName) return;
    
        const toastId = toast.loading('Updating user...');
    
        try {
            const response = await api.put(`/adminUser/updateUser/${userId}`, {fullName: newFullName});
            setUsers(users.map(user => user._id === userId ? response.data.updatedUser : user));
    
            toast.update(toastId, { 
                render: 'User updated successfully!', 
                type: 'success', 
                isLoading: false, 
                autoClose: 3000 
            });
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

  return (
    <div className={styles.tableContainer}>
        <table className={styles.userTable}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Active Status</th>
                    {/* <th>Date Approved</th> */}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id}>
                                <td>
                                    <span>
                                        <img className={styles.profilePicture} src={user.profilePicture} alt={user.fullName} />
                                        {user.fullName} <br />
                                        {user.emailAddress}
                                    </span>
                                </td>
                                <td className={styles.statusCell}>
                                    <span
                                        className={user.isOnline ? styles.onlineDot : styles.offlineDot}
                                    ></span>
                                    {user.isOnline ? 'Online' : 'Offline'}
                                </td>
                                {/* <td>{formatDate(user.createdAt)}</td> */}
                                {/* <td>
                                    <button className={styles.viewButton}>View</button>
                                </td> */}
                               <td>
                                    <button className={styles.editButton} onClick={() => handleEdit(user._id)}>Edit</button>
                                    {' '}
                                    <button className={styles.deleteButton} onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p className={styles.noDataYet}>No users approved yet.</p>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

ApprovedTableComponent.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired,
            isOnline: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
}

  
export default ApprovedTableComponent
