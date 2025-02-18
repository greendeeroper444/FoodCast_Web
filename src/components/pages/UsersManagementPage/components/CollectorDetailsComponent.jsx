import React from 'react'
import styles from './UsersDetailsComponent.module.css';

function CollectorDetailsComponent({ onBack, collectorDetails }) {
    //destructure collector and collectedSupplies for easy access
    const {collector, collectedSupplies} = collectorDetails;
    

  return (
    <div className={styles.usersDetails}>
        <header className={styles.header}>
            <button className={styles.backButton} onClick={onBack}>&larr;</button>
            <h2>{collector?.fullName || 'No Name Available'}</h2>
        </header>

        <div className={styles.detailsContainer}>
            <div className={styles.usersInfo}>
                <div
                    className={styles.profilePic}
                    style={{
                        backgroundImage: collector?.profilePicture ? `url(${collector.profilePicture})` : 'none',
                        backgroundSize: 'cover', 
                    }}
                ></div>
                <div className={styles.position}>
                    <p>{collector?.position || 'No Position Available'}</p>
                    <p>{collector?.emailAddress || 'No Email Available'}</p>
                </div>
            </div>

            <div className={styles.dataSection}>
                {
                    collectedSupplies && collectedSupplies.length > 0 ? (
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>Supply Type Collected</th>
                                    <th>Quantity (kls.)</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody className={styles.scrollableTableBody}>
                                {
                                    collectedSupplies.map((supply, index) => (
                                        <tr key={index}>
                                            <td>{supply.supplyName || 'Unknown'}</td>
                                            <td>{supply.quantity || '0'}</td>
                                            <td>{supply.date ? new Date(supply.date).toLocaleDateString() : 'N/A'}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : (
                        <p>No supply collection data available.</p>
                    )
                }

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

export default CollectorDetailsComponent
