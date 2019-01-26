import { fetchFilmScript, fetchPlanets, fetchPeople, fetchVehicles } from './apiCalls';
import * as helpers from './apiHelpers';

describe('apiCalls', () => {
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

  describe('fetchPlanets', () => {
    let mockData;
    beforeEach(() => {
      mockData = {
        results: [{
          climate: "temperate",
          created: "2014-12-10T11:35:48.479000Z",
          diameter: "12500",
          edited: "2014-12-20T20:58:18.420000Z",
          films: ["https://swapi.co/api/films/6/", "https://swapi.co/api/films/1/"],
          gravity: "1 standard",
          name: "Alderaan",
          orbital_period: "364",
          population: "2000000000",
          residents: ["https://swapi.co/api/people/5/", "https://swapi.co/api/people/68/", "https://swapi.co/api/people/81/"],
          rotation_period: "24",
          surface_water: "40",
          terrain: "grasslands, mountains",
          url: "https://swapi.co/api/planets/2/"
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
});