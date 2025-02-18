import React from 'react'
import styles from './TableCell.module.css'


function TableCell({children}) {
  return (
    <td className={styles.tableCell}>{children}</td>
  )
}

export default TableCell