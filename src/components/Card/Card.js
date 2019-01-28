import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';

export const Card = ({ card }) => {
  let cardType;
  let cardTitle = card.name.toUpperCase();

  switch (card.type) {
    case 'person':
      cardType =
        <div className='Person-card Card'>
        <div className='card-info'>
          <div className='card-title'>
            <h3>{cardTitle}</h3>
          </div>
          <p><span className='info'>Species:</span> {card.species}</p>
          <p><span className='info'>Language:</span> {card.language}</p>
          <p><span className='info'>Homeworld:</span> {card.homeworld}</p>
          <p><span className='info'>Population:</span> {card.population}</p>
        </div>
        </div>
      break;
    case 'planet':
      cardType =
        <div className='Planet-card Card'>
        <div className='card-info'>
          <div className='card-title'>
            <h3>{cardTitle}</h3>
          </div>
          <p><span className='info'>Terrain:</span> {card.terrain}</p>
          <p><span className='info'>Population:</span> {card.population}</p>
          <p><span className='info'>Climate:</span> {card.climate}</p>
          <span className='info'>Residents:</span>
          <ul>
            {card.residents.map(resident => {
              return <li>{resident}</li>
            })}
          </ul>
          </div>
        </div>
      break;
    case 'vehicle':
      cardType =
        <div className='Vehicle-card Card'>
        <div className='card-info'>
          <div className='card-title'>
            <h3>{cardTitle}</h3>
          </div>
          <p><span className='info'>Model:</span> {card.model}</p>
          <p><span className='info'>Vehicle Class:</span> {card.class}</p>
          <p><span className='info'>Passengers:</span> {card.passengers}</p>
          </div>
        </div>
      break;
    default: alert('Sorry, no cards were found for that category.');
  };

  return (
    <div>
      {cardType}
    </div>
  )
};

Card.propTypes = {
  card: PropTypes.object.isRequired
}