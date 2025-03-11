import React, { useState, useEffect } from 'react'
import styles from './OverAndUnderSupply.module.css';
import api from '../../../../../api/api';
import LineChartOverUnderSupply from './LineChartOverUnderSupply';
import TableForecastedDemand from '../ActualAndForecastedDemand/TableForecastedDemand';
import Selection from '../../../../organisms/Selection/Selection';

function OverAndUnderSupply() {
    const [supplyType, setSupplyType] = useState('VEGETABLE');
    const [supplyName, setSupplyName] = useState('AMPALAYA');
    const [supplyNames, setSupplyNames] = useState([]);
    const [dailyDemandData, setDailyDemandData] = useState([]);
    const [weeklyDemandData, setWeeklyData] = useState([]);
    const [monthlyDemandData, setMonthlyDemandData] = useState([]);
    const [nextDailyDemandData, setNextDailyDemandData] = useState([]);
    const [nextWeeklyDemandData, setNextWeeklyDemandData] = useState([]);
    const [nextMonthlyDemandData, setNextMonthlyDemandData] = useState([]);
    const [active, setActive] = useState('Monthly');
    const [viewMode, setViewMode] = useState('GRAPH');
    const [modalOpen, setModalOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const handleSetActive = (newActive) => {
        setActive(newActive);
        setModalOpen(true);
    };


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
            fetchForecastData(supplyType, supplyName);
        }
    }, [supplyType, supplyName]);

    const fetchForecastData = async (supplyType, supplyName) => {
        try {
            setIsLoading(true); 
            const response = await api.get('/api/supplyDemandForecasted/getSupplyDemandForecasted', {
                params: { supplyType, supplyName },
            });
            const data = response.data;

            setDailyDemandData(data.daily_demand_data || []);
            setWeeklyData(data.weekly_demand_data || []);
            setMonthlyDemandData(data.monthly_demand_data || []);
            setNextDailyDemandData(data.next_daily_demand_data || []);
            setNextWeeklyDemandData(data.next_weekly_demand_data || []);
            setNextMonthlyDemandData(data.next_monthly_demand_data || []);
        } catch (error) {
            console.error('Error fetching forecast:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
  return (
    <div className={styles.overAndUnderSupply}>
        <h2>Actual And Forecasted Under/Over Supply</h2>

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
                viewMode === 'GRAPH' ? (
                    <LineChartOverUnderSupply
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

export default OverAndUnderSupply
