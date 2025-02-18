import React from 'react'
import styles from './ZoomControl.module.css';
import Button from '../../atoms/Button/Button';
import resetIcon from '../../../assets/icons/reset.svg';
import zoomOutIcon from '../../../assets/icons/zoom-out.svg';
import zoomInIcon from '../../../assets/icons/zoom-in.svg';
import rightAngleIcon from '../../../assets/icons/right-angle-light.svg'
import leftAngleIcon from '../../../assets/icons/left-angle-light.svg'

function ZoomControl({
    panChart, 
    leftPanControl, 
    rightPanControl, 
    handleZoomIn, 
    handleZoomOut, 
    handleResetZoom, 
    chartRef, 
    zoomControls
}) {
  return (
    <div className={styles.controlsContainer}>
        <div className={styles.tooltip} data-tooltip='Press and hold to pan left faster.'>
            <Button
                className={styles.controlButton}
                onMouseDown={() => {
                    panChart('left');
                    leftPanControl.startPanning();
                }}
                onMouseUp={leftPanControl.stopPanning}
                onMouseLeave={leftPanControl.stopPanning}
            >
                <img src={leftAngleIcon} alt="Left Angle Icon" /> <span className={styles.buttonText}>Left</span>
            </Button>
        </div>

        <div className={styles.tooltip} data-tooltip='Press and hold to pan right faster.'>
            <Button
                className={styles.controlButton}
                onMouseDown={() => {
                    panChart('right');
                    rightPanControl.startPanning();
                }}
                onMouseUp={rightPanControl.stopPanning}
                onMouseLeave={rightPanControl.stopPanning}
            >
                <span className={styles.buttonText}>Right</span> <img src={rightAngleIcon} alt="Right Angle Icon" />
            </Button>
        </div>

        <div className={styles.tooltip} data-tooltip='Press and hold to zoom in continuously.'>
            <Button
                className={styles.controlButton}
                onMouseDown={() => {
                    handleZoomIn(chartRef);
                    zoomControls.startZooming(handleZoomIn);
                }}
                onMouseUp={zoomControls.stopZooming}
                onMouseLeave={zoomControls.stopZooming}
            >
                <img src={zoomInIcon} alt="Zoom In Icon" /> <span className={styles.buttonText}>Zoom In</span>
            </Button>
        </div>

        <div className={styles.tooltip} data-tooltip='Press and hold to zoom out continuously.'>
            <Button
                className={styles.controlButton}
                onMouseDown={() => {
                    handleZoomOut(chartRef);
                    zoomControls.startZooming(handleZoomOut);
                }}
                onMouseUp={zoomControls.stopZooming}
                onMouseLeave={zoomControls.stopZooming}
            >
                <img src={zoomOutIcon} alt="Zoom Out Icon" /> <span className={styles.buttonText}>Zoom Out</span>
            </Button>
        </div>

        <div className={styles.tooltip} data-tooltip='Press to reset zoom to default.'>
            <Button className={styles.controlButton} onClick={() => handleResetZoom(chartRef)}>
                <img src={resetIcon} alt="Reset Icon" /> <span className={styles.buttonText}>Reset Zoom</span>
            </Button>
        </div>
    </div>
  )
}

export default ZoomControl