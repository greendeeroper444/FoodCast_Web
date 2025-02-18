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
                            label: 'Over Supply (Actual)',
                            data: [],
                            borderColor: 'green',
                            backgroundColor: 'green',
                            borderWidth: 2,
                            pointBorderColor: 'green',
                            pointBackgroundColor: 'green',
                            tension: 0.2,
                        },
                        {
                            label: 'Under Supply (Actual)',
                            data: [],
                            borderColor: 'orange',
                            backgroundColor: 'orange',
                            borderWidth: 2,
                            pointBorderColor: 'orange',
                            pointBackgroundColor: 'orange',
                            tension: 0.2,
                        },
                        {
                            label: 'Over Supply (Forecasted)',
                            data: [],
                            borderColor: 'green',
                            backgroundColor: 'green',
                            borderWidth: 2,
                            pointBorderColor: 'green',
                            pointBackgroundColor: 'green',
                            tension: 0.2,
                        },
                        {
                            label: 'Under Supply (Forecasted)',
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
        
                
                actualMaxData.push(item.actual_maxDemand_quantity);
                actualMinData.push(item.actual_minDemand_quantity);
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
                    actualMaxData.push(item.forecasted_maxDemand_quantity); //ensure blue line reaches the orange point
                } else {
                    actualMaxData.push(null); //no actual data beyond the transition point
                }
                if (index === 0) {
                    actualMinData.push(item.forecasted_minDemand_quantity); //ensure blue line reaches the orange point
                } else {
                    actualMinData.push(null); //no actual data beyond the transition point
                }
                
                forecastedMaxData.push(item.forecasted_maxDemand_quantity);
                forecastedMinData.push(item.forecasted_minDemand_quantity);
            });
        
            return {
                labels,
                datasets: [
                    {
                        label: 'Over Supply (Actual)',
                        data: actualMaxData,
                        borderColor: 'green',
                        backgroundColor: 'green',
                        borderWidth: 2,
                        pointBorderColor: (ctx) => {
                            const index = ctx.dataIndex;
                            return index === data.length ? 'green' : 'green'; //transition point is green
                        },
                        pointBackgroundColor: (ctx) => {
                            const index = ctx.dataIndex;
                            return index === data.length ? 'green' : 'green'; //transition point is green
                        },
                        tension: 0.2,
                        spanGaps: true, //seamless connection
                    },
                    {
                        label: 'Over Supply (Forecasted)',
                        data: forecastedMaxData,
                        borderColor: 'green',
                        backgroundColor: 'green',
                        borderWidth: 3, //make the green line stand out
                        pointBorderColor: 'green',
                        pointBackgroundColor: 'green',
                        borderDash: [5, 5],
                        tension: 0.2,
                        spanGaps: true, //seamless connection
                    },
                    {
                        label: 'Under Supply (Actual)',
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
                        label: 'Under Supply (Forecasted)',
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

    const chartOptions = {
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
                text: 'Forecasted vs Actual Under/Over Supply',
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
        <div style={{ position: 'relative', height: '50vh', minHeight: '300px' }}>
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
    </div>
  )
}

export default LineChartOverUnderSupply