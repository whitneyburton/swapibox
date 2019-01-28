import React from 'react';
import './CardContainer.scss';
import { Card } from '../Card/Card';
import PropTypes from 'prop-types';

export const CardContainer = ({ cards, favoriteCards, handleFavorite, category }) => {
  const allCards = cards.map(card => {
    let favoritedCard;

    if (favoriteCards.includes(card)) {
      favoritedCard = true;
    } else {
      favoritedCard = false;
    };

    return (
      <Card
        key={card.name}
        card={card}
        favorited={favoritedCard}
        handleFavorite={handleFavorite} />
    );
  })

  if (cards.length > 0) {
    return (
      <div className='CardContainer'>
        {allCards}
      </div>
    )
  } else if (cards.length === 0 && category === 'favorites') {
    return (
      <div className='no-favorites-container'>
        <h2 className='no-faves-message'>
          There are no favorites yet.
          Choose a few by pressing the &nbsp;
          <i className='fas fa-star'></i>
          &nbsp; button on a card!
        </h2>
      </div>
    )
  } else {
    return (
      <div className='loading-notice'>
        <h2 className='loading-text'>
          LOADING...
        </h2>
      </div>
    )
  }
}

CardContainer.propTypes = {
  cards: PropTypes.array.isRequired,
  favoriteCards: PropTypes.array.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired
}