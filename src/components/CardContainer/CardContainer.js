import React from 'react';
import './CardContainer.scss';
import { Card } from '../Card/Card';

export const CardContainer = () => {
  return (
    <div className='CardContainer'>
      <h2>CardContainer</h2>
      <Card />
    </div>
  )
}