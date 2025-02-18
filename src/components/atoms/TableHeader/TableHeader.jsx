import React from 'react'
import styles from './TableHeader.module.css'

function TableHeader({children}) {
  return (
    <th className={styles.tableHeader}>{children}</th>
  )
}

export default TableHeader