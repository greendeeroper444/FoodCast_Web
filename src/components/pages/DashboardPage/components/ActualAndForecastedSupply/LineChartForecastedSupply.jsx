import React, { useRef, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { formatDate } from '../../../../../utils/dateUtils';
import { handleResetZoom, handleZoomIn, handleZoomOut, zoomContinuous } from '../../../../../utils/zoomsUtil';
import { panChartContinuous } from '../../../../../utils/panControlsUtil';
import ZoomControl from '../../../../molecules/ZoomControl/ZoomControl';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin, Filler);

function LineChartForecastedSupply({
    dailyData,
    weeklyData,
    monthlyData,
    nextDailyFutureData,
    nextWeeklyFutureData,
    nextMonthlyFutureData,
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
                        label: 'Actual Supply',
                        data: [],
                        borderColor: 'blue',
                        backgroundColor: 'blue',
                        borderWidth: 2,
                        tension: 0.2,
                    },
                    {
                        label: 'Forecasted Supply',
                        data: [],
                        borderColor: 'red',
                        backgroundColor: 'red',
                        borderWidth: 2,
                        tension: 0.2,
                    },
                ],
            };
        }
    
        const labels = [];
        const actualData = [];
        const forecastedData = [];
    
        //counter for week numbering
        let weekCounter = 1;
    
        //add actual data points
        data.forEach((item) => {
            if (labelType === 'Week') {
                labels.push(`Week ${weekCounter++}`); //sequential weekly labels
            } else if (labelType === 'Day') {
                labels.push(formatDate(item.date)); //format for daily data
            } else if (labelType === 'Month') {
                labels.push(item.date); //monthly labels
            }
            actualData.push(item.actual_quantity); //populate actual data
            forecastedData.push(null); //leave forecasted data empty for actual points
        });
    
        //add forecasted data points
        nextForecast.forEach((item, index) => {
            if (labelType === 'Week') {
                labels.push(`Week ${weekCounter++}`); //continue sequential weekly labels
            } else if (labelType === 'Day') {
                labels.push(formatDate(item.date)); //format for daily forecast
            } else if (labelType === 'Month') {
                labels.push(item.date); //monthly labels
            }
    
            if (index === 0) {
                actualData.push(item.forecasted_quantity); //connect the blue line to the red line
            } else {
                actualData.push(null); //stop the blue line after the transition point
            }
            forecastedData.push(item.forecasted_quantity); //populate forecasted data
        });
    
        return {
            labels,
            datasets: [
                {
                    label: 'Actual Supply',
                    data: actualData,
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    borderWidth: 2,
                    pointBorderColor: (ctx) => {
                        const index = ctx.dataIndex;
                        return index === data.length ? 'red' : 'blue'; //transition point is red
                    },
                    pointBackgroundColor: (ctx) => {
                        const index = ctx.dataIndex;
                        return index === data.length ? 'red' : 'blue'; //transition point is red
                    },
                    tension: 0.2,
                    spanGaps: true, //seamless connection
                },
                {
                    label: 'Forecasted Supply',
                    data: forecastedData,
                    borderColor: 'red',
                    backgroundColor: 'red',
                    borderWidth: 3, //make the red line stand out
                    pointBorderColor: 'red',
                    pointBackgroundColor: 'red',
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
    //             text: 'Forecasted vs Actual Supplies',
    //         },
    //         zoom: {
    //             pan: {enabled: true, mode: 'x'},
    //             zoom: {
    //                 // wheel: {enabled: true},
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
                text: 'Forecasted vs Actual Supplies',
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
                min: (active === 'Daily' && dailyData.length > 5) ? dailyData.length - 5 
                    : (active === 'Weekly' && weeklyData.length > 5) ? weeklyData.length - 5 
                    : (active === 'Monthly' && monthlyData.length > 5) ? monthlyData.length - 5 
                    : 0,
                max: (active === 'Daily') ? dailyData.length + 3
                    : (active === 'Weekly') ? weeklyData.length + 3
                    : (active === 'Monthly') ? monthlyData.length + 3
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
                    ? prepareChartData(dailyData, nextDailyFutureData, 'Day')
                    : active === 'Weekly'
                    ? prepareChartData(weeklyData, nextWeeklyFutureData, 'Week')
                    : prepareChartData(monthlyData, nextMonthlyFutureData, 'Month')
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

export default LineChartForecastedSupply
