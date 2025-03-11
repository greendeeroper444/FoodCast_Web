import React, { useState } from 'react'
import styles from './ManageUserComponent.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import api from '../../../../../api/api';
import Modal from '../../../../organisms/Modal/Modal';
import InputField from '../../../../atoms/InputField/InputField';
import UserDetailsForm from '../../../../molecules/UserDetailsForm/UserDetailsForm';
import ModalConfirmation from '../../../../organisms/ModalConfirmation/ModalConfirmation';

function ApprovedTableComponent({
    users, 
    setUsers,
    onViewUpdate,
    setSelectedUser, 
    selectedUser,
    setIsModalOpen,
    isModalOpen
}) {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);


    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteConfirmation(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
        setUserToDelete(null);
    };

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
        
        setShowDeleteConfirmation(false);
        setUserToDelete(null);
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
                                    <button className={styles.editButton} onClick={() => handleViewUser(user)}>View</button>
                                    {' '}
                                    <button className={styles.deleteButton} onClick={() => handleDeleteClick(user)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p className={styles.noDataYet}>No users approved yet.</p>
                    )
                }
            </tbody>
        </table>
        {
            isModalOpen && selectedUser && (
                <Modal 
                    title='User Details/Update' 
                    onClose={handleCloseModal} onSave={() => onViewUpdate(selectedUser)}
                    >
                    <UserDetailsForm user={selectedUser} setUser={setSelectedUser} />
                </Modal>
            )
        }
        {
            showDeleteConfirmation && userToDelete && (
                <ModalConfirmation
                    title={`delete ${userToDelete.fullName}`}
                    onClose={handleCloseDeleteConfirmation}
                    onClick={() => handleDelete(userToDelete._id)}
                />
            )
        }
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
