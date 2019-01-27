import * as api from './apiCalls';
import * as helpers from './apiHelpers';
import * as cleaners from './apiCleaners';

describe('apiHelpers', () => {
  describe('fetchPlanets', () => {
    let mockPlanets = [{
      climate: "temperate",
      name: "Alderaan",
      population: "2000000000",
      residents: ["Luke Skywalker"],
      terrain: "grasslands, mountains",
      type: "planet"
    }];

    beforeEach(() => {
      api.fetchData = jest.fn(() => true);
      cleaners.fetchResidents = jest.fn(() => mockPlanets);
    });
    
    it.only('should return planets if everything is ok', async () => {
      const result = await helpers.fetchPlanets();
      await expect(result).toEqual(mockPlanets);
    });

    
  });




  describe('fetchFilmScript', () => {

    beforeEach(() => {
      mockData = {};
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockData),
        ok: true,
      }))
    });

    it('should return films if everything is ok', async () => {
      let mockUrl = 'https://swapi.co/api/films/';
      const result = await fetchFilmScript();
      expect(window.fetch).toHaveBeenCalledWith(mockUrl);
      expect(result).toEqual(mockData);
    })

    it('should throw an error if everything is not ok', async () => {
      const expectedError = new Error('Error fetching films data.');
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 401,
        ok: false,
      }));
      await expect(fetchFilmScript()).rejects.toEqual(expectedError)
    });
  });

});