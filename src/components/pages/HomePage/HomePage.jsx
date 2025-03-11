import React from 'react'
import styles from './HomePage.module.css'
import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm'
import SupplyForecasted from '../../../testing/SupplyForecasted'

function HomePage() {
  return (
    <div className={styles.homePage}>

        <HeaderForm title='Home'/>

        <SupplyForecasted />
        {/* <GraphTesting /> */}
    </div>
  )
}

export default HomePage