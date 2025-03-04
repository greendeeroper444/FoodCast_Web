import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './LineChartSeasonalForecast.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChartSeasonalForecast({vegetables, fruits, viewSeason}) {
    //extract labels (names of supplies)
    const vegetableLabels = vegetables.map(v => v._id.supplyName);
    const fruitLabels = fruits.map(f => f._id.supplyName);

    //extract actual and forecasted data
    const actualDataVegetables = vegetables.map(v => parseFloat(v.demandPercentage) || 0);
    const forecastedDataVegetables = vegetables.map(v => parseFloat(v.demandForecastPercentage) || 0);
    
    const actualDataFruits = fruits.map(f => parseFloat(f.demandPercentage) || 0);
    const forecastedDataFruits = fruits.map(f => parseFloat(f.demandForecastPercentage) || 0);

    const vegetableData = {
        labels: vegetableLabels,
        datasets: [
            {
                label: 'Actual Demand (Vegetables)',
                data: actualDataVegetables,
                borderColor: 'green',
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                borderWidth: 2,
                pointRadius: 4,
                fill: true,
            },
            {
                label: 'Forecasted Demand (Vegetables)',
                data: forecastedDataVegetables,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderWidth: 2,
                pointRadius: 4,
                fill: true,
            },
        ],
    };

    const fruitData = {
        labels: fruitLabels,
        datasets: [
            {
                label: 'Actual Demand (Fruits)',
                data: actualDataFruits,
                borderColor: 'green',
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                borderWidth: 2,
                pointRadius: 4,
                fill: true,
            },
            {
                label: 'Forecasted Demand (Fruits)',
                data: forecastedDataFruits,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderWidth: 2,
                pointRadius: 4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 15,
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Supply Name',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Percentage',
                },
                beginAtZero: true,
            },
        },
    };

  return (
    <div className={styles.chartWrapper}>
        <div className={styles.chartRow}>
            <div className={styles.chartBox}>
                <h3>&#x1F33F; Vegetable Seasonal Forecast</h3>
                <div className={styles.chartContainer}>
                    <Line data={vegetableData} options={options} />
                </div>
            </div>
            <div className={styles.chartBox}>
                <h3>&#x1F34E; Fruit Seasonal Forecast</h3>
                <div className={styles.chartContainer}>
                    <Line data={fruitData} options={options} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default LineChartSeasonalForecast
