import React from 'react'
import { Line } from 'react-chartjs-2';
import { handleResetZoom, handleZoomIn, handleZoomOut, zoomContinuous } from '../../../../../utils/zoomsUtil';
import { useRef } from 'react';
import { useEffect } from 'react';
import ZoomControl from '../../../../molecules/ZoomControl/ZoomControl';
import { panChartContinuous } from '../../../../../utils/panControlsUtil';
import Button from '../../../../atoms/Button/Button';
import IntervalSelector from '../../../../molecules/IntervalSelector/IntervalSelector';

function SupplierLineChart({data, legend, interval, onIntervalChange}) {
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


    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
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
    };

  return (
    <div style={{ textAlign: 'center' }}>

        {/* data interval and generate report */}
        <IntervalSelector interval={interval} onIntervalChange={onIntervalChange} />
        <br />


        {/* chart section */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
                <Line 
                    ref={chartRef} 
                    data={data} 
                    options={chartOptions} 
                    width={600} 
                    height={300} 
                />
            </div>

            {/* legend section */}
            <div style={{ marginLeft: '20px' }}>
                <h4>Legend:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {
                        legend.map((item, i) => (
                            <li key={i} style={{ color: item.color, marginBottom: '5px' }}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: item.color,
                                        borderRadius: '50%',
                                        marginRight: '5px',
                                    }}
                                ></span>
                                {item.label}
                            </li>
                        ))
                    }
                </ul>
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

export default SupplierLineChart
