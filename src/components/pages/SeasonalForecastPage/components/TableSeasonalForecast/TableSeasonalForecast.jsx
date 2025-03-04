import React from 'react'
import styles from './TableSeasonalForecast.module.css'

function TableSeasonalForecast({vegetables, fruits}) {
  return (
    <div className={styles.tableContainer}>
        {/* vegetable table */}
        <div className={styles.tableBox}>
            <h3>&#x1F33F; Vegetable Seasonal Forecast</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actual</th>
                        <th>Forecasted</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vegetables.map((item, index) => (
                            <tr key={index}>
                                <td>{item._id.supplyName}</td>
                                {/* <td style={{ color: 'green' }}>{item.totalDemandQuantity > 0 ? item.totalDemandQuantity : '-'}</td> */}
                                <td style={{ color: 'green' }}>
                                    {/* {item.totalDemandQuantity ? `${item.totalDemandQuantity.toLocaleString()} kg` : ''}
                                    <br />
                                    {item.totalSupplyQuantity ? `${item.totalSupplyQuantity.toLocaleString()} kg` : ''} */}
                                    {
                                        item.demandLevel && item.demandPercentage && item.demandPercentage !== '0%' 
                                        ? `${item.demandLevel} (${item.demandPercentage})` 
                                        : ''
                                    }
                                </td>
                                {/* <td style={{ color: 'red' }}>{item.forecastedQuantity > 0 ? item.forecastedQuantity : '-'}</td> */}
                                <td style={{ color: 'red' }}>
                                    {/* {item.forecastedDemandQuantity ? `${item.forecastedDemandQuantity.toLocaleString()} kg` : ''}
                                    <br />
                                    {item.forecastedSupplyQuantity ? `${item.forecastedSupplyQuantity.toLocaleString()} kg` : ''} */}
                                    {
                                        item.demandForecastLevel && item.demandForecastPercentage && item.demandForecastPercentage !== '0%' 
                                        ? `${item.demandForecastLevel} (${item.demandForecastPercentage})` 
                                        : ''
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                vegetables.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'grey', marginTop: '10px' }}>
                        No data available
                    </p>
                )
            }
        </div>

        {/* fruits table */}
        <div className={styles.tableBox}>
            <h3>&#x1F34E; Fruit Seasonal Forecast</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actual</th>
                        <th >Forecasted</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fruits.map((item, index) => (
                            <tr key={index}>
                                <td>{item._id.supplyName}</td>
                                {/* <td style={{ color: 'green' }}>{item.totalDemandQuantity > 0 ? item.totalDemandQuantity : '-'}</td> */}
                                <td style={{ color: 'green' }}>
                                    {/* {item.totalDemandQuantity ? `${item.totalDemandQuantity.toLocaleString()} kg` : ''}
                                    <br />
                                    {item.totalSupplyQuantity ? `${item.totalSupplyQuantity.toLocaleString()} kg` : ''} */}
                                    {
                                        item.demandLevel && item.demandPercentage && item.demandPercentage !== '0%' 
                                        ? `${item.demandLevel} (${item.demandPercentage})` 
                                        : ''
                                    }
                                </td>
                                {/* <td style={{ color: 'red' }}>{item.forecastedQuantity > 0 ? item.forecastedQuantity : '-'}</td> */}
                                <td style={{ color: 'red' }}>
                                    {/* {item.forecastedDemandQuantity ? `${item.forecastedDemandQuantity.toLocaleString()} kg` : ''}
                                    <br />
                                    {item.forecastedSupplyQuantity ? `${item.forecastedSupplyQuantity.toLocaleString()} kg` : ''} */}
                                    {
                                        item.demandForecastLevel && item.demandForecastPercentage && item.demandForecastPercentage !== '0%' 
                                        ? `${item.demandForecastLevel} (${item.demandForecastPercentage})` 
                                        : ''
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                fruits.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'grey', marginTop: '10px' }}>
                        No data available
                    </p>
                )
            }
        </div>

    </div>
  )
}

export default TableSeasonalForecast