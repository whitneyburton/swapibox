import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { fetchData } from '../../helpers/apiCalls';
import * as helpers from '../../helpers/apiHelpers';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />)
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    const expected = {
      error: null,
      planets: [],
      people: [],
      vehicles: [],
      filmscript: '',
      category: '',
      favorites: []
    };
    expect(wrapper.state()).toEqual(expected);
  })

  describe('generateFilmScript', () => {
    let mockFilm;

    beforeEach(() => {
      mockFilm = { title: 'mockTitle', opening_crawl: 'mockCrawl', release_date: 'mockDate' };
      fetchData = jest.fn(() => mockFilm);
    });

    it('should return an object of a random film', () => {
      wrapper.instance().generateFilmScript();
      expect(fetchData).toHaveBeenCalledTimes(1);
      expect(wrapper.state('filmscript')).toEqual(mockFilm);
    });
  });
})
