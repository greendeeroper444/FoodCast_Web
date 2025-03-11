import React, { useState, useEffect } from 'react'
import styles from './VendorComponent.module.css';
import api from '../../../../../api/api';
import VendorBarChart from './VendorBarChart';
import VendorTable from './VendorTable';
import SearchBar from '../../../../atoms/SearchBar/SearchBar';
import SelectCustomize from '../../../../molecules/SelectCustomize/SelectCustomize';

function VendorComponent() {
    const [vendors, setVendors] = useState([]);
    const [activeRow, setActiveRow] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [supplyType, setSupplyType] = useState('VEGETABLE');
    const [selectedSupply, setSelectedSupply] = useState('');
    const [legend, setLegend] = useState([]);
    const [interval, setInterval] = useState('daily'); 
    const [view, setView] = useState('TABLE');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredVendors, setFilteredVendors] = useState([]);

    useEffect(() => {
        fetchVendors();
    }, [supplyType]);

    //avoid double click executing
    // useEffect(() => {
    //     if (activeRow !== null) {
    //         fetchVendorDetails(vendors[activeRow]._id);
    //     }
    // }, [interval, selectedSupply, supplyType]);

    useEffect(() => {
        if (activeRow !== null) {
            fetchVendorDetails(filteredVendors[activeRow]._id);
        }
    }, [interval]);

    useEffect(() => {
        //filter vendors when the search query changes
        const filtered = vendors.filter(vendor =>
            vendor.fullName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredVendors(filtered);
    }, [searchQuery, vendors]);

    //display all vendors
    const fetchVendors = async () => {
        try {
            const response = await api.get('/api/adminVendor/getVendor');
            //alphabetical order
            const sortedVendors = response.data.vendors.sort((a, b) => 
            a.fullName.localeCompare(b.fullName));
            setVendors(sortedVendors);
            setFilteredVendors(sortedVendors);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    const toggleRow = async (index, vendorId) => {
        if (activeRow === index) {
            setActiveRow(null);
            setChartData(null);
            setLegend([]);
        } else {
            setActiveRow(index);
            await fetchVendorDetails(vendorId);
        }
    };
    
    // const fetchVendorDetails = async (vendorId) => {
    //     try {
    //         const response = await api.get(
    //             `/api/adminVendor/getVendorDetails?vendorId=${vendorId}&supplyType=${supplyType}`
    //         );
    //         const supplies = response.data.collectedSupplies;
    
    //         const dataByDate = {};
    //         const allSupplyNames = new Set();
    
    //         supplies.forEach((supply) => {
    //             const dateLabel = interval === 'monthly'
    //                 ? new Date(supply.date).toLocaleDateString('default', {year: 'numeric', month: 'long'})
    //                 : new Date(supply.date).toLocaleDateString('default', {year: 'numeric', month: 'long', day: 'numeric'});
    
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
    //             // const color = getRandomColor();
    //             const isActive = selectedSupply && selectedSupply === supplyName;
    //             const color = isActive ? '#0a5228' : getRandomColor();
    //             datasets.push({
    //                 label: supplyName,
    //                 data: labels.map((label) => dataByDate[label][supplyName] || 0),
    //                 backgroundColor: color,
    //             });
    //             newLegend.push({ label: supplyName, color });
    //         });
    
    //         setChartData({ labels, datasets });
    //         setLegend(newLegend);
    //     } catch (error) {
    //         console.error('Error fetching vendor details:', error);
    //     }
    // };
    
    const fetchVendorDetails = async (vendorId) => {
        try {
            const response = await api.get(
                `/api/adminVendor/getVendorDetails?vendorId=${vendorId}&supplyType=${supplyType}`
            );
    
            //ensure the supplies data is correctly extracted from the response
            const supplies = response.data.supplyWastes;
    
            if (!supplies || supplies.length === 0) {
                console.warn('No supplies data found for the vendor');
                setChartData(null);
                setLegend([]);
                return;
            }
    
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
                const isActive = selectedSupply && selectedSupply === supplyName;
                const color = isActive ? '#0a5228' : getRandomColor();
                datasets.push({
                    label: supplyName,
                    data: labels.map((label) => dataByDate[label][supplyName] || 0),
                    backgroundColor: color,
                });
                newLegend.push({ label: supplyName, color });
            });
    
            setChartData({ labels, datasets });
            setLegend(newLegend);
        } catch (error) {
            console.error('Error fetching vendor details:', error);
        }
    };
    
    
    const handleIntervalChange = (newInterval) => {
        setInterval(newInterval);
    };

    //get ramdom color every value
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleSupplyTypeChange = (e) => {
        setSupplyType(e.target.value);
        setSelectedSupply('');
        setChartData(null);
        setLegend([]);
    };

    const handleSupplySelectChange = (e) => {
        const supplyName = e.target.value;
        setSelectedSupply(supplyName);
        if (activeRow !== null) {
            fetchVendorDetails(vendors[activeRow]._id);
        }
    };

  return (
    <div className={styles.vendorComponent}>
        <h1 className={styles.title}>Vendors</h1>

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
                    <th>Vendor Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredVendors.length > 0 ? (
                        filteredVendors.map((vendor, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className={`${styles.row} ${activeRow === index ? styles.activeRow : ''}`}
                                    onClick={() => toggleRow(index, vendor._id)}
                                >
                                    <td>{vendor.fullName}</td>
                                    <td className={styles.dropdownIcon}>
                                        {activeRow === index ? '▼' : '◀'}
                                    </td>
                                </tr>
    
                                {
                                    activeRow === index && chartData && chartData.datasets.length > 0 ? (
                                        <tr className={styles.dropdownContent}>
                                            <td colSpan="3">
                                            <div className={styles.legendWrapper}>
                                                        <select
                                                            value={selectedSupply}
                                                            onChange={handleSupplySelectChange}
                                                            className={styles.legendList}
                                                        >
                                                            <option value="">All</option>
                                                            {
                                                                legend.map((item, index) => (
                                                                    <option key={index} value={item.label}>
                                                                        {item.label}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                {
                                                    view === 'TABLE' ? (
                                                        <VendorTable
                                                            data={chartData}
                                                            legend={legend}
                                                            interval={interval}
                                                            onIntervalChange={handleIntervalChange}
                                                            selectedSupply={selectedSupply}
                                                        />
                                                    ) : (
                                                        <VendorBarChart
                                                            data={chartData}
                                                            legend={legend}
                                                            interval={interval}
                                                            onIntervalChange={handleIntervalChange}
                                                            selectedSupply={selectedSupply}
                                                        />
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ) : (
                                        activeRow === index && (
                                            <tr className={styles.dropdownContent}>
                                                <td colSpan="3" className={styles.noCollectionMessage}>
                                                    No {supplyType.toLowerCase()} waste yet.
                                                </td>
                                            </tr>
                                        )
                                    )
                                }
                            </React.Fragment>
                        ))
                    ) : (
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
  )
}

export default VendorComponent
