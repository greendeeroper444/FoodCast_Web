import React, { useEffect, useState } from 'react';
import api from '../api/api';

function AllForecastedDemand() {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    api.get('/api/supplyDemandForecasted/getSupplyDemandForecasted') // Update this URL to match your backend route
      .then(response => {
        setForecastData(response.data.next_daily_demand_data || []);
      })
      .catch(error => {
        console.error('Error fetching forecasted demand data:', error);
      });
  }, []);

  return (
    <div>
      <h2>All Forecasted Demand Quantities</h2>
      <ul>
        {forecastData.length > 0 ? (
          forecastData.map((item, index) => (
            <li key={index}>
              Date: {item.date} - Forecasted Demand: {item.forecasted_demand_quantity}
            </li>
          ))
        ) : (
          <p>No forecast data available.</p>
        )}
      </ul>
    </div>
  );
}

export default AllForecastedDemand;
