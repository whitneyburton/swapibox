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
    const categories = ['people', 'planets', 'vehicles', `favorites (${favorites})`]
    const buttons = categories.map(category => {
      return <button
        onClick={this.passCategory}
        type='submit'
        name={`${category}`}
        className={`${category}`}>{category.toUpperCase()}</button>
    })

    return (
      <div className='Controls'>
        { buttons }
      </div>
    )
  }
}