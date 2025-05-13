import React, { useState, useEffect, useCallback } from 'react'
import styles from './OverAndUnderSupply.module.css';
import api from '../../../../../api/api';
import TableOverUnderSupply from './TableOverUnderSupply';
import Selection from '../../../../organisms/Selection/Selection';
import Spinner from '../../../../atoms/Spinner/Spinner';

function OverAndUnderSupply() {
    const [supplyType, setSupplyType] = useState('VEGETABLE');
    const [supplyName, setSupplyName] = useState('ALUGBATI');
    const [supplyNames, setSupplyNames] = useState([]);
    
    //supply data states
    const [dailySupplyData, setDailySupplyData] = useState([]);
    const [weeklySupplyData, setWeeklySupplyData] = useState([]);
    const [monthlySupplyData, setMonthlySupplyData] = useState([]);
    const [nextDailySupplyData, setNextDailySupplyData] = useState([]);
    const [nextWeeklySupplyData, setNextWeeklySupplyData] = useState([]);
    const [nextMonthlySupplyData, setNextMonthlySupplyData] = useState([]);
    
    //demand data states
    const [dailyDemandData, setDailyDemandData] = useState([]);
    const [weeklyDemandData, setWeeklyDemandData] = useState([]);
    const [monthlyDemandData, setMonthlyDemandData] = useState([]);
    const [nextDailyDemandData, setNextDailyDemandData] = useState([]);
    const [nextWeeklyDemandData, setNextWeeklyDemandData] = useState([]);
    const [nextMonthlyDemandData, setNextMonthlyDemandData] = useState([]);
    
    //combined data states
    const [combinedDailyData, setCombinedDailyData] = useState([]);
    const [combinedWeeklyData, setCombinedWeeklyData] = useState([]);
    const [combinedMonthlyData, setCombinedMonthlyData] = useState([]);
    const [nextCombinedDailyData, setNextCombinedDailyData] = useState([]);
    const [nextCombinedWeeklyData, setNextCombinedWeeklyData] = useState([]);
    const [nextCombinedMonthlyData, setNextCombinedMonthlyData] = useState([]);
    
    const [active, setActive] = useState('Monthly');
    const [viewMode, setViewMode] = useState('TABLE');
    const [isLoading, setIsLoading] = useState(true);

    const handleSetActive = (newActive) => {
        setActive(newActive);
    };

    // Fetch supply names whenever supply type changes
    useEffect(() => {
        if (supplyType) {
            api
                .get('/api/supplyForecasted/getSupplyNames', {params: {supplyType}})
                .then((response) => {
                    setSupplyNames(response.data);
                    console.log('Supply Names:', response.data);
                })
                .catch((error) => console.error('Error fetching supply names:', error));
        }
    }, [supplyType]);

    //auto-fetch data when supplyType or supplyName changes
    useEffect(() => {
        if (supplyType && supplyName) {
            fetchAllData(supplyType, supplyName);
        }
    }, [supplyType, supplyName]);

    const fetchAllData = async (supplyType, supplyName) => {
        try {
            setIsLoading(true);
            console.log(`Fetching data for ${supplyType} - ${supplyName}...`);
            
            //fetch supply data
            const supplyResponse = await api.get('/api/supplyForecasted/getSupplyForecasted', {
                params: { supplyType, supplyName },
            });
            
            //fetch demand data
            const demandResponse = await api.get('/api/supplyDemandForecasted/getSupplyDemandForecasted', {
                params: { supplyType, supplyName },
            });
            
            const supplyData = supplyResponse.data;
            const demandData = demandResponse.data;

            //set supply data
            setDailySupplyData(supplyData.daily_data || []);
            setWeeklySupplyData(supplyData.weekly_data || []);
            setMonthlySupplyData(supplyData.monthly_data || []);
            setNextDailySupplyData(supplyData.next_daily_future_data || []);
            setNextWeeklySupplyData(supplyData.next_weekly_future_data || []);
            setNextMonthlySupplyData(supplyData.next_monthly_future_data || []);
            
            //set demand data
            setDailyDemandData(demandData.daily_demand_data || []);
            setWeeklyDemandData(demandData.weekly_demand_data || []);
            setMonthlyDemandData(demandData.monthly_demand_data || []);
            setNextDailyDemandData(demandData.next_daily_demand_data || []);
            setNextWeeklyDemandData(demandData.next_weekly_demand_data || []);
            setNextMonthlyDemandData(demandData.next_monthly_demand_data || []);
            
            //combine data and calculate over/under supply
            combineDailyData(supplyData.daily_data || [], demandData.daily_demand_data || []);
            combineWeeklyData(supplyData.weekly_data || [], demandData.weekly_demand_data || []);
            combineMonthlyData(supplyData.monthly_data || [], demandData.monthly_demand_data || []);
            
            combineNextDailyData(supplyData.next_daily_future_data || [], demandData.next_daily_demand_data || []);
            combineNextWeeklyData(supplyData.next_weekly_future_data || [], demandData.next_weekly_demand_data || []);
            combineNextMonthlyData(supplyData.next_monthly_future_data || [], demandData.next_monthly_demand_data || []);
            
        } catch (error) {
            console.error('Error fetching data:', error);
            // Reset data on error to prevent stale data
            clearAllData();
        } finally {
            setIsLoading(false);
        }
    };
    
    
    // Helper function to reset all data states
    const clearAllData = useCallback(() =>  {
        setDailySupplyData([]);
        setWeeklySupplyData([]);
        setMonthlySupplyData([]);
        setNextDailySupplyData([]);
        setNextWeeklySupplyData([]);
        setNextMonthlySupplyData([]);
        setDailyDemandData([]);
        setWeeklyDemandData([]);
        setMonthlyDemandData([]);
        setNextDailyDemandData([]);
        setNextWeeklyDemandData([]);
        setNextMonthlyDemandData([]);
        setCombinedDailyData([]);
        setCombinedWeeklyData([]);
        setCombinedMonthlyData([]);
        setNextCombinedDailyData([]);
        setNextCombinedWeeklyData([]);
        setNextCombinedMonthlyData([]);
    }, []);
    
    //helper function to calculate over/under supply
    const calculateOverUnderSupply = (supply, minDemand, maxDemand) => {
        if (supply === null || supply === undefined || 
            minDemand === null || minDemand === undefined || 
            maxDemand === null || maxDemand === undefined) {
            return null;
        }
        
        // Convert to numbers and handle any potential NaN values
        const supplyNum = Number(supply) || 0;
        const minDemandNum = Number(minDemand) || 0;
        const maxDemandNum = Number(maxDemand) || 0;
        
        if (supplyNum > maxDemandNum) {
            return {
                type: 'OVER',
                amount: supplyNum - maxDemandNum,
                percentage: maxDemandNum > 0 ? ((supplyNum - maxDemandNum) / maxDemandNum * 100).toFixed(2) : 0
            };
        } else if (supplyNum < minDemandNum) {
            return {
                type: 'UNDER',
                amount: minDemandNum - supplyNum,
                percentage: minDemandNum > 0 ? ((minDemandNum - supplyNum) / minDemandNum * 100).toFixed(2) : 0
            };
        } else {
            return {
                type: 'BALANCED',
                amount: 0,
                percentage: 0
            };
        }
    };
    
    // Enhanced week label matching function
    const matchWeekLabels = (supplyLabel, demandLabel) => {
        if (!supplyLabel || !demandLabel) return false;
        
        // Normalize labels by removing extra spaces and converting to lowercase
        const normalizeLabel = (label) => label.replace(/\s+/g, ' ').trim().toLowerCase();
        const normalizedSupply = normalizeLabel(supplyLabel);
        const normalizedDemand = normalizeLabel(demandLabel);
        
        // Direct match
        if (normalizedSupply === normalizedDemand) return true;
        
        // Extract week identifiers (e.g., "Week 1", "Week 2", etc.)
        const extractWeekNumber = (label) => {
            const match = label.match(/week\s*(\d+)/i);
            return match ? match[1] : null;
        };
        
        const supplyWeek = extractWeekNumber(normalizedSupply);
        const demandWeek = extractWeekNumber(normalizedDemand);
        
        if (supplyWeek && demandWeek && supplyWeek === demandWeek) return true;
        
        // Check if one label contains the other's week identifier
        if (supplyWeek && normalizedDemand.includes(`week ${supplyWeek}`)) return true;
        if (demandWeek && normalizedSupply.includes(`week ${demandWeek}`)) return true;
        
        // Extract date ranges if present
        const extractDateRange = (label) => {
            const match = label.match(/(\d{4}-\d{2}-\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})/);
            return match ? `${match[1]}_${match[2]}` : null;
        };
        
        const supplyRange = extractDateRange(supplyLabel);
        const demandRange = extractDateRange(demandLabel);
        
        if (supplyRange && demandRange && supplyRange === demandRange) return true;
        
        return false;
    };
    
    //combine daily data
    const combineDailyData = (supplyData = [], demandData = []) => {
        const combined = supplyData.map(supply => {
            const demand = demandData.find(d => d.date === supply.date);
            if (!demand) return null;
            
            const actualSupply = supply.actual_quantity || 0;
            const forecastedSupply = supply.forecasted_quantity || 0;
            const totalSupply = actualSupply + forecastedSupply;
            
            const actualStatus = calculateOverUnderSupply(
                actualSupply,
                demand.actual_minDemand_quantity,
                demand.actual_maxDemand_quantity
            );
            
            const forecastedStatus = calculateOverUnderSupply(
                forecastedSupply,
                demand.forecasted_minDemand_quantity,
                demand.forecasted_maxDemand_quantity
            );
            
            const totalStatus = calculateOverUnderSupply(
                totalSupply,
                demand.actual_demand_quantity,
                demand.actual_maxDemand_quantity
            );
            
            return {
                date: supply.date,
                actual_supply: actualSupply,
                forecasted_supply: forecastedSupply,
                total_supply: totalSupply,
                actual_demand: demand.actual_demand_quantity,
                actual_minDemand: demand.actual_minDemand_quantity,
                actual_maxDemand: demand.actual_maxDemand_quantity,
                forecasted_demand: demand.forecasted_demand_quantity,
                forecasted_minDemand: demand.forecasted_minDemand_quantity,
                forecasted_maxDemand: demand.forecasted_maxDemand_quantity,
                actual_status: actualStatus,
                forecasted_status: forecastedStatus,
                total_status: totalStatus
            };
        }).filter(item => item !== null);
        
        setCombinedDailyData(combined);
    };
    
    //combine weekly data
    const combineWeeklyData = (supplyData = [], demandData = []) => {
        const combined = supplyData.map(supply => {
            const demand = demandData.find(d => matchWeekLabels(supply.week_label, d.week_label));
            if (!demand) return null;
            
            const actualSupply = supply.actual_quantity || 0;
            const forecastedSupply = supply.forecasted_quantity || 0;
            const totalSupply = actualSupply + forecastedSupply;
            
            const actualStatus = calculateOverUnderSupply(
                actualSupply,
                demand.actual_minDemand_quantity,
                demand.actual_maxDemand_quantity
            );
            
            const forecastedStatus = calculateOverUnderSupply(
                forecastedSupply,
                demand.forecasted_minDemand_quantity,
                demand.forecasted_maxDemand_quantity
            );
            
            const totalStatus = calculateOverUnderSupply(
                totalSupply,
                demand.actual_demand_quantity,
                demand.actual_maxDemand_quantity
            );
            
            return {
                week_label: supply.week_label,
                actual_supply: actualSupply,
                forecasted_supply: forecastedSupply,
                total_supply: totalSupply,
                actual_demand: demand.actual_demand_quantity,
                actual_minDemand: demand.actual_minDemand_quantity,
                actual_maxDemand: demand.actual_maxDemand_quantity,
                forecasted_demand: demand.forecasted_demand_quantity,
                forecasted_minDemand: demand.forecasted_minDemand_quantity,
                forecasted_maxDemand: demand.forecasted_maxDemand_quantity,
                actual_status: actualStatus,
                forecasted_status: forecastedStatus,
                total_status: totalStatus
            };
        }).filter(item => item !== null);
        
        setCombinedWeeklyData(combined);
    };
    
    //combine monthly data
    const combineMonthlyData = (supplyData = [], demandData = []) => {
        const combined = supplyData.map(supply => {
            const demand = demandData.find(d => d.date === supply.date);
            if (!demand) return null;
            
            const actualSupply = supply.actual_quantity || 0;
            const forecastedSupply = supply.forecasted_quantity || 0;
            const totalSupply = actualSupply + forecastedSupply;
            
            const actualStatus = calculateOverUnderSupply(
                actualSupply,
                demand.actual_minDemand_quantity,
                demand.actual_maxDemand_quantity
            );
            
            const forecastedStatus = calculateOverUnderSupply(
                forecastedSupply,
                demand.forecasted_minDemand_quantity,
                demand.forecasted_maxDemand_quantity
            );
            
            const totalStatus = calculateOverUnderSupply(
                totalSupply,
                demand.actual_demand_quantity,
                demand.actual_maxDemand_quantity
            );
            
            return {
                date: supply.date,
                actual_supply: actualSupply,
                forecasted_supply: forecastedSupply,
                total_supply: totalSupply,
                actual_demand: demand.actual_demand_quantity,
                actual_minDemand: demand.actual_minDemand_quantity,
                actual_maxDemand: demand.actual_maxDemand_quantity,
                forecasted_demand: demand.forecasted_demand_quantity,
                forecasted_minDemand: demand.forecasted_minDemand_quantity,
                forecasted_maxDemand: demand.forecasted_maxDemand_quantity,
                actual_status: actualStatus,
                forecasted_status: forecastedStatus,
                total_status: totalStatus
            };
        }).filter(item => item !== null);
        
        setCombinedMonthlyData(combined);
    };
    
    //combine next daily data (future)
    const combineNextDailyData = (supplyData = [], demandData = []) => {
        const combined = supplyData.map(supply => {
            const demand = demandData.find(d => d.date === supply.date);
            if (!demand) return null;
            
            const forecastedSupply = supply.forecasted_quantity || 0;
            
            const forecastedStatus = calculateOverUnderSupply(
                forecastedSupply,
                demand.forecasted_minDemand_quantity,
                demand.forecasted_maxDemand_quantity
            );
            
            return {
                date: supply.date,
                forecasted_supply: forecastedSupply,
                forecasted_demand: demand.forecasted_demand_quantity,
                forecasted_minDemand: demand.forecasted_minDemand_quantity,
                forecasted_maxDemand: demand.forecasted_maxDemand_quantity,
                forecasted_status: forecastedStatus
            };
        }).filter(item => item !== null);
        
        setNextCombinedDailyData(combined);
    };
    
    //combine next weekly data (future)
    const combineNextWeeklyData = (supplyData = [], demandData = []) => {
        const combined = supplyData.map(supply => {
            const demand = demandData.find(d => matchWeekLabels(supply.week_label, d.week_label));
            if (!demand) return null;
            
            const forecastedSupply = supply.forecasted_quantity || 0;
            
            const forecastedStatus = calculateOverUnderSupply(
                forecastedSupply,
                demand.forecasted_minDemand_quantity,
                demand.forecasted_maxDemand_quantity
            );
            
            return {
                week_label: supply.week_label,
                forecasted_supply: forecastedSupply,
                forecasted_demand: demand.forecasted_demand_quantity,
                forecasted_minDemand: demand.forecasted_minDemand_quantity,
                forecasted_maxDemand: demand.forecasted_maxDemand_quantity,
                forecasted_status: forecastedStatus
            };
        }).filter(item => item !== null);
        
        setNextCombinedWeeklyData(combined);
    };
    
    //combine next monthly data (future)
    const combineNextMonthlyData = (supplyData = [], demandData = []) => {
        const combined = supplyData.map(supply => {
            const demand = demandData.find(d => d.date === supply.date);
            if (!demand) return null;
            
            const forecastedSupply = supply.forecasted_quantity || 0;
            
            const forecastedStatus = calculateOverUnderSupply(
                forecastedSupply,
                demand.forecasted_minDemand_quantity,
                demand.forecasted_maxDemand_quantity
            );
            
            return {
                date: supply.date,
                forecasted_supply: forecastedSupply,
                forecasted_demand: demand.forecasted_demand_quantity,
                forecasted_minDemand: demand.forecasted_minDemand_quantity,
                forecasted_maxDemand: demand.forecasted_maxDemand_quantity,
                forecasted_status: forecastedStatus
            };
        }).filter(item => item !== null);
        
        console.log('Next Combined Monthly Data:', combined);
        setNextCombinedMonthlyData(combined);
    };

    //log when view changes between table and graph
    useEffect(() => {
        console.log(`View mode changed to: ${viewMode}`);
    }, [viewMode]);
    
    //log the data for the currently active view (Daily, Weekly, Monthly)
    useEffect(() => {
        console.log(`Active view changed to: ${active}`);
        if (active === 'Daily') {
            console.log('Current Daily Data:', combinedDailyData);
            console.log('Future Daily Data:', nextCombinedDailyData);
        } else if (active === 'Weekly') {
            console.log('Current Weekly Data:', combinedWeeklyData);
            console.log('Future Weekly Data:', nextCombinedWeeklyData);
        } else if (active === 'Monthly') {
            console.log('Current Monthly Data:', combinedMonthlyData);
            console.log('Future Monthly Data:', nextCombinedMonthlyData);
        }
    }, [active, combinedDailyData, combinedWeeklyData, combinedMonthlyData, 
        nextCombinedDailyData, nextCombinedWeeklyData, nextCombinedMonthlyData]);
    
  return (
    <div className={styles.overAndUnderSupply}>
        <h2>Over And Under Supply Analysis</h2>

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
            hideViewMode={true}
        />
        

        <div className={styles.linechartTable}>
            {
                isLoading ? (
                    <div className={styles.loadingContainer}>
                        <Spinner />
                        <p>Loading data...</p>
                    </div>
                ) : (
                    <TableOverUnderSupply
                        key={`${active}-${supplyType}-${supplyName}`}
                        dailyData={combinedDailyData}
                        weeklyData={combinedWeeklyData}
                        monthlyData={combinedMonthlyData}
                        nextDailyData={nextCombinedDailyData}
                        nextWeeklyData={nextCombinedWeeklyData}
                        nextMonthlyData={nextCombinedMonthlyData}
                        active={active}
                    />
                    
                )
            }
        </div>

    </div>
  )
}

export default OverAndUnderSupply