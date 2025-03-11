import React, { useState, useEffect, useRef } from 'react'
import styles from '../CropManagementPage.module.css'
import Button from '../../../atoms/Button/Button';
import api from '../../../../api/api';
import { toast } from 'react-toastify';
import ModalConfirmation from '../../../organisms/ModalConfirmation/ModalConfirmation';

function SupplyListComponent({activeType}) {
    const [supplies, setSupplies] = useState([]);
    const [filteredSupplies, setFilteredSupplies] = useState([]);
    const [supplyName, setSupplyName] = useState('');
    const [error, setError] = useState('');
    const [editingSupply, setEditingSupply] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [supplyToDelete, setSupplyToDelete] = useState(null);
    const inputRef = useRef(null);
    const formRef = useRef(null);

    //fetch all supplies
    useEffect(() => {
        const fetchSupplies = async () => {
            try {
                const response = await api.get('/api/adminSupplyList/getSupplyList'); 
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

    //function to scroll to form
    const scrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
        }
    };

    //function to focus input and position cursor at the end
    const focusInputAtEnd = () => {
        if (inputRef.current) {
            //focus the input
            inputRef.current.focus();
            
            //move cursor to the end of the text
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
        }
    };

    //handle adding new supply
    const handleAddSupply = async (e) => {
        e.preventDefault();
        if (!supplyName.trim()) {
            toast.error('Supply name is required');
            return;
        }
        //check if the supply already exists
        const isSupplyExists = supplies.some(supply => 
            supply.supplyName.toLowerCase() === supplyName.toLowerCase() &&
            supply._id !== (editingSupply?._id)
        );
        if (isSupplyExists) {
            toast.error('This supply already exists');
            return;
        }
 
        if (isEditing && editingSupply) {
            //update existing supply
            try {
                const response = await api.put(`/api/adminSupplyList/updateSupplyList/${editingSupply._id}`, {
                    supplyType: activeType,
                    supplyName,
                });

                setSupplies((prevSupplies) => 
                    prevSupplies.map(supply => 
                        supply._id === editingSupply._id ? response.data.supplyList : supply
                    )
                );
                
                setSupplyName('');
                setError('');
                setIsEditing(false);
                setEditingSupply(null);

                toast.success(`${response.data.supplyList.supplyName} updated successfully!`);
            } catch (error) {
                console.error(error);
                setError('Failed to update supply.');
            }
        } else {
            //add new supply
            try {
                const response = await api.post('/api/adminSupplyList/addSupplyList', {
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
        }
    };

    //handle edit button click
    const handleEdit = (supply) => {
        //set states first
        setEditingSupply(supply);
        setSupplyName(supply.supplyName);
        setIsEditing(true);
        
        //first scroll to the form
        scrollToForm();
        
        //sequence of timeouts to ensure proper execution order
        //helps with browser rendering and scrolling completion
        setTimeout(() => {
            scrollToForm();
            
            //after scrolling is likely complete, focus the input and position cursor at end
            setTimeout(() => {
                focusInputAtEnd();
            }, 50);
        }, 100);
    };

    //show delete confirmation modal
    const confirmDelete = (supply) => {
        setSupplyToDelete(supply);
        setShowDeleteModal(true);
    };
    //handle delete supply
    const handleDelete = async () => {
        try {
            await api.delete(`/api/adminSupplyList/deleteSupplyList/${supplyToDelete._id}`);
            setSupplies((prevSupplies) => prevSupplies.filter(supply => supply._id !== supplyToDelete._id));
            toast.success(`${supplyToDelete.supplyName} deleted successfully!`);
            
            //reset editing state if the deleted item was being edited
            if (editingSupply && editingSupply._id === supplyToDelete._id) {
                setEditingSupply(null);
                setSupplyName('');
                setIsEditing(false);
            }
            
            //close the modal
            setShowDeleteModal(false);
            setSupplyToDelete(null);
        } catch (error) {
            console.error(error);
            toast.error(`Failed to delete ${supplyToDelete.supplyName}.`);
            setShowDeleteModal(false);
        }
    };

    //handle cancel edit
    const handleCancelEdit = () => {
        setEditingSupply(null);
        setSupplyName('');
        setIsEditing(false);
    };

    //close delete modal
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSupplyToDelete(null);
    };

  return (
    <div className={styles.supplyListComponent}>
        <h2 className={styles.heading}>
            {activeType === 'VEGETABLE' ? 'Vegetable Supplies' : 'Fruit Supplies'}
        </h2>

        <div className={styles.newSupplyForm} id="editFormSection">
            <form onSubmit={handleAddSupply} className={styles.form} ref={formRef}>
                <input
                    type="text"
                    placeholder={isEditing ? 'Update supply name' : 'Enter new supply name'}
                    value={supplyName}
                    onChange={(e) => setSupplyName(e.target.value)}
                    className={styles.input}
                    ref={inputRef}
                />
                <div className={styles.buttons}>
                    {
                        isEditing && (
                            <Button 
                                type="button" 
                                className={styles.cancelButton}
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </Button>
                        )
                    }
                    <Button type="submit" className={styles.addButton}>
                        {isEditing ? 'Update crop' : 'Add crop'}
                    </Button>
                </div>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.recordList}>
            <h3>Record List:</h3>
            {
                filteredSupplies.length > 0 ? (
                    <table className={styles.supplyTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Supply Name</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredSupplies.map((supply, index) => (
                                    <tr key={supply._id}>
                                        <td>{index + 1}</td>
                                        <td>{supply.supplyName}</td>
                                        <td>{supply.supplyType}</td>
                                        <td className={styles.actionsCell}>
                                            <button 
                                                className={styles.editButton}
                                                onClick={() => handleEdit(supply)}
                                                type="button"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className={styles.deleteButton}
                                                onClick={() => confirmDelete(supply)}
                                                type="button"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <p>No supply yet.</p>
                )
            }
        </div>
        
        {
            showDeleteModal && supplyToDelete && (
                <ModalConfirmation
                    onClose={closeDeleteModal}
                    onClick={handleDelete}
                    title={`delete ${supplyToDelete.supplyName}`}
                />
            )
        }

    </div>
  )
}

export default SupplyListComponent