import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import styles from './RegisterForm.module.css';
import { registerAdmin } from '../../../redux/actions/AdminActions/AdminAuthAction';
import AuthButton from '../../molecules/AuthButton/AuthButton';
import GoogleButton from '../../molecules/GoogleButton/GoogleButton';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SelectField from '../../atoms/SelectField/SelectField';

function RegisterForm() {
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [position, setPosition] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getPasswordStrength = (password) => {
        const hasLength = password.length >= 8;
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);

        const score = [hasLength, hasNumber, hasSpecialChar, hasLowercase, hasUppercase].filter(Boolean).length;

        if (score <= 2) return 'Weak';
        if (score === 3 || score === 4) return 'Medium';
        if (score === 5) return 'Strong';
        return '';
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        const strength = getPasswordStrength(value);
        setPasswordStrength(strength);
    };

    // const handleEmailChange = (e) => {
    //     const email = e.target.value;
        
    //     //regular expression for a valid email format
    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    //     if(email === '' || emailRegex.test(email)){
    //         setEmailAddress(email);
    //     } else {
    //         toast.error('Invalid email format. Please enter a valid email address.');
    //     }
    // };
    const handleEmailChange = (e) => {
        setEmailAddress(e.target.value);
    };
    
    const handleEmailBlur = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailAddress && !emailRegex.test(emailAddress)) {
            toast.error('Invalid email format. Please enter a valid email address.');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        
        if (!fullName) {
            toast.error('Username is required.');
            return;
        }
        if (!emailAddress) {
            toast.error('Email is required.');
            return;
        }
        if (!contactNumber) {
            toast.error('Contact number is required.');
            return;
        }
        if (!position) {
            toast.error('Position number is required.');
            return;
        }
        if (!password) {
            toast.error('Password is required.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
    

        const adminData = {fullName, emailAddress, contactNumber, position, password};
        try {
            dispatch(registerAdmin(adminData));

            toast.success(`Hi ${fullName.split(' ')[0]} 👋, wait for Head Manager approval.`);
            navigate('/');
        } catch (error) {
            console.error(error);
            if (error && typeof error === 'object') {
                Object.entries(error).forEach(([field, message]) => {
                    toast.error(`${field}: ${message}`);
                });
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
    };

  return (
    <form className={styles.registerForm}>
        <h2>Create Account</h2>
        <FormGroup
            label='Full Name'
            type='text'
            name='name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder='Enter your full name'
            autoComplete='name'
        />
        <FormGroup
            label='Email Address'
            type='email'
            name='email'
            value={emailAddress}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder='Enter your email'
            autoComplete='email'
        />
         <FormGroup
            label='Contact Number'
            type='number'
            name='contactNumber'
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder='Enter your contact number'
            autoComplete='tel'
        />
        {/* select position */}
        <div className={styles.selectFieldForm}>
            <SelectField
                label='Position'
                name='position'
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
                options={[
                    {value: 'Admin', label: 'Admin'},
                    {value: 'Staff', label: 'Staff'},
                ]}
            />
        </div>


        <div className={styles.formGroup}>
            <FormGroup
                label='Password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder='Enter your password'
                autoComplete='new-password'
            />
            <span className={`${styles.passwordStrength} ${styles[`passwordStrength--${passwordStrength.toLowerCase()}`]}`}>
                {passwordStrength}
            </span>
            <div className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
        </div>

        <FormGroup
            label='Confirm Password'
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm your password'
            autoComplete='new-password'
        />

        <AuthButton handleAuthButton={handleRegister}>Sign up</AuthButton>

        {/* <div className={styles.orDriver}>or</div>

        <GoogleButton> Sign in with Google </GoogleButton> */}

        <div className={styles.signupLink}>
            Already have an account? <Link to='/'>Sign in</Link>
        </div>

        <br />
    </form>
  )
}

export default RegisterForm
