import React from 'react'
import styles from './SeasonalForecastPage.module.css'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin, Filler);

function LineChartSeasonalForecasted({
    monthlyData,
    nextMonthlyFutureData,
}) {
    const prepareChartData = (data, nextForecast, labelType, season) => {
        if (!data || data.length === 0) {
            return {
                labels: [],
                datasets: [
                    {
                        label: 'Forecasted Volume',
                        data: [],
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        borderWidth: 2,
                        pointBorderColor: 'rgba(255, 0, 0, 0.1)',
                        pointBackgroundColor: 'rgba(255, 0, 0, 0.1)',
                        tension: 0.3,
                        fill: true,
                    },
                    {
                        label: 'Actual Volume',
                        data: [],
                        borderColor: 'green',
                        backgroundColor: 'rgba(0, 128, 0, 0.1)', 
                        borderWidth: 2,
                        pointBorderColor: 'rgba(0, 128, 0, 0.1)',
                        pointBackgroundColor: 'rgba(0, 128, 0, 0.1)',
                        tension: 0.3,
                        fill: true,
                    },
                ],
            };
        }

        let labels = [];
        const actualData = [];
        const forecastedData = [];

        const combinedData = [...data, ...nextForecast];

        const months = {
            rainySeason: [6, 7, 8, 9, 10, 11],
            drySeason: [12, 1, 2, 3, 4, 5],
        };

        const isInSeason = (month) => {
            return (season === 'rainy' && months.rainySeason.includes(month)) ||
                   (season === 'dry' && months.drySeason.includes(month));
        };

        if (labelType === 'Month') {
            labels = combinedData
                .filter(item => {
                    const month = new Date(item.date).getMonth() + 1;
                    return isInSeason(month);
                })
                .map((item) => `${new Date(item.date).toLocaleString('default', { month: 'short' })} ${new Date(item.date).getFullYear()}`);

            combinedData
                .filter(item => {
                    const month = new Date(item.date).getMonth() + 1;
                    return isInSeason(month);
                })
                .forEach((item) => {
                    actualData.push(item.actual_quantity);
                    forecastedData.push(item.forecasted_quantity || 0);
                });
        }

        return {
            labels,
            datasets: [
                {
                    label: 'Forecasted Volume',
                    data: forecastedData,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    borderWidth: 2,
                    pointBorderColor: 'red',
                    pointBackgroundColor: 'red',
                    tension: 0.3,
                    fill: true,
                },
                {
                    label: 'Actual Volume',
                    data: actualData,
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 128, 0, 0.1)', 
                    borderWidth: 2,
                    pointBorderColor: 'green',
                    pointBackgroundColor: 'green',
                    tension: 0.3,
                    fill: true,
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                    },
                    padding: 20,
                },
            },
            title: {
                display: true,
                text: '',
                font: {
                    size: 16,
                    weight: 'bold',
                },
                padding: {
                    bottom: 20,
                },
            },
            zoom: {
                pan: {enabled: true, mode: 'x'},
                zoom: {
                    wheel: {enabled: true},
                    pinch: {enabled: true},
                    mode: 'x',
                },
            },
        },
    };

    const rainySeasonData = prepareChartData(monthlyData, nextMonthlyFutureData, 'Month', 'rainy');
    const drySeasonData = prepareChartData(monthlyData, nextMonthlyFutureData, 'Month', 'dry');

  return (
    <div className={styles.lineChartSeasonalForecasted}>
        <div className={styles.rainySeason}>
            <h2 className={styles.seasonTitle}>
            🌧️ RAINY SEASON <span>(June-November)</span>
            </h2>
            <Line data={rainySeasonData} options={chartOptions} />
        </div>

        <div className={styles.drySeason}>
            <h2 className={styles.seasonTitle}>
                ☀️ DRY SEASON <span>(December-May)</span>
            </h2>
            <Line data={drySeasonData} options={chartOptions} />
        </div>
    </div>
  )
}

export default LineChartSeasonalForecasted
