import React from 'react'
import styles from './SupplyPage.module.css'
import HeaderForm from '../../molecules/HeaderForm/HeaderForm';
import supplierIcon from '../../../assets/icons/drop-box-light.svg'

function SupplyPage() {
    const suppliers = [
        { name: 'Neneng', person: 'Nancy Ong', category: 'Fruit', role: 'Supplier' },
        { name: 'Pakito', person: 'Phil Castro', category: 'Vegetable', role: 'Supplier' },
        { name: 'Lotlot', person: 'Title', category: 'Description' },
        { name: 'Pepe', person: 'Title', category: 'Description' },
        { name: 'Adonis', person: 'Title', category: 'Description' },
        { name: 'Anna', person: 'Title', category: 'Description' },
    ];

  return (
    <div className={styles.supplyPage}>
        <HeaderForm icon={supplierIcon} title='SUPPLIER'/>
        <div className={styles.supplyPageContainer}>
            <h1 className={styles.title}>Supplier Tally</h1>
            <div className={styles.cardsContainer}>
                {
                    suppliers.map((supplier, index) => (
                        <div key={index} className={styles.card}>
                            <h2 className={styles.supplierName}>&ldquo;{supplier.name}&rdquo;</h2>
                            <p className={styles.person}>{supplier.person}</p>
                            <p className={styles.category}>{supplier.category}</p>
                            {supplier.role && <p className={styles.role}>{supplier.role}</p>}
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default SupplyPage