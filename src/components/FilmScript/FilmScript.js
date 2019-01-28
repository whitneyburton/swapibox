import React from 'react';
import './FilmScript.scss';
import PropTypes from 'prop-types';

export const FilmScript = ({ filmscript }) => {
  return (
    <div className='FilmScript'>
      <div className="fade"></div>
      <section className="star-wars">
        <div className="crawl">
          <div className="title">
              <h4>
                {filmscript.title}
              </h4>
          </div>
          <p className='opening-text'>
            {filmscript.opening_crawl}
          </p>
          <h5>
            {filmscript.release_date}
          </h5>
        </div>
      </section>
    </div>
  )
};

FilmScript.propTypes = {
  filmscript: PropTypes.object.isRequired
};