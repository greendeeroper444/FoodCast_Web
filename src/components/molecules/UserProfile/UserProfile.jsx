import React from 'react'
import styles from './UserProfile.module.css';


function UserProfile({imageSrc}) {
  return (
    <div className={styles.userProfile}>
        <img src={imageSrc} alt="User" />
    </div>
  )
}

export default UserProfile
