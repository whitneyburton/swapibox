import React, { Component } from 'react';
import './Controls.scss';

export class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }
  
  passCategory = (e) => {
    let { retrieveCategory } = this.props;
    const category = e.target.name;
    retrieveCategory(category);
  }

  render() {
    const favorites = this.props.favorites.length;
    const categories = ['PEOPLE', 'PLANETS', 'VEHICLES', `FAVORITES ${favorites}`]
    const buttons = categories.map(category => {
      return <button
        onClick={this.passCategory}
        type='submit'
        name='people'
        className='people-btn btns'>${category}</button>
    })
    return (
      <div className='Controls'>
        <button
          onClick={this.passCategory}
          type='submit'
          name='people'
          className='people-btn btns'>PEOPLE</button>
        <button
          onClick={this.passCategory}        
          type='submit'
          name='planets'
          className='planets-btn btns'>PLANETS</button>
        <button
          onClick={this.passCategory}        
          type='submit'
          name='vehicles'
          className='vehicles-btn btns'>VEHICLES</button>
        <button
          onClick={this.passCategory}        
          type='submit'
          name='favorites'
          className='favorites-btn btns'>FAVORITES (0)</button>
      </div>
    )
  }
}