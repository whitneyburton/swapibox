import React, { Component } from 'react';
import '../../main.scss';
import { Header } from '../Header/Header'
import { FilmScript } from '../FilmScript/FilmScript'
import { Controls } from '../Controls/Controls'
import { CardContainer } from '../CardContainer/CardContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Controls />
        <FilmScript />
        <CardContainer />
      </div>
    );
  }
}

export default App;