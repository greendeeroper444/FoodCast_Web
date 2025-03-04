import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../../../atoms/InputField/InputField';
import styles from './ProfileComponent.module.css';
import { fetchAdminDataForUpdate, updateAdminProfile } from '../../../../../redux/actions/AdminActions/AdminAuthAction';
import { toast } from 'react-toastify';

function ProfileComponent() {
    const dispatch = useDispatch();
    const {admin} = useSelector((state) => state.admin);
    const [formData, setFormData] = useState({
        fullName: '',
        middleName: '',
        emailAddress: '',
        contactNumber: '',
        address: '',
        position: '',
        profilePicture: null
    });


    const [initialData, setInitialData] = useState({});

    //fetch admin data for updating the profile when the component is mounted
    useEffect(() => {
        dispatch(fetchAdminDataForUpdate());
    }, [dispatch]);

    //update the form state when the admin data is successfully fetched
    useEffect(() => {
        if (admin) {
            setFormData((prevState) => ({
                ...prevState,
                ...admin
            }));
            setInitialData(admin);
        }
    }, [admin]);


    //for updating form field values when the user types or selects new input
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    //for updating the form state when a new file(profile picture) is selected
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error('File size exceeds 10MB limit.');
                return;
            }

            setFormData((prevState) => ({
                ...prevState,
                profilePicture: file
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        //utility function to convert camelCase to proper case
        const formatFieldName = (fieldName) => {
            return fieldName
            .replace(/([A-Z])/g, ' $1') //add a space before capital letters
            .replace(/^./, (str) => str.toUpperCase()); //capitalize the first letter
        };
    
        //determine which fields were updated
        const updatedFields = Object.keys(formData).filter((key) => {
            if (key === 'profilePicture') return false; //skip file comparison
            return formData[key] !== initialData[key];
        });
    
        //create the toast message
        if (updatedFields.length === 1) {
            toast.success(`${formatFieldName(updatedFields[0])} is updated successfully.`);
        } else if (updatedFields.length > 1) {
            toast.success('Your profile is updated successfully.');
        }
    
        const updatedFormData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'profilePictures' && !formData[key]) return; //skip appending null profilePicture
            updatedFormData.append(key, formData[key]);
        });
    
        //dispatch update action
        dispatch(updateAdminProfile(updatedFormData));
    };
    

  return (
    <main className={styles.profileContent}>
        <div className={styles.profileHeader}>
            <img
                src={admin?.profilePicture || '/default-profile.png'}
                alt="Profile"
                className={styles.profileImage}
            />
            <div className={styles.profileInfo}>
                <h3 className={styles.profileName}>{admin?.fullName}</h3>
                <p className={styles.profileRole}>{admin?.position}</p>
            </div>
        </div>

        <form className={styles.profileForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label>Full Name</label>
                <InputField type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
                <label>Middle Name</label>
                <InputField type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
                <label>Email</label>
                <InputField type="email" name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
                <label>Contact Number</label>
                <InputField type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
                <label>Address</label>
                <InputField type="text" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
                <label>Profile Picture</label>
                <input type="file" name="profilePicture" onChange={handleFileChange} />
            </div>
            <button type="submit" className={styles.editButton}>Update</button>
        </form>
    </main>
  )
}

export default ProfileComponent
