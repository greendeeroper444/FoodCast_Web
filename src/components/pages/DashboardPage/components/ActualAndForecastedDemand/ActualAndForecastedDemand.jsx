import React, { useState, useEffect, useCallback } from 'react'
import styles from './ActualAndForecastedDemand.module.css';
import api from '../../../../../api/api';
import LineChartForecastedDemand from './LineChartForecastedDemand';
import TableForecastedDemand from './TableForecastedDemand';
import Selection from '../../../../organisms/Selection/Selection';
import Spinner from '../../../../atoms/Spinner/Spinner';

function ActualAndForecastedDemand() {
    const [supplyType, setSupplyType] = useState('VEGETABLE');
    const [supplyName, setSupplyName] = useState('ALUGBATI');
    const [supplyNames, setSupplyNames] = useState([]);
    const [dailyDemandData, setDailyDemandData] = useState([]);
    const [weeklyDemandData, setWeeklyDemandData] = useState([]);
    const [monthlyDemandData, setMonthlyDemandData] = useState([]);
    const [nextDailyDemandData, setNextDailyDemandData] = useState([]);
    const [nextWeeklyDemandData, setNextWeeklyDemandData] = useState([]);
    const [nextMonthlyDemandData, setNextMonthlyDemandData] = useState([]);
    const [active, setActive] = useState('Monthly');
    const [viewMode, setViewMode] = useState('GRAPH');
    const [modalOpen, setModalOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    //clear all data states
    const clearAllData = useCallback(() => {
        setDailyDemandData([]);
        setWeeklyDemandData([]);
        setMonthlyDemandData([]);
        setNextDailyDemandData([]);
        setNextWeeklyDemandData([]);
        setNextMonthlyDemandData([]);
    }, []);

    const handleSetActive = useCallback((newActive) => {
        //only update if the active tab is actually changing
        if (newActive !== active) {
            setActive(newActive);
            setModalOpen(true);
        }
    }, [active]);

    //fetch supply names whenever supply type changes
    useEffect(() => {
        if (supplyType) {
            api
                .get('/api/supplyDemandForecasted/getSupplyDemandNames', {params: {supplyType}})
                .then((response) => {
                    setSupplyNames(response.data);
                })
                .catch((error) => console.error('Error fetching supply names:', error));
        }
    }, [supplyType]);

    //auto-fetch forecast when supplyType or supplyName changes
    useEffect(() => {
        if (supplyType && supplyName) {
            //clear data before fetching new data
            clearAllData();
            fetchForecastData(supplyType, supplyName);
        }
    }, [supplyType, supplyName, clearAllData]);

    const fetchForecastData = async (supplyType, supplyName) => {
        try {
            setIsLoading(true);
            const response = await api.get('/api/supplyDemandForecasted/getSupplyDemandForecasted', {
                params: { supplyType, supplyName },
            });
            const data = response.data;

            //update all data at once to avoid partial updates
            setDailyDemandData(data.daily_demand_data || []);
            setWeeklyDemandData(data.weekly_demand_data || []);
            setMonthlyDemandData(data.monthly_demand_data || []);
            setNextDailyDemandData(data.next_daily_demand_data || []);
            setNextWeeklyDemandData(data.next_weekly_demand_data || []);
            setNextMonthlyDemandData(data.next_monthly_demand_data || []);
        } catch (error) {
            console.error('Error fetching forecast:', error);
            //clear data on error
            clearAllData();
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className={styles.actualAndForecastedDemand}>
            <h2>Actual And Forecasted Demand</h2>

            <Selection
                supplyType={supplyType}
                setSupplyType={setSupplyType}
                supplyName={supplyName}
                setSupplyName={setSupplyName}
                supplyNames={supplyNames}
                viewMode={viewMode}
                setViewMode={setViewMode}
                active={active}
                handleSetActive={handleSetActive}
            />

            <div className={styles.linechartTable}>
                {
                    isLoading ? (
                        <div className={styles.loadingContainer}>
                            <Spinner />
                            <p>Loading data...</p>
                        </div>
                    ) : viewMode === 'GRAPH' ? (
                        <LineChartForecastedDemand
                            dailyDemandData={dailyDemandData}
                            weeklyDemandData={weeklyDemandData}
                            monthlyDemandData={monthlyDemandData}
                            nextDailyDemandData={nextDailyDemandData}
                            nextWeeklyDemandData={nextWeeklyDemandData}
                            nextMonthlyDemandData={nextMonthlyDemandData}
                            active={active}
                        />
                    ) : (
                        <TableForecastedDemand
                            dailyDemandData={dailyDemandData}
                            weeklyDemandData={weeklyDemandData}
                            monthlyDemandData={monthlyDemandData}
                            nextDailyDemandData={nextDailyDemandData}
                            nextWeeklyDemandData={nextWeeklyDemandData}
                            nextMonthlyDemandData={nextMonthlyDemandData}
                            active={active}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default ActualAndForecastedDemand