import React, { useState } from 'react'
import styles from './ManageUserComponent.module.css';
import PropTypes from 'prop-types';
import { formatDate } from '../../../../../utils/dateUtils';
import api from '../../../../../api/api';
import Modal from '../../../../organisms/Modal/Modal';
import InputField from '../../../../atoms/InputField/InputField';
import UserDetailsForm from '../../../../molecules/UserDetailsForm/UserDetailsForm';


function RequestTableComponent({
    users, 
    onApprove, 
    onDecline, 
    onViewUpdate,
    setSelectedUser, 
    selectedUser,
    setIsModalOpen,
    isModalOpen
}) {
    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleApproveUser = () => {
        if (selectedUser) {
            onApprove(selectedUser._id);
            handleCloseModal();
        }
    };

  return (
    <div className={styles.tableContainer}>
        <table className={styles.userTable}>
            <thead>
                <tr>
                <th>Name</th>
                <th>Position</th>
                {/* <th>Date Registered</th> */}
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
                                <td>{user.position}</td>
                                <td>
                                    <button className={styles.approveButton} onClick={() => handleOpenModal(user)}>
                                        Approve
                                    </button>
                                    {' '}
                                    <button className={styles.declineButton} onClick={() => onDecline(user._id)}>
                                        Decline
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p className={styles.noDataYet}>No users requested yet.</p>
                    )
                }
            </tbody>
        </table>
        {
            isModalOpen && selectedUser && (
                <Modal
                    title='Approve User'
                    onClose={handleCloseModal} 
                    onSave={() => onViewUpdate(selectedUser)}
                    onApprove={handleApproveUser}
                    unHideApproveButton
                >
                    <UserDetailsForm user={selectedUser} setUser={setSelectedUser} verified/>
                </Modal>
            )
        }
        
    </div>
  )
}

RequestTableComponent.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default RequestTableComponent
