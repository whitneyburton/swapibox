import React from 'react';
import './Controls.scss';

export const Controls = () => {
  return (
    <div className='Controls'>
      <input
        type='submit'
        name='People'
        value='People'
        className='people-btn btns'
      />
      <input
        type='submit'
        name='Planets'
        value='Planets'
        className='planets-btn btns'
      />
      <input
        type='submit'
        name='Vehicles'
        value='Vehicles'
        className='vehicles-btn btns'
      />
      <input
        type='submit'
        name='View Favorites'
        value='View Favorites (0)'
        className='favorites-btn btns'
      />
    </div>
  )
}