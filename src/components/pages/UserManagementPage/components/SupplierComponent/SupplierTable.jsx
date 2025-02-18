import React, { useState, useEffect } from 'react'
import Button from '../../../../atoms/Button/Button';
import IntervalSelector from '../../../../molecules/IntervalSelector/IntervalSelector';
import { formatDate2 } from '../../../../../utils/dateUtils';
import { formatNumber2 } from '../../../../../utils/numberUtils';

function SupplierTable({data, legend, interval, onIntervalChange, selectedSupply}) {
    const daysPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const updatedTotalPages = Math.ceil(data.labels.length / daysPerPage);
        setTotalPages(updatedTotalPages);
        setCurrentPage(updatedTotalPages); //always default to the last page
    }, [data]);

    const startIndex = (currentPage - 1) * daysPerPage;
    const endIndex = startIndex + daysPerPage;

    const currentLabels = data.labels.slice(startIndex, endIndex);
    const filteredDatasets = selectedSupply
        ? data.datasets.filter((dataset) => dataset.label === selectedSupply)
        : data.datasets;

    const currentDatasets = filteredDatasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.slice(startIndex, endIndex),
        total: dataset.data.slice(startIndex, endIndex).reduce((sum, value) => sum + value, 0), //calculate the total
    }));

    const startDate = currentLabels[0];
    const endDate = currentLabels[currentLabels.length - 1];
    const formattedStartDate = startDate ? formatDate2(startDate, interval) : '';
    const formattedEndDate = endDate ? formatDate2(endDate, interval) : '';

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    if (!data.labels || !data.labels.length || !data.datasets || !data.datasets.length) {
        return <div>No data available</div>;
    }

  return (
    <div>
        {/* data interval and generate report */}
        <IntervalSelector 
            interval={interval} 
            onIntervalChange={onIntervalChange} 
            data={data} 
            selectedSupply={selectedSupply} 
            currentDatasets={currentDatasets} 
            currentLabels={currentLabels}
            userType='Supplier'
        />
        <br />

        <div style={{ marginBottom: '10px' }}>
            <strong>
                {formattedStartDate} to {formattedEndDate}, 2023
            </strong>
        </div>

        <div>
            <table border='1' style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Category</th>
                        {
                            currentLabels.map((label, index) => (
                                <th key={index}>{formatDate2(label, interval)}</th>
                            ))
                        }
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentDatasets.map((dataset, i) => (
                            <tr key={i}>
                                <td style={{ color: dataset.borderColor }}>{dataset.label}</td>
                                {
                                    dataset.data.map((value, j) => (
                                        <td key={j}>{`${formatNumber2(value)} kg`}</td>
                                    ))
                                }
                                <td style={{ fontWeight: 'bold' }}>{`${formatNumber2(dataset.total)} kg`}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
                Previous
            </Button>
            <span style={{ margin: '0 10px' }}>
                Page {currentPage} of {totalPages}
            </span>
            <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
                Next
            </Button>
        </div>


        {/* legend Section */}
        {/* <div style={{ marginTop: '20px' }}>
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
        </div> */}
    </div>
  )
}

export default SupplierTable
