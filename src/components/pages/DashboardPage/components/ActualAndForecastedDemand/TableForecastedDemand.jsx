import React, { useEffect, useMemo } from 'react'
import styles from './ActualAndForecastedDemand.module.css';
import { formatDate } from '../../../../../utils/dateUtils';
import { formatNumber } from '../../../../../utils/numberUtils';

function TableForecastedDemand({
    dailyDemandData = [],
    weeklyDemandData = [],
    monthlyDemandData = [],
    nextDailyDemandData = [],
    nextWeeklyDemandData = [],
    nextMonthlyDemandData = [],
    active,
}) {
    //sort functions
    const sortDataByDate = (data) => {
        if (!Array.isArray(data)) return [];
        return [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const sortWeeklyDemandDataByDate = (data) => {
        if (!Array.isArray(data)) return [];
        
        return [...data].sort((a, b) => {
            try {
                if (a.week_label && b.week_label) {
                    const matchA = a.week_label.match(/\b\w+ \d{2}, \d{4}/);
                    const matchB = b.week_label.match(/\b\w+ \d{2}, \d{4}/);
                    
                    if (matchA && matchB) {
                        const dateA = new Date(matchA[0]);
                        const dateB = new Date(matchB[0]);
                        return dateB - dateA;
                    }
                }
            } catch (error) {
                console.error('Error sorting weekly data:', error);
            }
            return 0;
        });
    };
    
    const sortMonthlyDemandDataByDate = (data) => {
        if (!Array.isArray(data)) return [];
        
        return [...data].sort((a, b) => {
            try {
                const dateA = new Date(a.month);
                const dateB = new Date(b.month);
                return dateB - dateA;
            } catch (error) {
                console.error('Error sorting monthly data:', error);
                return 0;
            }
        });
    };

    //memoize sorted data to prevent unnecessary recalculations
    const sortedDailyData = useMemo(() => ({
        historical: sortDataByDate(dailyDemandData),
        future: sortDataByDate(nextDailyDemandData)
    }), [dailyDemandData, nextDailyDemandData]);

    const sortedWeeklyData = useMemo(() => ({
        historical: sortWeeklyDemandDataByDate(weeklyDemandData),
        future: sortWeeklyDemandDataByDate(nextWeeklyDemandData)
    }), [weeklyDemandData, nextWeeklyDemandData]);

    const sortedMonthlyData = useMemo(() => ({
        historical: sortMonthlyDemandDataByDate(monthlyDemandData),
        future: sortMonthlyDemandDataByDate(nextMonthlyDemandData)
    }), [monthlyDemandData, nextMonthlyDemandData]);

    //render daily data
    const renderDaily = () => {
        return (
            <div>
                <h3>Daily Table</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Actual Demand</th>
                            <th>Forecasted Demand</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedDailyData.future.map((item, index) => (
                                <tr key={`future-daily-${index}`}>
                                    <td>{formatDate(item.date)}</td>
                                    <td>{item.actual_demand_quantity !== null ? formatNumber(item.actual_demand_quantity) : 'null'}</td>
                                    <td className={styles.forecasted}>
                                        {item.forecasted_demand_quantity !== null ? formatNumber(item.forecasted_demand_quantity) : ''}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            sortedDailyData.historical.map((item, index) => (
                                <tr key={`historical-daily-${index}`}>
                                    <td>{formatDate(item.date)}</td>
                                    <td>{formatNumber(item.actual_demand_quantity)}</td>
                                    <td className={styles.forecasted}>
                                        {formatNumber(item.forecasted_demand_quantity)}
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
                            <th>Actual Demand</th>
                            <th>Forecasted Demand</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedWeeklyData.future.map((item, index) => (
                                <tr key={`future-weekly-${index}`}>
                                    <td>{item.week_label}</td>
                                    <td>null</td>
                                    <td className={styles.forecasted}>
                                        {item.forecasted_demand_quantity !== null ? formatNumber(item.forecasted_demand_quantity) : ''}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            sortedWeeklyData.historical.map((item, index) => (
                                <tr key={`historical-weekly-${index}`}>
                                    <td>{item.week_label}</td>
                                    <td>{item.actual_demand_quantity !== null ? formatNumber(item.actual_demand_quantity) : ''}</td>
                                    <td className={styles.forecasted}>
                                        {item.forecasted_demand_quantity !== null ? formatNumber(item.forecasted_demand_quantity) : ''}
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
                            <th>Actual Demand</th>
                            <th>Forecasted Demand</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedMonthlyData.future.map((item, index) => (
                                <tr key={`future-monthly-${index}`}>
                                    <td>{item.month}</td>
                                    <td>null</td>
                                    <td className={styles.forecasted}>
                                        {item.forecasted_demand_quantity !== null ? formatNumber(item.forecasted_demand_quantity) : ''}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            sortedMonthlyData.historical.map((item, index) => (
                                <tr key={`historical-monthly-${index}`}>
                                    <td>{item.month}</td>
                                    <td>{formatNumber(item.actual_demand_quantity || '')}</td>
                                    <td className={styles.forecasted}>
                                        {formatNumber(item.forecasted_demand_quantity || '')}
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
    }, [active, dailyDemandData, weeklyDemandData, monthlyDemandData]);

  return (
    <div className={styles.tableContainer}>
        {renderContent()}
    </div>
  )
}

export default TableForecastedDemand