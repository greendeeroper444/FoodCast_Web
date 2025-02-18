// import React, { useState } from 'react'
// import styles from './CollectedDemandPage.module.css';
// import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm';
// import CollectedTableLayout from '../../../components/templates/CollectedTableLayout/CollectedTableLayout';
// import usePagination from '../../../hooks/usePagination';
// import { getUniqueDates } from '../../../utils/dateUtils';
// import { formatItems } from '../../../utils/dataProcessing';
// import SupplyIcon from '../../../assets/icons/drop-box-light.svg'
// import useFetchCollectedSupply from '../../../hooks/useFetchCollectedSupply';

// const DAYS_RANGE = 7;

// function CollectedDemandPage() {
//     const [page, setPage] = useState(1);
//     const {
//         collectedFruitsDemand = [], 
//         collectedVegetablesDemand = [], 
//         hasPreviousPage, 
//         currentPage, 
//         isLoading
//     } = useFetchCollectedSupply(page);

//     const uniqueFruitDates = getUniqueDates(collectedFruitsDemand, 'date');
//     const uniqueVegetableDates = getUniqueDates(collectedVegetablesDemand, 'date');

//     const initialFruitPage = Math.floor((uniqueFruitDates.length - 1) / DAYS_RANGE);
//     const initialVegetablePage = Math.floor((uniqueVegetableDates.length - 1) / DAYS_RANGE);

//     const fruitPagination = usePagination(uniqueFruitDates.length, DAYS_RANGE, initialFruitPage);
//     const vegetablePagination = usePagination(uniqueVegetableDates.length, DAYS_RANGE, initialVegetablePage);

//     const fruitHeaders = ['Fruit', ...uniqueFruitDates.slice(fruitPagination.currentPage * DAYS_RANGE, (fruitPagination.currentPage + 1) * DAYS_RANGE), 'Total'];
//     const vegetableHeaders = ['Vegetable', ...uniqueVegetableDates.slice(vegetablePagination.currentPage * DAYS_RANGE, (vegetablePagination.currentPage + 1) * DAYS_RANGE), 'Total'];

//     const formattedCollectedFruitsDemand = formatItems(collectedFruitsDemand, fruitPagination.currentPage, DAYS_RANGE, uniqueFruitDates, 'supplyName', 'quantity', 'date');
//     const formattedCollectedVegetablesDemand = formatItems(collectedVegetablesDemand, vegetablePagination.currentPage, DAYS_RANGE, uniqueVegetableDates, 'supplyName', 'quantity', 'date');

//     const handleNextPage = () => {
//         if (page > 1) {
//             setPage(prevPage => prevPage - 1);
//         }
//     };
    
//     const handlePrevPage = () => {
//         if (hasPreviousPage) {
//             setPage(prevPage => prevPage + 1);
//         }
//     };
    
    
//   return (
//     <div className={styles.collectedDemandPage}>
//         <HeaderForm icon={SupplyIcon} title='COLLECTED DEMAND' />

//         <CollectedTableLayout
//             fruitDataCollected={formattedCollectedFruitsDemand}
//             fruitHeaders={fruitHeaders}
//             vegetableHeaders={vegetableHeaders}
//             vegetableDataCollected={formattedCollectedVegetablesDemand}
//             prevFruitPage={handlePrevPage}
//             nextFruitPage={handleNextPage}
//             hasPrevFruitPage={currentPage > 1}
//             hasNextFruitPage={hasPreviousPage}
//             prevVegetablePage={handlePrevPage}
//             nextVegetablePage={handleNextPage}
//             hasPrevVegetablePage={currentPage > 1}
//             hasNextVegetablePage={hasPreviousPage}
//             isLoading={isLoading}
//         />

//         {/* <CollectedTableLayout
//             fruitDataCollected={formattedCollectedFruitsDemand}
//             fruitHeaders={fruitHeaders}
//             vegetableHeaders={vegetableHeaders}
//             vegetableDataCollected={formattedCollectedVegetablesDemand}
//             prevFruitPage={fruitPagination.prevPage}
//             nextFruitPage={fruitPagination.nextPage}
//             hasPrevFruitPage={fruitPagination.hasPrevPage}
//             hasNextFruitPage={fruitPagination.hasNextPage}
//             prevVegetablePage={vegetablePagination.prevPage}
//             nextVegetablePage={vegetablePagination.nextPage}
//             hasPrevVegetablePage={vegetablePagination.hasPrevPage}
//             hasNextVegetablePage={vegetablePagination.hasNextPage}
//         /> */}
//     </div>
//   )
// }


// export default CollectedDemandPage

import React, { useState } from 'react'
import styles from './CollectedDemandPage.module.css';
import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm';
import CollectedTableLayout from '../../../components/templates/CollectedTableLayout/CollectedTableLayout';
import { getUniqueDates } from '../../../utils/dateUtils';
import { formatItems } from '../../../utils/dataProcessing';
import CollectedIcon from '../../../assets/icons/collected-light.svg';
import useFetchCollectedSupply from '../../../hooks/useFetchCollectedSupply';
import usePagination from '../../../hooks/usePagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 

const DAYS_RANGE = 7;

function CollectedDemandPage() {
    const [page, setPage] = useState(1);
    const [activeTable, setActiveTable] = useState('VEGETABLE');

    const {
        collectedItemsDemand, 
        hasPreviousPage, 
        currentPage, 
        isLoading
    } = useFetchCollectedSupply(page, activeTable);

    const uniqueDates = getUniqueDates(collectedItemsDemand, 'date');

    const pagination = usePagination(uniqueDates.length, DAYS_RANGE, page - 1);

    const headers = [activeTable, ...uniqueDates.slice(pagination.currentPage * DAYS_RANGE, (pagination.currentPage + 1) * DAYS_RANGE), 'Total'];

    const formattedCollectedItemsDemand = formatItems(collectedItemsDemand, pagination.currentPage, DAYS_RANGE, uniqueDates, 'supplyName', 'quantity', 'date');

  return (
    <div className={styles.collectedPage}>  
        <HeaderForm icon={CollectedIcon} title='COLLECTED SUPPLY' />

        <div className={styles.toggleButtons}>
            <button 
                className={activeTable === 'FRUIT' ? styles.activeButton : styles.inactiveButton}
                onClick={() => setActiveTable('FRUIT')}
            >
                FRUIT
            </button>
            <button 
                className={activeTable === 'VEGETABLE' ? styles.activeButton : styles.inactiveButton}
                onClick={() => setActiveTable('VEGETABLE')}
            >
                VEGETABLE
            </button>
        </div>

        <div className={styles.paginationControls}>
            <button 
                className={`${styles.pageButton} ${!hasPreviousPage ? styles.disabled : ''}`} 
                disabled={!hasPreviousPage} onClick={() => setPage(page + 1)}
            >
                <FaChevronLeft /> Previous
            </button>
            
            <button 
                className={`${styles.pageButton} ${page === 1 ? styles.disabled : ''}`} 
                disabled={page === 1} onClick={() => setPage(page - 1)}
            >
                Next <FaChevronRight />
            </button>
        </div>

        <br />
        <CollectedTableLayout 
            headers={headers} 
            data={formattedCollectedItemsDemand} 
            isLoading={isLoading}
            activeTable={activeTable}
        />

        <div className={styles.paginationControls}>
            <button 
                className={`${styles.pageButton} ${!hasPreviousPage ? styles.disabled : ''}`} 
                disabled={!hasPreviousPage} onClick={() => setPage(page + 1)}
            >
                <FaChevronLeft /> Previous
            </button>
            
            <button 
                className={`${styles.pageButton} ${page === 1 ? styles.disabled : ''}`} 
                disabled={page === 1} onClick={() => setPage(page - 1)}
            >
                Next <FaChevronRight />
            </button>
        </div>
    </div>
  )
}

export default CollectedDemandPage
