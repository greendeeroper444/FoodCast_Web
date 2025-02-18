import React, { useEffect } from 'react'
import styles from './ActualAndForecastedSupply.module.css';
import { formatDate } from '../../../../../utils/dateUtils';

function TableForecastedSupply({
  dailyData,
  weeklyData,
  monthlyData,
  nextDailyFutureData,
  nextWeeklyFutureData,
  nextMonthlyFutureData,
  active,
}) {
    //sort functions
    const sortDataByDate = (data) => {
        return [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const sortWeeklyDataByDate = (data) => {
        if (!Array.isArray(data)) {
        return [];
        }
        
        return [...data].sort((a, b) => {
        //ensure 'week_label' is a valid string before using 'split'
        if (a.week_label && b.week_label) {
            const dateA = new Date(a.week_label.split(' - ')[0]);
            const dateB = new Date(b.week_label.split(' - ')[0]);
            return dateB - dateA;
        }
        return 0;
        });
    }
    
    const sortMonthlyDataByDate = (data) => {
        return [...data].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
    };
  

  //render daily data
  const renderDaily = () => {
    const sortedDailyData = sortDataByDate(dailyData);
    const sortedDailyFutureData = sortDataByDate(nextDailyFutureData);
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
                        sortedDailyFutureData.map(({ date, actual_quantity, forecasted_quantity }, index) => (
                            <tr key={index}>
                            <td>{formatDate(date)}</td>
                            <td>{actual_quantity !== null ? actual_quantity : ''}</td>
                            <td className={styles.forecasted}>
                                {forecasted_quantity !== null ? forecasted_quantity : ''}
                            </td>
                            </tr>
                        ))
                    }
                    {
                        sortedDailyData.map(({ date, actual_quantity, forecasted_quantity }) => (
                        <tr key={date}>
                            <td>{formatDate(date)}</td>
                            <td>{actual_quantity}</td>
                            <td className={styles.forecasted}>
                            {forecasted_quantity}
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
      </div>
    )
  };

  //render weekly data
  const renderWeekly = () => {
    const sortedWeeklyData = sortWeeklyDataByDate(weeklyData);
    const sortedWeeklyFutureData = sortWeeklyDataByDate(nextWeeklyFutureData);
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
                        sortedWeeklyFutureData.map(({ week_label, actual_quantity, forecasted_quantity }, index) => (
                        <tr key={index}>
                        <td>{week_label}</td>
                        <td>{actual_quantity !== null ? actual_quantity : ''}</td>
                        <td className={styles.forecasted}>
                            {forecasted_quantity !== null ? forecasted_quantity : ''}
                        </td>
                        </tr>
                    ))
                    }
                    {
                        sortedWeeklyData.map(({ week_label, actual_quantity, forecasted_quantity }) => (
                        <tr key={week_label}>
                            <td>{week_label}</td>
                            <td>{actual_quantity !== null ? actual_quantity : ''}</td>
                            <td className={styles.forecasted}>
                                {forecasted_quantity !== null ? forecasted_quantity : ''}
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
      </div>
    )
  }
  

  //render monthly data
  const renderMonthly = () => {
    const sortedMonthlyData = sortMonthlyDataByDate(monthlyData);
    const sortedMonthlyFutureData = sortMonthlyDataByDate(nextMonthlyFutureData);
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
                        sortedMonthlyFutureData.map(({ date, actual_quantity, forecasted_quantity }, index) => (
                            <tr key={index}>
                            <td>{date}</td>
                            <td>{actual_quantity !== null ? actual_quantity : ''}</td>
                            <td className={styles.forecasted}>
                                {forecasted_quantity !== null ? forecasted_quantity : ''}
                            </td>
                            </tr>
                        ))
                    }
                    {
                        sortedMonthlyData.map(({ date, actual_quantity, forecasted_quantity }) => (
                            <tr key={date}>
                                <td>{date}</td>
                                <td>{actual_quantity || ''}</td>
                                <td className={styles.forecasted}>
                                    {forecasted_quantity || ''}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
  }

    //render content based on the active tab (Daily, Weekly, or Monthly)
    const renderContent = () => {
        if (active === 'Daily') {
            return renderDaily();
        } else if (active === 'Weekly') {
            return renderWeekly();
        } else if (active === 'Monthly') {
            return renderMonthly();
        } else {
            return <p>No data to display</p>;
        }
    };

    useEffect(() => {
        console.log('Active Tab:', active);
    }, [active]);

  return (
    <div className={styles.tableContainer}>
        {renderContent()}
    </div>
  )
}

export default TableForecastedSupply
