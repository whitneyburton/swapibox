import React from 'react';
import './CardContainer.scss';
import { Card } from '../Card/Card';
import PropTypes from 'prop-types';

export const CardContainer = ({ cards, handleFavorite, category }) => {
  const allCards = cards.map(card => {
    return <Card
      cards={cards}
      key={card.name}
      card={card}
      handleFavorite={handleFavorite} />;
  });

  if (cards.length > 0) {
    return (
      <div className='CardContainer'>
        {allCards}
      </div>
    )
  } else if (cards.length === 0 && category === 'favorites') {
    return (
      <div>
        <h2>
          There are no favorites yet.
          Choose a few by pressing the &nbsp;
          <i className='far fa-star'></i> 
          &nbsp; button on a card!
        </h2>
      </div>
    )
  } else {
    return (
      <div>
        <h2>
          Loading...
        </h2>
      </div>
    )
  }
}

CardContainer.propTypes = {
  cards: PropTypes.array.isRequired,
  handleFavorites: PropTypes.func.isRequired
}