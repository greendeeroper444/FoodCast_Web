import React, { useMemo, useState } from 'react'
import styles from './OverAndUnderSupply.module.css'
import { formatDate } from '../../../../../utils/dateUtils';

function TableOverUnderSupply({
    dailyData = [],
    weeklyData = [],
    monthlyData = [],
    nextDailyData = [],
    nextWeeklyData = [],
    nextMonthlyData = [],
    active
}) {
    const [showFutureData, setShowFutureData] = useState(false);
    
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
        current: sortDataByDate(dailyData),
        future: sortDataByDate(nextDailyData)
    }), [dailyData, nextDailyData]);

    const sortedWeeklyData = useMemo(() => ({
        current: sortWeeklyDataByDate(weeklyData),
        future: sortWeeklyDataByDate(nextWeeklyData)
    }), [weeklyData, nextWeeklyData]);

    const sortedMonthlyData = useMemo(() => ({
        current: sortMonthlyDataByDate(monthlyData),
        future: sortMonthlyDataByDate(nextMonthlyData)
    }), [monthlyData, nextMonthlyData]);

    const formatStatusCell = (status, supply, demand, minDemand, maxDemand) => {
        if (!status || supply === null || supply === undefined || 
            demand === null || demand === undefined ||
            minDemand === null || minDemand === undefined ||
            maxDemand === null || maxDemand === undefined) {
            return <div className={styles.statusCell}>-</div>;
        }
        
        //ensure values are numbers
        const supplyNum = Number(supply) || 0;
        const demandNum = Number(demand) || 0;
        const minDemandNum = Number(minDemand) || 0;
        const maxDemandNum = Number(maxDemand) || 0;
        
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
        
        //updated difference label based on status type
        const getDifferenceLabel = () => {
            switch (status.type) {
                case 'OVER':
                    return 'Oversupply:';
                case 'UNDER':
                    return 'Undersupply:';
                case 'BALANCED':
                default:
                    return 'Balanced: Within demand range';
            }
        };
        
        return (
            <div className={styles.statusCell}>
                <div className={`${styles.statusBadge} ${statusColor}`}>
                    {statusText}
                </div>
                <div className={styles.statusDetails}>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Supply:</span> 
                        <span className={styles.detailValue}>{supplyNum.toFixed(2)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Demand:</span> 
                        <span className={styles.detailValue}>{demandNum.toFixed(2)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Min Demand:</span> 
                        <span className={styles.detailValue}>{minDemandNum.toFixed(2)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Max Demand:</span> 
                        <span className={styles.detailValue}>{maxDemandNum.toFixed(2)}</span>
                    </div>
                </div>
                <div className={`${styles.statusDifference} ${statusColor}`}>
                    <span className={styles.differenceLabel}>{getDifferenceLabel()}</span> 
                    {
                        status.type !== 'BALANCED' && (
                            <span className={styles.differenceValue}>
                                {difference > 0 ? '+' : ''}{difference.toFixed(2)}
                                {` (${status.percentage}%)`}
                            </span>
                        )
                    }
                </div>
            </div>
        );
    };
    
    const formatValue = (value) => {
        if (value === null || value === undefined) return '-';
        const numValue = Number(value);
        return isNaN(numValue) ? '-' : numValue.toFixed(2);
    };
    
    const renderTableRows = (data, isFutureData = false) => {
        if (!Array.isArray(data) || data.length === 0) return null;
        
        return data.map((item, index) => {
            const rowKey = item.date || item.week_label || index;
            const rowClass = isFutureData ? styles.futureRow : styles.dataRow;
            
            return (
                <tr key={`${isFutureData ? 'future-' : 'current-'}${rowKey}-${index}`} className={rowClass}>
                    <td className={styles.dateCell}>
                        {
                            active === 'Weekly' ? (
                                item.week_label || '-'
                                ) : active === 'Daily' ? (
                                item.date ? formatDate(item.date) : '-'
                                ) : (
                                item.date || '-'
                            )
                        }
                    </td>
                    <td className={styles.valueCell}>
                        {isFutureData
                            ? formatValue(item.forecasted_supply)
                            : formatValue(item.actual_supply)}
                    </td>
                    <td className={styles.valueCell}>
                        {isFutureData
                            ? formatValue(item.forecasted_demand)
                            : formatValue(item.actual_demand)}
                    </td>
                    {/* <td className={styles.valueCell}>
                        {isFutureData
                            ? formatValue(item.forecasted_minDemand)
                            : formatValue(item.actual_minDemand)}
                    </td>
                    <td className={styles.valueCell}>
                        {isFutureData
                            ? formatValue(item.forecasted_maxDemand)
                            : formatValue(item.actual_maxDemand)}
                    </td> */}
                    <td className={styles.statusCellContainer}>
                        {
                            formatStatusCell(
                                isFutureData ? item.forecasted_status : item.actual_status,
                                isFutureData ? item.forecasted_supply : item.actual_supply,
                                isFutureData ? item.forecasted_demand : item.actual_demand,
                                isFutureData ? item.forecasted_minDemand : item.actual_minDemand,
                                isFutureData ? item.forecasted_maxDemand : item.actual_maxDemand
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
                return { 
                    current: sortedDailyData.current, 
                    future: sortedDailyData.future 
                };
            case 'Weekly':
                return { 
                    current: sortedWeeklyData.current, 
                    future: sortedWeeklyData.future 
                };
            case 'Monthly':
                return { 
                    current: sortedMonthlyData.current, 
                    future: sortedMonthlyData.future 
                };
            default:
                return { 
                    current: sortedMonthlyData.current, 
                    future: sortedMonthlyData.future 
                };
        }
    };
    
    const {current, future} = getCurrentData();
    
    //get the table title based on active prop
    const getTableTitle = () => {
        switch (active) {
            case 'Daily':
                return 'Daily Table';
            case 'Weekly':
                return 'Weekly Table';
            case 'Monthly':
                return 'Monthly Table';
            default:
                return 'Table';
        }
    };
    
  return (
    <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
            <h3>{getTableTitle()}</h3>
        </div>
        
        {
            future.length > 0 && showFutureData && (
                <div className={styles.futureDataSection}>
                    <div className={styles.sectionHeader}>
                        <h4>Future Data (Forecast)</h4>
                        {
                            future.length > 0 && (
                                <button 
                                    className={styles.toggleButton}
                                    onClick={() => setShowFutureData(!showFutureData)}
                                    aria-label={showFutureData ? "Hide future data" : "Show future data"}
                                >
                                    {showFutureData ? '↑ Hide Future Data' : '↓ Show Future Data'}
                                </button>
                            )
                        }
                        <span className={styles.futureIndicator}>Predictions</span>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th className={styles.headerCell}>{active === 'Weekly' ? 'Week' : 'Date'}</th>
                                <th className={styles.headerCell}>Supply</th>
                                <th className={styles.headerCell}>Demand</th>
                                {/* <th className={styles.headerCell}>Min Demand</th>
                                <th className={styles.headerCell}>Max Demand</th> */}
                                <th className={styles.headerCell}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows(future, true)}
                        </tbody>
                    </table>
                </div>
            )
        }
        
        <div className={`${styles.currentDataSection} ${showFutureData ? styles.withSeparator : ''}`}>
            <div className={styles.sectionHeader}>
                <h4>Current Data (Historical)</h4>
                 {
                        future.length > 0 && (
                            <button 
                                className={styles.toggleButton}
                                onClick={() => setShowFutureData(!showFutureData)}
                                aria-label={showFutureData ? "Hide future data" : "Show future data"}
                            >
                                {showFutureData ? '↑ Hide Future Data' : '↓ Show Future Data'}
                            </button>
                        )
                    }
                <span className={styles.currentIndicator}>Actual</span>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHeader}>
                        <th className={styles.headerCell}>{active === 'Weekly' ? 'Week' : 'Date'}</th>
                        <th className={styles.headerCell}>Supply</th>
                        <th className={styles.headerCell}>Demand</th>
                        {/* <th className={styles.headerCell}>Min Demand</th>
                        <th className={styles.headerCell}>Max Demand</th> */}
                        <th className={styles.headerCell}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        current.length === 0 ? (
                            <tr className={styles.emptyRow}>
                                <td colSpan="6" className={styles.emptyMessage}>
                                    No historical data available
                                </td>
                            </tr>
                        ) : (
                            renderTableRows(current, false)
                        )
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TableOverUnderSupply