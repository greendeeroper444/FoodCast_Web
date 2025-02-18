// import React, { useMemo, useState } from 'react';
// import styles from './CollectedTableLayout.module.css';
// import SupplyButtonForm from '../SupplyButtons/SupplyButtonForm';
// import Table from '../../organisms/Table/Table';
// import Button from '../../atoms/Button/Button';
// import { removeYearFromHeaders } from '../../../utils/dateUtils';
// import SearchBar from '../../atoms/SearchBar/SearchBar';
// import debounce from 'lodash.debounce';
// import Spinner from '../../atoms/Spinner/Spinner';

// function CollectedTableLayout({
//     fruitDataCollected, vegetableDataCollected, fruitHeaders, vegetableHeaders,
//     prevFruitPage, nextFruitPage, hasPrevFruitPage, hasNextFruitPage,
//     prevVegetablePage, nextVegetablePage, hasPrevVegetablePage, hasNextVegetablePage,
//     isLoading
// }) {
//     const [activeTable, setActiveTable] = useState('Vegetable Collected');
//     const [searchTerm, setSearchTerm] = useState('');

//     const buttons = [
//         {label: 'Vegetable Collected'},
//         {label: 'Fruit Collected'},
//         {label: 'All Collected'},
//     ];

//     //get full date range (with years) headers for display in the PDF header
//     const fullDateRangeWithYears = activeTable === 'Fruit Collected'
//     ? fruitHeaders || 'No date available'
//     : vegetableHeaders || 'No date available';

//     //extract the first and last dates with years
//     const firstDate = fullDateRangeWithYears[1].replace(',', ''); //get first date with year
//     const lastDate = fullDateRangeWithYears[fullDateRangeWithYears.length - 2].replace(',', ''); //get last date with year

//     //parse years for comparison
//     const firstYear = new Date(firstDate).getFullYear();
//     const lastYear = new Date(lastDate).getFullYear();

//     //format the first and last date without the year for display
//     const firstDateWithoutYear = firstDate.slice(0, -5);
//     const lastDateWithoutYear = lastDate.slice(0, -5);

//     let dateRangeText;
//     if (firstYear === lastYear) {
//         dateRangeText = `${firstDateWithoutYear} to ${lastDateWithoutYear}, ${lastYear}`;
//     } else {
//         dateRangeText = `${firstDateWithoutYear}, ${firstYear} to ${lastDateWithoutYear}, ${lastYear}`;
//     }

//     //for search
//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value.toLowerCase());
//         // setSearchTerm('');
//     };
//     const filterData = (data) => {
//         return data.filter((row) =>
//             row[0]?.toLowerCase().includes(searchTerm) 
//         );
//     };
//     //new
//     const debouncedSearch = useMemo(() => debounce(handleSearchChange, 300), []);


//     // const filteredFruitData = filterData(fruitDataCollected);
//     // const filteredVegetableData = filterData(vegetableDataCollected);
//     const filteredFruitData = useMemo(() => filterData(fruitDataCollected), [fruitDataCollected, searchTerm]);
//     const filteredVegetableData = useMemo(() => filterData(vegetableDataCollected), [vegetableDataCollected, searchTerm]);

  
//     const renderTable = (title, headers, data, prevPage, nextPage, hasNextPage, hasPrevPage) => (
//         <div className={styles.renderTable}>
//             {
//                 isLoading ? (
//                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                         <Spinner />
//                     </div>
//                 ) : (
//                     <div>
//                         <div className={styles.pagination}>
//                             <Button onClick={prevPage} disabled={!hasPrevPage}>Previous</Button>
//                                 <div className={styles.dateRange}>
//                                     <span>{dateRangeText}</span>
//                                 </div>
//                             <Button onClick={nextPage} disabled={!hasNextPage}>Next</Button>
//                         </div>
                        
//                         <Table 
//                             title={title} 
//                             headers={headers} 
//                             rows={data} 
//                         />
                    
//                         <div className={styles.pagination}>
//                             <Button onClick={prevPage} disabled={!hasPrevPage}>Previous</Button>
//                                 <div className={styles.dateRange}>
//                                     <span>{dateRangeText}</span>
//                                 </div>
//                             <Button onClick={nextPage} disabled={!hasNextPage}>Next</Button>
//                         </div>
//                     </div>
//                 )
//             }
            
//         </div>
//     );
    


//   return (
//     <div className={styles.supplyTableTemplate}>
//         <SupplyButtonForm 
//             buttons={buttons} 
//             activeTable={activeTable} 
//             setActiveTable={setActiveTable}
//             filteredFruitData={filteredFruitData}
//             filteredVegetableData={filteredVegetableData}
//             fruitHeaders={fruitHeaders}
//             vegetableHeaders={vegetableHeaders}
//         />

        
//         <br />
//         <br />
//         <div className={styles.searchDaterangeContainer}>
//             <SearchBar onChange={debouncedSearch} />
//         </div>
//         <div className={styles.tableContainer}>
//             {
//                 activeTable === 'Fruit Collected' && renderTable(
//                     'Fruit Collected', 
//                     removeYearFromHeaders(fruitHeaders),
//                     filteredFruitData, 
//                     prevFruitPage, 
//                     nextFruitPage, 
//                     hasPrevFruitPage, 
//                     hasNextFruitPage
//                 )
//             }
//             {
//                 activeTable === 'Vegetable Collected' && renderTable(
//                     'Vegetable Collected', 
//                     removeYearFromHeaders(vegetableHeaders),
//                     filteredVegetableData,
//                     prevVegetablePage, 
//                     nextVegetablePage, 
//                     hasPrevVegetablePage, 
//                     hasNextVegetablePage
//                 )
//             }
//             {
//                 activeTable === 'All Collected' && (
//                 <>
//                     {
//                         renderTable(
//                             'Vegetable Collected', 
//                             removeYearFromHeaders(vegetableHeaders),
//                             filteredVegetableData,
//                             prevVegetablePage, 
//                             nextVegetablePage, 
//                             hasPrevVegetablePage, 
//                             hasNextVegetablePage
//                         )
//                     }
//                     {
//                         renderTable(
//                             'Fruit Collected', 
//                             removeYearFromHeaders(fruitHeaders),
//                             filteredFruitData, 
//                             prevFruitPage, 
//                             nextFruitPage, 
//                             hasPrevFruitPage, 
//                             hasNextFruitPage
//                         )
//                     }
//                 </>
//                 )
//             }
//         </div>
//     </div>
//   )
// }

// export default CollectedTableLayout
import React, { useMemo, useState, useCallback, useEffect } from 'react'
import styles from './CollectedTableLayout.module.css';
import Table from '../../organisms/Table/Table';
import Button from '../../atoms/Button/Button';
import SearchBar from '../../atoms/SearchBar/SearchBar';
import debounce from 'lodash.debounce';
import Spinner from '../../atoms/Spinner/Spinner';
import { removeYearFromHeaders } from '../../../utils/dateUtils';
import useCollectedButtonHandlers from '../../../hooks/useCollectedButtonHandlers';

function CollectedTableLayout({headers, data, isLoading, activeTable}) {
    const [searchTerm, setSearchTerm] = useState('');

    const {downloadReports} = useCollectedButtonHandlers(activeTable, data, headers);

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
            <Button onClick={downloadReports} className={styles.downloadButton}>Download</Button>
        </div>
        <div className={styles.tableContainer}>
            {
                isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <Spinner />
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
