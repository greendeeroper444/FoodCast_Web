import React, { useEffect } from 'react'
import styles from './Logo.module.css'
import veggietyLogo from '../../../assets/signin/veggiety-logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminData } from '../../../redux/actions/AdminActions/AdminAuthAction';

function Logo() {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.admin.admin);

    useEffect(() => {
        dispatch(fetchAdminData());
    }, [dispatch]);
  return (
    <div className={styles.logo}>
        <div>
            <img src={veggietyLogo} alt="Logo" />
            <h1>Tagum City Economic 
            Enterprise Office</h1>
        </div>
            {   
                admin ? (
                    <>
                        <p>{admin.position}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )
            }
    </div>
  )
}

export default Logo
