import React, { useEffect } from 'react'
import styles from './UserNamePosition.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminData } from '../../../redux/actions/AdminActions/AdminAuthAction';

function UserNamePosition() {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.admin.admin);
    const error = useSelector((state) => state.admin.error);

    useEffect(() => {
        dispatch(fetchAdminData());
    }, [dispatch]);

  return (
    <div className={styles.userNamePositionContent}>
        <div className={styles.userProfile}>
            <img src={admin?.profilePicture} alt={admin?.fullName} />
        </div>
        <div className={styles.userNamePosition}>
            {/* {error && <p className={styles.error}>{error}</p>} */}
            {   
                admin ? (
                    <>
                        <p>{admin.fullName}</p>
                    </>
                ) : (
                    <p>Token expired</p>
                )
            }
        </div>
    </div>
  )
}

export default UserNamePosition
