import React, { useEffect } from 'react'
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { getDayName } from '../utils/dateUtils';

export default function downloadExcel(activeTable, filteredData, headers) {
    const leftLogoPath = '/logo-link-1.png';
    const rightLogoPath = '/logo-link-2.png';

    const extractWeekdays = (headers) => {
        const dateHeaders = headers.filter((header) => /\b[A-Za-z]{3} \d{1,2}, \d{4}\b/.test(header));
        const weekdays = dateHeaders.map((dateStr) => getDayName(dateStr));

        if (weekdays.length >= 2) {
            return `${weekdays[0]} & ${weekdays[weekdays.length - 1]} Volume Delivery`;
        } else if (weekdays.length === 1) {
            return `${weekdays[0]} Volume Delivery`;
        } else {
            return 'No date available';
        }
    };

    //fetch image as blob
    const fetchImageAsBlob = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return await blobToArrayBuffer(blob);
        } catch (error) {
            console.error("Error fetching image:", error);
            return null;
        }
    };

    //convert blob to array buffer
    const blobToArrayBuffer = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });
    };

    //extract and parse numeric values from formatted strings like "1,234 kg"
    const extractNumericValue = (str) => {
        if (typeof str !== 'string') return 0;
        const match = str.match(/[\d,]+/);
        return match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;
    };

    //create and configure worksheet with common header formatting
    const setupWorksheet = async (workbook, worksheetName, leftLogoBuffer, rightLogoBuffer, headers) => {
        const worksheet = workbook.addWorksheet(worksheetName);
        
        //set column widths - first column wider for item names, rest equal width
        worksheet.columns = [
            {width: 20}, //first column wider for item names
            ...Array(headers.length - 1).fill({width: 15}) //rest of columns standard width
        ];
        
        //add logo images if fetched successfully
        if (leftLogoBuffer) {
            const logoId1 = workbook.addImage({
                buffer: leftLogoBuffer,
                extension: 'png',
            });
            
            worksheet.addImage(logoId1, {
                tl: {col: 1, row: 1},
                ext: {width: 100, height: 100}
            });
        }
        
        if (rightLogoBuffer) {
            const logoId2 = workbook.addImage({
                buffer: rightLogoBuffer,
                extension: 'png',
            });
            
            worksheet.addImage(logoId2, {
                tl: {col: headers.length - 2, row: 1},
                ext: {width: 100, height: 100}
            });
        }
        
        //add header information - matching the image format
        const titleRow0 = worksheet.addRow(['Republic of the Philippines']);
        worksheet.mergeCells(`A${titleRow0.number}:${String.fromCharCode(64 + headers.length)}${titleRow0.number}`);
        titleRow0.getCell(1).alignment = {horizontal: 'center'};
        titleRow0.font = {size: 12};
        
        const titleRow1 = worksheet.addRow(['Province of Davao del Norte']);
        worksheet.mergeCells(`A${titleRow1.number}:${String.fromCharCode(64 + headers.length)}${titleRow1.number}`);
        titleRow1.getCell(1).alignment = {horizontal: 'center'};
        titleRow1.font = {size: 12};
        
        const titleRow2 = worksheet.addRow(['City of Tagum']);
        worksheet.mergeCells(`A${titleRow2.number}:${String.fromCharCode(64 + headers.length)}${titleRow2.number}`);
        titleRow2.getCell(1).alignment = {horizontal: 'center'};
        titleRow2.font = {size: 12};
        
        const titleRow3 = worksheet.addRow(['OFFICE OF THE ECONOMIC ENTERPRISES']);
        worksheet.mergeCells(`A${titleRow3.number}:${String.fromCharCode(64 + headers.length)}${titleRow3.number}`);
        titleRow3.getCell(1).alignment = {horizontal: 'center'};
        titleRow3.font = {size: 14, bold: true};
        
        const titleRow4 = worksheet.addRow(['VEGETABLES/FRUITS MONITORING SHEET']);
        worksheet.mergeCells(`A${titleRow4.number}:${String.fromCharCode(64 + headers.length)}${titleRow4.number}`);
        titleRow4.getCell(1).alignment = {horizontal: 'center'};
        titleRow4.font = {size: 12, bold: true};
        
        return worksheet;
    };

    //add date range to worksheet
    const addDateRange = (worksheet, headers) => {
        //extract date range from headers for the FROM date format
        const fullDateRangeWithYears = headers.filter((header) => /\b[A-Za-z]{3} \d{1,2}, \d{4}\b/.test(header));
        let dateRangeText = '';
        
        if (fullDateRangeWithYears.length > 0) {
            const firstDate = fullDateRangeWithYears[0];
            const lastDate = fullDateRangeWithYears[fullDateRangeWithYears.length - 1];
            
            //format as "FROM MARCH 6- MARCH 12, 2023"
            const firstMonth = new Date(firstDate).toLocaleString('en-US', {month: 'long'}).toUpperCase();
            const firstDay = new Date(firstDate).getDate();
            
            const lastMonth = new Date(lastDate).toLocaleString('en-US', {month: 'long'}).toUpperCase();
            const lastDay = new Date(lastDate).getDate();
            const year = new Date(lastDate).getFullYear();
            
            if (firstMonth === lastMonth) {
                dateRangeText = `FROM ${firstMonth} ${firstDay}- ${lastDay}, ${year}`;
            } else {
                dateRangeText = `FROM ${firstMonth} ${firstDay}- ${lastMonth} ${lastDay}, ${year}`;
            }
        }
        
        //add the date range row
        const dateRow = worksheet.addRow([dateRangeText]);
        worksheet.mergeCells(`A${dateRow.number}:${String.fromCharCode(64 + headers.length)}${dateRow.number}`);
        dateRow.getCell(1).alignment = {horizontal: 'center'};
        dateRow.font = {size: 12, bold: true};
        
        return worksheet;
    };

    //add table title header (VEGETABLES or FRUITS)
    const addTableTitle = (worksheet, title, headers) => {
        const titleRow = worksheet.addRow([title]);
        worksheet.mergeCells(`A${titleRow.number}:${String.fromCharCode(64 + headers.length + 1)}${titleRow.number}`);
        titleRow.getCell(1).alignment = {horizontal: 'center'};
        titleRow.font = { bold: true, size: 14 };
        titleRow.getCell(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: '4F7942'}
        };
        titleRow.getCell(1).font = {
            color: {argb: 'FFFFFF'},
            bold: true,
            size: 14
        };
        
        return titleRow;
    };

    //add "NO. OF KILOS" header
    const addKilosHeader = (worksheet, headers) => {
        const kilosRow = worksheet.addRow(['NO. OF KILOS']);
        //fix the merge to include all columns
        worksheet.mergeCells(`A${kilosRow.number}:${String.fromCharCode(64 + headers.length + 1)}${kilosRow.number}`);
        kilosRow.getCell(1).alignment = { horizontal: 'center' };
        kilosRow.font = { bold: true };
        kilosRow.getCell(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: '4F7942'}
        };
        kilosRow.getCell(1).font = {
            color: {argb: 'FFFFFF'},
            bold: true
        };
        
        return kilosRow;
    };

    //format headers for display
    const formatTableHeaders = (headers) => {
        return headers.map(header => {
            if (/\b[A-Za-z]{3} \d{1,2}, \d{4}\b/.test(header)) {
                const date = new Date(header);
                const month = date.toLocaleString('en-US', {month: 'long'}).toUpperCase();
                const day = date.getDate();
                return `${month}.${day}`;
            }
            return header.toUpperCase();
        });
    };

    //add header row with styling
    const addHeaderRow = (worksheet, modifiedHeaders) => {
        //add row numbers column if it doesn't exist
        if (!modifiedHeaders.includes('#')) {
            modifiedHeaders.unshift('#');
        }
        
        const headerRow = worksheet.addRow(modifiedHeaders);
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: '336699'}
            };
            cell.font = {
                color: {argb: 'FFFFFF'},
                bold: true
            };
            cell.border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'}
            };
            cell.alignment = {horizontal: 'center', vertical: 'middle'};
        });
        
        return headerRow;
    };

    //add data rows to worksheet
    const addDataRows = (worksheet, dataRows, headerRow) => {
        let totalRowData = null;
        
        //check if the last row is a TOTAL row
        if (dataRows.length > 0 && dataRows[dataRows.length - 1][0] === 'TOTAL') {
            totalRowData = dataRows.pop(); //remove and store the TOTAL row
        }
        
        //add data rows with row numbers
        dataRows.forEach((row, index) => {
            const rowValues = Object.values(row);
            const rowNumber = index + 1;
            const dataRow = worksheet.addRow([rowNumber, ...rowValues]);
            
            dataRow.eachCell((cell) => {
                cell.border = {
                    top: {style: 'thin'},
                    left: {style: 'thin'},
                    bottom: {style: 'thin'},
                    right: {style: 'thin'}
                };
                
                //center align numeric cells, left align text
                if (typeof cell.value === 'string' && cell.value.includes('kg')) {
                    cell.alignment = {horizontal: 'center'};
                } else if (!isNaN(cell.value) && cell.value !== null) {
                    cell.alignment = {horizontal: 'center'};
                } else {
                    cell.alignment = {horizontal: 'left'};
                }
            });
        });
        
        return {totalRowData};
    };

    //add total row to worksheet
    const addTotalRow = (worksheet, totalRowData, dataRows, headerRow) => {
        const rowNumber = dataRows.length + 1;
        const totalRowWithNumber = [rowNumber];
        
        //if we have a total row from our data, use those values
        if (totalRowData) {
            totalRowWithNumber.push('TOTAL'); //add 'TOTAL' as the item name
            for (let i = 1; i < totalRowData.length; i++) {
                totalRowWithNumber.push(totalRowData[i]);
            }
        } else {
            //if no total row data, add 'TOTAL' and then we'll calculate totals
            totalRowWithNumber.push('TOTAL');
        }
        
        const totalRow = worksheet.addRow(totalRowWithNumber);
        
        //if we didn't have totalRowData, calculate the totals
        if (!totalRowData) {
            //calculate column totals
            for (let i = 3; i <= headerRow.cells.length; i++) { //start from 3 to skip row# and 'TOTAL' columns
                //calculate the sum of values in the column
                let sum = 0;
                const columnLetter = String.fromCharCode(64 + i);
                const startRow = headerRow.number + 1;
                const endRow = totalRow.number - 1;
                
                for (let row = startRow; row <= endRow; row++) {
                    const cellValue = worksheet.getCell(`${columnLetter}${row}`).value;
                    if (typeof cellValue === 'string' && cellValue.includes('kg')) {
                        sum += extractNumericValue(cellValue);
                    } else if (!isNaN(cellValue)) {
                        sum += Number(cellValue);
                    }
                }
                
                //add the total to the TOTAL row
                totalRow.getCell(i).value = sum > 0 ? `${sum.toLocaleString()} kg` : '';
            }
        }
        
        //apply blue background and white text to all cells in the TOTAL row
        totalRow.eachCell((cell, colNumber) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: '336699'}
            };
            cell.font = {
                color: {argb: 'FFFFFF'},
                bold: true
            };
            cell.border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'}
            };
            
            //center align everything except the TOTAL text (which is cell 2)
            if (colNumber !== 2) {
                cell.alignment = {horizontal: 'center'};
            } else {
                cell.alignment = {horizontal: 'left'};
            }
        });
        
        return totalRow;
    };

    //add weekday range and signatures
    const addFooterAndSignatures = (worksheet, headers, totalColumns) => {
        //get weekday range for the footer
        const weekdayRange = extractWeekdays(headers);
        
        //add the weekday range row
        const weekdayRow = worksheet.addRow([weekdayRange]);
        worksheet.mergeCells(`A${weekdayRow.number}:${String.fromCharCode(64 + totalColumns)}${weekdayRow.number}`);
        weekdayRow.getCell(1).alignment = {horizontal: 'center'};
        weekdayRow.font = {size: 12};
        
        //add spacing before signatures
        worksheet.addRow([]);
        
        //add signatures section matching the image format
        //prepared by
        let row = worksheet.addRow([]);
        row.getCell(2).value = 'PREPARED BY:';
        row.getCell(2).alignment = {horizontal: 'center'};
        
        //noted by
        row.getCell(Math.floor(totalColumns / 2)).value = 'NOTED BY:';
        row.getCell(Math.floor(totalColumns / 2)).alignment = {horizontal: 'center'};
        
        //approved by
        row.getCell(totalColumns - 1).value = 'APPROVED BY:';
        row.getCell(totalColumns - 1).alignment = {horizontal: 'center'};
        
        //add empty row for signature space
        worksheet.addRow([]);
        
        //add names with underlines
        row = worksheet.addRow([]);
        
        //update with the name from the image
        row.getCell(2).value = 'RUENA LYN M. SOLIVA';
        row.getCell(2).alignment = {horizontal: 'center'};
        worksheet.getCell(`${String.fromCharCode(64 + 2)}${row.number}`).border = {
            bottom: {style: 'thin'}
        };
        
        //update with the name from the image
        row.getCell(Math.floor(totalColumns / 2)).value = 'ROEHL M. REAMBONANZA';
        row.getCell(Math.floor(totalColumns / 2)).alignment = {horizontal: 'center'};
        worksheet.getCell(`${String.fromCharCode(64 + Math.floor(totalColumns / 2))}${row.number}`).border = {
            bottom: {style: 'thin'}
        };
        
        //update with the name from the image
        row.getCell(totalColumns - 1).value = 'POCHOLO W. MELENDRES';
        row.getCell(totalColumns - 1).alignment = {horizontal: 'center'};
        worksheet.getCell(`${String.fromCharCode(64 + totalColumns - 1)}${row.number}`).border = {
            bottom: {style: 'thin'}
        };
        
        //add position titles
        row = worksheet.addRow([]);
        row.getCell(2).value = 'Monitoring';
        row.getCell(2).alignment = {horizontal: 'center'};
        
        //update with the position from the image
        row.getCell(Math.floor(totalColumns / 2)).value = 'Market Supervisor III';
        row.getCell(Math.floor(totalColumns / 2)).alignment = {horizontal: 'center'};
        
        //update with the position from the image
        row.getCell(totalColumns - 1).value = 'Acting City Economic Enterprises Manager';
        row.getCell(totalColumns - 1).alignment = {horizontal: 'center'};
    };

    //export to Excel with images as files
    const downloadReports = async () => {
        //create a new workbook
        const workbook = new ExcelJS.Workbook();
        
        try {
            //fetch images
            const leftLogoBuffer = await fetchImageAsBlob(leftLogoPath);
            const rightLogoBuffer = await fetchImageAsBlob(rightLogoPath);
            
            //setup worksheet with common headers
            const worksheet = await setupWorksheet(workbook, `${activeTable} Report`, leftLogoBuffer, rightLogoBuffer, headers);
            
            //add date range
            addDateRange(worksheet, headers);
            
            //add "NO. OF KILOS" header
            addKilosHeader(worksheet, headers);
            
            //format headers for display
            const modifiedHeaders = formatTableHeaders(headers);
            
            //add header row with styling
            const headerRow = addHeaderRow(worksheet, modifiedHeaders);
            
            //find and separate the TOTAL row (assumed to be the last row of filteredData)
            let dataRows = [...filteredData];
            
            //add data rows
            const {totalRowData} = addDataRows(worksheet, dataRows, headerRow);
            
            //add total row
            addTotalRow(worksheet, totalRowData, dataRows, headerRow);
            
            //add weekday range and signatures
            const totalColumns = headers.length + 1; // +1 for the row number column
            addFooterAndSignatures(worksheet, headers, totalColumns);
            
            //generate Excel file
            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), `${activeTable.replace(' ', '_')}_Report.xlsx`);
            
        } catch (error) {
            console.error('Error generating Excel file:', error);
            //fallback - generate without images
            generateExcelWithoutLogos();
        }
    };

    //NEW IMPLEMENTATION: Download combined report in a single worksheet
    const downloadCombinedReports = async () => {
        //ensure we have the combined data structure
        if (!filteredData.vegetableData || !filteredData.fruitData || !headers.vegetableHeaders || !headers.fruitHeaders) {
            console.error('Missing data for combined report');
            return;
        }

        //create a new workbook
        const workbook = new ExcelJS.Workbook();
        
        try {
            //fetch images once
            const leftLogoBuffer = await fetchImageAsBlob(leftLogoPath);
            const rightLogoBuffer = await fetchImageAsBlob(rightLogoPath);
            
            //determine which header set has more columns for overall worksheet sizing
            const longerHeaders = headers.vegetableHeaders.length >= headers.fruitHeaders.length ? 
                headers.vegetableHeaders : headers.fruitHeaders;
            
            //create a single worksheet for both tables
            const worksheet = await setupWorksheet(workbook, 'Combined Report', leftLogoBuffer, rightLogoBuffer, longerHeaders);
            
            //add date range (using the longer headers for proper merging)
            addDateRange(worksheet, longerHeaders);
            
            //add spacing before first table
            worksheet.addRow([]);
            
            // ===== VEGETABLES TABLE =====
            
            //add VEGETABLES title
            addTableTitle(worksheet, 'VEGETABLES', headers.vegetableHeaders);
            
            //add 'NO. OF KILOS' header for vegetables
            addKilosHeader(worksheet, headers.vegetableHeaders);
            
            //format vegetable headers for display
            const modifiedVegetableHeaders = formatTableHeaders(headers.vegetableHeaders);
            
            //add vegetable header row with styling
            const vegetableHeaderRow = addHeaderRow(worksheet, modifiedVegetableHeaders);
            
            //prepare vegetable data
            let vegetableDataRows = [...filteredData.vegetableData];
            
            //add vegetable data rows
            const {totalRowData: vegetableTotalRowData} = addDataRows(worksheet, vegetableDataRows, vegetableHeaderRow);
            
            //addd vegetable total row
            addTotalRow(worksheet, vegetableTotalRowData, vegetableDataRows, vegetableHeaderRow);
            
            //add spacing between tables
            worksheet.addRow([]);
            worksheet.addRow([]);
            worksheet.addRow([]);
            
            // ===== FRUITS TABLE =====
            
            //add FRUITS title
            addTableTitle(worksheet, 'FRUITS', headers.fruitHeaders);
            
            //add 'NO. OF KILOS' header for fruits
            addKilosHeader(worksheet, headers.fruitHeaders);
            
            //format fruit headers for display
            const modifiedFruitHeaders = formatTableHeaders(headers.fruitHeaders);
            
            //add fruit header row with styling
            const fruitHeaderRow = addHeaderRow(worksheet, modifiedFruitHeaders);
            
            //prepare fruit data
            let fruitDataRows = [...filteredData.fruitData];
            
            //add fruit data rows
            const {totalRowData: fruitTotalRowData} = addDataRows(worksheet, fruitDataRows, fruitHeaderRow);
            
            //add fruit total row
            addTotalRow(worksheet, fruitTotalRowData, fruitDataRows, fruitHeaderRow);
            
            //add spacing before footer
            worksheet.addRow([]);
            
            //add footer and signatures (using the longer headers for proper sizing)
            const totalColumns = longerHeaders.length + 1; // +1 for the row number column
            addFooterAndSignatures(worksheet, longerHeaders, totalColumns);
            
            //generate Excel file with both tables in one worksheet
            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), `VOLUME-Watch-REPORTS.xlsx`);
            
        } catch (error) {
            console.error('Error generating combined Excel file:', error);
        }
    };

    //fallback function if images fail to load
    const generateExcelWithoutLogos = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`${activeTable} Report`);
        
        //set column widths
        worksheet.columns = [
            {width: 20}, //first column wider for item names
            ...Array(headers.length - 1).fill({width: 15}) //rest of columns standard width
        ];
        
        //add header information
        const titleRow0 = worksheet.addRow(['Republic of the Philippines']);
        worksheet.mergeCells(`A${titleRow0.number}:${String.fromCharCode(64 + headers.length)}${titleRow0.number}`);
        titleRow0.getCell(1).alignment = {horizontal: 'center'};
        
        //continue with the same formatting as the main function
        // ... [implement simplified formatting]
        
        //generate Excel file
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `${activeTable.replace(' ', '_')}_Report.xlsx`);
    };

  return { 
    downloadReports,
    downloadCombinedReports
  };
}