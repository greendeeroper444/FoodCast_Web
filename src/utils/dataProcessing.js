import { formatDate } from "./dateUtils";

export const formatItems = (items, currentPage, DAYS_RANGE, uniqueDates, nameKey, quantityKey, dateKey) => {
    //first, format the regular data rows
    const formattedRows = items.reduce((acc, item) => {
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
    }, []);

    //format the data with commas and "kg"
    const formattedData = formattedRows.map(row => {
        return row.map((value, index) => {
            if (index === 0 || value === '') return value; //skip formatting for the name or empty cells
            return `${value.toLocaleString()} kg`; //add "kg" after the value
        });
    });

    //calculate totals for each column
    if (formattedRows.length > 0) {
        const totalRow = ["TOTAL"];
        
        //get number of columns from first row (subtract 1 because we start with "TOTAL")
        const numColumns = formattedRows[0].length - 1;
        
        //calculate total for each date column and the grand total
        for (let i = 1; i <= numColumns; i++) {
            const columnTotal = formattedRows.reduce((sum, row) => {
                const value = parseInt(row[i]?.toString().replace(/,/g, '') || '0', 10);
                return sum + value;
            }, 0);
            
            //format with commas and "kg"
            totalRow.push(columnTotal > 0 ? `${columnTotal.toLocaleString()} kg` : '');
        }
        
        //add the total row to the formatted data
        formattedData.push(totalRow);
    }

    return formattedData;
};