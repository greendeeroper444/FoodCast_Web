import React from 'react'
import styles from './Selection.module.css'
import Button from '../../atoms/Button/Button';
import SelectCustomize from '../../molecules/SelectCustomize/SelectCustomize';

function Selection({
    supplyType,
    setSupplyType,
    supplyName,
    setSupplyName,
    supplyNames,
    viewMode,
    setViewMode,
    active,
    handleSetActive,
}) {
  return (
    <div className={styles.selection}>
        <div className={styles.selectionLeft}>
            <div className={styles.formGroup}>
                <SelectCustomize
                    value={supplyType}
                    // onChange={setSupplyType}
                    // options={['VEGETABLE', 'FRUIT']}
                    // placeholder='Select Supply Type'
                    onChange={(value) => {
                        setSupplyType(value);
                        if (value === 'FRUIT') {
                            setSupplyName('AVOCADO');
                        } else if (value === 'VEGETABLE') {
                            setSupplyName('AMPALAYA');
                        }
                    }}
                    options={['VEGETABLE', 'FRUIT']}
                    placeholder='Select Supply Type'
                />
            </div>

            <div className={styles.formGroup}>
                <SelectCustomize
                    value={supplyName}
                    onChange={setSupplyName}
                    options={supplyNames}
                    placeholder='Select Name'
                />
            </div>

            <div className={`${styles.formGroup} ${styles.viewModeSelect}`}>
                <SelectCustomize
                    value={viewMode}
                    onChange={setViewMode}
                    options={['GRAPH', 'TABLE']}
                    placeholder='Select View Mode'
                />
            </div>
        </div>

        <div className={styles.selectionRight}>
            <div className={styles.buttons}>
                {
                    ['Daily', 'Weekly', 'Monthly'].map((period) => (
                        <Button
                            key={period}
                            className={`${styles.periodicalOption} ${
                                active === period ? styles.activeButton : ''
                            }`}
                            onClick={() => handleSetActive(period)}
                        >
                            {period}
                        </Button>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Selection
