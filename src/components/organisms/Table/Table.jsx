import React from 'react'
import styles from './Table.module.css';
import PropTypes from 'prop-types';
import TableRow from '../../molecules/TableRow/TableRow';

function Table({headers = [], rows = []}) {
    return (
      <table>
            <thead>
                <TableRow cells={headers} isHeaderRow={true} />
            </thead>
            <tbody>
                {
                    rows.length > 0 
                    ? rows.map((row, index) => (
                            <TableRow key={index} cells={row} />
                        ))
                    : <tr><td colSpan={headers.length}>No data available</td></tr>
                }
            </tbody>
      </table>
    )
  }
  

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired, //ensure headers is an array of strings
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired, //ensure rows is an array of arrays of strings
};

//provide default values to avoid undefined issues
Table.defaultProps = {
    headers: [],
    rows: [],
}

export default Table
