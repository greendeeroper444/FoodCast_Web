import React, { useEffect, useState } from 'react'
import Button from '../../atoms/Button/Button'
import { generateReport } from '../../../utils/generateReport2'

function IntervalSelector({interval, onIntervalChange, selectedSupply, currentDatasets, currentLabels, userType}) {
    const [leftLogoBase64, setLeftLogoBase64] = useState('');
    const [rightLogoBase64, setRightLogoBase64] = useState('');


    const fetchBase64 = async (filename) => {
        const response = await fetch(filename);
        const text = await response.text();
        return text.trim(); //trim any extra spaces or new lines
    };

    useEffect(() => {
        const fetchLogos = async () => {
            const leftLogo = await fetchBase64('/logo2.txt');
            const rightLogo = await fetchBase64('/logo.txt');
            setLeftLogoBase64(leftLogo);
            setRightLogoBase64(rightLogo);
        };

        fetchLogos();
    }, []);

  
    return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'start' }}>
            {
                ['daily', 'weekly', 'monthly'].map((type) => (
                    <Button
                        key={type}
                        onClick={() => onIntervalChange(type)}
                        style={{
                            marginRight: '10px',
                            backgroundColor: interval === type ? '#0a5228' : '#ccc',
                            color: '#fff',
                            border: 'none',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            borderRadius: '5px',
                        }}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                ))
            }
        </div>

        <div>
            <Button  
                onClick={() => generateReport(
                    currentDatasets, 
                    currentLabels, 
                    interval, 
                    selectedSupply, 
                    userType,
                    leftLogoBase64,
                    rightLogoBase64
                )}
                style={{
                    marginRight: '10px',
                    backgroundColor: '#0a5228',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
            >
                Generate Report
            </Button>
        </div>
    </div>
  )
}

export default IntervalSelector
