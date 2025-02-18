import React from 'react'
import styles from './ModalFutureData.module.css';
import { formatNumber } from '../../../utils/numberUtils';
import { formatDate } from '../../../utils/dateUtils';

function ModalFutureData({active, onClose, nextDailyDemandData, nextWeeklyDemandData, nextMonthlyDemandData, loading}) {

    return (
    <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={onClose}>
                &times;
            </button>
            <h3>FORCASTED DEMANDS</h3>
            {
                loading ? (
                    <div className={styles.loader}></div>
                ) : (
                    <>
                        {
                            active === 'Daily' && (
                                <div>
                                    <h4>Next Daily Demand Data:</h4>
                                    {
                                        nextDailyDemandData.length > 0 ? (
                                            <ul>
                                                {
                                                    nextDailyDemandData.slice(0, 5).map((item, index) => (
                                                        <li key={index}>
                                                            {formatDate(item.date)}, <span>Forecasted: {formatNumber(item.forecasted_demand_quantity)}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        ) : (
                                            <div className={styles.loader}></div>
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            active === 'Weekly' && (
                                <div>
                                    <h4>Next Weekly Demand Data:</h4>
                                    {
                                        nextWeeklyDemandData.length > 0 ? (
                                            <ul>
                                                {
                                                    nextWeeklyDemandData.slice(0, 3).map((item, index) => (
                                                        <li key={index}>
                                                            {item.week_label}, <span>Forecasted: {formatNumber(item.forecasted_demand_quantity)}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        ) : (
                                            <div className={styles.loader}></div>
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            active === 'Monthly' && (
                                <div>
                                    <h4>Next Monthly Demand Data:</h4>
                                    {
                                        nextMonthlyDemandData.length > 0 ? (
                                            <ul>
                                                {
                                                    nextMonthlyDemandData.slice(0, 5).map((item, index) => (
                                                        <li key={index}>
                                                            {item.month}, <span>Forecasted: {formatNumber(item.forecasted_demand_quantity)}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        ) : (
                                            <div className={styles.loader}></div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    </div>
  )
}

export default ModalFutureData
