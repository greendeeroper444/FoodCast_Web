import React, { useState } from 'react';
import styles from './DisplayComponent.module.css';

function DisplayComponent() {
    const [displays, setDisplays] = useState({
        main: true,
        sound: true,
        forecast: true,
        lowStock: true,
        dataReminder: true,
    });
    const [fontSize, setFontSize] = useState(18);

    const toggleNotification = (type) => {
        setDisplays((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

  return (
    <div className={styles.displayContent}>
        <div className={styles.section}>
            <label className={styles.toggleContainer}>
                Darkmode
                <input
                    type="checkbox"
                    checked={displays.main}
                    onChange={() => toggleNotification('main')}
                />
                <span className={styles.slider}></span>
            </label>
        </div>

        <div className={styles.section}>
            <label className={styles.fontSizeContainer}>
                Font Size
                <select 
                    value={fontSize} 
                    onChange={handleFontSizeChange} 
                    className={styles.fontSizeSelect}
                >
                    <option value={14}>14</option>
                    <option value={16}>16</option>
                    <option value={18}>18</option>
                    <option value={20}>20</option>
                    <option value={22}>22</option>
                </select>
            </label>
        </div>
    </div>
  )
}

export default DisplayComponent
