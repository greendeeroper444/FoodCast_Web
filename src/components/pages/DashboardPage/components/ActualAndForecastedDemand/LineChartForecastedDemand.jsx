// import React from 'react'
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
// import zoomPlugin from 'chartjs-plugin-zoom';
// import { formatDate } from '../../../../../utils/dateUtils';
// import { formatNumber } from '../../../../../utils/numberUtils';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin, Filler);

// function LineChartForecastedDemand({
//     dailyDemandData,
//     weeklyDemandData,
//     monthlyDemandData,
//     nextDailyDemandData,
//     nextWeeklyDemandData,
//     nextMonthlyDemandData,
//     active
// }) {
//     const prepareChartData = (data, nextForecast, labelType) => {
//         if (!data || data.length === 0) {
//             return {
//                 labels: [],
//                 datasets: [
//                     {
//                         label: 'Forecasted Demand',
//                         data: [],
//                         borderColor: 'orange',
//                         backgroundColor: 'orange',
//                         borderWidth: 2,
//                         pointBorderColor: 'orange',
//                         pointBackgroundColor: 'orange',
//                         tension: 0.2,
//                     },
//                     {
//                         label: 'Actual Demand',
//                         data: [],
//                         borderColor: 'green',
//                         backgroundColor: 'green',
//                         borderWidth: 2,
//                         pointBorderColor: 'green',
//                         pointBackgroundColor: 'green',
//                         tension: 0.2,
//                     },
//                 ],
//             };
//         }

//         let labels = [];
//         const actualData = [];
//         const forecastedData = [];
//         const actualMaxDemandData = [];
//         const actualMinDemandData = [];
//         const forecastedMaxDemandData = [];
//         const forecastedMinDemandData = [];

//         //combine past data with future forecasted data
//         const combinedData = [...data, ...nextForecast];

//         //forr daily, weekly, or monthly data
//         if (labelType === 'Day') {
//             labels = combinedData.map((item) => `${formatDate(item.date)}`);
//             combinedData.forEach((item) => {
//                 actualData.push(`${formatNumber(item.actual_demand_quantity)}`);
//                 forecastedData.push(`${formatNumber(item.forecasted_demand_quantity || null)}`);
//                 forecastedMaxDemandData.push(formatNumber(item.forecasted_maxDemand_quantity));
//                 forecastedMinDemandData.push(formatNumber(item.forecasted_minDemand_quantity));
//                 actualMaxDemandData.push(formatNumber(item.actual_maxDemand_quantity || null));
//                 actualMinDemandData.push(formatNumber(item.actual_minDemand_quantity || null)); 
//             });
//         } else if (labelType === 'Week') {
//             labels = combinedData.map((item, index) => `Week ${index + 1}`);
//             combinedData.forEach((item) => {
//                 actualData.push(`${formatNumber(item.actual_demand_quantity)}`);
//                 forecastedData.push(`${formatNumber(item.forecasted_demand_quantity || null)}`);
//                 forecastedMaxDemandData.push(formatNumber(item.forecasted_maxDemand_quantity));
//                 forecastedMinDemandData.push(formatNumber(item.forecasted_minDemand_quantity));
//                 actualMaxDemandData.push(formatNumber(item.actual_maxDemand_quantity || null));
//                 actualMinDemandData.push(formatNumber(item.actual_minDemand_quantity || null));
//             });
//         } else if (labelType === 'Month') {
//             labels = combinedData.map((item) => `${item.month}`);
//             combinedData.forEach((item) => {
//                 actualData.push(`${formatNumber(item.actual_demand_quantity)}`);
//                 forecastedData.push(`${formatNumber(item.forecasted_demand_quantity || null)}`);
//                 forecastedMaxDemandData.push(formatNumber(item.forecasted_maxDemand_quantity));
//                 forecastedMinDemandData.push(formatNumber(item.forecasted_minDemand_quantity));
//                 actualMaxDemandData.push(formatNumber(item.actual_maxDemand_quantity || null));
//                 actualMinDemandData.push(formatNumber(item.actual_minDemand_quantity || null));
//             });
//         }

//         return {
//             labels,
//             datasets: [
//                 {
//                     label: 'Forecasted Demand',
//                     data: forecastedData,
//                     borderColor: 'orange',
//                     backgroundColor: 'orange',
//                     borderWidth: 2,
//                     pointBorderColor: 'orange',
//                     pointBackgroundColor: 'orange',
//                     tension: 0.2,
//                 },
//                 {
//                     label: 'Actual Demand',
//                     data: actualData,
//                     borderColor: 'green',
//                     backgroundColor: 'green',
//                     borderWidth: 2,
//                     pointBorderColor: 'green',
//                     pointBackgroundColor: 'green',
//                     tension: 0.2,
//                 },
//                 {
//                     label: 'Max Forecasted Demand',
//                     data: forecastedMaxDemandData,
//                     borderColor: 'green',
//                     backgroundColor: 'green',
//                     borderWidth: 2,
//                     borderDash: [5, 5],
//                     tension: 0.2,
//                 },
//                 {
//                     label: 'Min Forecasted Demand',
//                     data: forecastedMinDemandData,
//                     borderColor: 'orange',
//                     backgroundColor: 'orange',
//                     borderWidth: 2,
//                     borderDash: [5, 5],
//                     tension: 0.2,
//                 },
//                 {
//                     label: 'Actual Max Demand',
//                     data: actualMaxDemandData,
//                     borderColor: 'green',
//                     backgroundColor: 'green',
//                     borderWidth: 2,
//                     pointBorderColor: 'green',
//                     pointBackgroundColor: 'green',
//                     tension: 0.2,
//                 },
//                 {
//                     label: 'Actual Min Demand',
//                     data: actualMinDemandData,
//                     borderColor: 'orange',
//                     backgroundColor: 'orange',
//                     borderWidth: 2,
//                     pointBorderColor: 'orange',
//                     pointBackgroundColor: 'orange',
//                     tension: 0.2,
//                 },
//             ],
//         };
//     };

//     const chartOptions = {
//         responsive: true,
//         plugins: {
//             legend: {position: 'top'},
//             title: {
//                 display: true,
//                 text: 'Forecasted vs Actual Demands',
//             },
//             zoom: {
//                 pan: {enabled: true, mode: 'x'},
//                 zoom: {
//                     wheel: {enabled: true},
//                     pinch: {enabled: true},
//                     mode: 'x',
//                 },
//             },
//         },
//     };

//   return (
//     <Line
//         data={active === 'Daily'
//             ? prepareChartData(dailyDemandData, nextDailyDemandData, 'Day')
//             : active === 'Weekly'
//                 ? prepareChartData(weeklyDemandData, nextWeeklyDemandData, 'Week')
//                 : prepareChartData(monthlyDemandData, nextMonthlyDemandData, 'Month')}
//         options={chartOptions}
//     />
//   )
// }

// export default LineChartForecastedDemand

import React, { useRef, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { formatDate } from '../../../../../utils/dateUtils';
import { handleResetZoom, handleZoomIn, handleZoomOut, zoomContinuous } from '../../../../../utils/zoomsUtil';
import { panChartContinuous } from '../../../../../utils/panControlsUtil';
import ZoomControl from '../../../../molecules/ZoomControl/ZoomControl';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin, Filler);

function LineChartForecastedDemand({
    dailyDemandData = [],
    weeklyDemandData = [],
    monthlyDemandData = [],
    nextDailyDemandData = [],
    nextWeeklyDemandData = [],
    nextMonthlyDemandData = [],
    active
}) {
    const chartRef = useRef(null);
    const zoomControls = zoomContinuous(chartRef);

    //keyboard symbol function
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === '+') {
                handleZoomIn();
            } else if (event.key === '-') {
                handleZoomOut();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // ------ Pan Chart -------
    
    const panChart = (direction) => {
        if (chartRef.current) {
            const chart = chartRef.current;
            if (chart?.chartInstance) {
                chart.chartInstance.pan({x: direction === 'right' ? -50 : 50});
            } else if (chart?.pan) {
                chart.pan({x: direction === 'right' ? -50 : 50});
            }
        }
    };
    const leftPanControl = panChartContinuous(panChart, 'left');
    const rightPanControl = panChartContinuous(panChart, 'right');


    // ----- PrepareChart Data

    const prepareChartData = (data, nextForecast, labelType) => {
        if (!data || data.length === 0 || !nextForecast || nextForecast.length === 0) {
            return {
                labels: [],
                datasets: [
                    {
                        label: 'Actual Demand',
                        data: [],
                        borderColor: 'blue',
                        backgroundColor: 'blue',
                        borderWidth: 2,
                        pointBorderColor: 'blue',
                        pointBackgroundColor: 'blue',
                        tension: 0.2,
                    },
                    {
                        label: 'Forecasted Demand',
                        data: [],
                        borderColor: 'orange',
                        backgroundColor: 'orange',
                        borderWidth: 2,
                        pointBorderColor: 'orange',
                        pointBackgroundColor: 'orange',
                        tension: 0.2,
                    },
                    {
                        label: 'Actual Max Demand',
                        data: [],
                        borderColor: 'red',
                        backgroundColor: 'red',
                        borderWidth: 2,
                        pointBorderColor: 'red',
                        pointBackgroundColor: 'red',
                        tension: 0.2,
                    },
                    {
                        label: 'Actual Min Demand',
                        data: [],
                        borderColor: 'orange',
                        backgroundColor: 'orange',
                        borderWidth: 2,
                        pointBorderColor: 'orange',
                        pointBackgroundColor: 'orange',
                        tension: 0.2,
                    },
                    {
                        label: 'Forecasted Max Demand',
                        data: [],
                        borderColor: 'red',
                        backgroundColor: 'red',
                        borderWidth: 2,
                        pointBorderColor: 'red',
                        pointBackgroundColor: 'red',
                        tension: 0.2,
                    },
                    {
                        label: 'Forecasted Min Demand',
                        data: [],
                        borderColor: 'teal',
                        backgroundColor: 'teal',
                        borderWidth: 2,
                        pointBorderColor: 'teal',
                        pointBackgroundColor: 'teal',
                        tension: 0.2,
                    },
                ],
    
            };
        }
    
        const labels = [];
        const actualData = [];
        const forecastedData = [];
        const actualMaxData = [];
        const actualMinData = [];
        const forecastedMaxData = [];
        const forecastedMinData = [];
    
        let weekCounter = 1; //counter for generating week labels
    
        //add actual data points
        data.forEach((item) => {
            if (labelType === 'Day') {
                labels.push(`${formatDate(item.date)}`);
            } else if (labelType === 'Week') {
                labels.push(`Week ${weekCounter++}`); //use sequential week labels
            } else if (labelType === 'Month') {
                labels.push(`${item.month || ''}`);
            }
    
            actualData.push(item.actual_demand_quantity);
            actualMaxData.push(item.actual_maxDemand_quantity);
            actualMinData.push(item.actual_minDemand_quantity);
            forecastedData.push(null); //no forecasted data for actual points
            forecastedMaxData.push(null); //no forecasted data for actual points
            forecastedMinData.push(null); //no forecasted data for actual points
        });
    
        //add all forecasted data points
        nextForecast.forEach((item, index) => {
            if (labelType === 'Week') {
                labels.push(`Week ${weekCounter++}`); //continue sequential week labels
            } else if (labelType === 'Day') {
                labels.push(`${formatDate(item.date)}`);
            } else if (labelType === 'Month') {
                labels.push(`${item.month || ''}`);
            }
    
            if (index === 0) {
                actualData.push(item.forecasted_demand_quantity); //ensure blue line reaches the orange point
            } else {
                actualData.push(null); //no actual data beyond the transition point
            }
            if (index === 0) {
                actualMaxData.push(item.forecasted_maxDemand_quantity); //ensure blue line reaches the orange point
            } else {
                actualMaxData.push(null); //no actual data beyond the transition point
            }
            if (index === 0) {
                actualMinData.push(item.forecasted_minDemand_quantity); //ensure blue line reaches the orange point
            } else {
                actualMinData.push(null); //no actual data beyond the transition point
            }
            
            forecastedData.push(item.forecasted_demand_quantity); //add forecasted data points
            forecastedMaxData.push(item.forecasted_maxDemand_quantity);
            forecastedMinData.push(item.forecasted_minDemand_quantity);
        });
    
        return {
            labels,
            datasets: [
                {
                    label: 'Actual Demand',
                    data: actualData,
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    borderWidth: 2,
                    pointBorderColor: (ctx) => {
                        const index = ctx.dataIndex;
                        return index === data.length ? 'blue' : 'blue'; //transition point is blue
                    },
                    pointBackgroundColor: (ctx) => {
                        const index = ctx.dataIndex;
                        return index === data.length ? 'blue' : 'blue'; //transition point is blue
                    },
                    tension: 0.2,
                    spanGaps: true, //seamless connection
                },
                {
                    label: 'Forecasted Demand',
                    data: forecastedData,
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    borderWidth: 3, //make the blue line stand out
                    pointBorderColor: 'blue',
                    pointBackgroundColor: 'blue',
                    borderDash: [5, 5],
                    tension: 0.2,
                    spanGaps: true, //seamless connection
                },
                {
                    label: 'Actual Max Demand',
                    data: actualMaxData,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    borderWidth: 2,
                    pointBorderColor: (ctx) => {
                        const index = ctx.dataIndex;
                        return index === data.length ? 'red' : 'red'; //transition point is red
                    },
                    pointBackgroundColor: (ctx) => {
                        const index = ctx.dataIndex;
                        return index === data.length ? 'red' : 'red'; //transition point is red
                    },
                    tension: 0.2,
                    spanGaps: true, //seamless connection
                },
                {
                    label: 'Forecasted Max Demand',
                    data: forecastedMaxData,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    borderWidth: 3, //make the red line stand out
                    pointBorderColor: 'red',
                    pointBackgroundColor: 'red',
                    borderDash: [5, 5],
                    tension: 0.2,
                    spanGaps: true, //seamless connection
                },
                {
                    label: 'Actual Min Demand',
                    data: actualMinData,
                    borderColor: 'orange',
                    backgroundColor: 'orange',
                    borderWidth: 2,
                    pointBorderColor: (ctx) => {
                        const index = ctx.dataIndex;
                        return index === data.length ? 'orange' : 'orange'; //transition point is orange
                    },
                    pointBackgroundColor: (ctx) => {
                        const index = ctx.dataIndex;
                        return index === data.length ? 'orange' : 'orange'; //transition point is orange
                    },
                    tension: 0.2,
                    spanGaps: true, //seamless connection
                },
                {
                    label: 'Forecasted Min Demand',
                    data: forecastedMinData,
                    borderColor: 'orange',
                    backgroundColor: 'orange',
                    borderWidth: 3, //make the orange line stand out
                    pointBorderColor: 'orange',
                    pointBackgroundColor: 'orange',
                    borderDash: [5, 5],
                    tension: 0.2,
                    spanGaps: true, //seamless connection
                },
            ],
        };
    };
    
    
    // const chartOptions = {
    //     responsive: true,
    //     plugins: {
    //         legend: {position: 'top'},
    //         title: {
    //             display: true,
    //             text: 'Forecasted vs Actual Demands',
    //         },
    //         zoom: {
    //             pan: {enabled: true, mode: 'x'},
    //             zoom: {
    //                 wheel: {enabled: false},
    //                 pinch: {enabled: true},
    //                 mode: 'x',
    //             },
    //         },
    //     },
    // };
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: window.innerWidth < 600 ? 10 : 14, //smaller font on mobile
                    },
                },
            },
            title: {
                display: true,
                text: 'Forecasted vs Actual Demands',
            },
            zoom: {
                pan: {enabled: true, mode: 'x'},
                zoom: {
                    wheel: {enabled: false},
                    pinch: {enabled: true},
                    mode: 'x',
                    limits: {
                        x: {min: 'original', max: 'original'},
                    },
                },
            },
        },
        scales: {
            x: {
                min: (active === 'Daily' && dailyDemandData.length > 5) ? dailyDemandData.length - 5 
                    : (active === 'Weekly' && weeklyDemandData.length > 5) ? weeklyDemandData.length - 5 
                    : (active === 'Monthly' && monthlyDemandData.length > 5) ? monthlyDemandData.length - 5 
                    : 0,
                max: (active === 'Daily') ? dailyDemandData.length + 3
                    : (active === 'Weekly') ? weeklyDemandData.length + 3
                    : (active === 'Monthly') ? monthlyDemandData.length + 3
                    : 0,
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10, // fewer labels for better readability
                },
            },
        },
    };

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: 'auto' }}>
        <div style={{ position: 'relative', height: '65vh', minHeight: '300px' }}>
            <Line
                ref={chartRef}
                data={
                    active === 'Daily'
                    ? prepareChartData(dailyDemandData, nextDailyDemandData, 'Day')
                    : active === 'Weekly'
                    ? prepareChartData(weeklyDemandData, nextWeeklyDemandData, 'Week')
                    : prepareChartData(monthlyDemandData, nextMonthlyDemandData, 'Month')
                }
                options={chartOptions}
            />
        </div>
        <ZoomControl
            panChart={panChart}
            leftPanControl={leftPanControl}
            rightPanControl={rightPanControl}
            handleZoomIn={handleZoomIn}
            handleZoomOut={handleZoomOut}
            handleResetZoom={handleResetZoom}
            chartRef={chartRef}
            zoomControls={zoomControls}
        />
    </div>
  )
}

export default LineChartForecastedDemand


