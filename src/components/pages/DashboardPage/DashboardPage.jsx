import React, { useState } from 'react'
import styles from './DashboardPage.module.css'
import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import Card from '../../molecules/Card/Card';
import CardContent from '../../organisms/CardContent/CardContent';
import dashboardIcon from '../../../assets/icons/dashboard-light.svg'

function DashboardPage() {
    const [selectedContent, setSelectedContent] = useState('actualAndForecastedDemand');
    const [activeCard, setActiveCard] = useState('actualAndForecastedDemand');

    const handleCardClick = (content) => {
        setSelectedContent(content);
        setActiveCard(content);
    };
    // const handleCardClick = (route) => {
    //     navigate(route);
    // };

    const getContentTextLabel = () => {
        switch (selectedContent) {
            case 'actualAndForecastedDemand':
                return 'ACTUAL AND FORECASTED DEMAND';
            case 'actualAndForecastedSupply':
                return 'ACTUAL AND FORECASTED SUPPLY';
            case 'overAndUnderSupply':
                return 'OVER AND UNDER SUPPLY';
            default:
                return '';
        }
    };

  return (
    <div className={styles.dashboardPage}>
        <HeaderForm icon={dashboardIcon} title={`DASHBOARD / ${getContentTextLabel()}`}/>
        <p></p>
        <div className={styles.cardContainer}>
            <Card
                type='actualAndForecastedDemand'
                title='ACTUAL AND FORECASTED DEMAND'
                amount='15,000'
                icon={faChartLine}
                onClick={() => handleCardClick('actualAndForecastedDemand')}
                className={activeCard === 'actualAndForecastedDemand' ? styles.active : ''}
            />
            <Card
                type='actualAndForecastedSupply'
                title='ACTUAL AND FORECASTED SUPPLY'
                amount='45,6334'
                icon={faChartLine}
                onClick={() => handleCardClick('actualAndForecastedSupply')}
                className={activeCard === 'actualAndForecastedSupply' ? styles.active : ''}
            />
            <Card
                type='overAndUnderSupply'
                title='OVER AND UNDER SUPPLY'
                amount='95,5741'
                // icon={faGem}
                onClick={() => handleCardClick('overAndUnderSupply')}
                className={activeCard === 'overAndUnderSupply' ? styles.active : ''}
            />
        </div>

        <div className={styles.dashboardContent}>
            <CardContent content={selectedContent} />
        </div>
    </div>
  )
}

export default DashboardPage