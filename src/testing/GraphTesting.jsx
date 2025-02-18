import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
} from 'chart.js';

// Register necessary chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

function GraphTesting() {
  // Sample data for mAP and mAP@50:95
  const epochs = Array.from({ length: 250 }, (_, i) => i); // 0 to 249
  const mAP = [0.90, 0.95, 0.92, 0.98, 0.97, 0.99, 1.00, 0.99, 0.98, 0.97, 0.96, 0.95, 0.96, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 0.97, 0.96, 0.95, 0.94, 0.93, 0.92, 0.91, 0.90, 0.91, 0.93, 0.95, 0.96, 0.98, 0.99, 1.00, 0.99, 0.98, 0.97, 0.96, 0.95, 0.94, 0.96, 0.97, 0.98, 0.99, 0.95, 0.93, 0.92, 0.91, 0.90, 0.89, 0.88, 0.87, 0.86, 0.85, 0.84, 0.83, 0.82, 0.81, 0.80, 0.79, 0.78, 0.77, 0.76, 0.75, 0.74, 0.73, 0.72, 0.71, 0.70, 0.69, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.62, 0.61, 0.60, 0.59, 0.58, 0.57, 0.56, 0.55, 0.54, 0.53, 0.52, 0.51, 0.50, 0.49, 0.48, 0.47, 0.46, 0.45, 0.44, 0.43, 0.42, 0.41, 0.40, 0.39, 0.38, 0.37, 0.36, 0.35, 0.34, 0.33, 0.32, 0.31, 0.30, 0.29, 0.28, 0.27, 0.26, 0.25, 0.24, 0.23, 0.22, 0.21, 0.20, 0.19, 0.18, 0.17, 0.16, 0.15, 0.14, 0.13, 0.12, 0.11, 0.10, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01]; // Mock data for mAP
  const mAP50_95 = [0.85, 0.86, 0.87, 0.90, 0.92, 0.91, 0.95, 0.96, 0.94, 0.93, 0.92, 0.91, 0.90, 0.89, 0.88, 0.87, 0.86, 0.88, 0.89, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.97, 0.96, 0.95, 0.93, 0.91, 0.92, 0.94, 0.95, 0.96, 0.97, 0.99, 0.98, 0.97, 0.96, 0.95, 0.94, 0.93, 0.92, 0.91, 0.90, 0.89, 0.88, 0.87, 0.86, 0.85, 0.84, 0.83, 0.82, 0.81, 0.80, 0.79, 0.78, 0.77, 0.76, 0.75, 0.74, 0.73, 0.72, 0.71, 0.70, 0.69, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.62, 0.61, 0.60, 0.59, 0.58, 0.57, 0.56, 0.55, 0.54, 0.53, 0.52, 0.51, 0.50, 0.49, 0.48, 0.47, 0.46, 0.45, 0.44, 0.43, 0.42, 0.41, 0.40, 0.39, 0.38, 0.37, 0.36, 0.35, 0.34, 0.33, 0.32, 0.31, 0.30, 0.29, 0.28, 0.27, 0.26, 0.25, 0.24, 0.23, 0.22, 0.21, 0.20, 0.19, 0.18, 0.17, 0.16, 0.15, 0.14, 0.13, 0.12, 0.11, 0.10, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01]; // Mock data for mAP@50:95

  const data = {
    labels: epochs,
    datasets: [
      {
        label: 'mAP',
        data: mAP,
        borderColor: '#6A1B9A', // Dark purple line
        backgroundColor: 'rgba(106, 27, 154, 0.2)', // Light purple fill
        borderWidth: 3,
        fill: true, // Fill area under the line
        tension: 0.4, // Smoother curves
      },
      {
        label: 'mAP@50:95',
        data: mAP50_95,
        borderColor: 'rgba(186, 104, 200, 1)', // Lighter purple line
        backgroundColor: 'rgba(186, 104, 200, 0.2)', // Light purple fill
        borderWidth: 3,
        fill: true, // Fill area under the line
        tension: 0.4, // Smoother curves
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 15, // Width of the legend box
          padding: 10,
          font: {
            size: 14,
            color: '#000',
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false, // Hide grid lines
        },
      },
      y: {
        display: true,
        min: 0,
        max: 1,
        grid: {
          color: '#e0e0e0', // Light gray grid color
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3, // Line width
      },
      point: {
        radius: 0, // Hide points
      },
    },
  };

  return (
    <div style={{ height: '250px', width: '570px', position: 'relative' }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default GraphTesting;
