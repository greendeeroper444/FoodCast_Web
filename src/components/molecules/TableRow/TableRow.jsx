import React from 'react'
import styles from './TableRow.module.css';
import TableHeader from '../../atoms/TableHeader/TableHeader';
import TableCell from '../../atoms/TableCell/TableCell';


function TableRow({cells = [], isHeaderRow}) {
	const safeCells = Array.isArray(cells) ? cells : [];

  return (
    <tr className={styles.tableRow}>
        {
            isHeaderRow
                ? safeCells.map((header, index) => (
                    <TableHeader key={index}>{header}</TableHeader>
                ))
                : safeCells.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
            ))
		}
    </tr>
  )
}
  
export default TableRow