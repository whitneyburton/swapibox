import React from 'react';
import './FilmScript.scss';

export const FilmScript = ({ filmscript }) => {
  return (
    <div className='FilmScript'>
      <p className='filmscript-opening'>
        {filmscript.opening_crawl}
        <h4>
          {filmscript.title}
            <h5>
              {filmscript.release_date}
            </h5>
        </h4>
      </p>
    </div>
  )
}