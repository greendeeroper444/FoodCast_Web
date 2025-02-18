import React from 'react'
import styles from './ManageUserComponent.module.css';
import PropTypes from 'prop-types';
import { formatDate } from '../../../../../utils/dateUtils';


function RequestTableComponent({users, onApprove, onDecline}) {
    
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
                                {/* <td>{formatDate(user.createdAt)}</td> */}
                                {/* <td>
                                    <button className={styles.viewButton}>View</button>
                                </td> */}
                                <td>
                                    <button className={styles.approveButton} onClick={() => onApprove(user._id)}>Approve</button>
                                    {' '}
                                    <button className={styles.declineButton} onClick={() => onDecline(user._id)}>Decline</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p className={styles.noDataYet}>No users requested yet.</p>
                    )
                }
            </tbody>
        </table>
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
