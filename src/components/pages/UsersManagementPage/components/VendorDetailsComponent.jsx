import React from 'react'
import styles from './UsersDetailsComponent.module.css';

function VendorDetailsComponent({onBack, user}) {
  return (
    <div className={styles.usersDetails}>
        <header className={styles.header}>
            <button className={styles.backButton} onClick={onBack}>&larr;</button>
            <h2>Vendor</h2>
        </header>

        <div className={styles.detailsContainer}>
            <div className={styles.usersInfo}>
                <div className={styles.profilePic}></div>
                <div>
                    <h3>Gyno Aragay</h3>
                    <p>Fruit Vendor</p>
                </div>
            </div>

            <div className={styles.dataSection}>
                <table className={styles.dataTable}>
                    <thead>
                    <tr>
                        <th>Fruit Type Collected</th>
                        <th>Quantity (kls.)</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Mango</td>
                        <td>600</td>
                        <td>10/01/2024</td>
                    </tr>
                    <tr>
                        <td>Mango</td>
                        <td>100</td>
                        <td>10/05/2024</td>
                    </tr>
                    <tr>
                        <td>Orange</td>
                        <td>35</td>
                        <td>10/09/2024</td>
                    </tr>
                    <tr>
                        <td>Orange</td>
                        <td>300</td>
                        <td>10/13/2024</td>
                    </tr>
                    <tr>
                        <td>Mango</td>
                        <td>67</td>
                        <td>10/17/2024</td>
                    </tr>
                    <tr>
                        <td>Orange</td>
                        <td>50</td>
                        <td>10/25/2024</td>
                    </tr>
                    </tbody>
                </table>
            
                <div className={styles.chartSection}>
                    <h4>Performance Record:</h4>
                    <div className={styles.chartPlaceholder}>[Chart Placeholder]</div>
                    <div className={styles.monthSelector}>October ▼</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VendorDetailsComponent
