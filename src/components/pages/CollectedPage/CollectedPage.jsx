import React, { useState, useMemo } from 'react'
import styles from './CollectedPage.module.css';
import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm';
import CollectedTableLayout from '../../../components/templates/CollectedTableLayout/CollectedTableLayout';
import { getUniqueDates } from '../../../utils/dateUtils';
import { formatItems } from '../../../utils/dataProcessing';
import CollectedIcon from '../../../assets/icons/collected-light.svg';
import DropboxIcon from '../../../assets/icons/drop-box-light.svg';
import DemandIcon from '../../../assets/icons/demand-light.svg';
import useFetchCollectedSupply from '../../../hooks/useFetchCollectedSupply';
import usePagination from '../../../hooks/usePagination';
import { FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa'; 
import SelectCustomize from '../../molecules/SelectCustomize/SelectCustomize';
import downloadExcel from '../../../templates/downloadExcel';
import Button from '../../atoms/Button/Button';

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
    
    //ensure we have arrays to work with in all cases
    const processedItems = useMemo(() => {
        if (activeTable === 'BOTH') {
            return {
                vegetableItems: collectedItems?.vegetableItems || [],
                fruitItems: collectedItems?.fruitItems || [],
                vegetableItemsDemand: collectedItemsDemand?.vegetableItemsDemand || [],
                fruitItemsDemand: collectedItemsDemand?.fruitItemsDemand || []
            };
        } else {
            return {
                singleTypeItems: Array.isArray(collectedItems) ? collectedItems : [],
                singleTypeDemandItems: Array.isArray(collectedItemsDemand) ? collectedItemsDemand : []
            };
        }
    }, [activeTable, collectedItems, collectedItemsDemand]);
    
    //get unique dates from appropriate arrays
    const vegetableDates = useMemo(() => 
        getUniqueDates(processedItems.vegetableItems || [], 'date'), 
        [processedItems.vegetableItems]
    );
    
    const fruitDates = useMemo(() => 
        getUniqueDates(processedItems.fruitItems || [], 'date'), 
        [processedItems.fruitItems]
    );
    
    const vegetableDemandDates = useMemo(() => 
        getUniqueDates(processedItems.vegetableItemsDemand || [], 'date'), 
        [processedItems.vegetableItemsDemand]
    );
    
    const fruitDemandDates = useMemo(() => 
        getUniqueDates(processedItems.fruitItemsDemand || [], 'date'), 
        [processedItems.fruitItemsDemand]
    );
    
    const singleTypeDates = useMemo(() => 
        getUniqueDates(processedItems.singleTypeItems || [], 'date'), 
        [processedItems.singleTypeItems]
    );
    
    const singleTypeDemandDates = useMemo(() => 
        getUniqueDates(processedItems.singleTypeDemandItems || [], 'date'), 
        [processedItems.singleTypeDemandItems]
    );
    
    //create pagination hooks at the top level of component
    const vegetablePagination = usePagination(vegetableDates.length, DAYS_RANGE, page - 1);
    const fruitPagination = usePagination(fruitDates.length, DAYS_RANGE, page - 1);
    const vegetableDemandPagination = usePagination(vegetableDemandDates.length, DAYS_RANGE, page - 1);
    const fruitDemandPagination = usePagination(fruitDemandDates.length, DAYS_RANGE, page - 1);
    const singleTypePagination = usePagination(singleTypeDates.length, DAYS_RANGE, page - 1);
    const singleTypeDemandPagination = usePagination(singleTypeDemandDates.length, DAYS_RANGE, page - 1);

    //process data and render tables based on activeTable type
    const renderTableContent = () => {
        if (activeTable === 'BOTH') {
            //handle rendering for both vegetables and fruits
            if (collectedType === 'COLLECTED SUPPLY') {
                //use already created pagination objects
                const vegetableHeaders = ['VEGETABLE', ...vegetableDates.slice(vegetablePagination.currentPage * DAYS_RANGE, (vegetablePagination.currentPage + 1) * DAYS_RANGE), 'Total'];
                const formattedVegetableItems = formatItems(processedItems.vegetableItems, vegetablePagination.currentPage, DAYS_RANGE, vegetableDates, 'supplyName', 'quantity', 'date');
                
                const fruitHeaders = ['FRUIT', ...fruitDates.slice(fruitPagination.currentPage * DAYS_RANGE, (fruitPagination.currentPage + 1) * DAYS_RANGE), 'Total'];
                const formattedFruitItems = formatItems(processedItems.fruitItems, fruitPagination.currentPage, DAYS_RANGE, fruitDates, 'supplyName', 'quantity', 'date');
                
                return (
                    <>
                        <div className={styles.tableSection}>
                            <h3 className={styles.tableTitle}>VEGETABLES</h3>
                            <CollectedTableLayout 
                                headers={vegetableHeaders} 
                                data={formattedVegetableItems} 
                                isLoading={isLoading}
                                activeTable="VEGETABLE"
                            />
                        </div>
                        <div className={styles.tableSection}>
                            <h3 className={styles.tableTitle}>FRUITS</h3>
                            <CollectedTableLayout 
                                headers={fruitHeaders} 
                                data={formattedFruitItems} 
                                isLoading={isLoading}
                                activeTable="FRUIT"
                            />
                        </div>
                    </>
                );
            } else {
                //handle demand data
                const vegetableHeaders = ['VEGETABLE', ...vegetableDemandDates.slice(vegetableDemandPagination.currentPage * DAYS_RANGE, (vegetableDemandPagination.currentPage + 1) * DAYS_RANGE), 'Total'];
                const formattedVegetableItems = formatItems(processedItems.vegetableItemsDemand, vegetableDemandPagination.currentPage, DAYS_RANGE, vegetableDemandDates, 'supplyName', 'quantity', 'date');
                
                const fruitHeaders = ['FRUIT', ...fruitDemandDates.slice(fruitDemandPagination.currentPage * DAYS_RANGE, (fruitDemandPagination.currentPage + 1) * DAYS_RANGE), 'Total'];
                const formattedFruitItems = formatItems(processedItems.fruitItemsDemand, fruitDemandPagination.currentPage, DAYS_RANGE, fruitDemandDates, 'supplyName', 'quantity', 'date');
                
                return (
                    <>
                        <div className={styles.tableSection}>
                            <h3 className={styles.tableTitle}>VEGETABLES DEMAND</h3>
                            <CollectedTableLayout 
                                headers={vegetableHeaders} 
                                data={formattedVegetableItems} 
                                isLoading={isLoading}
                                activeTable="VEGETABLE"
                            />
                        </div>
                        <div className={styles.tableSection}>
                            <h3 className={styles.tableTitle}>FRUITS DEMAND</h3>
                            <CollectedTableLayout 
                                headers={fruitHeaders} 
                                data={formattedFruitItems} 
                                isLoading={isLoading}
                                activeTable="FRUIT"
                            />
                        </div>
                    </>
                );
            }
        } else {
            //original code for single type
            if (collectedType === 'COLLECTED SUPPLY') {
                const headers = [activeTable, ...singleTypeDates.slice(singleTypePagination.currentPage * DAYS_RANGE, (singleTypePagination.currentPage + 1) * DAYS_RANGE), 'Total'];
                const formattedItems = formatItems(processedItems.singleTypeItems, singleTypePagination.currentPage, DAYS_RANGE, singleTypeDates, 'supplyName', 'quantity', 'date');
                
                return (
                    <CollectedTableLayout 
                        headers={headers} 
                        data={formattedItems} 
                        isLoading={isLoading}
                        activeTable={activeTable}
                    />
                );
            } else {
                const headersDemand = [activeTable, ...singleTypeDemandDates.slice(singleTypeDemandPagination.currentPage * DAYS_RANGE, (singleTypeDemandPagination.currentPage + 1) * DAYS_RANGE), 'Total'];
                const formattedItemsDemand = formatItems(processedItems.singleTypeDemandItems, singleTypeDemandPagination.currentPage, DAYS_RANGE, singleTypeDemandDates, 'supplyName', 'quantity', 'date');
                
                return (
                    <CollectedTableLayout 
                        headers={headersDemand} 
                        data={formattedItemsDemand} 
                        isLoading={isLoading}
                        activeTable={activeTable}
                    />
                );
            }
        }
    };

    //function to handle combined download
    const handleCombinedDownload = () => {
        let vegetableData, vegetableHeaders, fruitData, fruitHeaders;
        
        if (collectedType === 'COLLECTED SUPPLY') {
            vegetableHeaders = ['VEGETABLE', ...vegetableDates.slice(vegetablePagination.currentPage * DAYS_RANGE, (vegetablePagination.currentPage + 1) * DAYS_RANGE), 'Total'];
            vegetableData = formatItems(processedItems.vegetableItems, vegetablePagination.currentPage, DAYS_RANGE, vegetableDates, 'supplyName', 'quantity', 'date');
            
            fruitHeaders = ['FRUIT', ...fruitDates.slice(fruitPagination.currentPage * DAYS_RANGE, (fruitPagination.currentPage + 1) * DAYS_RANGE), 'Total'];
            fruitData = formatItems(processedItems.fruitItems, fruitPagination.currentPage, DAYS_RANGE, fruitDates, 'supplyName', 'quantity', 'date');
        } else {
            vegetableHeaders = ['VEGETABLE', ...vegetableDemandDates.slice(vegetableDemandPagination.currentPage * DAYS_RANGE, (vegetableDemandPagination.currentPage + 1) * DAYS_RANGE), 'Total'];
            vegetableData = formatItems(processedItems.vegetableItemsDemand, vegetableDemandPagination.currentPage, DAYS_RANGE, vegetableDemandDates, 'supplyName', 'quantity', 'date');
            
            fruitHeaders = ['FRUIT', ...fruitDemandDates.slice(fruitDemandPagination.currentPage * DAYS_RANGE, (fruitDemandPagination.currentPage + 1) * DAYS_RANGE), 'Total'];
            fruitData = formatItems(processedItems.fruitItemsDemand, fruitDemandPagination.currentPage, DAYS_RANGE, fruitDemandDates, 'supplyName', 'quantity', 'date');
        }
        
        //use downloadExcel utility with combined data
        const {downloadCombinedReports} = downloadExcel('COMBINED', {vegetableData, fruitData}, {vegetableHeaders, fruitHeaders});
        downloadCombinedReports();
    };

    //function to handle single report download
    const handleDownload = () => {
        let headers, data;
        
        if (activeTable === 'BOTH') {
            //if BOTH is selected, download each table separately
            handleCombinedDownload();
            return;
        }
        
        if (collectedType === 'COLLECTED SUPPLY') {
            headers = [activeTable, ...singleTypeDates.slice(singleTypePagination.currentPage * DAYS_RANGE, (singleTypePagination.currentPage + 1) * DAYS_RANGE), 'Total'];
            data = formatItems(processedItems.singleTypeItems, singleTypePagination.currentPage, DAYS_RANGE, singleTypeDates, 'supplyName', 'quantity', 'date');
        } else {
            headers = [activeTable, ...singleTypeDemandDates.slice(singleTypeDemandPagination.currentPage * DAYS_RANGE, (singleTypeDemandPagination.currentPage + 1) * DAYS_RANGE), 'Total'];
            data = formatItems(processedItems.singleTypeDemandItems, singleTypeDemandPagination.currentPage, DAYS_RANGE, singleTypeDemandDates, 'supplyName', 'quantity', 'date');
        }
        
        const { downloadReports } = downloadExcel(activeTable, data, headers);
        downloadReports();
    };

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
                    <img src={DropboxIcon} alt="COLLECTED SUPPLY" className={styles.collectedIcon} />
                    <span>COLLECTED SUPPLY</span>
                </button>
                <button 
                    className={collectedType === 'COLLECTED DEMAND' ? styles.activeButton : styles.inactiveButton}
                    onClick={() => setCollectedType('COLLECTED DEMAND')}
                >
                    <img src={DemandIcon} alt="COLLECTED DEMAND" className={styles.collectedIcon} />
                    COLLECTED DEMAND
                </button>
            </div>
        </div>

        <br />
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <SelectCustomize
                    value={activeTable}
                    onChange={setActiveTable}
                    options={['VEGETABLE', 'FRUIT', 'BOTH']}
                />
                <Button
                    className={styles.downloadButton}
                    onClick={handleDownload}
                >
                    <div><FaDownload /></div>
                    <div>Download Report</div>
                </Button>
            </div>
            <div className={styles.headerRight}>
                {/* {activeTable === 'BOTH' && (
                    <button 
                        className={styles.downloadButton}
                        onClick={handleCombinedDownload}
                    >
                        <FaDownload /> Download Combined
                    </button>
                )} */}
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
        </div>

        <br />
        {renderTableContent()}

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