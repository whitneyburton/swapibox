import React, { Component } from 'react';
import '../../main.scss';
import { fetchFilmScript, fetchPeople, fetchPlanets, fetchVehicles } from '../../helpers/apiCalls';
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
    this.generatePeople();
    this.generatePlanets();
    this.generateVehicles();
  }

  generateVehicles = async () => {
    try {
      const vehicles = await fetchVehicles();
      this.setState({ vehicles })
    } catch (error) {
      console.log(error)
    }
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
    try {
      const planets = await fetchPlanets();
      this.setState({ planets })
    } catch (error) {
      console.log(error);
    }
  }

  generatePeople = async () => {
    try {
      const people = await fetchPeople();
      this.setState({ people })
    } catch (error) {
      console.log(error);
    } 
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