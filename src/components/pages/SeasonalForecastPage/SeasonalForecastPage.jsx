import React, { useState, useEffect } from 'react'
import api from '../../../api/api';
import styles from './SeasonalForecastPage.module.css';
import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm';
import seasonalIcon from '../../../assets/icons/seasonal-forecast-light.svg';
import SeasonDropdown from '../../molecules/SeasonDropdown/SeasonDropdown';
import SelectCustomize from '../../molecules/SelectCustomize/SelectCustomize';
import Button from '../../atoms/Button/Button';
import TableSeasonalForecast from './components/TableSeasonalForecast/TableSeasonalForecast';
import LineChartSeasonalForecast from './components/LineChartSeasonalForecast/LineChartSeasonalForecast';

function SeasonalForecastPage() {
    const [supplyDemands, setSupplyDemands] = useState([]);
    const [supplyForecasts, setSupplyForecasts] = useState([]);
    const [viewSeason, setViewSeason] = useState('DRY SEASON');
    // const [year, setYear] = useState(new Date().getFullYear().toString());
    const [year, setYear] = useState('2023');
    const [forecasts, setForecasts] = useState([]);
     const [loading, setLoading] = useState(false);
     const [viewMode, setViewMode] = useState('TABLE');

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



    const fetchSupplyData = async () => {
        try {
            const response = await api.get(
                `/supplySeasonalForecasted/getSupplySeasonalForecasted?season=${encodeURIComponent(viewSeason)}&year=${year}`
            );
    
            console.log('API Response:', response.data);
    
            const demandsKey = `demands (${year})`;
            const forecastsKey = `forecasts (${year})`;
    
            const demands = Array.isArray(response.data[demandsKey]) ? response.data[demandsKey] : [];
            const forecasts = Array.isArray(response.data[forecastsKey]) ? response.data[forecastsKey] : [];
    
            //merge demands and forecasts into a single map for easy lookup
            const mergedData = {};
    
            demands.forEach(item => {
                mergedData[item._id.supplyName] = {
                    ...item,
                    forecastedDemandQuantity: 0, //default to 0 if no forecast exists
                    forecastedSupplyQuantity: 0,
                  
                };
            });
    
            forecasts.forEach(item => {
                if (mergedData[item._id.supplyName]) {
                    mergedData[item._id.supplyName].forecastedDemandQuantity = item.totalDemandForecastQuantity;
                    mergedData[item._id.supplyName].forecastedSupplyQuantity = item.totalSupplyForecastQuantity;
                    mergedData[item._id.supplyName].demandForecastPercentage = item.demandForecastPercentage;
                    mergedData[item._id.supplyName].demandForecastLevel = item.demandForecastLevel;
                } else {
                    mergedData[item._id.supplyName] = {
                        _id: item._id,
                        totalDemandQuantity: 0, //default to 0 if no demand exists
                        totalSupplyQuantity: 0,
                        demandPercentage: '0%',
                        demandLevel: 'Low Demand',
                        forecastedDemandQuantity: item.totalDemandForecastQuantity,
                        forecastedSupplyQuantity: item.totalSupplyForecastQuantity,
                        demandForecastPercentage: item.demandForecastPercentage,
                        demandForecastLevel: item.demandForecastLevel,
                    };
                }
            });
    
            //set demands data
            setSupplyDemands(Object.values(mergedData));
    
            //set forecasts separately
            setSupplyForecasts(forecasts);
    
        } catch (error) {
            console.error('Error fetching supply data:', error);
            setSupplyDemands([]);
            setSupplyForecasts([]);
        }
    };
    
    

    useEffect(() => {
        fetchSupplyData();
    }, [viewSeason, year]);

    //separate vegetables and fruits
    const vegetables = supplyDemands.filter(item => item._id.supplyType === 'VEGETABLE');
    const fruits = supplyDemands.filter(item => item._id.supplyType === 'FRUIT');

    const yearOptions = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());

  return (
    <div className={styles.seasonalForecastPage}>
        <HeaderForm
            icon={seasonalIcon}
            title={`SEASONAL FORECAST ${viewSeason.includes('DRY SEASON') ? '( December - May )' : '( June - November )'}`}
            
        />
        <div className={styles.filterContainer}>
            <SelectCustomize
                value={viewSeason}
                onChange={setViewSeason}
                options={['RAINY SEASON', 'DRY SEASON']}
            />
            <SelectCustomize
                value={viewMode}
                onChange={setViewMode}
                options={['TABLE', 'GRAPH']}
            />
            <SelectCustomize
                value={year}
                onChange={setYear}
                options={yearOptions}
            />

            <Button
                onClick={handleRefresh} 
                disabled={loading} 
                className={styles.periodicalOption}
            >
                {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
        </div>
        <div className={styles.seasonalForecastContent}>
            {
                viewMode === 'TABLE' ? (
                    <TableSeasonalForecast
                        vegetables={vegetables}
                        fruits={fruits}
                    />
                ) : (
                    <LineChartSeasonalForecast
                        vegetables={vegetables}
                        fruits={fruits}
                        viewSeason={viewSeason}
                    />
                )
            }
        </div>
    </div>
  )
}

export default SeasonalForecastPage
