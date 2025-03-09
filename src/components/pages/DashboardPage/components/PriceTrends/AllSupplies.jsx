import React, { useState, useEffect } from 'react'
import styles from './PriceTrends.module.css';
import { Chart as ChartJS, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import LinePriceTrendChart from './LinePriceTrendChart';
import api from '../../../../../api/api';

ChartJS.register(...registerables, zoomPlugin);

function AllSupplies({activeType}) {
    const [supplies, setSupplies] = useState([]);
    const [selectedSupply, setSelectedSupply] = useState(null);
    const [priceTrendData, setPriceTrendData] = useState([]);
    const [year, setYear] = useState('2023');
    const [month, setMonth] = useState('');
    const [range, setRange] = useState('30');

    useEffect(() => {
        if (selectedSupply) fetchPriceTrends(selectedSupply);
    }, [year, month, range]);
    
    useEffect(() => {
        //fetch supplies when activeType changes
        const fetchSupplies = async () => {
            try {
                const response = await api.post('/adminPriceTrends/getAllSupplies', {
                    supplyType: activeType,
                });
                if (response.data.success) {
                    setSupplies(response.data.supplies.map((name, index) => ({ _id: index + 1, supplyName: name })));
                }
            } catch (error) {
                console.error('Failed to fetch supplies:', error);
            }
        };

        fetchSupplies();
    }, [activeType]);

    const fetchPriceTrends = async (supplyName) => {
        try {
            const response = await api.get('/adminPriceTrends/getPriceTrends', {
                params: {
                    supplyName,
                    year,
                    month: month || undefined, //ensure empty month is not sent as 0
                    range,
                },
            });
            if (response.data.success) {
                setPriceTrendData(response.data.trends);
            }
        } catch (error) {
            console.error('Failed to fetch price trends:', error);
        }
    };
    

    const handleSupplyClick = (supplyId) => {
        const selected = supplies.find((supply) => supply._id === supplyId);
        setSelectedSupply(selected?.supplyName || null);
        if (selected?.supplyName) fetchPriceTrends(selected.supplyName);
    };

    const handleYearChange = (e) => setYear(e.target.value);
    const handleMonthChange = (e) => setMonth(e.target.value);


  return (
    <div className={styles.allSupplies}>
        <h3 className={styles.heading}>
            {activeType === 'VEGETABLE' ? 'Vegetable Supplies' : 'Fruit Supplies'}
        </h3>

        <div className={styles.supplyGrid}>
            {
                supplies.map((supply) => (
                    <div
                        key={supply._id}
                        className={`${styles.supplyItem} ${
                            selectedSupply === supply.supplyName ? styles.activeSupply : ''
                        }`}
                        onClick={() => handleSupplyClick(supply._id)}
                    >
                        {supply.supplyName}
                    </div>
                ))
            }
        </div>

        {
            priceTrendData.length > 0 && (
                <div className={styles.chartContainer}>
                    <div className={styles.filterContainer}>
                        <label className={styles.filterLabel}>
                            <span>Year</span>
                            <select
                                className={styles.filterSelect}
                                value={year}
                                onChange={handleYearChange}
                            >
                                {[...Array(5)].map((_, idx) => {
                                    const currentYear = new Date().getFullYear();
                                    return (
                                        <option key={idx} value={currentYear - idx}>
                                            {currentYear - idx}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>

                        <label className={styles.filterLabel}>
                            <span>Month</span>
                            <select
                                className={styles.filterSelect}
                                value={month}
                                onChange={handleMonthChange}
                            >
                                <option value="">All Months</option>
                                {
                                    Array.from({ length: 12 }, (_, i) => (
                                        <option key={i} value={i + 1}>
                                            {new Date(0, i).toLocaleString('default', {month: 'long'})}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>

                    </div>


                    <div className={styles.linechartTable}>
                        <LinePriceTrendChart 
                            priceTrendData={priceTrendData}
                            selectedSupply={selectedSupply}
                            year={year}
                            month={month}
                        />
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AllSupplies
