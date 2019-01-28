import React, { Component } from 'react';
import '../../main.scss';
import { fetchData } from '../../helpers/apiCalls';
import * as api from '../../helpers/apiHelpers';
import { Header } from '../Header/Header'
import { FilmScript } from '../FilmScript/FilmScript'
import { Controls } from '../Controls/Controls'
import { CardContainer } from '../CardContainer/CardContainer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      planets: [],
      people: [],
      vehicles: [],
      filmscript: '',
      category: '',
      favorites: []
    }
  };

  componentDidMount = () => {
    this.generateFilmScript();
  }

  generateFilmScript = async () => {
    try {
      const data = await fetchData('https://swapi.co/api/films/');
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
      this.setState({ error })
    }
  };

  generateVehicles = async () => {
    try {
      const vehicles = await api.fetchVehicles();
      this.setState({ vehicles })
    } catch (error) {
      this.setState({ error })
    }
  };

  generatePlanets = async () => {
    try {
      const planets = await api.fetchPlanets();
      this.setState({ planets })
    } catch (error) {
      this.setState({ error })
    }
  };

  generatePeople = async () => {
    try {
      const people = await api.fetchPeople();
      this.setState({ people })
    } catch (error) {
      this.setState({ error })
    }
  };

  handleFavorite = (card) => {
    let { favorites } = this.state;
    let newFavorites;
    if (favorites.length === 0) {
      newFavorites = [card];
    } else if (favorites.includes(card)) {
      newFavorites = favorites.filter(favorite => {
        return favorite !== card;
      });
    } else {
      newFavorites = [...favorites, card];
    }
    this.setState({ favorites: newFavorites })
  }

  retrieveCategory = (category) => {
    if (category === 'people' && this.state.people.length === 0) {
      this.setState({ category })
      this.generatePeople();
    } else if (category === 'people') {
      this.setState({ category })
    } else if (category === 'planets' && this.state.planets.length === 0) {
      this.setState({ category })
      this.generatePlanets();
    } else if (category === 'planets') {
      this.setState({ category })
    } else if (category === 'vehicles' && this.state.vehicles.length === 0) {
      this.setState({ category })
      this.generateVehicles();
    } else if (category === 'vehicles') {
      this.setState({ category })
    } else {
      this.setState({ category: 'favorites' })
    }
  };

  render() {
    let { category, favorites, filmscript } = this.state;
    let { retrieveCategory, handleFavorite } = this;
    let body;

    if (category) {
      body = <CardContainer
        category={category}
        cards={this.state[category]}
        favoriteCards={favorites}
        handleFavorite={handleFavorite} />
    } else {
      body = <FilmScript
        filmscript={filmscript} />
    }

    return (
      <div className="App">
        <Header />
        <Controls
          favorites={favorites}
          retrieveCategory={retrieveCategory} />
        {body}
      </div>
    );
  }
}

export default App;