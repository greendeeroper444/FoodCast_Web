import React, { useState, useEffect } from 'react'
import styles from '../CropManagementPage.module.css'
import Button from '../../../atoms/Button/Button';
import api from '../../../../api/api';
import { toast } from 'react-toastify';

function SupplyListComponent({activeType}) {
    const [supplies, setSupplies] = useState([]);
    const [filteredSupplies, setFilteredSupplies] = useState([]);
    const [supplyName, setSupplyName] = useState('');
    const [error, setError] = useState('');

    //fetch all supplies
    useEffect(() => {
        const fetchSupplies = async () => {
            try {
                const response = await api.get('/adminSupplyList/getSupplyList'); 
                setSupplies(response.data.supplies);
            } catch (error) {
                console.error('Error fetching supplies:', error);
            }
        };

        fetchSupplies();
    }, []);

    useEffect(() => {
        setFilteredSupplies(supplies.filter((supply) => supply.supplyType === activeType));
    }, [supplies, activeType]);

    //handle adding new supply
    const handleAddSupply = async (e) => {
        e.preventDefault();
        if (!supplyName.trim()) {
            toast.error('Supply name is required');
            return;
        }
        //check if the supply already exists
        const isSupplyExists = supplies.some(supply => supply.supplyName.toLowerCase() === supplyName.toLowerCase());
        if (isSupplyExists) {
            toast.error('This supply already exists');
            return;
        }
 

        try {
            const response = await api.post('/adminSupplyList/addSupplyList', {
                supplyType: activeType,
                supplyName,
            });

            setSupplies((prevSupplies) => [response.data.supplyList, ...prevSupplies]);
            setSupplyName('');
            setError('');

            //show success toast with the supply name
            toast.success(`${response.data.supplyList.supplyName} created successfully!`);
        } catch (error) {
            console.error(error);
            setError('Failed to add supply.');
        }
    };

  return (
    <div className={styles.supplyListComponent}>
        <h2 className={styles.heading}>
            {activeType === 'VEGETABLE' ? 'Vegetable Supplies' : 'Fruit Supplies'}
        </h2>

        <div className={styles.newSupplyForm}>
            {/* <h3>New:</h3> */}
            <form onSubmit={handleAddSupply} className={styles.form}>
                <input
                    type="text"
                    placeholder='Enter new supply name'
                    value={supplyName}
                    onChange={(e) => setSupplyName(e.target.value)}
                    className={styles.input}
                />
                <div className={styles.buttons}>
                    {/* <Button type="button" className={styles.cancelButton}>
                        Cancel
                    </Button> */}
                    <Button type="submit" className={styles.addButton}>
                        Add crop
                    </Button>
                </div>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.recordList}>
            <h3>Record List:</h3>
            <div>
                <ul>
                    {
                        filteredSupplies.length > 0 ? (
                            filteredSupplies.map((supply) => (
                                <li key={supply._id}>
                                    {supply.supplyName}
                                </li>
                            ))
                        ) : (
                            <p>No supply yet.</p>
                        )
                    }
                </ul>
            </div>

        </div>

    </div>
  )
}

export default SupplyListComponent
