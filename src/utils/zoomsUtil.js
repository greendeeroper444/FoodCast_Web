export const handleZoomIn = (chartRef) => {
    if (chartRef.current) {
        chartRef.current.zoom(1.2);
    }
};

export const handleZoomOut = (chartRef) => {
    if (chartRef.current) {
        chartRef.current.zoom(0.8);
    }
};

export const handleResetZoom = (chartRef) => {
    if (chartRef.current) {
        chartRef.current.resetZoom();
    }
};

export const zoomContinuous = (chartRef) => {
    const zoomIntervalRef = {current: null};

    const startZooming = (zoomFunction) => {
        if (chartRef.current) {
            zoomIntervalRef.current = setInterval(() => {
                zoomFunction(chartRef);
            }, 100); //adjust speed of zooming (lower = faster)
        }
    };

    const stopZooming = () => {
        if (zoomIntervalRef.current) {
            clearInterval(zoomIntervalRef.current);
            zoomIntervalRef.current = null;
        }
    };

    return {startZooming, stopZooming};
};
