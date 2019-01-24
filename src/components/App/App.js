import React, { Component } from 'react';
import '../../main.scss';
import { Header } from '../Header/Header'
import { FilmScript } from '../FilmScript/FilmScript'
import { Controls } from '../Controls/Controls'
import { CardContainer } from '../CardContainer/CardContainer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      planets: [],
      people: [],
      vehicles: [],
      category: 'people'
    }
  };

  componentDidMount = () => {
    this.fetchPeople();
  }

  fetchPeople = async () => {
    let people = [];
    for (let i = 1; i < 10; i++) {
      try {
        const peopleURL = `https://swapi.co/api/people/?page=${i}`;
        const response = await fetch(peopleURL);
        const result = await response.json();
        people.push(...result.results);
      } catch (error) {
        console.log(error)
      } 
    }
    const peopleWithHomeworlds = await this.fetchHomeworld(people);
    console.log(peopleWithHomeworlds)
    const peopleWithSpecies = await this.fetchSpecies(peopleWithHomeworlds);
    console.log(peopleWithSpecies)
    this.setState({ people: peopleWithSpecies })
  }

  fetchHomeworld = (people) => {
    const unresolvedPromises = people.map(async person => {
      const response = await fetch(person.homeworld);
      const data = await response.json();
      console.log(data.species)
      return ({
        ...person,
        homeworld: data.name,
        population: data.population,
      })
    })
    return Promise.all(unresolvedPromises);
  }
  
  fetchSpecies = (people) => {
    const unresolvedPromises = people.map(async person => {
      if (person.species.length > 0) {
        const response = await fetch(person.species[0]);
        const data = await response.json();
        return ({
          person: person.name,
          homeworld: person.homeworld,
          population: person.population,
          species: data.name
        })
      } else {
        return ({
          person: person.name,
          homeworld: person.homeworld,
          population: person.population,
          species: 'unknown'
        })
      }
    })
    return Promise.all(unresolvedPromises);
  }

  returnCards = () => {
    if (this.state.category === 'people') {
      return this.state.people;
    } else {
      return [];
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Controls />
        <FilmScript />
        <CardContainer
          people={this.returnCards()}
        />
      </div>
    );
  }
}

export default App;