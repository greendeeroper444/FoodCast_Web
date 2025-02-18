import React from 'react'
import styles from './TermAndConditionComponent.module.css';

function TermAndConditionComponent() {
  return (
    <div className={styles.termContent}>
        <h1 className={styles.title}>Terms and Conditions</h1>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>1. Acceptance of Terms</h2>
            <p className={styles.description}>
                • By accessing and using the System, you acknowledge that you have read, understood, and agree to abide by these terms and conditions. If you do not agree with any part of these terms, you are prohibited from using the System.
            </p>
        </div>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>2. System Usage</h2>
            <p className={styles.description}>
                • The System is designed for forecasting and managing the supply chain of vegetables and fruits through farm tagging and predictive analytics. The administration will primarily use the System for managing data, reports, and system operations. 
                • Administrative access to the System is restricted to authorized personnel only. The sharing of login credentials is prohibited.
            </p>
        </div>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>3. Responsibilities</h2>
            <p className={styles.description}>
                • <strong>Data Integrity:</strong> Administrators are responsible for ensuring the accuracy of all data entered into the System. This includes the details on supply volumes, farm locations, vendor information, and forecasting inputs.<br />
                • <strong>Confidentiality:</strong> Administrators must ensure the confidentiality of the data stored in the System. All reports generated and data accessed through the System are to be handled in compliance with data privacy laws.<br />
                • <strong>System Maintenance:</strong> The administration must schedule periodic reviews of data integrity and perform routine maintenance to ensure the efficient operation of the System.
            </p>
        </div>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>4. Prohibited Activities</h2>
            <p className={styles.description}>
                • <strong>Misuse of Data:</strong> The System’s data should only be used for forecasting and supply chain management purposes. The sale, distribution, or use of data for unauthorized purposes is strictly prohibited.<br />
                • <strong>Unauthorized Access:</strong> Any attempt to gain unauthorized access to restricted areas of the System, interfere with its operations, or use the System in a manner that violates any applicable law is prohibited.
            </p>
        </div>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>5. Data Security</h2>
            <p className={styles.description}>
                • The System implements encryption and access control mechanisms to protect the data. However, the administration is responsible for regularly updating security protocols and monitoring for unauthorized access.
            </p>
        </div>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>6. Updates and Modifications</h2>
            <p className={styles.description}>
                • The administration reserves the right to improve functionality, add new features, or remove outdated ones. All changes will be notified to the users of the System in a timely manner.
            </p>
        </div>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>7. Limitation of Liability</h2>
            <p className={styles.description}>
                • The System and its developers are not responsible for any inaccuracies in forecasts due to data input errors, system downtime, or unforeseen factors that affect prediction accuracy. <br />
                • The administration assumes full responsibility for the use of the data provided by the System.
            </p>
        </div>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>8. Termination</h2>
            <p className={styles.description}>
                • The administration&apos;s access to the System may be terminated for violations of these terms or misuse of the System. Upon termination, all data stored within the System under your administration will be deactivated or deleted as necessary.
            </p>
        </div>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>9. Governing Law</h2>
            <p className={styles.description}>
                • These terms shall be governed and construed in accordance with the laws applicable to the locality of FoodCast System.
            </p>
        </div>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>10. Contact Information</h2>
            <p className={styles.description}>
                • For any concerns or questions regarding these terms, please contact the support team at [Contact Information].
            </p>
        </div>
    </div>
  )
}

export default TermAndConditionComponent
