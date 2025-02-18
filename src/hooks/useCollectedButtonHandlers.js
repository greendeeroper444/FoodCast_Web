// import React, { useEffect, useState } from 'react'
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { getDayName, removeYearFromHeaders } from '../utils/dateUtils';

// export default function useCollectedButtonHandlers(activeTable, filteredFruitData, filteredVegetableData, fruitHeaders, vegetableHeaders) {
//     const [leftLogoBase64, setLeftLogoBase64] = useState('');
//     const [rightLogoBase64, setRightLogoBase64] = useState('');


//     const fetchBase64 = async (filename) => {
//         const response = await fetch(filename);
//         const text = await response.text();
//         return text.trim(); //trim any extra spaces or new lines
//     };

//     useEffect(() => {
//         const fetchLogos = async () => {
//             const leftLogo = await fetchBase64('/logo2.txt');
//             const rightLogo = await fetchBase64('/logo.txt');
//             setLeftLogoBase64(leftLogo);
//             setRightLogoBase64(rightLogo);
//         };

//         fetchLogos();
//     }, []);

    
//     const extractWeekdays = (headers) => {
//         //filter headers for valid date strings (e.g., 'Sep 6, 2024')
//         const dateHeaders = headers.filter(header => /\b[A-Za-z]{3} \d{1,2}, \d{4}\b/.test(header));
    
//         //vonvert date strings into weekday names
//         const weekdays = dateHeaders.map(dateStr => getDayName(dateStr));
    
//         //return a string with the range of weekdays (e.g., 'Friday to Sunday')
//         if (weekdays.length >= 2) {
//             return `${weekdays[0]} to ${weekdays[weekdays.length - 1]} Volume Delivery`;
//         } else if (weekdays.length === 1) {
//             return `${weekdays[0]} Volume Delivery`;
//         } else {
//             return 'No date available';
//         }
//     };
    
//     //event handler download report 
//     const downloadReports = () => {
//         const doc = new jsPDF();

//         //header pdf
//         console.log(fruitHeaders);
//         console.log(vegetableHeaders);

//         //extract the timeDate from headers (for dates like 'Sep 6', 'Sep 8')
//         // const extractTimeHeaders = (headers) => {
//         //     return headers.filter(header => /\b[A-Za-z]{3} \d{1,2}\b/.test(header)).join(' to ');
//         // };

//         // const timeDate = activeTable === 'Fruit Supply'
//         //     ? extractTimeHeaders(fruitHeaders) || 'No date available'
//         //     : extractTimeHeaders(vegetableHeaders) || 'No date available';
        
//         const currentFruitHeaders = removeYearFromHeaders(fruitHeaders);
//         const currentVegetableHeaders = removeYearFromHeaders(vegetableHeaders);

//         //get full date range (with years) headers for display in the PDF header
//         const fullDateRangeWithYears = activeTable === 'Fruit Collected'
//             ? fruitHeaders || 'No date available'
//             : vegetableHeaders || 'No date available';

//         //get the weekday range for the footer (e.g., 'Friday to Sunday Volume Delivery')
//         const weekdayRange = activeTable === 'Fruit Collected'
//             ? extractWeekdays(fruitHeaders) || 'No date available'
//             : extractWeekdays(vegetableHeaders) || 'No date available';


//         //logos both left and righside
//         if (leftLogoBase64) {
//             doc.addImage(leftLogoBase64, 'PNG', 10, 10, 30, 30);
//         }
//         if (rightLogoBase64) {
//             doc.addImage(rightLogoBase64, 'PNG', 170, 10, 30, 30);
//         }

        
//         doc.setFontSize(12);
//         doc.text(
//             'Province of Davao del Norte', 
//             doc.internal.pageSize.getWidth() / 2, 20, {align: 'center'}
//         );
//         doc.text(
//             'City of Tagum', 
//             doc.internal.pageSize.getWidth() / 2, 25, {align: 'center'}
//         );

//         doc.setFontSize(16);
//         doc.text(
//             'OFFICE OF THE ECONOMIC ENTERPRISES', 
//             doc.internal.pageSize.getWidth() / 2, 35, {align: 'center'}
//         );

//         doc.setFontSize(12);
//         doc.text(
//             'VEGETABLES/FRUITS MONITORING SHEET', 
//             doc.internal.pageSize.getWidth() / 2, 45, {align: 'center'}
//         );


//         //extract the first and last dates with years
//         const firstDate = fullDateRangeWithYears[1].replace(',', ''); //get first date with year
//         const lastDate = fullDateRangeWithYears[fullDateRangeWithYears.length - 2].replace(',', ''); //get last date with year

//         //parse years for comparison
//         const firstYear = new Date(firstDate).getFullYear();
//         const lastYear = new Date(lastDate).getFullYear();

//         //format the first and last date without the year for display
//         const firstDateWithoutYear = firstDate.slice(0, -5);
//         const lastDateWithoutYear = lastDate.slice(0, -5);

//         //determine how to display the date range
//         let dateRangeText;
//         // if (firstYear === lastYear) {
//         //     //same year, display year only once
//         //     dateRangeText = `from ${firstDate.slice(0, -5)} to ${lastDate}`;
//         // } else {
//         //     //different years, display both years
//         //     dateRangeText = `from ${firstDate} to ${lastDate}`;
//         // }
//         if (firstYear === lastYear) {
//             //same year, display year only once with comma before the year for the second date
//             dateRangeText = `from ${firstDateWithoutYear} to ${lastDateWithoutYear}, ${lastYear}`;
//         } else {
//             //different years, display both years with commas before the years
//             dateRangeText = `from ${firstDateWithoutYear}, ${firstYear} to ${lastDateWithoutYear}, ${lastYear}`;
//         }
//         doc.text(dateRangeText, doc.internal.pageSize.getWidth() / 2, 50, {align: 'center'});
//         //end header pdf

//         const startY = 70;

//         //body table pdf
//         //generate table
//         const generateTable = (title, headers, data, startY) => {
//             doc.text(`${title} Report`, 14, startY);
//             doc.autoTable({
//                 head: [headers],
//                 body: data.map(row => Object.values(row)),
//                 startY: startY + 10,
//                 headStyles: { 
//                     fillColor: [26, 95, 62], 
//                     textColor: [255, 255, 255],
//                     lineWidth: 0.1, 
//                     lineColor: [221, 221, 221] 
//                 },
//                 bodyStyles: { 
//                     lineWidth: 0.1, 
//                     lineColor: [221, 221, 221] 
//                 }
//             });
//             return doc.lastAutoTable.finalY + 10; //return the position for the next table
//         };

//         let finalY;
//         if (activeTable === 'Fruit Collected') {
//             finalY = generateTable('Fruit Collected', currentFruitHeaders, filteredFruitData, startY);
//         } else if (activeTable === 'Vegetable Collected') {
//             finalY = generateTable('Vegetable Collected', currentVegetableHeaders, filteredVegetableData, startY);
//         } else if (activeTable === 'All Collected') {
//             finalY = generateTable('Vegetable Collected', currentVegetableHeaders, filteredVegetableData, startY);
//             finalY = generateTable('Fruit Collected', currentFruitHeaders, filteredFruitData, finalY);
//         }
//         //end body table pdf

//         //foradd "Prepared by", "Noted by", and "Approved by" section at the bottom of the page
//         const pageWidth = doc.internal.pageSize.width;
//         const pageHeight = doc.internal.pageSize.height;

//         //positions for text - divided equally across the width
//         const preparedX = pageWidth / 6; 
//         const notedX = pageWidth / 2;
//         const approvedX = (pageWidth / 6) * 5;

//         doc.setFontSize(12);
//         doc.text(weekdayRange, pageWidth / 2, finalY + 20, {align: 'center'});

//         doc.text('PREPARED BY:', preparedX, pageHeight - 40, {align: 'center'});
//         doc.text('NOTED BY:', notedX, pageHeight - 40, {align: 'center'});
//         doc.text('APPROVED BY:', approvedX, pageHeight - 40, {align: 'center'});

//         doc.setFontSize(10);
//         doc.text('RACHEL P. LUCINA', preparedX, pageHeight - 30, {align: 'center'});
//         doc.text('Monitoring', preparedX, pageHeight - 25, {align: 'center'});

//         doc.text('JUNAS E. TANUDRA', notedX, pageHeight - 30, {align: 'center'});
//         doc.text('SM III/OIC-Market Division', notedX, pageHeight - 25, {align: 'center'});

//         doc.text('POCHOLO W. MELENDRES', approvedX, pageHeight - 30, {align: 'center'});
//         doc.text('Acting City Economic Enterprises Manager', approvedX, pageHeight - 25, {align: 'center'});
    
//         doc.save(`${activeTable.replace(' ', '_')}_Report.pdf`);
//     };

//   return {  
//     downloadReports 
//   };
// }
import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getDayName, removeYearFromHeaders } from '../utils/dateUtils';

export default function useCollectedButtonHandlers(activeTable, filteredData, headers) {
    const [leftLogoBase64, setLeftLogoBase64] = useState('');
    const [rightLogoBase64, setRightLogoBase64] = useState('');

    const fetchBase64 = async (filename) => {
        const response = await fetch(filename);
        const text = await response.text();
        return text.trim(); //trim any extra spaces or new lines
    };

    useEffect(() => {
        const fetchLogos = async () => {
            const leftLogo = await fetchBase64('/logo2.txt');
            const rightLogo = await fetchBase64('/logo.txt');
            setLeftLogoBase64(leftLogo);
            setRightLogoBase64(rightLogo);
        };

        fetchLogos();
    }, []);

    const extractWeekdays = (headers) => {
        //filter headers for valid date strings (e.g., 'Sep 6, 2024')
        const dateHeaders = headers.filter((header) => /\b[A-Za-z]{3} \d{1,2}, \d{4}\b/.test(header));

        //convert date strings into weekday names
        const weekdays = dateHeaders.map((dateStr) => getDayName(dateStr));

        //return a string with the range of weekdays (e.g., 'Friday to Sunday')
        if (weekdays.length >= 2) {
            return `${weekdays[0]} to ${weekdays[weekdays.length - 1]} Volume Delivery`;
        } else if (weekdays.length === 1) {
            return `${weekdays[0]} Volume Delivery`;
        } else {
            return 'No date available';
        }
    };

    //event handler to download report
    const downloadReports = () => {
        const doc = new jsPDF();

        //logos (both left and right side)
        if (leftLogoBase64) {
            doc.addImage(leftLogoBase64, 'PNG', 10, 10, 30, 30);
        }
        if (rightLogoBase64) {
            doc.addImage(rightLogoBase64, 'PNG', 170, 10, 30, 30);
        }

        doc.setFontSize(12);
        doc.text('Province of Davao del Norte', doc.internal.pageSize.getWidth() / 2, 20, {align: 'center'});
        doc.text('City of Tagum', doc.internal.pageSize.getWidth() / 2, 25, {align: 'center'});

        doc.setFontSize(16);
        doc.text('OFFICE OF THE ECONOMIC ENTERPRISES', doc.internal.pageSize.getWidth() / 2, 35, {align: 'center'});

        doc.setFontSize(12);
        doc.text('VEGETABLES/FRUITS MONITORING SHEET', doc.internal.pageSize.getWidth() / 2, 45, {align: 'center'});

        //extract date range from headers
        const fullDateRangeWithYears = headers.filter((header) => /\b[A-Za-z]{3} \d{1,2}, \d{4}\b/.test(header));
        const firstDate = fullDateRangeWithYears[0].replace(',', ''); //get first date with year
        const lastDate = fullDateRangeWithYears[fullDateRangeWithYears.length - 1].replace(',', ''); // get last date with year

        const firstYear = new Date(firstDate).getFullYear();
        const lastYear = new Date(lastDate).getFullYear();

        //format the first and last date without the year for display
        const firstDateWithoutYear = firstDate.slice(0, -5);
        const lastDateWithoutYear = lastDate.slice(0, -5);

        //determine how to display the date range
        let dateRangeText;
        if (firstYear === lastYear) {
            //same year, display year only once with comma before the year for the second date
            dateRangeText = `from ${firstDateWithoutYear} to ${lastDateWithoutYear}, ${lastYear}`;
        } else {
            //different years, display both years with commas before the years
            dateRangeText = `from ${firstDateWithoutYear}, ${firstYear} to ${lastDateWithoutYear}, ${lastYear}`;
        }

        //add the date range to the report
        doc.setFontSize(12);
        doc.text(dateRangeText, doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });

        const currentHeaders = removeYearFromHeaders(headers);

        //get the weekday range for the footer (e.g., 'Friday to Sunday Volume Delivery')
        const weekdayRange = extractWeekdays(headers);

        const startY = 70;

        //generate table for the report
        const generateTable = (title, headers, data, startY) => {
            doc.text(`${title} Report`, 14, startY);
            doc.autoTable({
                head: [headers],
                body: data.map((row) => Object.values(row)),
                startY: startY + 10,
                headStyles: {
                    fillColor: [26, 95, 62],
                    textColor: [255, 255, 255],
                    lineWidth: 0.1,
                    lineColor: [221, 221, 221],
                },
                bodyStyles: {
                    lineWidth: 0.1,
                    lineColor: [221, 221, 221],
                },
            });
            return doc.lastAutoTable.finalY + 10; //return the position for the next table
        };
        
        let finalY = generateTable(`${activeTable}`, currentHeaders, filteredData, startY);
        
        //set position dynamically based on finalY instead of fixed bottom pageHeight
        const footerStartY = finalY + 5; //adjust this value as needed
        
        doc.setFontSize(12);
        const weekdayTextOffset = 1; //adjust this value as needed
        doc.text(
            weekdayRange, 
            doc.internal.pageSize.width / 2, 
            footerStartY + weekdayTextOffset, //adjusting margin bottom
            {align: 'center'}
        );
        
        //footer alignment
        const preparedX = doc.internal.pageSize.width / 6;
        const notedX = doc.internal.pageSize.width / 2;
        const approvedX = (doc.internal.pageSize.width / 6) * 5;
        const footerGap = 8; //adjust spacing between lines
        
        doc.setFontSize(10);
        doc.text('PREPARED BY:', preparedX, footerStartY + 20, {align: 'center'});
        doc.text('RACHEL P. LUCINA', preparedX, footerStartY + 20 + footerGap, {align: 'center'});
        doc.text('Monitoring', preparedX, footerStartY + 20 + footerGap * 2, {align: 'center'});
        
        doc.text('NOTED BY:', notedX, footerStartY + 20, {align: 'center'});
        doc.text('JUNAS E. TANUDRA', notedX, footerStartY + 20 + footerGap, {align: 'center'});
        doc.text('SM III/OIC-Market Division', notedX, footerStartY + 20 + footerGap * 2, {align: 'center'});
        
        doc.text('APPROVED BY:', approvedX, footerStartY + 20, {align: 'center'});
        doc.text('POCHOLO W. MELENDRES', approvedX, footerStartY + 20 + footerGap, {align: 'center'});
        doc.text('Acting City Economic Enterprises Manager', approvedX, footerStartY + 20 + footerGap * 2, {align: 'center'});
        
        doc.save(`${activeTable.replace(' ', '_')}_Report.pdf`);
        
    };

  return { 
    downloadReports 
  }
}
