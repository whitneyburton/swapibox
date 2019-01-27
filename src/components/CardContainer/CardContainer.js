import React from 'react';
import './CardContainer.scss';
import { Card } from '../Card/Card';
import PropTypes from 'prop-types';

export const CardContainer = ({ cards }) => {
  const allCards = cards.map(card => {
    return <Card key={card.name} card={card} />;
  });

  return (
    <div className='CardContainer'>
      { allCards }
    </div>
  )
}

CardContainer.propTypes = {
  cards: PropTypes.array.isRequired
}