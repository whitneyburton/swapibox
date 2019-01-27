import * as api from './apiCalls';
import * as cleaners from './apiCleaners';

describe('Cleaners', () => {
  describe('fetchResidents', () => {
    let mockPlanets;
    let mockUrl;
    let mockResident;

    beforeEach(() => {
      mockUrl = 'https://swapi.co/api/films/';
      mockResident = { name: 'Bob' }
      mockPlanets = [{
        climate: "temperate",
        name: "Alderaan",
        population: "2000000000",
        residents: [mockUrl],
        terrain: "grasslands, mountains"
      }];
      api.fetchData = jest.fn(() => mockResident);
    });

    it('should return an array of a planet', async () => {
      const expected = [{
        climate: "temperate",
        name: "Alderaan",
        population: "2000000000",
        residents: ['Bob'],
        terrain: "grasslands, mountains",
        type: 'planet'
      }];
      const result = await cleaners.fetchResidents(mockPlanets);
      expect(result).toEqual(expected);
    })
  })

  describe('fetchEachResident', () => {
    let mockUrls;
    let mockResident;
    
    beforeEach(() => {
      mockUrls = ['mockUrl', 'mockUrl'];
      mockResident = { name: 'Bob' }
      api.fetchData = jest.fn(() => mockResident);
    });

    it('should return an array of resident names', async () => {
      const expected = ['Bob', 'Bob'];
      const result = await cleaners.fetchEachResident(mockUrls);
      expect(result).toEqual(expected);
    });

    it('should call fetchData the correct number of times', () => {
      cleaners.fetchEachResident(mockUrls);
      expect(api.fetchData).toHaveBeenCalledTimes(mockUrls.length);
    });
  });
});
