import React, { useState } from 'react'
import styles from './ForgotPassword.module.css';
import FormGroup from '../../molecules/FormGroup/FormGroup';
import AuthButton from '../../molecules/AuthButton/AuthButton';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [emailAddress, setEmailAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        //validation
        if (!emailAddress) {
            toast.error('Email address is required');
            return;
        }

        if (!validateEmail(emailAddress)) {
            toast.error('Please enter a valid email address');
            return;
        }

        //show loading toast
        const toastId = toast.loading('Sending reset instructions...');

        try {
            setIsSubmitting(true);
            const response = await api.post('/api/admin/resetPassword', {emailAddress});

            toast.update(toastId, {
                render: response.data.message,
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });
            //open Gmail in a new tab
            // setTimeout(() => {
            //     window.open('https://mail.google.com/', '_blank');
            // }, 3000); //delayed slightly to allow user to see the toast notification
            setTimeout(() => {
                const supportEmail = 'mernstackberdeng@gmail.com';
                const gmailSearchURL = `https://mail.google.com/mail/u/0/#search/from:${supportEmail}`;
                window.open(gmailSearchURL, '_blank');
            }, 3000);

            setTimeout(() => {
                navigate('/');
            }, 3500);

        } catch (error) {
            toast.update(toastId, {
                render: error.response?.data?.message || 'Failed to reset password',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <div className={styles.forgotPasswordPage}>
        <div className={styles.card}>
            <h2 className={styles.title}>Forgot Password</h2>
            <p className={styles.description}>
                Enter your email address below, and we'll send you instructions to reset your password.
            </p>
            <FormGroup
                label='Email'
                type='email'
                name='email'
                placeholder='Enter your email'
                autoComplete='email'
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                disabled={isSubmitting}
            />
            <AuthButton handleAuthButton={handleResetPassword} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </AuthButton>
        </div>
    </div>
  )
}

export default ForgotPassword
