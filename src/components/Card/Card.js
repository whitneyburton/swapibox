import React from 'react';
import './Card.scss';

export const Card = ({ card }) => {
  console.log(card.residents)
  let cardType;
  switch (card.type) {
    case 'person':
      cardType = <div className='Card'>
        <h3>{card.name}</h3>
        <p>Species: {card.species}</p>
        <p>Language: {card.language}</p>
        <p>Homeworld: {card.homeworld}</p>
        <p>Population: {card.population}</p>
      </div>
      break;
    case 'planet':
      cardType = <div className='Card'>
        <h3>{card.name}</h3>
        <p>Terrain: {card.terrain}</p>
        <p>Population: {card.population}</p>
        <p>Climate: {card.climate}</p>
        <p>Residents: {card.residents}</p>
      </div>
      break;
    case 'vehicle':
      cardType = <div className='Card'>
        <h3>{card.name}</h3>
        <p>Model: {card.model}</p>
        <p>Vehicle Class: {card.class}</p>
        <p>Number of Passengers: {card.passengers}</p>
      </div>
      break;
    default: console.log('Sorry, no cards were found for that category.');
  }

  return (
    <div>
      {cardType}
    </div>
  )
}