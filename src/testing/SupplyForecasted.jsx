import React, { useState, useEffect } from 'react';
import api from '../api/api';

function SupplyForecasted() {
    const [supplyType, setSupplyType] = useState('');
    const [supplyName, setSupplyName] = useState('');
    const [supplyNames, setSupplyNames] = useState([]);
    const [forecastData, setForecastData] = useState({});
    const [aggregatedData, setAggregatedData] = useState([]);
    
    // Fetch supply names whenever supply type changes
    useEffect(() => {
        if (supplyType) {
            api.get('/supplyForecasted/getSupplyNames', { params: { supplyType } })
                .then((response) => setSupplyNames(response.data))
                .catch((error) => console.error('Error fetching supply names:', error));
        }
    }, [supplyType]);

    // Handle forecast retrieval from the backend
    const handleForecast = async () => {
        try {
            const response = await api.get('/supplyForecasted/getSupplyForecasted', {
                params: { supplyType, supplyName },
            });
            const data = response.data;

            setForecastData(data);
            setAggregatedData(aggregateData(data));
        } catch (error) {
            console.error('Error fetching forecast:', error);
        }
    };

    // Function to aggregate daily, weekly, and monthly data
    const aggregateData = (data) => {
        const dailyData = data.daily_data || [];
        const weeklyData = data.weekly_data || [];
        const monthlyData = data.monthly_data || [];

        return {
            daily: dailyData,
            weekly: weeklyData,
            monthly: monthlyData,
            nextDaily: data.next_daily_future_data || [],
            nextWeekly: data.next_weekly_future_data || [],
            nextMonthly: data.next_monthly_future_data || [],
        };
    };

    return (
        <div>
            <h2>Supply Forecasted</h2>

            <label>Supply Type:</label>
            <select value={supplyType} onChange={(e) => setSupplyType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="FRUIT">Fruit</option>
                <option value="VEGETABLE">Vegetable</option>
            </select>

            <label>Supply Name:</label>
            <select value={supplyName} onChange={(e) => setSupplyName(e.target.value)} disabled={!supplyType}>
                <option value="">Select Name</option>
                {supplyNames.map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>

            <button onClick={handleForecast} disabled={!supplyType || !supplyName}>
                Get Forecast
            </button>

            {/* Displaying Daily Data */}
            {forecastData.daily_data && (
                <div>
                    <h3>Daily Data</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Actual Quantity</th>
                                <th>Forecasted Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecastData.daily_data.map(({ date, actual_quantity, forecasted_quantity }) => (
                                <tr key={date}>
                                    <td>{date}</td>
                                    <td>{actual_quantity}</td>
                                    <td style={{ color: 'orange' }}>{forecasted_quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Displaying Next Daily Future Data */}
            {forecastData.next_daily_future_data && (
                <div>
                    <h3>Next Daily Future Forecast</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Actual Quantity</th>
                                <th>Forecasted Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecastData.next_daily_future_data.map(({ date, actual_quantity, forecasted_quantity }) => (
                                <tr key={date}>
                                    <td>{date}</td>
                                    <td>-</td>
                                    <td style={{ color: 'orange' }}>{forecasted_quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Displaying Weekly Data */}
            {forecastData.weekly_data && (
                <div>
                    <h3>Weekly Data</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Week</th>
                                <th>Actual Quantity</th>
                                <th>Forecasted Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecastData.weekly_data.map(({ week_label, actual_quantity, forecasted_quantity }) => (
                                <tr key={week_label}>
                                    <td>{week_label}</td>
                                    <td>{actual_quantity}</td>
                                    <td style={{ color: 'orange' }}>{forecasted_quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Displaying Next Weekly Future Data */}
            {forecastData.next_weekly_future_data && (
                <div>
                    <h3>Next Weekly Future Forecast</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Week</th>
                                <th>Actual Quantity</th>
                                <th>Forecasted Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecastData.next_weekly_future_data.map(({ week_label, actual_quantity, forecasted_quantity }) => (
                                <tr key={week_label}>
                                    <td>{week_label}</td>
                                    <td>-</td>
                                    <td style={{ color: 'orange' }}>{forecasted_quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Displaying Monthly Data */}
            {forecastData.monthly_data && (
                <div>
                    <h3>Monthly Data</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Actual Quantity</th>
                                <th>Forecasted Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecastData.monthly_data.map(({ date, actual_quantity, forecasted_quantity }) => (
                                <tr key={date}>
                                    <td>{date}</td>
                                    <td>{actual_quantity}</td>
                                    <td style={{ color: 'orange' }}>{forecasted_quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Displaying Next Monthly Future Data */}
            {forecastData.next_monthly_future_data && (
                <div>
                    <h3>Next Monthly Future Forecast</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Actual Quantity</th>
                                <th>Forecasted Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecastData.next_monthly_future_data.map(({ date, actual_quantity, forecasted_quantity }) => (
                                <tr key={date}>
                                    <td>{date}</td>
                                    <td>-</td>
                                    <td style={{ color: 'orange' }}>{forecasted_quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default SupplyForecasted;
