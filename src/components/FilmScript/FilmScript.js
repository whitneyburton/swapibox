import React from 'react';
import './FilmScript.scss';
import PropTypes from 'prop-types';

export const FilmScript = ({ filmscript }) => {
  return (
    <div className='FilmScript'>
      <p className='filmscript-opening'>
        <h4>
          {filmscript.title}
        </h4>
        {filmscript.opening_crawl}
        <h5>
          {filmscript.release_date}
        </h5>
      </p>
    </div>
  )
};

FilmScript.propTypes = {
  filmscript: PropTypes.object.isRequired
};