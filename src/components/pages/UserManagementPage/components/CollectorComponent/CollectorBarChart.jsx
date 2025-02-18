import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { handleResetZoom, handleZoomIn, handleZoomOut, zoomContinuous } from '../../../../../utils/zoomsUtil';
import { useRef } from 'react';
import { useEffect } from 'react';
import { panChartContinuous } from '../../../../../utils/panControlsUtil';
import ZoomControl from '../../../../molecules/ZoomControl/ZoomControl';
import Button from '../../../../atoms/Button/Button';
import IntervalSelector from '../../../../molecules/IntervalSelector/IntervalSelector';

//register chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

function CollectorBarChart({data, selectedSupply, interval, onIntervalChange}) {
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

    //filter chart data based on selected supply
    const filteredChartData = {
        ...data,
        datasets: selectedSupply
            ? data?.datasets.filter(dataset => dataset.label === selectedSupply)
            : data?.datasets,
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 12,
                },
            },
            y: {
                beginAtZero: true,
                title: {display: true, text: 'Volume (kg)'},
            },
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: false,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x',
                },
            },
        },    
    }

  return (
    <div style={{ textAlign: 'center' }}>

        {/* data interval and generate report */}
        <IntervalSelector interval={interval} onIntervalChange={onIntervalChange} />
        <br />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
                <Bar
                    ref={chartRef}
                    data={filteredChartData}
                    options={chartOptions}
                    width={600}
                    height={300}
                />
            </div>
            
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

export default CollectorBarChart
