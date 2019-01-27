import { fetchData } from './apiCalls';
import { fetchFilmScript, fetchPlanets, fetchPeople, fetchVehicles } from './apiHelpers';

describe('apiHelpers', () => {
  describe('fetchPlanets', () => {
    let mockData;

    beforeEach(() => {
      mockData = {
        results: [{
          climate: "temperate",
          name: "Alderaan",
          population: "2000000000",
          residents: ["https://swapi.co/api/people/5/", "https://swapi.co/api/people/68/", "https://swapi.co/api/people/81/"],
          terrain: "grasslands, mountains",
        }]
      };
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockData),
        ok: true,
      }));

      helpers.fetchResidents = jest.fn(() => [{ "climate": "temperate", "name": "Alderaan", "population": "2000000000", "residents": ['Luke Skywalker'], "terrain": "grasslands, mountains", "type": "planet" }])
    });

    it('should return planets if everything is ok', async () => {
      const mockUrl = `https://swapi.co/api/planets/`;
      const result = await fetchPlanets();
      const response = [{ "climate": "temperate", "name": "Alderaan", "population": "2000000000", "residents": ['Luke Skywalker'], "terrain": "grasslands, mountains", "type": "planet" }]
      expect(window.fetch).toHaveBeenCalledWith(mockUrl);
      expect(result).toEqual(response);
    });
  });

  describe('fetchFilmScript', () => {
    let mockData;

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