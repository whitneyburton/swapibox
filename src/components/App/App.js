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
      category: '',
    }
  };

  componentDidMount = () => {
    this.generateFilmScript();
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
      const randomNumber = Math.floor(Math.random() * Math.floor(7));
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

  retrieveCategory = (category) => {
    this.setState({ category })
    if (category === 'people' && this.state.people.length === 0) {
      this.generatePeople();
    } else if (category === 'planets' && this.state.planets.length === 0) {
      this.generatePlanets();
    } else if (category === 'vehicles' && this.state.vehicles.length === 0) {
      this.generateVehicles();
    } else if (category === 'favorites') {
      return [];
    } 
  }

  render() {
    let { category, people, planets, vehicles, filmscript } = this.state;
    return (
      <div className="App">
        <Header />
        <Controls
          retrieveCategory={this.retrieveCategory}
        />
        <FilmScript
          filmscript={filmscript}
        />
        <CardContainer
          category={category}
          people={people}
          planets={planets}
          vehicles={vehicles}
        />
      </div>
    );
  }
}

export default App;