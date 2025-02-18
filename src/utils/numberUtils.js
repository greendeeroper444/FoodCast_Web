// export const formatNumber = (value) => (value != null ? Math.round(value) : 'null');

// export const formatNumberWithComma = (number) => {
//     return new Intl.NumberFormat('en-US', {
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0,
//     }).format(number);
// };
  

export const formatNumber = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
        return 'No Data';
    }
    const roundedValue = Math.round(Number(value));
    return new Intl.NumberFormat('en-US').format(roundedValue);
};

//format numbers with commas
export const formatNumber2 = (value) => {
    return value.toLocaleString(); //automatically adds commas for thousands
};