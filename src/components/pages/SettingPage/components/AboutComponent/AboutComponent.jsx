import React from 'react'
import styles from './AboutComponent.module.css';
import image1 from '../../../../../assets/images/about/about-1.png'

function AboutComponent() {
  return (
    <div className={styles.aboutContent}>
        <h1 className={styles.title}>About</h1>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>Tagum City Economic Enterprise Office</h2>
            <p className={styles.description}>
                The Tagum City Economic Enterprise Office (TCEEO) plays a vital role in promoting local economic growth and sustainability. As a branch of the city government, TCEEO manages public markets, trade, and enterprise development, helping ensure that businesses, vendors, and consumers thrive. By overseeing local enterprises, particularly in agriculture, TCEEO fosters economic stability and supports food security within Tagum City. Its efforts are focused on improving supply chain efficiency, maintaining fair market practices, and utilizing demand forecasting to better allocate resources, stabilize prices, and meet the needs of both producers and consumers.
            </p>
            <div className={styles.imageContainer}>
                <img src={image1} alt="Economic Enterprise Office" className={styles.image} />
            </div>
        </div>

        <div className={styles.section}>
            <h2 className={styles.subtitle}>FoodCast</h2>
            <p className={styles.description}>
                FoodCast is an innovative forecasting system designed to enhance the vegetable and fruit supply chain in Tagum City by determining its demand. Developed in collaboration with the Tagum City Economic Enterprise Office, this system employs advanced farm tagging and predictive analytics to track and forecast the supply and demand of fruits and vegetables. By leveraging historical data, weather patterns, and supply trends, FoodCast provides stakeholders—such as farmers, vendors, and market supervisors—with critical insights to optimize resource allocation, reduce waste, and stabilize market prices. The system aims to improve the overall visibility and efficiency of the food supply chain, contributing to economic resilience and sustainable food security.
            </p>
        </div>
    </div>
  )
}

export default AboutComponent
