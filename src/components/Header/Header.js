import React from 'react';
import './Header.scss';

export const Header = () => {
  return (
    <div className='Header'>
      <div className='header-title'>
        <h1>SWAPI-Box</h1>
      </div>
      <div className='category-label'>
        <h3>Select A Category Below</h3>
      </div>
    </div>
  )
}