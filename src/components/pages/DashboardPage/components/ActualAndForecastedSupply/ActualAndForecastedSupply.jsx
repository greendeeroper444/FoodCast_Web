import React, { useState, useEffect, useCallback } from 'react'
import styles from './ActualAndForecastedSupply.module.css';
import api from '../../../../../api/api';
import LineChartForecastedSupply from './LineChartForecastedSupply';
import TableForecastedSupply from './TableForecastedSupply';
import Selection from '../../../../organisms/Selection/Selection';
import Spinner from '../../../../atoms/Spinner/Spinner';

function ActualAndForecastedSupply() {
    const [supplyType, setSupplyType] = useState('VEGETABLE');
    const [supplyName, setSupplyName] = useState('ALUGBATI');
    const [supplyNames, setSupplyNames] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [nextDailyFutureData, setNextDailyFutureData] = useState([]);
    const [nextWeeklyFutureData, setNextWeeklyFutureData] = useState([]);
    const [nextMonthlyFutureData, setNextMonthlyFutureData] = useState([]);
    const [active, setActive] = useState('Monthly');
    const [viewMode, setViewMode] = useState('GRAPH');
    const [modalOpen, setModalOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    //clear all data states
    const clearAllData = useCallback(() => {
        setDailyData([]);
        setWeeklyData([]);
        setMonthlyData([]);
        setNextDailyFutureData([]);
        setNextWeeklyFutureData([]);
        setNextMonthlyFutureData([]);
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
                .get('/api/supplyForecasted/getSupplyNames', {params: {supplyType}})
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
            const response = await api.get('/api/supplyForecasted/getSupplyForecasted', {
                params: { supplyType, supplyName },
            });
            const data = response.data;

            //update all data at once to avoid partial updates
            setDailyData(data.daily_data || []);
            setWeeklyData(data.weekly_data || []);
            setMonthlyData(data.monthly_data || []);
            setNextDailyFutureData(data.next_daily_future_data || []);
            setNextWeeklyFutureData(data.next_weekly_future_data || []);
            setNextMonthlyFutureData(data.next_monthly_future_data || []);
        } catch (error) {
            console.error('Error fetching forecast:', error);
            //clear data on error
            clearAllData();
        } finally {
            setIsLoading(false);
        }
    };
    
  return (
    <div className={styles.actualAndForecastedSupply}>
        <h2>Actual And Forecasted Supply</h2>

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
                    <LineChartForecastedSupply
                        dailyData={dailyData}
                        weeklyData={weeklyData}
                        monthlyData={monthlyData}
                        nextDailyFutureData={nextDailyFutureData}
                        nextWeeklyFutureData={nextWeeklyFutureData}
                        nextMonthlyFutureData={nextMonthlyFutureData}
                        active={active}
                    />
                ) : (
                    <TableForecastedSupply
                        dailyData={dailyData}
                        weeklyData={weeklyData}
                        monthlyData={monthlyData}
                        nextDailyFutureData={nextDailyFutureData}
                        nextWeeklyFutureData={nextWeeklyFutureData}
                        nextMonthlyFutureData={nextMonthlyFutureData}
                        active={active}
                    />
                )
            }
        </div>
    </div>
  )
}

export default ActualAndForecastedSupply