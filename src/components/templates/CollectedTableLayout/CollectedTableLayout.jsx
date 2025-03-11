// export default CollectedTableLayout
import React, { useMemo, useState, useCallback, useEffect } from 'react'
import styles from './CollectedTableLayout.module.css';
import Table from '../../organisms/Table/Table';
import Button from '../../atoms/Button/Button';
import SearchBar from '../../atoms/SearchBar/SearchBar';
import debounce from 'lodash.debounce';
import Spinner from '../../atoms/Spinner/Spinner';
import { removeYearFromHeaders } from '../../../utils/dateUtils';
import downloadExcel from '../../../templates/downloadExcel';

function CollectedTableLayout({headers, data, isLoading, activeTable, downloadButtonText = "Download"}) {
    const [searchTerm, setSearchTerm] = useState('');

    const {downloadReports} = downloadExcel(activeTable, data, headers);

    //helper function to format the date range
    const formatDateRange = () => {
        const fullDateRangeWithYears = headers.filter((header) => /\b[A-Za-z]{3} \d{1,2}, \d{4}\b/.test(header));
        
        if (fullDateRangeWithYears.length === 0) return '';

        const firstDate = fullDateRangeWithYears[0].replace(',', '');
        const lastDate = fullDateRangeWithYears[fullDateRangeWithYears.length - 1].replace(',', '');

        //parse years for comparison
        const firstYear = new Date(firstDate).getFullYear();
        const lastYear = new Date(lastDate).getFullYear();

        //format the first and last date without the year for display
        const firstDateWithoutYear = firstDate.slice(0, -5);
        const lastDateWithoutYear = lastDate.slice(0, -5);

        //determine how to display the date range
        let dateRangeText;
        if (firstYear === lastYear) {
            //same year, display year only once with comma before the year for the second date
            dateRangeText = `from ${firstDateWithoutYear} to ${lastDateWithoutYear}, ${lastYear}`;
        } else {
            //different years, display both years with commas before the years
            dateRangeText = `from ${firstDateWithoutYear}, ${firstYear} to ${lastDateWithoutYear}, ${lastYear}`;
        }
        
        return dateRangeText;
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const debouncedSearch = useCallback(debounce(handleSearchChange, 300), []);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const filteredData = useMemo(() => {
        return data.filter((row) => row[0]?.toLowerCase().includes(searchTerm));
    }, [data, searchTerm]);

  return (
    <div className={styles.supplyTableTemplate}>
        <div className={styles.searchDaterangeContainer}>
            <SearchBar onChange={debouncedSearch} />
            <div className={styles.formatDateRange}>{formatDateRange()}</div>
            {/* <Button onClick={downloadReports} className={styles.downloadButton}>
                {downloadButtonText}
            </Button> */}
        </div>
        <div className={styles.tableContainer}>
            {
                isLoading ? (
                    <div className={styles.loadingContainer}>
                        <Spinner />
                        <p>Loading collected data...</p>
                    </div>
                ) : (
                    <Table
                        title='Collected Items'
                        headers={removeYearFromHeaders(headers)}
                        rows={filteredData}
                    />
                )
            }
        </div>
    </div>
  )
}

export default CollectedTableLayout
