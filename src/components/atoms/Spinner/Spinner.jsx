import React from 'react'
import './Spinner.css';

function Spinner() {
  return (
    <div className='loadingio-spinner-spinner'>
      <div className='ldio'>
        {
            Array.from({ length: 12 }).map((_, index) => (
            <div key={index}></div>
            ))
        }
      </div>
    </div>
  )
}

export default Spinner