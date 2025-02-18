import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function LineChart2({data}) {
    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Price Trend',
                data: data.map(item => item.price),
                borderColor: 'orange',
                tension: 0.1,
                fill: false
            }
        ]
    };

    return <Line data={chartData} />;
}

export default LineChart2;
