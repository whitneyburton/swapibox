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
      filmscript: '',
      category: 'people'
    }
  };

  componentDidMount = () => {
    this.fetchFilmScript();
    this.fetchPeople();
  }

  fetchFilmScript = async () => {
    try {
      const filmsURL = 'https://swapi.co/api/films/';
      const response = await fetch(filmsURL);
      const data = await response.json();
      const randomNumber =  Math.floor(Math.random() * Math.floor(7)); 
      let featureFilmScript = data.results[randomNumber];
      console.log(featureFilmScript)
      this.setState({
        filmscript: { 
          title: featureFilmScript.title,
          opening_crawl: featureFilmScript.opening_crawl,
          release_date: featureFilmScript.release_date
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchPeople = async () => {
    let people = [];
    for (let i = 1; i < 10; i++) {
      try {
        const peopleURL = `https://swapi.co/api/people/?page=${i}`;
        const response = await fetch(peopleURL);
        const data = await response.json();
        people.push(...data.results);
      } catch (error) {
        console.log(error);
      } 
    }
    const peopleWithHomeworlds = await this.fetchHomeworld(people);
    const peopleWithSpecies = await this.fetchSpecies(peopleWithHomeworlds);
    this.setState({ people: peopleWithSpecies })
  }

  fetchHomeworld = (people) => {
    const unresolvedPromises = people.map(async person => {
      const response = await fetch(person.homeworld);
      const data = await response.json();
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
          name: person.name,
          homeworld: person.homeworld,
          population: person.population,
          species: data.name,
          language: data.language
        })
      } else {
        return ({
          name: person.name,
          homeworld: person.homeworld,
          population: person.population,
          species: 'unknown',
          language: 'unknown'
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
        <FilmScript
          filmscript={this.state.filmscript}
        />
        <CardContainer
          people={this.returnCards()}
        />
      </div>
    );
  }
}

export default App;