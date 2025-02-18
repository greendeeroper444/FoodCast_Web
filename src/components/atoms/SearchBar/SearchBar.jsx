import React from 'react';
import styles from './SearchBar.module.css'

function SearchBar({onChange}) {
  return (
    <input
        type="text"
        className={styles.searchBar}
        placeholder="Search"
        onChange={onChange}
    />
  )
}

export default SearchBar
