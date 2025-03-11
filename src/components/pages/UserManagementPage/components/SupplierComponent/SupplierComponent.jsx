import React, { useState, useEffect } from 'react';
import styles from './SupplierComponent.module.css';
import api from '../../../../../api/api';
import SupplierLineChart from './SupplierLineChart';
import SupplierTable from './SupplierTable';
import SearchBar from '../../../../atoms/SearchBar/SearchBar';
import SelectCustomize from '../../../../molecules/SelectCustomize/SelectCustomize';

function SupplierComponent() {
    const [suppliers, setSuppliers] = useState([]);
    const [activeRow, setActiveRow] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [supplyType, setSupplyType] = useState('VEGETABLE');
    const [legend, setLegend] = useState([]);
    const [interval, setInterval] = useState('daily');
    const [view, setView] = useState('TABLE');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);

    useEffect(() => {
        fetchSuppliers();
    }, [supplyType]);

    // useEffect(() => {
    //     if (activeRow !== null) {
    //         fetchSupplierDetails(suppliers[activeRow].supplierName);
    //     }
    // }, [interval]);
    useEffect(() => {
        if (activeRow !== null) {
            fetchSupplierDetails(filteredSuppliers[activeRow].supplierName);
        }
    }, [interval]);

    useEffect(() => {
        //filter suppliers when the search query changes
        const filtered = suppliers.filter(supplier =>
            supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredSuppliers(filtered);
    }, [searchQuery, suppliers]);

    const fetchSuppliers = async () => {
        try {
            const response = await api.get(`/api/adminSupply/getSupplier?supplyType=${supplyType}`);
            const sortedSuppliers = response.data.sort((a, b) => a.supplierName.localeCompare(b.supplierName));
            setSuppliers(sortedSuppliers);
            setFilteredSuppliers(sortedSuppliers);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const toggleRow = async (index, supplierName) => {
        if (activeRow === index) {
            setActiveRow(null);
            setChartData(null);
            setLegend([]);
        } else {
            setActiveRow(index);
            await fetchSupplierDetails(supplierName);
        }
    };

    // const fetchSupplierDetails = async (supplierName) => {
    //     try {
    //         const response = await api.get(
    //             `/api/adminSupply/getSupplierDetails?supplierName=${supplierName}&interval=${interval}`
    //         );
    //         const supplies = response.data;

    //         const dataByDate = {};
    //         const allSupplyNames = new Set();

    //         supplies.forEach((supply) => {
    //             const dateLabel = new Date(supply.date).toLocaleDateString('default', {
    //                 year: 'numeric',
    //                 month: 'long',
    //                 day: interval === 'monthly' ? undefined : 'numeric',
    //             });

    //             allSupplyNames.add(supply.supplyName);

    //             if (!dataByDate[dateLabel]) {
    //                 dataByDate[dateLabel] = {};
    //             }

    //             if (!dataByDate[dateLabel][supply.supplyName]) {
    //                 dataByDate[dateLabel][supply.supplyName] = 0;
    //             }

    //             dataByDate[dateLabel][supply.supplyName] += supply.quantity;
    //         });

    //         const labels = Object.keys(dataByDate).sort((a, b) => new Date(a) - new Date(b));
    //         const datasets = [];
    //         const newLegend = [];

    //         labels.forEach((dateLabel) => {
    //             allSupplyNames.forEach((supplyName) => {
    //                 if (!dataByDate[dateLabel][supplyName]) {
    //                     dataByDate[dateLabel][supplyName] = 0;
    //                 }
    //             });
    //         });

    //         allSupplyNames.forEach((supplyName) => {
    //             const color = getRandomColor();
    //             datasets.push({
    //                 label: supplyName,
    //                 data: labels.map((label) => dataByDate[label][supplyName] || 0),
    //                 borderColor: color,
    //                 fill: false,
    //             });
    //             newLegend.push({ label: supplyName, color });
    //         });

    //         setChartData({ labels, datasets });
    //         setLegend(newLegend);
    //     } catch (error) {
    //         console.error('Error fetching supplier details:', error);
    //     }
    // };

    const fetchSupplierDetails = async (supplierName) => {
        try {
            const response = await api.get(
                `/api/adminSupply/getSupplierDetails?supplierName=${supplierName}&interval=${interval}`
            );
            const supplies = response.data;
    
            const dataByDate = {};
            const allSupplyNames = new Set();
    
            supplies.forEach((supply) => {
                let dateLabel;
    
                if (interval === 'weekly') {
                    const date = new Date(supply.date);
                    const weekStart = new Date(date);
                    weekStart.setDate(date.getDate() - date.getDay()); //start of the week(sunday)
                    dateLabel = `Week of ${weekStart.toLocaleDateString('default', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}`;
                } else {
                    dateLabel = new Date(supply.date).toLocaleDateString('default', {
                        year: 'numeric',
                        month: 'long',
                        day: interval === 'monthly' ? undefined : 'numeric',
                    });
                }
    
                allSupplyNames.add(supply.supplyName);
    
                if (!dataByDate[dateLabel]) {
                    dataByDate[dateLabel] = {};
                }
    
                if (!dataByDate[dateLabel][supply.supplyName]) {
                    dataByDate[dateLabel][supply.supplyName] = 0;
                }
    
                dataByDate[dateLabel][supply.supplyName] += supply.quantity;
            });
    
            const labels = Object.keys(dataByDate).sort((a, b) => new Date(a) - new Date(b));
            const datasets = [];
            const newLegend = [];
    
            labels.forEach((dateLabel) => {
                allSupplyNames.forEach((supplyName) => {
                    if (!dataByDate[dateLabel][supplyName]) {
                        dataByDate[dateLabel][supplyName] = 0;
                    }
                });
            });
    
            allSupplyNames.forEach((supplyName) => {
                const color = getRandomColor();
                datasets.push({
                    label: supplyName,
                    data: labels.map((label) => dataByDate[label][supplyName] || 0),
                    borderColor: color,
                    fill: false,
                });
                newLegend.push({label: supplyName, color});
            });
    
            setChartData({labels, datasets});
            setLegend(newLegend);
        } catch (error) {
            console.error('Error fetching supplier details:', error);
        }
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleIntervalChange = (newInterval) => {
        setInterval(newInterval);
    };

    return (
        <div className={styles.supplierComponent}>
            <h1 className={styles.title}>Suppliers</h1>
            <div className={styles.filter}>
                <div className={styles.filterLeft}>
                    <SearchBar onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className={styles.filterRight}>
                    <SelectCustomize
                        value={supplyType}
                        onChange={setSupplyType}
                        options={['VEGETABLE', 'FRUIT']}
                    />
                    {' '}
                    <SelectCustomize
                        value={view}
                        onChange={setView}
                        options={['TABLE', 'GRAPH']}
                    />
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Location</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredSuppliers.length > 0 ?(
                            filteredSuppliers.map((supplier, index) => (
                                <React.Fragment key={index}>
                                    <tr
                                        className={`${styles.row} ${activeRow === index ? styles.activeRow : ''}`}
                                        onClick={() => toggleRow(index, supplier.supplierName)}
                                    >
                                        <td>{supplier.supplierName}</td>
                                        <td>
                                            {
                                                supplier.locations.map((location, locIndex) => (
                                                    <div key={locIndex}>
                                                        {location.city}, {location.province}
                                                    </div>
                                                ))
                                            }
                                        </td>
                                        <td className={styles.dropdownIcon}>
                                            {activeRow === index ? '▼' : '◀'}
                                        </td>
                                    </tr>
                                    {
                                        activeRow === index && chartData && (
                                            <tr className={styles.dropdownContent}>
                                                <td colSpan="3">
                                                    {
                                                        view === 'TABLE' ? (
                                                           <SupplierTable
                                                                data={chartData}
                                                                legend={legend}
                                                                interval={interval}
                                                                onIntervalChange={handleIntervalChange}
                                                            />
                                                        ) : (
                                                            <SupplierLineChart
                                                                data={chartData}
                                                                legend={legend}
                                                                interval={interval}
                                                                onIntervalChange={handleIntervalChange}
                                                            />
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                </React.Fragment>
                            ))
                        )  : (
                            <tr>
                                <td colSpan="3" className={styles.noResults}>
                                    No search found
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default SupplierComponent;
