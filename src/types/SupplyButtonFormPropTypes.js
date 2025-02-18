import PropTypes from 'prop-types';

const SupplyButtonFormPropTypes = {
    buttons: PropTypes.array.isRequired,            // Array of buttons
    activeTable: PropTypes.string.isRequired,       // String for active table
    setActiveTable: PropTypes.func.isRequired,      // Function to set active table
    // onAddSupply: PropTypes.func.isRequired,         // Function to add supply
    filteredData: PropTypes.array.isRequired,
    supplyHeaders: PropTypes.array.isRequired,       // Array of strings for fruit headers
};

export default SupplyButtonFormPropTypes;
