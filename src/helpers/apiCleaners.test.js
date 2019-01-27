import * as api from './apiCalls';
import * as cleaners from './apiCleaners';

describe('Cleaners', () => {
  let mockUrls = ['mockUrl', 'mockUrl'];
  let mockResident = { name: 'Bob' };

  describe('fetchResidents', () => {
    let mockPlanets;
    let mockUrl;

    beforeEach(() => {
      mockUrl = 'https://swapi.co/api/films/';
      mockPlanets = [{
        climate: "temperate",
        name: "Alderaan",
        population: "2000000000",
        residents: [mockUrl],
        terrain: "grasslands, mountains"
      }];
      api.fetchData = jest.fn(() => mockResident);
    });

    afterEach(() => {
      jest.clearAllMocks();
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
    beforeEach(() => {
      api.fetchData = jest.fn(() => mockResident);
    });

    afterEach(() => {
      jest.clearAllMocks();
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


// mockData = {
//   results: [{
//     homeworld: "Tatooine",
//     name: "Luke Skywalker",
//     population: "200000",
//     species: ["https://swapi.co/api/species/1/"]
//   }]
// };
// mockPeopleWithWorlds = [{
//   homeworld: "Tatooine",
//   name: "Luke Skywalker",
//   population: "200000",
//   species: ["https://swapi.co/api/species/1/"]
// }];
// mockPeopleWithWorldsAndSpecies = [{
//   type: "person",
//   language: "Galactic Basic",
//   homeworld: "Tatooine",
//   name: "Luke Skywalker",
//   population: "200000",
//   species: "Human"
// }];