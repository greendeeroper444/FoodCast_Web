import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/api";

function SupplyForecasted() {
    const [forecasts, setForecasts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchForecasts = async () => {
        try {
            const response = await api.get("/api/supplyDemandForecasted/getAllCollectedDemandsPrediction");
            setForecasts(response.data);
        } catch (error) {
            console.error("Error fetching supply predictions:", error);
        }
    };

    useEffect(() => {
        fetchForecasts();
    }, []);

    const handleRefresh = async () => {
        setLoading(true);
        try {
            //first API call to run demand prediction
            await api.post('/api/supplyDemandForecasted/runDemandPrediction');
            
            //second API call to run supply prediction
            await api.post('/api/supplyForecasted/runPrediction');
            
            //fetch updated forecasts
            const response = await api.get('/api/supplyDemandForecasted/getAllCollectedDemandsPrediction');
            setForecasts(response.data);
            
            //reload the page to reflect all changes
            window.location.reload();
        } catch (error) {
            console.error('Error running predictions:', error);
        }
        setLoading(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Supply Forecasts</h2>
            <button
                onClick={handleRefresh}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? "Refreshing..." : "Refresh"}
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border">Supply Type</th>
                            <th className="py-2 px-4 border">Supply Name</th>
                            <th className="py-2 px-4 border">Predicted Date</th>
                            <th className="py-2 px-4 border">Predicted Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecasts.length > 0 ? (
                            forecasts.map((item, index) => (
                                <tr key={index} className="text-center border-t">
                                    <td className="py-2 px-4 border">{item.supplyType}</td>
                                    <td className="py-2 px-4 border">{item.supplyName}</td>
                                    <td className="py-2 px-4 border">{item.date}</td>
                                    <td className="py-2 px-4 border">{item.predicted_quantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-2 px-4 border text-center">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SupplyForecasted;
