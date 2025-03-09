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
import SelectCustomize from '../../molecules/SelectCustomize/SelectCustomize';

const DAYS_RANGE = 7;

function CollectedPage() {
    const [page, setPage] = useState(1);
    const [activeTable, setActiveTable] = useState('VEGETABLE');
    const [collectedType, setCollectedType] = useState('COLLECTED SUPPLY')

    const {
        collectedItems, 
        collectedItemsDemand,
        hasPreviousPage, 
        currentPage, 
        isLoading
    } = useFetchCollectedSupply(page, activeTable);

    const uniqueDates = getUniqueDates(collectedItems, 'date');

    const pagination = usePagination(uniqueDates.length, DAYS_RANGE, page - 1);

    const headers = [activeTable, ...uniqueDates.slice(pagination.currentPage * DAYS_RANGE, (pagination.currentPage + 1) * DAYS_RANGE), 'Total'];

    const formattedCollectedItems = formatItems(collectedItems, pagination.currentPage, DAYS_RANGE, uniqueDates, 'supplyName', 'quantity', 'date');


    const uniqueDatesDemand = getUniqueDates(collectedItemsDemand, 'date');

    const paginationDemand = usePagination(uniqueDatesDemand.length, DAYS_RANGE, page - 1);

    const headersDemand = [activeTable, ...uniqueDatesDemand.slice(pagination.currentPage * DAYS_RANGE, (pagination.currentPage + 1) * DAYS_RANGE), 'Total'];

    const formattedCollectedItemsDemand = formatItems(
        collectedItemsDemand, 
        pagination.currentPage, 
        DAYS_RANGE, 
        uniqueDatesDemand, 
        'supplyName', 
        'quantity', 
        'date'
    );

  return (
    <div className={styles.collectedPage}>  
        <HeaderForm 
            icon={CollectedIcon} 
            title={`COLLECTED / ${collectedType.includes('COLLECTED SUPPLY') ? 'SUPPLY' : 'DEMAND'}`} 
        />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className={styles.toggleButtons}>
                <button 
                    className={collectedType === 'COLLECTED SUPPLY' ? styles.activeButton : styles.inactiveButton}
                    onClick={() => setCollectedType('COLLECTED SUPPLY')}
                >
                    <img src={CollectedIcon} alt="COLLECTED SUPPLY" className={styles.collectedIcon} />
                    <span>COLLECTED SUPPLY</span>
                </button>
                <button 
                    className={collectedType === 'COLLECTED DEMAND' ? styles.activeButton : styles.inactiveButton}
                    onClick={() => setCollectedType('COLLECTED DEMAND')}
                >
                    <img src={CollectedIcon} alt="COLLECTED DEMAND" className={styles.collectedIcon} />
                    COLLECTED DEMAND
                </button>
            </div>
        </div>

        <br />
        <div className={styles.header}>
            <SelectCustomize
                value={activeTable}
                onChange={setActiveTable}
                options={['VEGETABLE', 'FRUIT']}
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

        <br />
        {
            collectedType === 'COLLECTED SUPPLY' ? (
                <CollectedTableLayout 
                    headers={headers} 
                    data={formattedCollectedItems} 
                    isLoading={isLoading}
                    activeTable={activeTable}
                />
            ) : (
                <CollectedTableLayout 
                    headers={headersDemand} 
                    data={formattedCollectedItemsDemand} 
                    isLoading={isLoading}
                    activeTable={activeTable}
                />
            )
        }

        <br />
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
