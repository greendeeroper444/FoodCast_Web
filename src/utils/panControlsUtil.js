export const panChartContinuous = (panChart, direction) => {
    let intervalId;

    const startPanning = () => {
        intervalId = setInterval(() => panChart(direction), 100);
    };

    const stopPanning = () => {
        clearInterval(intervalId);
    };

    return {startPanning, stopPanning};
};
