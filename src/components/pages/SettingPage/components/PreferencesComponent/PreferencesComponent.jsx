import React, { useState } from 'react'
import styles from './PreferencesComponent.module.css'

function PreferencesComponent() {
    const [preferences, setPreferences] = useState({
        main: true,
        sound: true,
        forecast: true,
        lowStock: true,
        dataReminder: true,
    });
    const [fontSize, setFontSize] = useState(18);

    const togglePreferences = (type) => {
        setPreferences((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };


  return (
    <div className={styles.preferencesContent}>
        <h3 className={styles.preferencesHeader}>Preferences</h3>
        <div className={styles.section}>
            <label className={styles.toggleContainer}>
                Turn on/off notifcations
                <input
                    type="checkbox"
                    checked={preferences.main}
                    onChange={() => togglePreferences('main')}
                />
                <span className={styles.slider}></span>
            </label>

                <label className={styles.toggleContainer}>
                <span role="img" aria-label="sound">🔊</span> Enable sound
                <input
                    type="checkbox"
                    checked={preferences.sound}
                    onChange={() => togglePreferences('sound')}
                />
                <span className={styles.slider}></span>
            </label>
        </div>

        {/* <h3 className={styles.sectionTitle}>Task Preferences</h3> */}
        <div className={styles.section}>
            <label className={styles.toggleContainer}>
                Forecast Update Notification
                <input
                    type="checkbox"
                    checked={preferences.forecast}
                    onChange={() => togglePreferences('forecast')}
                />
                <span className={styles.slider}></span>
            </label>

            <label className={styles.toggleContainer}>
                Low Stock Prediction Alert
                <input
                    type="checkbox"
                    checked={preferences.lowStock}
                    onChange={() => togglePreferences('lowStock')}
                />
                <span className={styles.slider}></span>
            </label>

            <label className={styles.toggleContainer}>
                Data Input Reminder
                <input
                    type="checkbox"
                    checked={preferences.dataReminder}
                    onChange={() => togglePreferences('dataReminder')}
                />
                <span className={styles.slider}></span>
            </label>
        </div>
        <div className={styles.section}>
            <label className={styles.toggleContainer}>
                Darkmode
                <input
                    type="checkbox"
                    checked={preferences.main}
                    onChange={() => togglePreferences('main')}
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

export default PreferencesComponent