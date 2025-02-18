import { formatDate } from "./dateUtils";

// export const formatItems = (items, currentPage, DAYS_RANGE, uniqueDates, nameKey, quantityKey, dateKey) => {
//     return items.reduce((acc, item) => {
//         const itemDate = formatDate(item[dateKey]);
    
//         const startIdx = currentPage * DAYS_RANGE;
//         const endIdx = Math.min(startIdx + DAYS_RANGE, uniqueDates.length);
//         const currentDates = uniqueDates.slice(startIdx, endIdx);
    
//         let existingEntry = acc.find(row => row[0] === item[nameKey]);
//         if (!existingEntry) {
//             const row = [item[nameKey], ...currentDates.map(() => ''), 0];
//             acc.push(row);
//             existingEntry = row;
//         }
    
//         const dateIndex = currentDates.indexOf(itemDate) + 1;
//         if (dateIndex > 0) {
//             if (!existingEntry[dateIndex]) {
//             existingEntry[dateIndex] = item[quantityKey];
//             }
//             existingEntry[currentDates.length + 1] += item[quantityKey];
//         }
    
//     return acc;
//     }, []);
// };

export const formatItems = (items, currentPage, DAYS_RANGE, uniqueDates, nameKey, quantityKey, dateKey) => {
    return items.reduce((acc, item) => {
        const itemDate = formatDate(item[dateKey]);

        const startIdx = currentPage * DAYS_RANGE;
        const endIdx = Math.min(startIdx + DAYS_RANGE, uniqueDates.length);
        const currentDates = uniqueDates.slice(startIdx, endIdx);

        let existingEntry = acc.find(row => row[0] === item[nameKey]);
        if (!existingEntry) {
            const row = [item[nameKey], ...currentDates.map(() => ''), 0];
            acc.push(row);
            existingEntry = row;
        }

        const dateIndex = currentDates.indexOf(itemDate) + 1; // +1 because the first column is for the name
        if (dateIndex > 0) {
            //remove commas and parse as an integer
            const currentQuantity = parseInt(existingEntry[dateIndex]?.toString().replace(/,/g, '') || '0', 10);
            const newQuantity = parseInt(item[quantityKey]?.toString().replace(/,/g, '') || '0', 10);
            existingEntry[dateIndex] = currentQuantity + newQuantity;
        }

        //recalculate the total column
        existingEntry[currentDates.length + 1] = currentDates.reduce((total, date, index) => {
            const quantity = parseInt(existingEntry[index + 1]?.toString().replace(/,/g, '') || '0', 10); // Offset by 1 for the name column
            return total + quantity;
        }, 0);

        return acc;
    }, []).map(row => {
        //format the row's quantities and total with commas
        return row.map((value, index) => {
            if (index === 0 || value === '') return value; //skip formatting for the name or empty cells
            return `${value.toLocaleString()} kg`; //add "kg" after the value
        });
    });
};
