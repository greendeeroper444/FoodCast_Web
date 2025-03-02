import React, { useState } from 'react'
import styles from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import AuthButton from '../../molecules/AuthButton/AuthButton';
import GoogleButton from '../../molecules/GoogleButton/GoogleButton';
import { loginAdmin } from '../../../redux/actions/AdminActions/AdminAuthAction';


function LoginForm() {
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!emailAddress && !password) {
            toast.error('User and Email are required.');
            return;
        } else if (!emailAddress) {
            toast.error('Username is required.');
            return;
        } else if (!password) {
            toast.error('Password is required.');
            return;
        }
    
        try {
            //dispatch login action and get result
            const result = await dispatch(loginAdmin(fullName, emailAddress, password));
            
            if (result.success) {
                const userFullName = result.admin.fullName || 'User';
                toast.success(`Hi ${userFullName .split(' ')[0]} 👋, Welcome back!!!`);
                navigate('/dashboard');
            } else {
                //handle the error like incorrect password or any other error
                toast.error(result.error || 'Login failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('An unexpected error occurred. Please try again later.');
        }
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        
        //regular expression for a valid email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if(email === '' || emailRegex.test(email)){
            setEmailAddress(email);
        } else {
            toast.error('Invalid email format. Please enter a valid email address.');
        }
    };
    
    

  return (
    <form className={styles.loginForm}>
        <h2>Sign In</h2>
        <FormGroup
            label='Email Address'
            type='email'
            name='email'
            value={emailAddress}
            onChange={handleEmailChange}
            placeholder='Enter your email'
            autoComplete='email'
        />
       
        <FormGroup
            label='Password'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            autoComplete='current-password'
        />

        <div className={styles.forgotPassword}>
            <Link to='/forgot-password'>Forgot password?</Link>
        </div>

        <AuthButton handleAuthButton={handleLogin}>Sign in</AuthButton>

        {/* <div className={styles.orDriver}>or</div>

        <GoogleButton> Sign in with Google </GoogleButton> */}

        <div className={styles.signupLink}>
            Doesn&apos;t have an account yet? <Link to='/register'>Sign up</Link>
        </div>
        
        <br />
    </form>
  )
}

export default LoginForm