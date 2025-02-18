import React, { useState, useEffect } from 'react'
import styles from './SeasonalForecastPage.module.css';
import LineChartSeasonalForecasted from './LineChartSeasonalForecasted';
import api from '../../../api/api';
import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm';
import seasonalIcon from '../../../assets/icons/seasonal-forecast-light.svg';

function SeasonalForecastPage() {
    const [supplyType, setSupplyType] = useState('VEGETABLE');
    const [supplyName, setSupplyName] = useState('AMPALAYA');
    const [supplyNames, setSupplyNames] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [nextMonthlyFutureData, setNextMonthlyFutureData] = useState([]);

    //fetch supply names whenever supply type changes
    useEffect(() => {
        if (supplyType) {
            api
                .get('/supplyForecasted/getSupplyNames', { params: { supplyType } })
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
            const response = await api.get('/supplySeasonalForecasted/getSupplySeasonalForecasted', {
                params: {supplyType, supplyName},
            });
            const data = response.data;

            setMonthlyData(data.monthly_data || []);
            setNextMonthlyFutureData(data.next_monthly_future_data || []);
        } catch (error) {
            console.error('Error fetching forecast:', error);
        }
    };

  return (
    <div className={styles.seasonalForecastPage}>
        <HeaderForm icon={seasonalIcon} title="SEASONAL FORECAST" />

        <div className={styles.selection}>
            <div className={styles.formGroup}>
                <label>Supply Type:</label>
                <select value={supplyType} onChange={(e) => setSupplyType(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="VEGETABLE">VEGETABLE</option>
                    <option value="FRUIT">FRUIT</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Supply Name:</label>
                <select value={supplyName} onChange={(e) => setSupplyName(e.target.value)}>
                    <option value="">Select Name</option>
                    {
                        supplyNames.map((name, index) => (
                            <option key={index} value={name}>
                                {name}
                            </option>
                        )) 
                    }
                </select>
            </div>
        </div>

        <LineChartSeasonalForecasted
            monthlyData={monthlyData}
            nextMonthlyFutureData={nextMonthlyFutureData}
        />
    </div>
  )
}

export default SeasonalForecastPage
