import React from 'react';
import styles from './OverAndUnderSupply.module.css'

function TableOverUnderSupply({
    dailyData = [],
    weeklyData = [],
    monthlyData = [],
    nextDailyData = [],
    nextWeeklyData = [],
    nextMonthlyData = [],
    active
}) {
    const formatStatusCell = (status, supply, demand) => {
        if (!status || supply === null || demand === null) return '-';
        
        const difference = status.type === 'OVER' 
            ? status.amount 
            : status.type === 'UNDER' 
            ? -status.amount 
            : 0;
        
        const statusColor = status.type === 'OVER' 
            ? styles.overSupply  
            : status.type === 'UNDER' 
            ? styles.underSupply 
            : styles.balanced;
        
        const statusText = status.type === 'OVER' 
            ? 'Over Supply' 
            : status.type === 'UNDER' 
            ? 'Under Supply' 
            : 'Balanced';
        
        return (
            <div className={styles.statusCell}>
                <div className={`${styles.statusBadge} ${statusColor}`}>
                    {statusText}
                </div>
                <div className={styles.statusDetails}>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Supply:</span> 
                        <span className={styles.detailValue}>{supply.toFixed(2)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Demand:</span> 
                        <span className={styles.detailValue}>{demand.toFixed(2)}</span>
                    </div>
                </div>
                <div className={`${styles.statusDifference} ${statusColor}`}>
                    <span className={styles.differenceLabel}>Difference:</span> 
                    <span className={styles.differenceValue}>
                        {difference > 0 ? '+' : ''}{difference.toFixed(2)}
                        {status.type !== 'BALANCED' && ` (${status.percentage}%)`}
                    </span>
                </div>
            </div>
        );
    };
    
    const renderTableRows = (data, isFutureData = false) => {
        return data.map((item, index) => {
            const rowKey = item.date || item.week_label || index;
            const rowClass = isFutureData ? styles.futureRow : styles.dataRow;
            
            return (
                <tr key={`${isFutureData ? 'future-' : ''}${rowKey}`} className={rowClass}>
                    <td className={styles.dateCell}>
                        {active === 'Weekly' ? item.week_label : item.date}
                    </td>
                    <td className={styles.valueCell}>
                        {isFutureData
                            ? (item.forecasted_supply?.toFixed(2) || '-')
                            : (item.actual_supply?.toFixed(2) || '-')}
                    </td>
                    <td className={styles.valueCell}>
                        {isFutureData
                            ? (item.forecasted_demand?.toFixed(2) || '-')
                            : (item.actual_demand?.toFixed(2) || '-')}
                    </td>
                    <td className={styles.statusCellContainer}>
                        {
                            formatStatusCell(
                                isFutureData ? item.forecasted_status : item.actual_status,
                                isFutureData ? item.forecasted_supply : item.actual_supply,
                                isFutureData ? item.forecasted_demand : item.actual_demand
                            )
                        }
                    </td>
                </tr>
            );
        });
    };
    
    const getCurrentData = () => {
        switch (active) {
            case 'Daily':
                return { current: dailyData, future: nextDailyData };
            case 'Weekly':
                return { current: weeklyData, future: nextWeeklyData };
            case 'Monthly':
                return { current: monthlyData, future: nextMonthlyData };
            default:
                return { current: monthlyData, future: nextMonthlyData };
        }
    };
    
    const {current, future} = getCurrentData();
    
  return (
    <div className={styles.tableWrapper}>
        <div className={styles.tableContainer}>
            <table className={styles.supplyDemandTable}>
                <thead>
                    <tr className={styles.tableHeader}>
                        <th className={styles.headerCell}>{active === 'Weekly' ? 'Week' : 'Date'}</th>
                        <th className={styles.headerCell}>Supply</th>
                        <th className={styles.headerCell}>Demand</th>
                        <th className={styles.headerCell}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        current.length === 0 ? (
                            <tr className={styles.emptyRow}>
                                <td colSpan="4" className={styles.emptyMessage}>
                                    No historical data available
                                </td>
                            </tr>
                        ) : (
                            renderTableRows(current)
                        )
                    }
                    
                    {
                        future.length > 0 && (
                            <>
                                <tr className={styles.dividerRow}>
                                    <td colSpan="4">
                                        <div className={styles.dividerContent}>
                                            <div className={styles.dividerLine}></div>
                                            <div className={styles.dividerLabel}><h1>Future Data</h1></div>
                                            <div className={styles.dividerLine}></div>
                                        </div>
                                    </td>
                                </tr>
                                {renderTableRows(future, true)}
                            </>
                        )
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TableOverUnderSupply