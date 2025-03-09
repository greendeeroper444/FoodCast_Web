import React from 'react'
import ActualAndForecastedDemand from '../../pages/DashboardPage/components/ActualAndForecastedDemand/ActualAndForecastedDemand';
import ActualAndForecastedSupply from '../../pages/DashboardPage/components/ActualAndForecastedSupply/ActualAndForecastedSupply';
import OverAndUnderSupply from '../../pages/DashboardPage/components/OverAndUnderSupply/OverAndUnderSupply';
import PriceTrends from '../../pages/DashboardPage/components/PriceTrends/PriceTrends';

function CardContent({content}) {
    const renderContent = () => {
        switch (content) {
            case 'actualAndForecastedDemand':
                return <ActualAndForecastedDemand />;
            case 'actualAndForecastedSupply':
                return <ActualAndForecastedSupply />;
            case 'overAndUnderSupply':
                return <OverAndUnderSupply />;
            case 'priceTrends':
                return <PriceTrends />;
            default:
                return <div>Select a card to view content</div>;
        }
    };

  return (
    <div>
        {renderContent()}
    </div>
  )
}

export default CardContent