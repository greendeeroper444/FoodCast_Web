import React, { useEffect } from 'react'
import styles from './OverAndUnderSupply.module.css';
import { formatDate } from '../../../../../utils/dateUtils';
import { formatNumber } from '../../../../../utils/numberUtils';

function TableOverUnderSupply({
  dailyDemandData,
  weeklyDemandData,
  monthlyDemandData,
  nextDailyDemandData,
  nextWeeklyDemandData,
  nextMonthlyDemandData,
  active,
}) {
    //sort functions
    const sortDataByDate = (data) => {
        return [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const sortWeeklyDemandDataByDate = (data) => {
        if (!Array.isArray(data)) {
            return [];
        }
    
        return [...data].sort((a, b) => {
            if (a.week_label && b.week_label) {
                const dateA = new Date(a.week_label.match(/\b\w+ \d{2}, \d{4}/)[0]);
                const dateB = new Date(b.week_label.match(/\b\w+ \d{2}, \d{4}/)[0]);
                return dateB - dateA;
            }
            return 0;
        });
    };
    
    
    const sortMonthlyDemandDataByDate = (data) => {
        return [...data].sort((a, b) => {
            const dateA = new Date(a.month);
            const dateB = new Date(b.month);
            return dateB - dateA;
        });
    };
  

  //render daily data
  const renderDaily = () => {
    const sortedDailyDemandData = sortDataByDate(dailyDemandData);
    const sortedDailyFutureData = sortDataByDate(nextDailyDemandData);
    return (
      <div>
            <h3>Daily Table</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Under Supply</th>
                        <th>Over Supply</th>
                        <th>Forecasted Under Supply</th>
                        <th>Forecasted Over Supply</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedDailyFutureData.map(({date, actual_minDemand_quantity, forecasted_minDemand_quantity}, index) => (
                            <tr key={index}>
                            <td>{formatDate(date)}</td>
                            <td>{formatNumber(actual_minDemand_quantity !== null ? actual_minDemand_quantity : '')}</td>
                            <td className={styles.forecasted}>
                                {formatNumber(forecasted_minDemand_quantity !== null ? forecasted_minDemand_quantity : '')}
                            </td>
                            </tr>
                        ))
                    }
                    {
                        sortedDailyDemandData.map(({ date, actual_minDemand_quantity, forecasted_minDemand_quantity }) => (
                        <tr key={date}>
                            <td>{formatDate(date)}</td>
                            <td>{formatNumber(actual_minDemand_quantity)}</td>
                            <td className={styles.forecasted}>
                                {formatNumber(forecasted_minDemand_quantity)}
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
    const sortedWeeklyDemandData = sortWeeklyDemandDataByDate(weeklyDemandData);
    const sortedWeeklyFutureData = sortWeeklyDemandDataByDate(nextWeeklyDemandData);
    return (
      <div>
            <h3>Weekly Table</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                    <th>Week</th>
                    <th>Under Supply</th>
                    <th>Over Supply</th>
                    <th>Forecasted Under Supply</th>
                    <th>Forecasted Over Supply</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedWeeklyFutureData.map(({ week_label, actual_minDemand_quantity, forecasted_minDemand_quantity }, index) => (
                            <tr key={index}>
                            <td>{week_label}</td>
                            <td>null</td>
                            <td className={styles.forecasted}>
                                {formatNumber(forecasted_minDemand_quantity !== null ? forecasted_minDemand_quantity : '')}
                            </td>
                            </tr>
                        ))
                    }
                    {
                        sortedWeeklyDemandData.map(({ week_label, actual_minDemand_quantity, forecasted_minDemand_quantity }) => (
                        <tr key={week_label}>
                            <td>{week_label}</td>
                            <td>{formatNumber(actual_minDemand_quantity !== null ? actual_minDemand_quantity : '')}</td>
                            <td className={styles.forecasted}>
                                {formatNumber(forecasted_minDemand_quantity !== null ? forecasted_minDemand_quantity : '')}
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
    const sortedMonthlyDemandData = sortMonthlyDemandDataByDate(monthlyDemandData);
    const sortedMonthlyFutureData = sortMonthlyDemandDataByDate(nextMonthlyDemandData);
    return (
        <div>
            <h3>Monthly Table</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                    <th>Month</th>
                    <th>Under Supply</th>
                    <th>Over Supply</th>
                    <th>Forecasted Under Supply</th>
                    <th>Forecasted Over Supply</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedMonthlyFutureData.map(({ month, actual_minDemand_quantity, forecasted_minDemand_quantity }, index) => (
                            <tr key={index}>
                            <td>{month}</td>
                            <td>null</td>
                            <td className={styles.forecasted}>
                                {formatNumber(forecasted_minDemand_quantity !== null ? forecasted_minDemand_quantity : '')}
                            </td>
                            </tr>
                        ))
                    }
                    {
                        sortedMonthlyDemandData.map(({ month, actual_minDemand_quantity, forecasted_minDemand_quantity }) => (
                            <tr key={month}>
                                <td>{month}</td>
                                <td>{formatNumber(actual_minDemand_quantity || '')}</td>
                                <td className={styles.forecasted}>
                                    {formatNumber(forecasted_minDemand_quantity || '')}
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

export default TableOverUnderSupply
