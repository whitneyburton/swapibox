import React, { Component } from 'react';
import '../../main.scss';
import { fetchFilmScript, fetchPeople, fetchPlanets } from '../../helpers/apiCalls';
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
      category: 'people',
    }
  };

  componentDidMount = () => {
    this.generateFilmScript();
    // generatePeople();
    // generatePlanets();
  }

  generateFilmScript = async () => {
    try {
      const data = await fetchFilmScript();
      const randomNumber =  Math.floor(Math.random() * Math.floor(7)); 
      let featureFilmScript = data.results[randomNumber];
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

  generatePlanets = async () => {
    let planets = [];
    for (let i = 1; i < 3; i++) {
      try {
        const data = fetchPlanets();
        planets.push(...data.results);
      } catch (error) {
        console.log(error);
      }
    }
    const planetsWithResidents = await this.fetchResidents(planets);
    this.setState({ planets: planetsWithResidents })
  }

  fetchResidents = (planets) => {
    const unresolvedPromises = planets.map(async planet => {
      if (planet.residents.length > 0) {
        let residents = [];
        let allResidents = await this.fetchEachResident(planet.residents);
        residents.push(...allResidents);
        return ({
          planet: planet.name, 
          terrain: planet.terrain,
          population: planet.population,
          climate: planet.climate, 
          residents
        })
      } else {
        return ({
          planet: planet.name, 
          terrain: planet.terrain,
          population: planet.population,
          climate: planet.climate, 
          residents: 'No Residents'
        })
      }
    })
    return Promise.all(unresolvedPromises);
  }

  fetchEachResident = (URLS) => {
    const unresolvedPromises = URLS.map(async url => {
      const response = await fetch(url);
      const data = await response.json();
      return data.name;
    })
    return Promise.all(unresolvedPromises)
  }

  generatePeople = async () => {
    let people = [];
    for (let i = 1; i < 3; i++) {
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
    let { category, people, planets } = this.state;
    if (category === 'people') {
      return people;
    } else if (category === 'planets') {
      return planets;
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