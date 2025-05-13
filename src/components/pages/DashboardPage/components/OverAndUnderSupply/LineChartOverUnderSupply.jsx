// import React, { useRef, useEffect } from 'react'
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
// import zoomPlugin from 'chartjs-plugin-zoom';
// import { formatDate } from '../../../../../utils/dateUtils';
// import { handleResetZoom, handleZoomIn, handleZoomOut, zoomContinuous } from '../../../../../utils/zoomsUtil';
// import { panChartContinuous } from '../../../../../utils/panControlsUtil';
// import ZoomControl from '../../../../molecules/ZoomControl/ZoomControl';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin, Filler);

// function LineChartOverUnderSupply({
//     dailyDemandData = [],
//     weeklyDemandData = [],
//     monthlyDemandData = [],
//     nextDailyDemandData = [],
//     nextWeeklyDemandData = [],
//     nextMonthlyDemandData = [],
//     active
// }) {
//     const chartRef = useRef(null);
//     const zoomControls = zoomContinuous(chartRef);
    
//     //keyboard symbol function
//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             if (event.key === '+') {
//                 handleZoomIn();
//             } else if (event.key === '-') {
//                 handleZoomOut();
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, []);

//     // ------ Pan Chart -------
    
//     const panChart = (direction) => {
//         if (chartRef.current) {
//             const chart = chartRef.current;
//             if (chart?.chartInstance) {
//                 chart.chartInstance.pan({x: direction === 'right' ? -50 : 50});
//             } else if (chart?.pan) {
//                 chart.pan({x: direction === 'right' ? -50 : 50});
//             }
//         }
//     };
//     const leftPanControl = panChartContinuous(panChart, 'left');
//     const rightPanControl = panChartContinuous(panChart, 'right');


//     // ----- PrepareChart Data

//     const prepareChartData = (data, nextForecast, labelType) => {
//             if (!data || data.length === 0 || !nextForecast || nextForecast.length === 0) {
//                 return {
//                     labels: [],
//                     datasets: [
//                         {
//                             label: 'Over Supply (Actual)',
//                             data: [],
//                             borderColor: 'green',
//                             backgroundColor: 'green',
//                             borderWidth: 2,
//                             pointBorderColor: 'green',
//                             pointBackgroundColor: 'green',
//                             tension: 0.2,
//                         },
//                         {
//                             label: 'Under Supply (Actual)',
//                             data: [],
//                             borderColor: 'orange',
//                             backgroundColor: 'orange',
//                             borderWidth: 2,
//                             pointBorderColor: 'orange',
//                             pointBackgroundColor: 'orange',
//                             tension: 0.2,
//                         },
//                         {
//                             label: 'Over Supply (Forecasted)',
//                             data: [],
//                             borderColor: 'green',
//                             backgroundColor: 'green',
//                             borderWidth: 2,
//                             pointBorderColor: 'green',
//                             pointBackgroundColor: 'green',
//                             tension: 0.2,
//                         },
//                         {
//                             label: 'Under Supply (Forecasted)',
//                             data: [],
//                             borderColor: 'teal',
//                             backgroundColor: 'teal',
//                             borderWidth: 2,
//                             pointBorderColor: 'teal',
//                             pointBackgroundColor: 'teal',
//                             tension: 0.2,
//                         },
//                     ],
        
//                 };
//             }
        
//             const labels = [];
//             const actualData = [];
//             const forecastedData = [];
//             const actualMaxData = [];
//             const actualMinData = [];
//             const forecastedMaxData = [];
//             const forecastedMinData = [];
        
//             let weekCounter = 1; //counter for generating week labels
        
//             //add actual data points
//             data.forEach((item) => {
//                 if (labelType === 'Day') {
//                     labels.push(`${formatDate(item.date)}`);
//                 } else if (labelType === 'Week') {
//                     labels.push(`Week ${weekCounter++}`); //use sequential week labels
//                 } else if (labelType === 'Month') {
//                     labels.push(`${item.month || ''}`);
//                 }
        
                
//                 actualMaxData.push(item.actual_maxDemand_quantity);
//                 actualMinData.push(item.actual_minDemand_quantity);
//                 forecastedMaxData.push(null); //no forecasted data for actual points
//                 forecastedMinData.push(null); //no forecasted data for actual points
//             });
        
//             //add all forecasted data points
//             nextForecast.forEach((item, index) => {
//                 if (labelType === 'Week') {
//                     labels.push(`Week ${weekCounter++}`); //continue sequential week labels
//                 } else if (labelType === 'Day') {
//                     labels.push(`${formatDate(item.date)}`);
//                 } else if (labelType === 'Month') {
//                     labels.push(`${item.month || ''}`);
//                 }
        
                
//                 if (index === 0) {
//                     actualMaxData.push(item.forecasted_maxDemand_quantity); //ensure blue line reaches the orange point
//                 } else {
//                     actualMaxData.push(null); //no actual data beyond the transition point
//                 }
//                 if (index === 0) {
//                     actualMinData.push(item.forecasted_minDemand_quantity); //ensure blue line reaches the orange point
//                 } else {
//                     actualMinData.push(null); //no actual data beyond the transition point
//                 }
                
//                 forecastedMaxData.push(item.forecasted_maxDemand_quantity);
//                 forecastedMinData.push(item.forecasted_minDemand_quantity);
//             });
        
//             return {
//                 labels,
//                 datasets: [
//                     {
//                         label: 'Over Supply (Actual)',
//                         data: actualMaxData,
//                         borderColor: 'green',
//                         backgroundColor: 'green',
//                         borderWidth: 2,
//                         pointBorderColor: (ctx) => {
//                             const index = ctx.dataIndex;
//                             return index === data.length ? 'green' : 'green'; //transition point is green
//                         },
//                         pointBackgroundColor: (ctx) => {
//                             const index = ctx.dataIndex;
//                             return index === data.length ? 'green' : 'green'; //transition point is green
//                         },
//                         tension: 0.2,
//                         spanGaps: true, //seamless connection
//                     },
//                     {
//                         label: 'Over Supply (Forecasted)',
//                         data: forecastedMaxData,
//                         borderColor: 'green',
//                         backgroundColor: 'green',
//                         borderWidth: 3, //make the green line stand out
//                         pointBorderColor: 'green',
//                         pointBackgroundColor: 'green',
//                         borderDash: [5, 5],
//                         tension: 0.2,
//                         spanGaps: true, //seamless connection
//                     },
//                     {
//                         label: 'Under Supply (Actual)',
//                         data: actualMinData,
//                         borderColor: 'orange',
//                         backgroundColor: 'orange',
//                         borderWidth: 2,
//                         pointBorderColor: (ctx) => {
//                             const index = ctx.dataIndex;
//                             return index === data.length ? 'orange' : 'orange'; //transition point is orange
//                         },
//                         pointBackgroundColor: (ctx) => {
//                             const index = ctx.dataIndex;
//                             return index === data.length ? 'orange' : 'orange'; //transition point is orange
//                         },
//                         tension: 0.2,
//                         spanGaps: true, //seamless connection
//                     },
//                     {
//                         label: 'Under Supply (Forecasted)',
//                         data: forecastedMinData,
//                         borderColor: 'orange',
//                         backgroundColor: 'orange',
//                         borderWidth: 3, //make the orange line stand out
//                         pointBorderColor: 'orange',
//                         pointBackgroundColor: 'orange',
//                         borderDash: [5, 5],
//                         tension: 0.2,
//                         spanGaps: true, //seamless connection
//                     },
//                 ],
//             };
//         };

//     const chartOptions = {
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 labels: {
//                     font: {
//                         size: window.innerWidth < 600 ? 10 : 14, //smaller font on mobile
//                     },
//                 },
//             },
//             title: {
//                 display: true,
//                 text: 'Forecasted vs Actual Under/Over Supply',
//             },
//             zoom: {
//                 pan: {enabled: true, mode: 'x'},
//                 zoom: {
//                     wheel: {enabled: false},
//                     pinch: {enabled: true},
//                     mode: 'x',
//                     limits: {
//                         x: {min: 'original', max: 'original'},
//                     },
//                 },
//             },
//         },
//         scales: {
//             x: {
//                 min: (active === 'Daily' && dailyDemandData.length > 5) ? dailyDemandData.length - 5 
//                     : (active === 'Weekly' && weeklyDemandData.length > 5) ? weeklyDemandData.length - 5 
//                     : (active === 'Monthly' && monthlyDemandData.length > 5) ? monthlyDemandData.length - 5 
//                     : 0,
//                 max: (active === 'Daily') ? dailyDemandData.length + 3
//                     : (active === 'Weekly') ? weeklyDemandData.length + 3
//                     : (active === 'Monthly') ? monthlyDemandData.length + 3
//                     : 0,
//                 ticks: {
//                     autoSkip: true,
//                     maxTicksLimit: 10, // fewer labels for better readability
//                 },
//             },
//         },
//     };

//   return (
//     <div style={{ width: '100%', maxWidth: '1000px', margin: 'auto' }}>
//         <div style={{ position: 'relative', height: '65vh', minHeight: '300px' }}>
//             <Line
//                 ref={chartRef}
//                 data={
//                     active === 'Daily'
//                     ? prepareChartData(dailyDemandData, nextDailyDemandData, 'Day')
//                     : active === 'Weekly'
//                     ? prepareChartData(weeklyDemandData, nextWeeklyDemandData, 'Week')
//                     : prepareChartData(monthlyDemandData, nextMonthlyDemandData, 'Month')
//                 }
//                 options={chartOptions}
//                 height={300}
//                 width={700}
//             />
//         </div>
        
//         <ZoomControl
//             panChart={panChart}
//             leftPanControl={leftPanControl}
//             rightPanControl={rightPanControl}
//             handleZoomIn={handleZoomIn}
//             handleZoomOut={handleZoomOut}
//             handleResetZoom={handleResetZoom}
//             chartRef={chartRef}
//             zoomControls={zoomControls}
//         />
//     </div>
//   )
// }

// export default LineChartOverUnderSupply

import React, { useRef, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { formatDate } from '../../../../../utils/dateUtils';
import { handleResetZoom, handleZoomIn, handleZoomOut, zoomContinuous } from '../../../../../utils/zoomsUtil';
import { panChartContinuous } from '../../../../../utils/panControlsUtil';
import ZoomControl from '../../../../molecules/ZoomControl/ZoomControl';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin, Filler);

function LineChartOverUnderSupply({
    dailyData = [],
    weeklyData = [],
    monthlyData = [],
    nextDailyData = [],
    nextWeeklyData = [],
    nextMonthlyData = [],
    active
}) {
    const chartRef = useRef(null);
    const zoomControls = zoomContinuous(chartRef);
    
    // Keyboard zoom function
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

    // Pan Chart functionality
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

    // Helper function to get status label
    const getStatusLabel = (status) => {
        if (!status) return '';
        return `${status.type} (${status.amount.toFixed(2)} kg, ${status.percentage}%)`;
    };

    // Prepare Chart Data
    const prepareChartData = (currentData, nextData, labelType) => {
        if (!currentData || currentData.length === 0) {
            return {
                labels: [],
                datasets: []
            };
        }

        const labels = [];
        const overSupplyActual = [];
        const underSupplyActual = [];
        const balancedSupplyActual = [];
        const overSupplyForecast = [];
        const underSupplyForecast = [];
        const balancedSupplyForecast = [];
        
        let weekCounter = 1;

        // Process current data
        currentData.forEach((item) => {
            if (labelType === 'Day') {
                labels.push(formatDate(item.date));
            } else if (labelType === 'Week') {
                labels.push(`Week ${weekCounter++}`);
            } else if (labelType === 'Month') {
                labels.push(item.date);
            }

            // Process actual status
            if (item.total_status) {
                if (item.total_status.type === 'OVER') {
                    overSupplyActual.push(item.total_status.amount);
                    underSupplyActual.push(null);
                    balancedSupplyActual.push(null);
                } else if (item.total_status.type === 'UNDER') {
                    overSupplyActual.push(null);
                    underSupplyActual.push(item.total_status.amount);
                    balancedSupplyActual.push(null);
                } else {
                    overSupplyActual.push(null);
                    underSupplyActual.push(null);
                    balancedSupplyActual.push(0);
                }
            } else {
                overSupplyActual.push(null);
                underSupplyActual.push(null);
                balancedSupplyActual.push(null);
            }

            // No forecasted data for past points
            overSupplyForecast.push(null);
            underSupplyForecast.push(null);
            balancedSupplyForecast.push(null);
        });

        // Process future data
        if (nextData && nextData.length > 0) {
            nextData.forEach((item, index) => {
                if (labelType === 'Day') {
                    labels.push(formatDate(item.date));
                } else if (labelType === 'Week') {
                    labels.push(`Week ${weekCounter++}`);
                } else if (labelType === 'Month') {
                    labels.push(item.date);
                }

                // No actual data for future points
                overSupplyActual.push(null);
                underSupplyActual.push(null);
                balancedSupplyActual.push(null);

                // Process forecasted status
                if (item.forecasted_status) {
                    if (item.forecasted_status.type === 'OVER') {
                        overSupplyForecast.push(item.forecasted_status.amount);
                        underSupplyForecast.push(null);
                        balancedSupplyForecast.push(null);
                    } else if (item.forecasted_status.type === 'UNDER') {
                        overSupplyForecast.push(null);
                        underSupplyForecast.push(item.forecasted_status.amount);
                        balancedSupplyForecast.push(null);
                    } else {
                        overSupplyForecast.push(null);
                        underSupplyForecast.push(null);
                        balancedSupplyForecast.push(0);
                    }
                } else {
                    overSupplyForecast.push(null);
                    underSupplyForecast.push(null);
                    balancedSupplyForecast.push(null);
                }
            });
        }

        return {
            labels,
            datasets: [
                {
                    label: 'Over Supply (Actual)',
                    data: overSupplyActual,
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 128, 0, 0.2)',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.2,
                    fill: true
                },
                {
                    label: 'Under Supply (Actual)',
                    data: underSupplyActual,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.2,
                    fill: true
                },
                {
                    label: 'Balanced Supply (Actual)',
                    data: balancedSupplyActual,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.2,
                    fill: true
                },
                {
                    label: 'Over Supply (Forecasted)',
                    data: overSupplyForecast,
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 128, 0, 0.1)',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    borderDash: [5, 5],
                    tension: 0.2,
                    fill: true
                },
                {
                    label: 'Under Supply (Forecasted)',
                    data: underSupplyForecast,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    borderDash: [5, 5],
                    tension: 0.2,
                    fill: true
                },
                {
                    label: 'Balanced Supply (Forecasted)',
                    data: balancedSupplyForecast,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    borderDash: [5, 5],
                    tension: 0.2,
                    fill: true
                }
            ]
        };
    };

    const currentData = 
        active === 'Daily' ? dailyData :
        active === 'Weekly' ? weeklyData :
        monthlyData;

    const nextData = 
        active === 'Daily' ? nextDailyData :
        active === 'Weekly' ? nextWeeklyData :
        nextMonthlyData;

    const labelType = 
        active === 'Daily' ? 'Day' :
        active === 'Weekly' ? 'Week' :
        'Month';

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: window.innerWidth < 600 ? 10 : 14,
                    },
                },
                position: 'top',
            },
            title: {
                display: true,
                text: 'Supply vs. Demand Balance Analysis',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y;
                        if (value !== null && !isNaN(value)) {
                            return `${label}: ${value.toFixed(2)} kg`;
                        }
                        return label;
                    }
                }
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
                min: currentData.length > 5 ? currentData.length - 5 : 0,
                max: currentData.length + (nextData ? Math.min(nextData.length, 3) : 0),
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Difference (kg)',
                    font: {
                        weight: 'bold'
                    }
                },
                ticks: {
                    callback: function(value) {
                        return value.toFixed(0) + ' kg';
                    }
                },
                beginAtZero: true
            }
        },
    };

    return (
        <div style={{ width: '100%', maxWidth: '1000px', margin: 'auto' }}>
            <div style={{ position: 'relative', height: '65vh', minHeight: '300px' }}>
                <Line
                    ref={chartRef}
                    data={prepareChartData(currentData, nextData, labelType)}
                    options={chartOptions}
                    height={300}
                    width={700}
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

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', marginRight: '20px' }}>
                    <span style={{ color: 'green', fontWeight: 'bold' }}>◼ Over Supply</span>: Supply exceeds demand
                </div>
                <div style={{ display: 'inline-block', marginRight: '20px' }}>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>◼ Under Supply</span>: Demand exceeds supply
                </div>
                <div style={{ display: 'inline-block' }}>
                    <span style={{ color: 'blue', fontWeight: 'bold' }}>◼ Balanced</span>: Supply meets demand
                </div>
            </div>
        </div>
    );
}

export default LineChartOverUnderSupply