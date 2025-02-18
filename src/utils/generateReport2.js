import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { formatNumber2 } from './numberUtils';
import { formatDate2 } from './dateUtils';


export const generateReport = (
    currentDatasets, 
    currentLabels, 
    interval, 
    selectedSupply, 
    userType, 
    leftLogoBase64, 
    rightLogoBase64
) => {
    const doc = new jsPDF();

    //logos both left and righside
    if (leftLogoBase64) {
        doc.addImage(leftLogoBase64, 'PNG', 10, 10, 30, 30);
    }
    if (rightLogoBase64) {
        doc.addImage(rightLogoBase64, 'PNG', 170, 10, 30, 30);
    }

    
    doc.setFontSize(12);
    doc.text(
        'Province of Davao del Norte', 
        doc.internal.pageSize.getWidth() / 2, 20, {align: 'center'}
    );
    doc.text(
        'City of Tagum', 
        doc.internal.pageSize.getWidth() / 2, 25, {align: 'center'}
    );

    doc.setFontSize(16);
    doc.text(
        'OFFICE OF THE ECONOMIC ENTERPRISES', 
        doc.internal.pageSize.getWidth() / 2, 35, {align: 'center'}
    );

    const reportFileName = getReportFileName(userType);
    const reportTitleName = getReportTitleName(userType);
    
    doc.setFontSize(12);
    doc.text(
        `${interval.charAt(0).toUpperCase() + interval.slice(1)} ${reportTitleName}`, 
        doc.internal.pageSize.getWidth() / 2, 45, {align: 'center'}
    );
    // doc.setTextColor(10, 82, 40);
    //set the dynamic report title based on userType
    
    // doc.setFontSize(14);
    // doc.text(reportFileName, 14, 55);
    // // doc.setFontSize(10);
    // doc.text(`Interval: ${interval.charAt(0).toUpperCase() + interval.slice(1)}`, 14, 60);

    if (selectedSupply) {
        doc.text(`Filtered by: ${selectedSupply}`, 14, 65);
    }

    //table headers
    const headers = ['Category', ...currentLabels.map(label => formatDate2(label, interval)), 'Total'];

    //table body
    const tableData = currentDatasets.map(dataset => [
        dataset.label,
        ...dataset.data.map(value => `${formatNumber2(value)} kg`),
        `${formatNumber2(dataset.total)} kg`
    ]);

    //add table to the PDF
    doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 75,
        theme: 'grid',
        headStyles: {
            fillColor: [10, 82, 4],
            textColor: [255, 255, 255],
            fontSize: 10,
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
            halign: 'center',
        },
        bodyStyles: {
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
        },
    });

    // //save the PDF
    // doc.save(`${reportFileName}.pdf`);

    //create a Blob URL for the PDF
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    //open the PDF in a new tab
    window.open(pdfUrl, '_blank');
};

const getReportFileName = (userType) => {
    switch (userType) {
        case 'Supplier':
            return 'Supplier_Report';
        case 'Collector':
            return 'Collector_Report';
        case 'Vendor':
            return 'Vendor_Report';
        default:
            return 'Report';
    }
};

const getReportTitleName = (userType) => {
    switch (userType) {
        case 'Supplier':
            return 'Supplier Report';
        case 'Collector':
            return 'Collector Report';
        case 'Vendor':
            return 'Vendor Report';
        default:
            return 'Report';
    }
};
