import React, { useState } from 'react'
import styles from './ManageUserComponent.module.css';
import PropTypes from 'prop-types';
import { formatDate } from '../../../../../utils/dateUtils';
import api from '../../../../../api/api';
import Modal from '../../../../organisms/Modal/Modal';
import InputField from '../../../../atoms/InputField/InputField';
import UserDetailsForm from '../../../../molecules/UserDetailsForm/UserDetailsForm';
import ModalConfirmation from '../../../../organisms/ModalConfirmation/ModalConfirmation';
import { toast } from 'react-toastify';


function RequestTableComponent({
    users, 
    setUsers,
    onApprove,
    onViewUpdate,
    setSelectedUser, 
    selectedUser,
    setIsModalOpen,
    isModalOpen,
    fetchUsers
}) {
    const [showDeclineConfirmation, setShowDeclineConfirmation] = useState(false);
    const [userToDecline, setUserToDecline] = useState(null);

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleDeclineClick = (user) => {
        setUserToDecline(user);
        setShowDeclineConfirmation(true);
    };

    const handleCloseDeclineConfirmation = () => {
        setShowDeclineConfirmation(false);
        setUserToDecline(null);
    };

    const handleApproveUser = () => {
        if (selectedUser) {
            onApprove(selectedUser._id);
            handleCloseModal();
        }
    };

    //decline pending user
    const handleDecline = async (userId) => {
        const loadingToast = toast.loading('Declining user...');
        try {
            const response = await api.delete(`/api/adminUser/deletePendingUser/${userId}`);
            toast.update(loadingToast, {
                render: response.data.message,
                type: 'success',
                isLoading: false,
                autoClose: 5000
            });

            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
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

        setShowDeclineConfirmation(false);
        setUserToDecline(null);
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
                                    <button className={styles.declineButton} onClick={() => handleDeclineClick(user)}>
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

        {
            showDeclineConfirmation && userToDecline && (
                <ModalConfirmation
                    title={`decline ${userToDecline.fullName} as ${userToDecline.position}`}
                    onClose={handleCloseDeclineConfirmation}
                    onClick={() => handleDecline(userToDecline._id)}
                />
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
