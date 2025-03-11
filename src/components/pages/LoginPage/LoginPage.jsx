import React, { useEffect, useState } from 'react'
import styles from './LoginPage.module.css';
import sidebarBg from '../../../assets/images/sidebar-bg.png';
import logoImage from '../../../assets/signin/veggiety-logo.png';
import LoginForm from '../../../components/organisms/LoginForm/LoginForm';
import { toast } from 'react-toastify';

function LoginPage() {
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        //check if the modal should be hidden based on the timestamp in localStorage
        // const agreedTimestamp = localStorage.getItem('termsAcceptedAt');
        // if (agreedTimestamp) {
        //     const now = new Date().getTime();
        //     const elapsed = now - parseInt(agreedTimestamp, 10);
        //     const twentyFourHours = 24 * 60 * 60 * 1000; //24 hours in milliseconds

        //     if (elapsed < twentyFourHours) {
        //         setShowModal(false);
        //     } else {
        //         //remove expired timestamp
        //         localStorage.removeItem('termsAcceptedAt');
        //         setShowModal(true);
        //     }
        // } else {
        //     setShowModal(true);
        // }
        const agreed = localStorage.getItem('termsAcceptedAt');
        if (agreed) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    }, []);

    const handleAgree = () => {
        localStorage.setItem('termsAcceptedAt', new Date().getTime().toString());
        setShowModal(false);
        toast.success('Thanks for accepting the terms and conditions!');
    };
    const handleDecline = () => {
        toast('You must accept the terms to use the system.');
    };
    
  return (
    <div className={styles.loginPage}>
        {/* modal for term condition */}
        {
            showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Terms and Conditions</h2>
                        <div className={styles.modalContent}>
                            <ol>
                                <li>
                                    <strong>Acceptance of Terms</strong>
                                    <p>
                                        By accessing and using the System, you acknowledge that you have read, understood, and agree to abide by these terms and conditions. If you do not agree with any part of these terms, you are prohibited from using the System.
                                    </p>
                                </li>
                                <li>
                                    <strong>System Usage</strong>
                                    <p>
                                        The System is designed for forecasting and managing the supply chain of vegetables and fruits through farm tagging and predictive analytics. The administration will primarily use the System for managing data, reports, and system operations.
                                    </p>
                                    <p>
                                        Administrative access to the System is restricted to authorized personnel only. The sharing of login credentials is prohibited.
                                    </p>
                                </li>
                                <li>
                                    <strong>Responsibilities</strong>
                                    <p>
                                        <u>Data Integrity:</u> Administrators are responsible for ensuring the accuracy of all data entered into the System. This includes the details on supply volumes, farm locations, vendor information, and forecasting inputs.
                                    </p>
                                    <p>
                                        <u>Confidentiality:</u> Administrators must ensure the confidentiality of the data stored in the System. All reports generated, and data accessed through the System are to be handled in compliance with data privacy laws.
                                    </p>
                                    <p>
                                        <u>System Maintenance:</u> The administration must schedule periodic reviews of data integrity and perform routine maintenance to ensure the efficient operation of the System.
                                    </p>
                                </li>
                                <li>
                                    <strong>Prohibited Activities</strong>
                                    <p>
                                        <u>Misuse of Data:</u> The System’s data should only be used for forecasting and supply chain management purposes. The sale, distribution, or use of data for unauthorized purposes is strictly prohibited.
                                    </p>
                                    <p>
                                        <u>Unauthorized Access:</u> Any attempt to gain unauthorized access to restricted areas of the System, interfere with its operations, or use the System in a manner that violates any applicable law is prohibited.
                                    </p>
                                </li>
                                <li>
                                    <strong>Data Security</strong>
                                    <p>
                                        The System implements encryption and access control mechanisms to protect the data. However, the administration is responsible for regularly updating security protocols and monitoring for unauthorized access.
                                    </p>
                                </li>
                                <li>
                                    <strong>Updates and Modifications</strong>
                                    <p>
                                        The System may undergo updates to improve functionality, add new features, or enhance security. The administration will be notified of these updates in advance. Continued use of the System after such updates implies acceptance of the new terms.
                                    </p>
                                </li>
                                <li>
                                    <strong>Limitation of Liability</strong>
                                    <p>
                                        The System and its developers are not responsible for any inaccuracies in forecasts due to data input errors, system downtime, or unforeseen factors that affect prediction accuracy.
                                    </p>
                                    <p>
                                        The administration assumes full responsibility for the use of the data provided by the System.
                                    </p>
                                </li>
                                <li>
                                    <strong>Termination</strong>
                                    <p>
                                        The administration&lsquo;s access to the System may be terminated for violations of these terms or misuse of the System. Upon termination, all data stored within the System under your administration will be deactivated or deleted as necessary.
                                    </p>
                                </li>
                                <li>
                                    <strong>Governing Law</strong>
                                    <p>
                                        These terms shall be governed and construed in accordance with the laws applicable to the locality of FoodCast System.
                                    </p>
                                </li>
                                <li>
                                    <strong>Contact Information</strong>
                                    <p>
                                        For any concerns or questions regarding these terms, please contact the support team at [Contact Information].
                                    </p>
                                </li>
                            </ol>
                        </div>
                        <div className={styles.modalActions}>
                            <button className={styles.declineButton} onClick={handleDecline}>
                                <span>&#10006;</span>
                                Decline
                            </button>
                            <button className={styles.agreeButton} onClick={handleAgree}>
                                <span>&#10004;</span>
                                I agree
                            </button>
                        </div>

                    </div>
                </div>
            )
        }

        <div className={styles.loginLeft}>
            <img src={sidebarBg} alt="Sidebar Background" className={styles.sidebarBg} />
        </div>
        <div className={styles.loginRight}>
            <div className={styles.logoContainer}>
                <img src={logoImage} alt="Tagum City Economic Enterprise Office" className={styles.logoImage} />
                <div className={styles.logoText}>
                    Tagum City Economic<br />
                    Enterprise Office
                </div>
            </div>
            <LoginForm className={styles.loginForm} />
        </div>
    </div>
  )
}

export default LoginPage
