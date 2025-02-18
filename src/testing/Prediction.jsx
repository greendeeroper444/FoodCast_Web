import React, { useEffect, useState } from 'react';
import api from '../api/api';

const SupplyPredictionPage = () => {
    const [predictionData, setPredictionData] = useState({});
    const [selectedFruit, setSelectedFruit] = useState('');
    const [fruitOptions, setFruitOptions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFruitOptions = async () => {
            try {
                const response = await api.get('/fruit/getFruitsAdmin');
                console.log('Fetched fruit options:', response.data);
                const uniqueFruits = Array.from(new Set(response.data.fruits.map(fruit => fruit.fruitName)))
                    .map(fruitName => {
                        return response.data.fruits.find(fruit => fruit.fruitName === fruitName);
                    });
                setFruitOptions(uniqueFruits);
            } catch (error) {
                console.error('Error fetching fruit options:', error);
                setError('Failed to fetch fruit options');
            }
        };

        fetchFruitOptions();
    }, []);

    const handleFruitChange = async (e) => {
        const fruitName = e.target.value;
        setSelectedFruit(fruitName);

        if (fruitName) {
            try {
                const response = await axios.get(`/fruit/getFruitSupplyPrediction/${fruitName}`);
                setPredictionData(response.data.predictions); // Set only the predictions part of the response
            } catch (error) {
                console.error('Error fetching predictions:', error);
                setError('Failed to fetch prediction data');
            }
        } else {
            setPredictionData({});
        }
    };

    return (
        <div>
            <h3>Fruit Supply Prediction</h3>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    <label htmlFor="fruit-select">Choose a fruit:</label>
                    <select id="fruit-select" value={selectedFruit} onChange={handleFruitChange}>
                        <option value="">-- Select a fruit --</option>
                        {Array.isArray(fruitOptions) && fruitOptions.map((fruit) => (
                            <option key={fruit._id} value={fruit.fruitName}>
                                {fruit.fruitName}
                            </option>
                        ))}
                    </select>

                    {selectedFruit && predictionData ? (
                        <div style={{ marginTop: '20px' }}>
                            <h4>Predictions for {selectedFruit}</h4>
                            <p>Next Day: {predictionData.predictions?.next_day ? Math.ceil(predictionData.predictions.next_day) : 'N/A'}</p>
                            <p>Next Week: {predictionData.predictions?.next_week_total ? Math.ceil(predictionData.predictions.next_week_total) : 'N/A'}</p>
                            <p>Next Month: {predictionData.predictions?.next_month_total ? Math.ceil(predictionData.predictions.next_month_total) : 'N/A'}</p>
                            <h5>Metrics:</h5>
                            <p>MAE: {predictionData.metrics?.MAE || 'N/A'}</p>
                            <p>RMSE: {predictionData.metrics?.RMSE || 'N/A'}</p>
                        </div>
                    ) : (
                        <p>Select a fruit to see its predictions.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default SupplyPredictionPage;

