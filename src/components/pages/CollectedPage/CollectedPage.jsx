import React, { useState } from 'react'
import styles from './CollectedPage.module.css';
import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm';
import CollectedTableLayout from '../../../components/templates/CollectedTableLayout/CollectedTableLayout';
import { getUniqueDates } from '../../../utils/dateUtils';
import { formatItems } from '../../../utils/dataProcessing';
import CollectedIcon from '../../../assets/icons/collected-light.svg';
import useFetchCollectedSupply from '../../../hooks/useFetchCollectedSupply';
import usePagination from '../../../hooks/usePagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 

const DAYS_RANGE = 7;

function CollectedPage() {
    const [page, setPage] = useState(1);
    const [activeTable, setActiveTable] = useState('VEGETABLE');

    const {
        collectedItems, 
        hasPreviousPage, 
        currentPage, 
        isLoading
    } = useFetchCollectedSupply(page, activeTable);

    const uniqueDates = getUniqueDates(collectedItems, 'date');

    const pagination = usePagination(uniqueDates.length, DAYS_RANGE, page - 1);

    const headers = [activeTable, ...uniqueDates.slice(pagination.currentPage * DAYS_RANGE, (pagination.currentPage + 1) * DAYS_RANGE), 'Total'];

    const formattedCollectedItems = formatItems(collectedItems, pagination.currentPage, DAYS_RANGE, uniqueDates, 'supplyName', 'quantity', 'date');

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
            data={formattedCollectedItems} 
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

export default CollectedPage
