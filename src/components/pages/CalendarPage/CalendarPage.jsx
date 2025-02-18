import React, { useState, useEffect } from 'react'
import styles from './Calendar.module.css'
import HeaderForm from '../../molecules/HeaderForm/HeaderForm';
import CalendarIcon from '../../../assets/icons/calendar-light.svg';
import api from '../../../api/api';

const CalendarPage = () => {
    const [currentYear, setCurrentYear] = useState(2023);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [viewMode, setViewMode] = useState('Monthly');
    const [dailySupply, setDailySupply] = useState({});
    const [monthlySupply, setMonthlySupply] = useState({});

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

   //fetch supply demand data from backend
   useEffect(() => {
        const fetchSupplyData = async () => {
            try {
                const response = await api.get(`/adminCalendar/getSupplyDemandCalendar?year=${currentYear}`);
                const data = response.data;

                setDailySupply(data.dailySupply);
                setMonthlySupply(data.monthlySupply);
            } catch (error) {
                console.error('Error fetching supply data:', error);
            }
        };

        fetchSupplyData();
    }, [currentYear]);



    const handleMonthChange = (direction) => {
        setCurrentMonth((prev) => {
            let newMonth = prev + direction;
            let newYear = currentYear;

            if (newMonth < 0) {
                newMonth = 11;
                newYear -= 1;
            } else if (newMonth > 11) {
                newMonth = 0;
                newYear += 1;
            }

            setCurrentYear(newYear);
            return newMonth;
        });
    };

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    const handleYearChange = (direction) => setCurrentYear((prev) => prev + direction);

  return (
    <div className={styles.collectedPage}>
        <HeaderForm icon={CalendarIcon} title='CALENDAR' />
        
        <div className={styles.filterContainer}>
            <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
                <option value='Daily'>Daily</option>
                <option value='Monthly'>Monthly</option>
            </select>
        </div>

        <div className={styles.calendarContainer}>
            {
                viewMode === 'Daily' ? (
                    <>
                        <div className={styles.monthNavigation}>
                            <button className={styles.navButton} onClick={() => handleMonthChange(-1)}>
                                ◀ {monthNames[(currentMonth + 11) % 12]}
                            </button>
                            <h2>{monthNames[currentMonth]} {currentYear}</h2>
                            <button className={styles.navButton} onClick={() => handleMonthChange(1)}>
                                {monthNames[(currentMonth + 1) % 12]} ▶
                            </button>
                        </div>

                        <table className={styles.calendarTable}>
                            <thead>
                                <tr>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <th key={day}>{day}</th>)}</tr>
                            </thead>
                            <tbody>
                                {
                                    (() => {
                                        const totalDays = getDaysInMonth(currentYear, currentMonth);
                                        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
                                        const weeks = [];
                                        let week = [];
                                        
                                        for (let i = 0; i < firstDay; i++) {
                                            week.push(<td key={`empty-${i}`} className={styles.emptyDay}></td>);
                                        }

                                        for (let day = 1; day <= totalDays; day++) {
                                            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                            const data = dailySupply[dateString] || [];
                                            
                                            week.push(
                                                <td key={dateString} className={styles.calendarDay}>
                                                    <div className={styles.dateNumber}>{day}</div>
                                                    <ul>
                                                        {
                                                            data.map((supply, index) => (
                                                                <li key={index} style={{ color: supply.color, display: 'block' }}>
                                                                    {supply.text}
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </td>
                                            );

                                            if (week.length === 7) {
                                                weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
                                                week = [];
                                            }
                                        }

                                        if (week.length > 0) {
                                            while (week.length < 7) {
                                                week.push(<td key={`empty-${week.length}`} className={styles.emptyDay}></td>);
                                            }
                                            weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
                                        }

                                        return weeks;
                                    })()
                                }
                            </tbody>
                        </table>
                    </>
                ) : (
                    <>
                        <div className={styles.yearNavigation}>
                            <button className={styles.navButton} onClick={() => handleYearChange(-1)}>◀ {currentYear - 1}</button>
                            <h2>{currentYear}</h2>
                            <button className={styles.navButton} onClick={() => handleYearChange(1)}>{currentYear + 1} ▶</button>
                        </div>

                        {/* <table className={styles.calendarTable}>
                            <thead>
                                <tr>{monthNames.slice(0, 6).map((month, index) => <th key={index}>{month}</th>)}</tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {
                                        monthNames.slice(0, 6).map((month, index) => {
                                            const data = monthlySupply[currentYear]?.[index + 1] || { totalSupply: 0, summary: [] };
                                            return (
                                                <td key={index}>
                                                   
                                                    {
                                                        data.summary.length > 0 ? (
                                                            <ul>
                                                                {
                                                                    data.summary.map((supply, i) => (
                                                                        <li key={i} style={{ display: 'block' }}>{supply}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        ) : (
                                                            <p style={{ color: 'gray', fontSize: '12px' }}>No data</p>
                                                        )
                                                    }
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            </tbody>

                            <thead>
                                <tr>{monthNames.slice(6, 12).map((month, index) => <th key={index}>{month}</th>)}</tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {
                                        monthNames.slice(6, 12).map((month, index) => {
                                            const data = monthlySupply[currentYear]?.[index + 7] || { totalSupply: 0, summary: [] };
                                            return (
                                                <td key={index + 6}>
                                                    
                                                    {
                                                        data.summary.length > 0 ? (
                                                            <ul>
                                                                {
                                                                    data.summary.map((supply, i) => (
                                                                        <li key={i} style={{ display: 'block' }}>{supply}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        ) : (
                                                            <p style={{ color: 'gray', fontSize: '12px' }}>No data</p>
                                                        )
                                                    }
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            </tbody>
                        </table> */}
                        <table className={styles.calendarTableMonth}>
                            <tbody>
                                {
                                    [0, 3, 6, 9].map((startIndex) => (
                                        <React.Fragment key={startIndex}>
                                            <thead>
                                                <tr>
                                                    {
                                                        monthNames.slice(startIndex, startIndex + 3).map((month, index) => (
                                                            <th key={index}>{month}</th>
                                                        ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {
                                                        monthNames.slice(startIndex, startIndex + 3).map((month, index) => {
                                                            const data = monthlySupply[currentYear]?.[startIndex + index + 1] || { totalSupply: 0, summary: [] };
                                                            return (
                                                                <td key={startIndex + index}>
                                                                    {
                                                                        data.summary.length > 0 ? (
                                                                            <ul>
                                                                                {
                                                                                    data.summary.map((supply, i) => (
                                                                                        <li key={i} style={{ display: 'block' }}>{supply}</li>
                                                                                    ))
                                                                                }
                                                                            </ul>
                                                                        ) : (
                                                                            <p style={{ color: 'gray', fontSize: '12px' }}>No data</p>
                                                                        )
                                                                    }
                                                                </td>
                                                            );
                                                        })
                                                    }
                                                </tr>
                                            </tbody>
                                        </React.Fragment>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default CalendarPage
