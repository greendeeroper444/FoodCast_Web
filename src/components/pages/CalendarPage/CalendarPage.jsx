// import React, { useState, useEffect } from 'react'
// import styles from './Calendar.module.css';
// import HeaderForm from '../../molecules/HeaderForm/HeaderForm';
// import CalendarIcon from '../../../assets/icons/calendar-light.svg';
// import api from '../../../api/api';
// import SelectCustomize from '../../molecules/SelectCustomize/SelectCustomize';
// import Button from '../../atoms/Button/Button';
// import Modal from '../../organisms/Modal/Modal';

// const CalendarPage = () => {
//     const [currentYear, setCurrentYear] = useState(2023);
//     const [currentMonth, setCurrentMonth] = useState(0);
//     const [viewMode, setViewMode] = useState('MONTHLY');
//     const [dailySupply, setDailySupply] = useState({});
//     const [monthlySupply, setMonthlySupply] = useState({});
//     const [supplyType, setSupplyType] = useState('VEGETABLE'); 
//     const [forecasts, setForecasts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [selectedDayData, setSelectedDayData] = useState([]);
//     const [selectedMonthData, setSelectedMonthData] = useState([]);
//     const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
//     const [isDayModalOpen, setIsDayModalOpen] = useState(false);

//     //day
//     const handleOpenDayModal = (data) => {
//         setSelectedDayData(data);
//         setIsDayModalOpen(true);
//     };
//     const handleCloseDayModal = () => {
//         setIsDayModalOpen(false);
//         setSelectedDayData([]);
//     };

//     //month
//     const handleOpenMonthModal = (summary) => {
//         setSelectedMonthData(summary);
//         setIsMonthModalOpen(true);
//     };
//     const handleCloseMonthModal = () => {
//         setIsMonthModalOpen(false);
//         setSelectedMonthData([]);
//     };

//     const fetchForecasts = async () => {
//         try {
//             const response = await api.get('/supplyDemandForecasted/getAllCollectedDemandsPrediction');
//             setForecasts(response.data);
//         } catch (error) {
//             console.error('Error fetching supply predictions:', error);
//         }
//     };

//     useEffect(() => {
//         fetchForecasts();
//     }, []);

//     const handleRefresh = async () => {
//         setLoading(true);
//         try {
//             const response = await api.post('/supplyDemandForecasted/runDemandPrediction');
//             setForecasts(response.data);
//             window.location.reload();
//         } catch (error) {
//             console.error('Error running prediction:', error);
//         }
//         setLoading(false);
//     };

//     const monthNames = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ];

//     useEffect(() => {
//         const fetchSupplyData = async () => {
//             try {
//                 const response = await api.get(`/adminCalendar/getSupplyDemandCalendar?year=${currentYear}&supplyType=${supplyType}`);
//                 const data = response.data;
    
//                 setDailySupply(data.dailySupply || {});
//                 setMonthlySupply(data.monthlySupply || {});
//             } catch (error) {
//                 console.error('Error fetching supply data:', error);
//             }
//         };
    
//         fetchSupplyData();
//     }, [currentYear, supplyType]); 

//     const handleMonthChange = (direction) => {
//         setCurrentMonth((prev) => {
//             let newMonth = prev + direction;
//             let newYear = currentYear;

//             if (newMonth < 0) {
//                 newMonth = 11;
//                 newYear -= 1;
//             } else if (newMonth > 11) {
//                 newMonth = 0;
//                 newYear += 1;
//             }

//             setCurrentYear(newYear);
//             return newMonth;
//         });
//     };

//     const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
//     const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
//     const handleYearChange = (direction) => setCurrentYear((prev) => prev + direction);


//   return (
//     <div className={styles.collectedPage}>
//         <HeaderForm icon={CalendarIcon} title='CALENDAR' />
        
//         <div className={styles.filterContainer}>
//             <SelectCustomize
//                 value={supplyType}
//                 onChange={setSupplyType}
//                 options={['VEGETABLE', 'FRUIT']}
//             />

//             <SelectCustomize
//                 value={viewMode}
//                 onChange={setViewMode}
//                 options={['DAILY', 'MONTHLY']}
//             />
//             <Button 
//                 onClick={handleRefresh} 
//                 disabled={loading} 
//                 className={styles.periodicalOption}
//             >
//                 {loading ? 'Refreshing...' : 'Refresh'}
//             </Button>

//         </div>

//         <div className={styles.calendarContainer}>
//             {
//                 viewMode === 'DAILY' ? (
//                     <>
//                         <div className={styles.monthNavigation}>
//                             <button className={styles.navButton} onClick={() => handleMonthChange(-1)}>
//                                 ◀ {monthNames[(currentMonth + 11) % 12]}
//                             </button>
//                             <h2>{monthNames[currentMonth]} {currentYear}</h2>
//                             <button className={styles.navButton} onClick={() => handleMonthChange(1)}>
//                                 {monthNames[(currentMonth + 1) % 12]} ▶
//                             </button>
//                         </div>

//                         <table className={styles.calendarTable}>
//                             <thead>
//                                 <tr>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <th key={day}>{day}</th>)}</tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     (() => {
//                                         const totalDays = getDaysInMonth(currentYear, currentMonth);
//                                         const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
//                                         const weeks = [];
//                                         let week = [];
                                        
//                                         for (let i = 0; i < firstDay; i++) {
//                                             week.push(<td key={`empty-${i}`} className={styles.emptyDay}></td>);
//                                         }

//                                         for (let day = 1; day <= totalDays; day++) {
//                                             const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//                                             const data = dailySupply[dateString] || [];
                                            
//                                             week.push(
//                                                 <td key={dateString} className={styles.calendarDay} onClick={() => handleOpenDayModal(data)}>
//                                                     <div className={styles.dateNumber}>{day}</div>
//                                                         <ul>
//                                                         {
//                                                             data.slice(0, 3).map((supply, index) => (
//                                                                 <li key={index} style={{ color: supply.color, display: 'block' }}>
//                                                                     {supply.text}
//                                                                 </li>
//                                                             ))
//                                                         }
//                                                     </ul>
//                                                     {
//                                                         data.length > 3 && (
//                                                             <li style={{ display: 'block', color: 'black', cursor: 'pointer', fontSize: '12px' }}>
//                                                                 See more...
//                                                             </li>
//                                                         )
//                                                     }
//                                                 </td>
//                                             );
                                            

//                                             if (week.length === 7) {
//                                                 weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
//                                                 week = [];
//                                             }
//                                         }

//                                         if (week.length > 0) {
//                                             while (week.length < 7) {
//                                                 week.push(<td key={`empty-${week.length}`} className={styles.emptyDay}></td>);
//                                             }
//                                             weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
//                                         }

//                                         return weeks;
//                                     })()
//                                 }
//                             </tbody>
//                         </table>
//                     </>
//                 ) : (
//                     <>
//                         <div className={styles.yearNavigation}>
//                             <button className={styles.navButton} onClick={() => handleYearChange(-1)}>◀ {currentYear - 1}</button>
//                             <h2 style={{ fontSize: '2rem' }}>{currentYear}</h2>
//                             <button className={styles.navButton} onClick={() => handleYearChange(1)}>{currentYear + 1} ▶</button>
//                         </div>
//                         <table className={styles.calendarTableMonth}>
//                             <tbody>
//                                 {
//                                     [0, 3, 6, 9].map((startIndex) => (
//                                         <React.Fragment key={startIndex}>
//                                             <thead>
//                                                 <tr>
//                                                     {
//                                                         monthNames.slice(startIndex, startIndex + 3).map((month, index) => (
//                                                             <th key={index}>{month}</th>
//                                                         ))
//                                                     }
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 <tr>
//                                                     {
//                                                         monthNames.slice(startIndex, startIndex + 3).map((month, index) => {
//                                                             const data = monthlySupply[currentYear]?.[startIndex + index + 1] || {totalSupply: 0, summary: []};
//                                                             return (
//                                                                 <td key={startIndex + index} onClick={() => handleOpenMonthModal(data.summary)}>
//                                                                 {
//                                                                     data.summary.length > 0 ? (
//                                                                         <ul>
//                                                                             {
//                                                                                 data.summary.slice(0, 3).map((supply, i) => ( //show only the first 3 items
//                                                                                     <li key={i} style={{ color: supply.color, display: 'block' }}>
//                                                                                         {supply.text}
//                                                                                     </li>
//                                                                                 ))
//                                                                             }
//                                                                             {
//                                                                                 data.summary.length > 3 && ( //show "see more..." if there are more than 3 items
//                                                                                     <li style={{ display: 'block', color: 'black', cursor: 'pointer', fontSize: '12px' }}>
//                                                                                         See more...
//                                                                                     </li>
//                                                                                 )
//                                                                             }
//                                                                         </ul>
//                                                                     ) : (
//                                                                         <ul>
//                                                                             <li style={{ display: 'block', color: 'gray', fontSize: '12px' }}>
//                                                                                 No Data Available.
//                                                                             </li>
//                                                                         </ul>
//                                                                     )
//                                                                 }
//                                                             </td>
//                                                             );
//                                                         })
//                                                     }
//                                                 </tr>
//                                             </tbody>
//                                         </React.Fragment>
//                                     ))
//                                 }
//                             </tbody>
//                         </table>
//                     </>
//                 )
//             }
//         </div>
//         {
//             isDayModalOpen && (
//                 <Modal title='Daily Supply Details' onClose={handleCloseDayModal} hideFooter={true}>
//                     <ul>
//                         {
//                             selectedDayData.length > 0 ? (
//                                 selectedDayData.map((supply, i) => (
//                                     <li key={i} style={{ color: supply.color, fontSize: '14px' }}>
//                                         {supply.text}
//                                     </li>
//                                 ))
//                             ) : (
//                                 <li style={{ color: 'gray' }}>No Data Available.</li>
//                             )
//                         }
//                     </ul>
//                 </Modal>
//             )
//         }

//         {
//             isMonthModalOpen && (
//                 <Modal title='Monthly Supply Details' onClose={handleCloseMonthModal} hideFooter={true}>
//                     <ul>
//                         {
//                             selectedMonthData.length > 0 ? (
//                                 selectedMonthData.map((supply, i) => (
//                                     <li key={i} style={{ color: supply.color, fontSize: '14px' }}>
//                                         {supply.text}
//                                     </li>
//                                 ))
//                             ) : (
//                                 <li style={{ color: 'gray' }}>No Data Available.</li>
//                             )
//                         }
//                     </ul>
//                 </Modal>
//             )
//         }

//     </div>
//   )
// }

// export default CalendarPage


import React, { useState, useEffect } from 'react'
import styles from './Calendar.module.css';
import HeaderForm from '../../molecules/HeaderForm/HeaderForm';
import CalendarIcon from '../../../assets/icons/calendar-light.svg';
import api from '../../../api/api';
import SelectCustomize from '../../molecules/SelectCustomize/SelectCustomize';
import Button from '../../atoms/Button/Button';
import Modal from '../../organisms/Modal/Modal';

const CalendarPage = () => {
    const [currentYear, setCurrentYear] = useState(2023);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [viewMode, setViewMode] = useState('MONTHLY');
    const [dailySupply, setDailySupply] = useState({});
    const [monthlySupply, setMonthlySupply] = useState({});
    const [supplyType, setSupplyType] = useState('VEGETABLE'); 
    const [forecasts, setForecasts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState({ type: '', data: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (type, data) => {
        setSelectedData({ type, data });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedData({ type: '', data: [] });
    };

    const renderCalendarDays = () => {
        const totalDays = getDaysInMonth(currentYear, currentMonth);
        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
        const weeks = [];
        let week = Array(firstDay).fill(<td className={styles.emptyDay}></td>);
        
        for (let day = 1; day <= totalDays; day++) {
            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const data = dailySupply[dateString] || [];
            
            week.push(
                <td key={dateString} className={styles.calendarDay} onClick={() => handleOpenModal('day', data)}>
                    <div className={styles.dateNumber}>{day}</div>
                    <ul>
                        {
                            data.slice(0, 3).map((supply, i) => 
                            <li key={i} style={{ color: supply.color, display: 'block' }}>
                                {supply.text}
                            </li>)
                        }
                        {
                            data.length > 3 && 
                            <li style={{ color: 'black', cursor: 'pointer', fontSize: '12px', display: 'block' }}>
                                See more...
                            </li>
                        }
                    </ul>
                </td>
            );
            
            if (week.length === 7) {
                weeks.push(<tr key={weeks.length}>{week}</tr>);
                week = [];
            }
        }
        
        if (week.length) {
            weeks.push(<tr key={weeks.length}>{[...week, ...Array(7 - week.length).fill(<td className={styles.emptyDay}></td>)]}</tr>);
        }
        
        return weeks;
    };

    const renderCalendarMonths = () => (
        [0, 3, 6, 9].map(startIndex => (
            <React.Fragment key={startIndex}>
                <thead>
                    <tr>{monthNames.slice(startIndex, startIndex + 3).map((month, i) => <th key={i}>{month}</th>)}</tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            monthNames.slice(startIndex, startIndex + 3).map((_, i) => {
                                const data = monthlySupply[currentYear]?.[startIndex + i + 1] || { summary: [] };
                                return (
                                    <td key={startIndex + i} onClick={() => handleOpenModal('month', data.summary)}>
                                        <ul>
                                            {
                                                data.summary.length ? (
                                                    <>
                                                        {
                                                            data.summary.slice(0, 3).map((supply, j) => 
                                                                <li key={j} style={{ color: supply.color, display: 'block' }}>
                                                                    {supply.text}
                                                                </li>
                                                            )
                                                        }
                                                        {
                                                            data.summary.length > 3 && 
                                                            <li style={{ color: 'black', cursor: 'pointer', fontSize: '12px', display: 'block' }}>
                                                                See more...
                                                            </li>
                                                        }
                                                    </>
                                                ) : <li style={{ color: 'gray', fontSize: '12px', display: 'block' }}>No Data Available.</li>
                                            }
                                        </ul>
                                    </td>
                                );
                            })
                        }
                    </tr>
                </tbody>
            </React.Fragment>
        ))
    );
    const fetchForecasts = async () => {
        try {
            const response = await api.get('/supplyDemandForecasted/getAllCollectedDemandsPrediction');
            setForecasts(response.data);
        } catch (error) {
            console.error('Error fetching supply predictions:', error);
        }
    };

    useEffect(() => {
        fetchForecasts();
    }, []);

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const response = await api.post('/supplyDemandForecasted/runDemandPrediction');
            setForecasts(response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error running prediction:', error);
        }
        setLoading(false);
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        const fetchSupplyData = async () => {
            try {
                const response = await api.get(`/adminCalendar/getSupplyDemandCalendar?year=${currentYear}&supplyType=${supplyType}`);
                const data = response.data;
    
                setDailySupply(data.dailySupply || {});
                setMonthlySupply(data.monthlySupply || {});
            } catch (error) {
                console.error('Error fetching supply data:', error);
            }
        };
    
        fetchSupplyData();
    }, [currentYear, supplyType]); 

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
            <SelectCustomize
                value={supplyType}
                onChange={setSupplyType}
                options={['VEGETABLE', 'FRUIT']}
            />

            <SelectCustomize
                value={viewMode}
                onChange={setViewMode}
                options={['DAILY', 'MONTHLY']}
            />
            <Button 
                onClick={handleRefresh} 
                disabled={loading} 
                className={styles.periodicalOption}
            >
                {loading ? 'Refreshing...' : 'Refresh'}
            </Button>

        </div>

        <br />
        <div className={styles.calendarContainer}>
        {
            viewMode === 'DAILY' ? (
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
                        <tbody>{renderCalendarDays()}</tbody>
                    </table>
                </>
            ) : (
                <>
                   <div className={styles.yearNavigation}>
                        <button className={styles.navButton} onClick={() => handleYearChange(-1)}>◀ {currentYear - 1}</button>
                        <h2 style={{ fontSize: '2rem' }}>{currentYear}</h2>
                        <button className={styles.navButton} onClick={() => handleYearChange(1)}>{currentYear + 1} ▶</button>
                    </div>
                    <table className={styles.calendarTableMonth}>{renderCalendarMonths()}</table>
                </>
            )
        }
        {
            isModalOpen && (
                <Modal title={`${selectedData.type === 'day' ? 'Daily' : 'Monthly'} Demand Details`} onClose={handleCloseModal} hideFooter>
                    <ul>
                        {
                            selectedData.data.length ? (
                                selectedData.data.map((supply, i) => <li key={i} style={{ color: supply.color }}>{supply.text}</li>)
                            ) : <li style={{ color: 'gray' }}>No Data Available.</li>
                        }
                    </ul>
                </Modal>
            )
        }
    </div>

    </div>
  )
}

export default CalendarPage
