import React from 'react';
import './CardContainer.scss';
import { Card } from '../Card/Card';

export const CardContainer = ({ people }) => {
  const allPeople = people.map(person => {
    return <Card
      key={person.name}
      person={person}
    />;
  });

  return (
    <div className='CardContainer'>
      { allPeople }
    </div>
  )
}