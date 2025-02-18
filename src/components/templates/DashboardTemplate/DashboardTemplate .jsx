import React from 'react'
import styles from './DashboardTemplate.module.css';
import HeaderForm from '../../molecules/HeaderForm/HeaderForm';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DashboardTemplate ({cardContent, onCardClick}) {
  return (
    <div className={styles.dashboardTemplate}>
        <HeaderForm title='Dashboard'/>
        <div className={styles.cardContainer}>
            {
                cardContent.map(({ type, title, amount, percentage, icon, onClick }, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        onClick={() => onCardClick(type)}
                    >
                        <h2>{title}</h2>
                        <div className={styles.amount}>{amount}</div>
                        <div className={styles.percentage}>{percentage}</div>
                        <div className={styles.iconCircle}>
                            <FontAwesomeIcon icon={icon} />
                        </div>
                    </div>
                ))
            }
        </div>
        <div className={styles.dashboardContent}>
            {cardContent.content}
        </div>
    </div>
  )
}

DashboardTemplate.propTypes = {
    cardContent: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            amount: PropTypes.string.isRequired,
            percentage: PropTypes.string.isRequired,
            icon: PropTypes.object.isRequired,
            content: PropTypes.node
        })
    ).isRequired,
    onCardClick: PropTypes.func.isRequired,
};

export default DashboardTemplate 