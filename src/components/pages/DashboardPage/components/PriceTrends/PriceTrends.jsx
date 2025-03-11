import React, { useState, useEffect } from 'react'
import styles from './PriceTrends.module.css';
import { Chart as ChartJS, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import LinePriceTrendChart from './LinePriceTrendChart';
import SelectCustomize from '../../../../molecules/SelectCustomize/SelectCustomize';
import api from '../../../../../api/api';

ChartJS.register(...registerables, zoomPlugin);

function PriceTrends() {
    const [supplyType, setSupplyType] = useState('VEGETABLE');
    const [supplies, setSupplies] = useState([]);
    const [selectedSupply, setSelectedSupply] = useState('');
    const [priceTrendData, setPriceTrendData] = useState([]);
    const [year, setYear] = useState('2023');
    const [month, setMonth] = useState('');

    useEffect(() => {
        if (selectedSupply) fetchPriceTrends(selectedSupply);
    }, [selectedSupply, year, month]);
    
    useEffect(() => {
        //fetch supplies when supplyType changes
        const fetchSupplies = async () => {
            try {
                const response = await api.post('/api/adminPriceTrends/getAllSupplies', {
                    supplyType: supplyType,
                });
                if (response.data.success) {
                    //sort supplies alphabetically
                    const sortedSupplies = [...response.data.supplies].sort();
                    const suppliesData = sortedSupplies.map((name, index) => ({_id: index + 1, supplyName: name}));
                    setSupplies(suppliesData);
                    
                    //if previously selected supply doesn't exist in new list, select first item
                    const exists = sortedSupplies.includes(selectedSupply);
                    if (!exists && sortedSupplies.length > 0) {
                        setSelectedSupply(sortedSupplies[0]);
                    } else if (selectedSupply === '' && sortedSupplies.length > 0) {
                        //if no selection, select first item
                        setSelectedSupply(sortedSupplies[0]);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch supplies:', error);
            }
        };

        fetchSupplies();
    }, [supplyType]);

    //initial fetch for supplies
    useEffect(() => {
        const initialFetch = async () => {
            try {
                const response = await api.post('/api/adminPriceTrends/getAllSupplies', {
                    supplyType: 'VEGETABLE',
                });
                if (response.data.success) {
                    //sort supplies alphabetically
                    const sortedSupplies = [...response.data.supplies].sort();
                    const suppliesData = sortedSupplies.map((name, index) => ({_id: index + 1, supplyName: name}));
                    setSupplies(suppliesData);
                    
                    if (sortedSupplies.length > 0) {
                        setSelectedSupply(sortedSupplies[0]);
                        fetchPriceTrends(sortedSupplies[0]);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch initial supplies:', error);
            }
        };

        initialFetch();
    }, []); //run once on component mount

    const fetchPriceTrends = async (supplyName) => {
        try {
            const response = await api.get('/api/adminPriceTrends/getPriceTrends', {
                params: {
                    supplyName,
                    year,
                    month: month || undefined
                },
            });
            if (response.data.success) {
                setPriceTrendData(response.data.trends);
            }
        } catch (error) {
            console.error('Failed to fetch price trends:', error);
        }
    };

    //handle supply selection from dropdown
    const handleSupplyChange = (supplyName) => {
        setSelectedSupply(supplyName);
    };

    //extract just the supply names for the dropdown
    const supplyOptions = supplies.map(supply => supply.supplyName);

    //generate year options (5 years starting from current year)
    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        return [...Array(5)].map((_, idx) => String(currentYear - idx));
    };

    //generate month options
    const generateMonthOptions = () => {
        const monthOptions = ['All Months'];
        const monthNames = Array.from({ length: 12 }, (_, i) => 
            new Date(0, i).toLocaleString('default', {month: 'long'})
        );
        return [...monthOptions, ...monthNames];
    };

    //handler for month selection that converts month name to number or empty string for All Months
    const handleMonthChange = (monthName) => {
        if (monthName === 'All Months') {
            setMonth('');
        } else {
            const monthIndex = new Date(`${monthName} 1, 2000`).getMonth() + 1;
            setMonth(String(monthIndex));
        }
    };

    //get the month name from the month number for display
    const getMonthName = () => {
        if (month === '') return 'All Months';
        return new Date(0, parseInt(month) - 1).toLocaleString('default', {month: 'long'});
    };

  return (
    <div className={styles.priceTrends}>
        <h2>Actual And Forecasted Demand</h2>
        
        <div className={styles.selection}>
            <div className={styles.selectionLeft}>
                <SelectCustomize
                    value={supplyType}
                    onChange={setSupplyType}
                    options={['VEGETABLE', 'FRUIT']}
                />
                <SelectCustomize
                    value={selectedSupply || ''}
                    onChange={handleSupplyChange}
                    options={supplyOptions}
                />
            </div>

            <div className={styles.selectionRight}>
                <SelectCustomize
                    value={year}
                    onChange={setYear}
                    options={generateYearOptions()}
                />
                <SelectCustomize
                    value={getMonthName()}
                    onChange={handleMonthChange}
                    options={generateMonthOptions()}
                />
            </div>
        </div>

        {
            priceTrendData.length > 0 && (
                <div className={styles.linechartTable}>
                    <LinePriceTrendChart 
                        priceTrendData={priceTrendData}
                        selectedSupply={selectedSupply}
                        year={year}
                        month={month}
                    />
                </div>
            )
        }
    </div>
  )
}

export default PriceTrends