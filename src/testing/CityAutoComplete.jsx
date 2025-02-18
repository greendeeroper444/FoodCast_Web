// CityAutocomplete.js
import React, { useEffect, useRef, useState } from 'react'
import geoData from './geoData.json';
import Input from '../components/atoms/Input/Input';

const CityAutocomplete = ({ label, name, value, onChange }) => {
        const [searchTerm, setSearchTerm] = useState(value?.city || '');
        const [showDropdown, setShowDropdown] = useState(false);
        const dropdownRef = useRef(null);
    
        const filteredCities = geoData.cities.filter(city =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
            onChange({ target: { name, value: e.target.value } });
        };
    
        const handleCitySelect = (city) => {
            setSearchTerm(city.name);
            //send the full city object (including latitude and longitude) to the form
            onChange({
                target: {
                name,
                value: city, //pass the selected city object
                }
            });
            setShowDropdown(false);
        };
    //scroll the dropdown into view if results change
    useEffect(() => {
        if (dropdownRef.current && showDropdown && filteredCities.length > 0) {
            dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [filteredCities, showDropdown]);

  return (
    <div style={{ position: 'relative' }}>
        <label>{label}</label>
        <Input
            type="text"
            name={name}
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        />
        {
            showDropdown && searchTerm && (
                <ul 
                ref={dropdownRef}
                style={{ 
                        position: 'absolute', 
                        top: '100%', 
                        left: 0, 
                        border: '1px solid #ccc', 
                        width: '100%', 
                        maxHeight: '150px', 
                        overflowY: 'auto',
                        background: 'white', 
                        padding: 0, 
                        margin: 0 
                    }}>
                {
                    filteredCities.length > 0 ? (
                        filteredCities.map((city) => (
                        <li
                            key={city.id}
                            onClick={() => handleCitySelect(city)}
                            style={{ 
                                cursor: 'pointer', 
                                listStyle: 'none', 
                                padding: '5px 10px' 
                            }}
                        >
                            {city.name}
                        </li>
                        ))
                    ) : (
                        <li style={{ 
                            padding: '5px 10px', 
                            listStyle: 'none' 
                        }}>No results found</li>
                    )
                }
                </ul>
            )
        }
    </div>
  )
}

export default CityAutocomplete
