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

    it.skip('should return an object of a random film', () => {
      wrapper.instance().generateFilmScript();
      expect(fetchData).toHaveBeenCalledTimes(1);
      expect(wrapper.state('filmscript')).toEqual(mockFilm);
    });
  });

  describe('generateVehicles', () => {
    it('should set vehicles state if there are no errors', async () => {
      expect(wrapper.state('vehicles')).toEqual([]);
      let mockVehicles = [{}, {}, {}];
      helpers.fetchVehicles = jest.fn(() => mockVehicles);
      await wrapper.instance().generateVehicles();
      await expect(wrapper.state('vehicles')).toEqual(mockVehicles)
    });

    it.skip('should set state to an error if there is an error', async () => {
      expect(wrapper.state('vehicles')).toEqual([]);
      helpers.fetchVehicles = jest.fn(() => {
        throw Error('Error fetching data.')
      });
      await wrapper.instance().generateVehicles();
      await expect(wrapper.state('error')).toEqual('Error fetching data.')
    });
  });

  describe('generatePlanets', () => {
    it('should set planets state if there are no errors', async () => {
      expect(wrapper.state('planets')).toEqual([]);
      let mockPlanets = [{}, {}, {}];
      helpers.fetchPlanets = jest.fn(() => mockPlanets);
      await wrapper.instance().generatePlanets();
      await expect(wrapper.state('planets')).toEqual(mockPlanets)
    });
  });

  describe('generatePeople', () => {
    it('should set people state if there are no errors', async () => {
      expect(wrapper.state('people')).toEqual([]);
      let mockPeople = [{}, {}, {}];
      helpers.fetchPeople = jest.fn(() => mockPeople);
      await wrapper.instance().generatePeople();
      await expect(wrapper.state('people')).toEqual(mockPeople)
    });
  });
});
