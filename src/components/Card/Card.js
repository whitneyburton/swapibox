import React, { Component } from 'react';
import './Card.scss';

export class Card extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  render() {
    let { person } = this.props;
    return (
      <div className='Card'>
        <h3>{person.name}</h3>
        <p>Species: {person.species}</p>
        <p>Language: {person.language}</p>
        <p>Homeworld: {person.homeworld}</p>
        <p>Population: {person.population}</p>
        <p></p>
      </div>
    )
  }
}