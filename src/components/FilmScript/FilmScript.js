import React from 'react';
import './FilmScript.scss';
import PropTypes from 'prop-types';

export const FilmScript = ({ filmscript }) => {
  return (
    <div className='FilmScript'>
      <div class="fade"></div>
      <section class="star-wars">
        <div class="crawl">
          <div class="title">
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