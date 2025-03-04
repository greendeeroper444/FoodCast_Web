import React, { useState } from 'react'
import styles from './SeasonDropdown.module.css';
import { FaChevronDown } from 'react-icons/fa';

function SeasonDropdown({value, onChange, options, placeholder}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.activeDropdown : ''}`}>

        <button
            className={styles.dropdownButton}
            onClick={() => setIsOpen(!isOpen)}
        >
            <span>{value || placeholder}</span>
            <FaChevronDown className={`${styles.arrow} ${isOpen ? styles.rotate : ''}`} />
        </button>

        {
            isOpen && (
                <div className={styles.dropdownMenu}>
                {
                    options.map((option, index) => (
                        <li key={index} className={styles.dropdownItem}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            <input
                                type='radio'
                                name='dropdown'
                                value={option}
                                checked={value === option}
                                onChange={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                            />
                            <span>{option}</span>
                        </li>
                    ))
                }
                </div>
            )
        }
    </div>
  )
}

export default SeasonDropdown
