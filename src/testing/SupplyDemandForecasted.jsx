import React, { useState, useEffect } from 'react';
import api from '../api/api';

function SupplyDemandForecasted() {
    const [supplyType, setSupplyType] = useState('');
    const [supplyName, setSupplyName] = useState('');
    const [supplyNames, setSupplyNames] = useState([]);
    const [dailyDemandData, setDailyDemandData] = useState({});
    const [aggregatedData, setAggregatedData] = useState([]);

    // Fetch supply names whenever supply type changes
    useEffect(() => {
        if (supplyType) {
            api.get('/supplyDemandForecasted/getSupplyDemandNames', { params: { supplyType } })
                .then((response) => setSupplyNames(response.data))
                .catch((error) => console.error('Error fetching supply names:', error));
        }
    }, [supplyType]);

    // Handle forecast retrieval from the backend
    const handleForecast = async () => {
        try {
            const response = await api.get('/supplyDemandForecasted/getSupplyDemandForecasted', {
                params: { supplyType, supplyName },
            });
            const data = response.data;

            setDailyDemandData(data);
            setAggregatedData(aggregateData(data));
        } catch (error) {
            console.error('Error fetching forecast:', error);
        }
    };

    // Function to aggregate daily, weekly, and monthly data
    const aggregateData = (data) => {
        const dailyDemandData = data.daily_demand_data || [];
        const weeklyData = data.weekly_demand_data || [];
        const monthlyData = data.monthly_demand_data || [];

        return {
            daily: dailyDemandData,
            weekly: weeklyData,
            monthly: monthlyData,
            nextDaily: data.next_daily_demand_data || [],
            nextWeekly: data.next_weekly_demand_data || [],
            nextMonthly: data.next_monthly_demand_data || [],
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

            {/* Displaying Daily Demand Data */}
            {dailyDemandData.daily_demand_data && dailyDemandData.daily_demand_data.length > 0 && (
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
                            {dailyDemandData.daily_demand_data.map(({ date, actual_quantity, forecasted_quantity }) => (
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

            {/* Displaying Next Daily Future Demand Data */}
            {dailyDemandData.next_daily_demand_data && dailyDemandData.next_daily_demand_data.length > 0 && (
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
                            {dailyDemandData.next_daily_demand_data.map(({ date, forecasted_quantity }) => (
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

            {/* Displaying Weekly Demand Data */}
            {dailyDemandData.weekly_demand_data && dailyDemandData.weekly_demand_data.length > 0 && (
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
                        {dailyDemandData.weekly_demand_data.map(({ week_start, week_end, forecasted_demand_quantity }) => (
                                <tr key={week_start}>
                                    <td>{week_start} - {week_end}</td>
                                    <td>dfdf-</td>
                                    <td style={{ color: 'orange' }}>{forecasted_demand_quantity}</td>
                                </tr>
                            ))}
                            {dailyDemandData.weekly_demand_data.map(({ week_start, week_end, forecasted_demand_quantity }) => (
                                <tr key={week_start}>
                                    <td>{week_start} - {week_end}</td>
                                    <td>-</td>
                                    <td style={{ color: 'orange' }}>{forecasted_demand_quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Displaying Monthly Demand Data */}
            {dailyDemandData.monthly_demand_data && dailyDemandData.monthly_demand_data.length > 0 && (
                <div>
                    <h3>Monthly Data</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Forecasted Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dailyDemandData.monthly_demand_data.map(({ month, forecasted_demand_quantity }) => (
                                <tr key={month}>
                                    <td>{month}</td>
                                    <td style={{ color: 'orange' }}>{forecasted_demand_quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Displaying Next Monthly Future Demand Data */}
            {dailyDemandData.next_monthly_demand_data && dailyDemandData.next_monthly_demand_data.length > 0 && (
                <div>
                    <h3>Next Monthly Future Forecast</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Forecasted Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dailyDemandData.next_monthly_demand_data.map(({ month, forecasted_demand_quantity }) => (
                                <tr key={month}>
                                    <td>{month}</td>
                                    <td style={{ color: 'orange' }}>{forecasted_demand_quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}

export default SupplyDemandForecasted;
