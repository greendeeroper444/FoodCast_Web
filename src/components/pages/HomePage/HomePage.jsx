import React from 'react'
import styles from './HomePage.module.css'
import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm'
import AllForecastedDemand from '../../../testing/AllForecastedDemand'

function HomePage() {
  return (
    <div className={styles.homePage}>

        <HeaderForm title='Home'/>

        <AllForecastedDemand />
        {/* <GraphTesting /> */}
    </div>
  )
}

export default HomePage