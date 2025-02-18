import React, { useState } from 'react';
import geoData from './geoData.json'; // Import your data file

function Location() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter cities based on search term
  const filteredCities = geoData.cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle city selection from dropdown
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchTerm(city.name); // Set the search term to the selected city's name
    setShowDropdown(false); // Close the dropdown
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true); // Show dropdown while typing
  };

  return (
    <div>
      <h1>Select or Search City/Municipality</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search cities/municipalities..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setShowDropdown(true)} // Show dropdown when focused
      />

      {/* Autocomplete dropdown */}
      {showDropdown && searchTerm && (
        <ul style={{ border: '1px solid #ccc', maxHeight: '150px', overflowY: 'auto', padding: 0, margin: 0 }}>
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <li
                key={city.id}
                onClick={() => handleCitySelect(city)}
                style={{ cursor: 'pointer', listStyle: 'none', padding: '5px 10px' }}
              >
                {city.name}
              </li>
            ))
          ) : (
            <li style={{ padding: '5px 10px', listStyle: 'none' }}>No results found</li>
          )}
        </ul>
      )}

      {/* Display selected city details */}
      {selectedCity && (
        <div>
          <h2>City/Municipality Details</h2>
          <p><strong>Name:</strong> {selectedCity.name}</p>
          <p><strong>Province:</strong> {selectedCity.province}</p>
          <p><strong>Latitude:</strong> {selectedCity.latitude}</p>
          <p><strong>Longitude:</strong> {selectedCity.longitude}</p>
        </div>
      )}
    </div>
  );
}

export default Location;
