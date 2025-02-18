import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ForecastingDemand() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [supplyTypes, setSupplyTypes] = useState([]);
    const [supplyNames, setSupplyNames] = useState([]);
    const [selectedSupplyType, setSelectedSupplyType] = useState('');
    const [selectedSupplyName, setSelectedSupplyName] = useState('');
    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        const fetchSupplyTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/supplyDemandForecasted/supplyTypes');
                setSupplyTypes(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error(err);
                setError('Error fetching supply types');
            }
        };
        fetchSupplyTypes();
    }, []);

    const fetchSupplyNames = async (supplyType) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/supplyDemandForecasted/supplyNames?supplyType=${supplyType}`);
            setSupplyNames(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error(err);
            setError('Error fetching supply names');
        }
    };

    const fetchForecastData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/supplyDemandForecasted/forecast?supplyType=${selectedSupplyType}&supplyName=${selectedSupplyName}`);
            setForecastData(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Error fetching forecast data');
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Forecasting Demand</h1>

            <select value={selectedSupplyType} onChange={(e) => {
                const supplyType = e.target.value;
                setSelectedSupplyType(supplyType);
                fetchSupplyNames(supplyType);
            }}>
                <option value="">Select Supply Type</option>
                {supplyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            {selectedSupplyType && (
                <select value={selectedSupplyName} onChange={(e) => setSelectedSupplyName(e.target.value)}>
                    <option value="">Select Supply Name</option>
                    {supplyNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            )}

            <button onClick={fetchForecastData}>Fetch Forecast</button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {forecastData && (
                <div>
                    <h2>Demand Comparison</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Actual Demand (Last 30 Days)</th>
                                <th>Forecasted Demand (Next 30 Days)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecastData.dates_actual.map((date, index) => (
                                <tr key={`actual-${index}`}>
                                    <td>{date}</td>
                                    <td>{forecastData.actual_quantity_day[index]}</td>
                                    <td>-</td>
                                </tr>
                            ))}
                            {forecastData.dates_forecast.map((date, index) => (
                                <tr key={`forecast-${index}`}>
                                    <td>{date}</td>
                                    <td>-</td>
                                    <td>{forecastData.forecasted_demand_day[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Actual Monthly Total Demand: {forecastData.actual_quantity_month}</h3>
                    <h3>Forecasted Monthly Total Demand: {forecastData.forecasted_demand_month}</h3>
                </div>
            )}
        </div>
    );
}

export default ForecastingDemand;
