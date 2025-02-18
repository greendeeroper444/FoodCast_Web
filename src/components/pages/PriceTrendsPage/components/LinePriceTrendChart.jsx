import React, { useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2';
import { formatDate } from '../../../../utils/dateUtils';
import styles from '../PriceTrendsPage.module.css';
import ZoomControl from '../../../molecules/ZoomControl/ZoomControl';
import { handleZoomIn, handleZoomOut, zoomContinuous, handleResetZoom } from '../../../../utils/zoomsUtil';
import { panChartContinuous } from '../../../../utils/panControlsUtil';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin, Filler);


function LinePriceTrendChart({priceTrendData, selectedSupply, year, month}) {
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

    const createGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(255, 136, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 136, 0, 0.1)');
        return gradient;
    };

    const validPriceTrendData = priceTrendData
    .filter((item) => item.price >= 0)
    .filter((item) => {
        const itemDate = new Date(item.date);
        const isYearMatch = itemDate.getFullYear() === Number(year);
        const isMonthMatch = month ? itemDate.getMonth() + 1 === Number(month) : true;
        return isYearMatch && isMonthMatch;
    });

    const chartData = {
        labels: validPriceTrendData.map((item) => formatDate(item.date)),
        datasets: [
            {
                label: 'Price Trend',
                data: validPriceTrendData.map((item) => item.price),
                borderColor: '#FF8800',
                borderWidth: 2,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7,
                stepped: false,
                backgroundColor: (context) => {
                    const {ctx, chartArea} = context.chart;
                    if (!chartArea) return null;
                    return createGradient(ctx, chartArea);
                },
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {display: true},
            zoom: {
                zoom: {
                    wheel: {enabled: false}, 
                    pinch: {enabled: true}, 
                    mode: 'x' 
                },
                pan: {enabled: true, mode: 'x'},
            },
        },
        scales: {
            x: {
                min: validPriceTrendData.length > 5 ? validPriceTrendData.length - 5 : 0,
                max: validPriceTrendData.length > 3 ? validPriceTrendData.length + 3 : 3,
                grid: {display: false},
                ticks: {
                    color: '#333', 
                    font: {size: 10}, 
                    maxRotation: 45, 
                    autoSkip: true, 
                    maxTicksLimit: 10 
                },
            },
            y: {
                grid: { 
                    drawBorder: false, 
                    color: '#f0f0f0' 
                },
                ticks: { 
                    color: '#333', 
                    font: {size: 10}
                },
                min: 0,
            },
        },
    };

  return (
   <div>
        <h4>
            Price Trends for{' '}
            <span className={styles.selectedSupply}>{selectedSupply || 'All Supplies'}</span>
        </h4>

        <Line 
            ref={chartRef}
            data={chartData} 
            options={chartOptions} 
        />

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

export default LinePriceTrendChart