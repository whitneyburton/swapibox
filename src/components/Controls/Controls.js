import React from 'react';
import './Controls.scss';

export const Controls = () => {
  return (
    <div className='Controls'>
      <button
        type='submit'
        name='People'
        value='People'
        className='people-btn btns'>PEOPLE</button>
      <button
        type='submit'
        name='Planets'
        value='Planets'
        className='planets-btn btns'>PLANETS</button>
      <button
        type='submit'
        name='Vehicles'
        value='Vehicles'
        className='vehicles-btn btns'>VEHICLES</button>
      <button
        type='submit'
        name='View Favorites'
        value='View Favorites (0)'
        className='favorites-btn btns'>FAVORITES (0)</button>
    </div>
  )
}