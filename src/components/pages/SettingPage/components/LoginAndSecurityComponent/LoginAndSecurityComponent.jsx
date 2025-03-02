import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './LoginAndSecurityComponent.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputField from '../../../../atoms/InputField/InputField';
import { changePasswordAdmin, setError } from '../../../../../redux/actions/AdminActions/AdminAuthAction';
import { toast } from 'react-toastify';


function LoginAndSecurityComponent() {
    const dispatch = useDispatch();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const error = useSelector(state => state.admin.error);

    //function to determine password strength
    const getPasswordStrength = (password) => {
        const hasLength = password.length >= 8;
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);

        //scoring based on password characteristics
        const score = [hasLength, hasNumber, hasSpecialChar, hasLowercase, hasUppercase].filter(Boolean).length;

        if (score <= 2) return { label: 'Weak', color: 'red' };
        if (score === 3 || score === 4) return { label: 'Medium', color: 'orange' };
        if (score === 5) return { label: 'Strong', color: 'green' };
    };

    const passwordStrength = getPasswordStrength(newPassword);

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            dispatch(setError('Passwords do not match'));
            return;
        }
        if (passwordStrength.label !== 'Strong') {
            dispatch(setError('Password does not meet strength requirements'));
            return;
        }
        
        //dispatch the action to change the password
        dispatch(changePasswordAdmin(oldPassword, newPassword))
            .then(() => {
                toast.success('Password changed successfully!');

                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            })
            .catch((err) => {
                toast.error('Failed to change password!');
            });
    };

  return (
    <div className={styles.loginSecurityContent}>
        <h3 className={styles.loginSecurityHeader}>Change Password</h3>
        
        {error && <p className={styles.error}>{error}</p>}

        <form className={styles.loginSecurityForm} onSubmit={handlePasswordChange}>
            <div className={styles.formGroup}>
                <label>Old Password</label>
                <div className={styles.passwordField}>
                    <InputField 
                        type={showOldPassword ? "text" : "password"} 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                    />
                    {
                        showOldPassword ? 
                        <FaEye className={styles.icon} onClick={() => setShowOldPassword(false)} /> : 
                        <FaEyeSlash className={styles.icon} onClick={() => setShowOldPassword(true)} />
                    }
                </div>
            </div>

            <div className={styles.formGroup}>
                <label>New Password</label>
                <div className={styles.passwordField}>
                    <InputField 
                        type={showNewPassword ? "text" : "password"} 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                    />
                    {
                        showNewPassword ? 
                        <FaEye className={styles.icon} onClick={() => setShowNewPassword(false)} /> : 
                        <FaEyeSlash className={styles.icon} onClick={() => setShowNewPassword(true)} />
                    }
                    <div className={styles.strengthIndicator} style={{ color: passwordStrength?.color }}>
                        {passwordStrength?.label}
                    </div>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label>Confirm Password</label>
                <div className={styles.passwordField}>
                    <InputField 
                        type={showConfirmPassword ? "text" : "password"} 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    {
                        showConfirmPassword ? 
                        <FaEye className={styles.icon} onClick={() => setShowConfirmPassword(false)} /> : 
                        <FaEyeSlash className={styles.icon} onClick={() => setShowConfirmPassword(true)} />
                    }
                </div>
            </div>

            <div className={styles.passwordRequirements}>
                <p>Password must contain:</p>
                <ul>
                    <li className={newPassword.length >= 8 ? styles.valid : ''}>
                        {newPassword.length >= 8 && '✔️'} At least 8 characters
                    </li>
                    <li className={/[0-9]/.test(newPassword) ? styles.valid : ''}>
                        {/[0-9]/.test(newPassword) && '✔️'} At least 1 number (0-9)
                    </li>
                    <li className={/[!@#$%^&*]/.test(newPassword) ? styles.valid : ''}>
                        {/[!@#$%^&*]/.test(newPassword) && '✔️'} At least 1 special symbol (!@#$%^&*)
                    </li>
                    <li className={/[a-z]/.test(newPassword) ? styles.valid : ''}>
                        {/[a-z]/.test(newPassword) && '✔️'} At least 1 lowercase letter (a-z)
                    </li>
                    <li className={/[A-Z]/.test(newPassword) ? styles.valid : ''}>
                        {/[A-Z]/.test(newPassword) && '✔️'} At least 1 uppercase letter (A-Z)
                    </li>
                </ul>
            </div>

            <button type="submit" className={styles.saveButton}>Save Password</button>
        </form>
    </div>
  )
}

export default LoginAndSecurityComponent
