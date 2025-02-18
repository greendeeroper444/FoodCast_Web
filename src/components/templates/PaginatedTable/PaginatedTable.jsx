import React, { useState, useEffect } from 'react'
import styles from './PaginatedTable.module.css';

function usePagination(totalItems, itemsPerPage, initialPage = 0) {
    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        //reset currentPage if totalItems changes
        setCurrentPage(Math.floor((totalItems - 1) / itemsPerPage));
    }, [totalItems, itemsPerPage]);

    const nextPage = () => {
        if ((currentPage + 1) * itemsPerPage < totalItems) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const hasNextPage = (currentPage + 1) * itemsPerPage < totalItems;
    const hasPrevPage = currentPage > 0;

    return {currentPage, nextPage, prevPage, hasNextPage, hasPrevPage};
}

function PaginatedTable({chartData, legend, selectedSupply}) {
    const itemsPerPage = 7;

    //ensure that the labels are sorted in ascending order of date (earliest first)
    const sortedLabels = [...chartData.labels]
        .map(label => ({ label, date: new Date(label) })) 
        .sort((a, b) => a.date - b.date)
        .map(item => item.label);

    //total number of labels
    const totalLabels = sortedLabels.length;

    //use pagination hook
    const { currentPage, nextPage, prevPage, hasNextPage, hasPrevPage } = usePagination(
        totalLabels,
        itemsPerPage
    );

    //get labels for the current page
    const currentLabels = sortedLabels.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    //get the current date to highlight and prioritize it (if it exists in the data)
    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });

  return (
    <div>
        <table className={styles.dataTable}>
            <thead>
                <tr>
                    <th>Supply</th>
                    {
                        currentLabels.map((label, i) => (
                            <th key={i} style={{ fontWeight: label === currentDate ? 'bold' : 'normal' }}>
                                
                                {
                                    new Date(label).toLocaleDateString('en-US', { 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })
                                }
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    legend
                    .filter((item) => !selectedSupply || selectedSupply === item.label)
                    .map((item, i) => (
                        <tr key={i}>
                            <td>{item.label}</td>
                            {
                                currentLabels.map((label, j) => (
                                    <td key={j}>
                                        {
                                            chartData.datasets
                                            .find((dataset) => dataset.label === item.label)
                                            ?.data[chartData.labels.indexOf(label)] || 0
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }

            </tbody>
        </table>

        <div className={styles.pagination}>
            <button
                onClick={prevPage}
                disabled={!hasPrevPage}
                className={styles.pageButton}
            >
                Previous
            </button>
            <span className={styles.pageInfo}>
                Page {currentPage + 1}
            </span>
            <button
                onClick={nextPage}
                disabled={!hasNextPage}
                className={styles.pageButton}
            >
                Next
            </button>
        </div>
    </div>
  )
}

export default PaginatedTable
