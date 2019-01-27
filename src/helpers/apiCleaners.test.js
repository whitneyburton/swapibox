import * as api from './apiCalls';
import * as cleaners from './apiCleaners';

describe('Cleaners', () => {
  let mockUrls = ['mockUrl', 'mockUrl'];
  let mockResident = { name: 'Luke Skywalker' };

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

    it('should return an array of planet(s)', async () => {
      const expected = [{
        climate: "temperate",
        name: "Alderaan",
        population: "2000000000",
        residents: ["Luke Skywalker"],
        terrain: "grasslands, mountains",
        type: "planet"
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
      const expected = ['Luke Skywalker', 'Luke Skywalker'];
      const result = await cleaners.fetchEachResident(mockUrls);
      expect(result).toEqual(expected);
    });

    it('should call fetchData the correct number of times', () => {
      cleaners.fetchEachResident(mockUrls);
      expect(api.fetchData).toHaveBeenCalledTimes(mockUrls.length);
    });
  });

  describe('fetchHomeworld', () => {
    let mockData;
    let mockPeople;
    let mockUrl;

    beforeEach(() => {
      mockUrl = 'https://swapi.co/api/people/';
      mockPeople = [{
        name: "Luke Skywalker",
        homeworld: [mockUrl]}, 
      ];
      mockData = {
        name: "Naboo",
      };
      api.fetchData = jest.fn(() => mockData);
    });

    it('should return an array of people with homeworlds', async () => {
      const expected = [{
        homeworld: "Naboo",
        name: "Luke Skywalker",
      }];
      const result = await cleaners.fetchHomeworld(mockPeople);
      expect(result).toEqual(expected);
    });

    it('should call fetchData the correct number of times', () => {
      cleaners.fetchHomeworld(mockPeople);
      expect(api.fetchData).toHaveBeenCalledTimes(mockPeople.length);
    });
  });

  describe('fetchSpecies', () => {
    let mockData;
    let mockPeople;
    let mockUrl;

    beforeEach(() => {
      mockUrl = 'https://swapi.co/api/people/';
      mockPeople = [{
        homeworld: "Tatooine",
        name: "Luke Skywalker",
        population: "200000",
        species: [mockUrl],
      }];
      mockData = {
        name: "Human",
        language: "Galactic Basic"
      };
      api.fetchData = jest.fn(() => mockData);
    });

    it('should return an array of people with species', async () => {
      const expected = [{
        homeworld: "Tatooine",
        language: "Galactic Basic",
        name: "Luke Skywalker",
        population: "200000",
        species: "Human",
        type: "person"
      }];
      const result = await cleaners.fetchSpecies(mockPeople);
      expect(result).toEqual(expected);
    });

    it('should call fetchData the correct number of times', () => {
      cleaners.fetchSpecies(mockPeople);
      expect(api.fetchData).toHaveBeenCalledTimes(mockPeople.length);
    });
  });

  describe('cleanVehicles', () => {
    let mockVehicles;

    beforeEach(() => {
      mockVehicles = [{
        model: "Digger Crawler",
        name: "Sand Crawler",
        passengers: "30",
        vehicle_class: "wheeled"
      }];
    });
    
    it('should return an array of vehicles', async () => {
      const expected = [{
        type: "vehicle",
        model: "Digger Crawler",
        name: "Sand Crawler",
        passengers: "30",
        class: "wheeled"
      }]
      const result = await cleaners.cleanVehicles(mockVehicles);
      expect(result).toEqual(expected)
    });
  });
});