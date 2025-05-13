import React, { useEffect, useMemo } from 'react'
import styles from './ActualAndForecastedSupply.module.css';
import { formatDate } from '../../../../../utils/dateUtils';

function TableForecastedSupply({
    dailyData = [],
    weeklyData = [],
    monthlyData = [],
    nextDailyFutureData = [],
    nextWeeklyFutureData = [],
    nextMonthlyFutureData = [],
    active,
}) {
    //sort functions
    const sortDataByDate = (data) => {
        if (!Array.isArray(data)) return [];
        return [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const sortWeeklyDataByDate = (data) => {
        if (!Array.isArray(data)) return [];
        
        return [...data].sort((a, b) => {
            try {
                if (a.week_label && b.week_label) {
                    const splitA = a.week_label.split(' - ');
                    const splitB = b.week_label.split(' - ');
                    
                    if (splitA.length > 0 && splitB.length > 0) {
                        const dateA = new Date(splitA[0]);
                        const dateB = new Date(splitB[0]);
                        return dateB - dateA;
                    }
                }
            } catch (error) {
                console.error('Error sorting weekly data:', error);
            }
            return 0;
        });
    };
    
    const sortMonthlyDataByDate = (data) => {
        if (!Array.isArray(data)) return [];
        
        return [...data].sort((a, b) => {
            try {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            } catch (error) {
                console.error('Error sorting monthly data:', error);
                return 0;
            }
        });
    };

    //memoize sorted data to prevent unnecessary recalculations
    const sortedDailyData = useMemo(() => ({
        historical: sortDataByDate(dailyData),
        future: sortDataByDate(nextDailyFutureData)
    }), [dailyData, nextDailyFutureData]);

    const sortedWeeklyData = useMemo(() => ({
        historical: sortWeeklyDataByDate(weeklyData),
        future: sortWeeklyDataByDate(nextWeeklyFutureData)
    }), [weeklyData, nextWeeklyFutureData]);

    const sortedMonthlyData = useMemo(() => ({
        historical: sortMonthlyDataByDate(monthlyData),
        future: sortMonthlyDataByDate(nextMonthlyFutureData)
    }), [monthlyData, nextMonthlyFutureData]);

    //render daily data
    const renderDaily = () => {
        return (
            <div>
                <h3>Daily Table</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Actual Volume</th>
                            <th>Forecasted Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedDailyData.future.map((item, index) => (
                                <tr key={`future-daily-${index}`}>
                                    <td>{formatDate(item.date)}</td>
                                    <td>{item.actual_quantity !== null ? item.actual_quantity : ''}</td>
                                    <td className={styles.forecasted}>
                                        {item.forecasted_quantity !== null ? item.forecasted_quantity : ''}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            sortedDailyData.historical.map((item, index) => (
                                <tr key={`historical-daily-${index}`}>
                                    <td>{formatDate(item.date)}</td>
                                    <td>{item.actual_quantity}</td>
                                    <td className={styles.forecasted}>
                                        {item.forecasted_quantity}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    };

    //render weekly data
    const renderWeekly = () => {
        return (
            <div>
                <h3>Weekly Table</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Week</th>
                            <th>Actual Volume</th>
                            <th>Forecasted Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedWeeklyData.future.map((item, index) => (
                                <tr key={`future-weekly-${index}`}>
                                    <td>{item.week_label}</td>
                                    <td>{item.actual_quantity !== null ? item.actual_quantity : ''}</td>
                                    <td className={styles.forecasted}>
                                        {item.forecasted_quantity !== null ? item.forecasted_quantity : ''}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            sortedWeeklyData.historical.map((item, index) => (
                                <tr key={`historical-weekly-${index}`}>
                                    <td>{item.week_label}</td>
                                    <td>{item.actual_quantity !== null ? item.actual_quantity : ''}</td>
                                    <td className={styles.forecasted}>
                                        {item.forecasted_quantity !== null ? item.forecasted_quantity : ''}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    };

    //render monthly data
    const renderMonthly = () => {
        return (
            <div>
                <h3>Monthly Table</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Actual Volume</th>
                            <th>Forecasted Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedMonthlyData.future.map((item, index) => (
                                <tr key={`future-monthly-${index}`}>
                                    <td>{item.date}</td>
                                    <td>{item.actual_quantity !== null ? item.actual_quantity : ''}</td>
                                    <td className={styles.forecasted}>
                                        {item.forecasted_quantity !== null ? item.forecasted_quantity : ''}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            sortedMonthlyData.historical.map((item, index) => (
                                <tr key={`historical-monthly-${index}`}>
                                    <td>{item.date}</td>
                                    <td>{item.actual_quantity || ''}</td>
                                    <td className={styles.forecasted}>
                                        {item.forecasted_quantity || ''}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    };

    //render content based on the active tab
    const renderContent = () => {
        switch (active) {
            case 'Daily':
                return renderDaily();
            case 'Weekly':
                return renderWeekly();
            case 'Monthly':
                return renderMonthly();
            default:
                return <p>No data to display</p>;
        }
    };

    useEffect(() => {
    }, [active, dailyData, weeklyData, monthlyData]);

  return (
    <div className={styles.tableContainer}>
        {renderContent()}
    </div>
  )
}

export default TableForecastedSupply