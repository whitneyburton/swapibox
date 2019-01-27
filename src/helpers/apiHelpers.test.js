import * as api from './apiCalls';
import * as helpers from './apiHelpers';
import * as cleaners from './apiCleaners';

describe('apiHelpers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('fetchPlanets', () => {
    let mockData;
    let mockPlanets;
    
    beforeEach(() => {
      mockData = {
        results: [{
          climate: "temperate",
          name: "Alderaan",
          population: "2000000000",
          residents: ["https://swapi.co/api/people/5/"],
          terrain: "grasslands, mountains",
          type: "planet"
        }]
      }
      mockPlanets = [{
        climate: "temperate",
        name: "Alderaan",
        population: "2000000000",
        residents: ["Luke Skywalker"],
        terrain: "grasslands, mountains",
        type: "planet"
      }];
      api.fetchData = jest.fn(() => mockData);
      cleaners.fetchResidents = jest.fn(() => mockPlanets);
    });

    it('should return planets if everything is ok', async () => {
      const result = await helpers.fetchPlanets();
      expect(api.fetchData).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPlanets);
    });
  });

  describe('fetchPeople', () => {
    let mockData;
    let mockPeopleWithWorlds;
    let mockPeopleWithWorldsAndSpecies;

    beforeEach(() => {
      mockData = {
        results: [{
          homeworld: "Tatooine",
          name: "Luke Skywalker",
          population: "200000",
          species: ["https://swapi.co/api/species/1/"]
        }]
      };
      mockPeopleWithWorlds = [{
        homeworld: "Tatooine",
        name: "Luke Skywalker",
        population: "200000",
        species: ["https://swapi.co/api/species/1/"]
      }];
      mockPeopleWithWorldsAndSpecies = [{
        type: "person",
        language: "Galactic Basic",
        homeworld: "Tatooine",
        name: "Luke Skywalker",
        population: "200000",
        species: "Human"
      }];
      api.fetchData = jest.fn(() => mockData);
      cleaners.fetchHomeworld = jest.fn(() => mockPeopleWithWorlds);
      cleaners.fetchSpecies = jest.fn(() => mockPeopleWithWorldsAndSpecies);
    });

    it('should return people if everything is ok', async () => {
      const result = await helpers.fetchPeople();
      expect(api.fetchData).toHaveBeenCalledTimes(1);
      expect(cleaners.fetchHomeworld).toHaveBeenCalledTimes(1);
      expect(cleaners.fetchSpecies).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPeopleWithWorldsAndSpecies);
    });
  });

  describe('fetchVehicles', () => {
    let mockData;
    let mockVehicles;

    beforeEach(() => {
      mockData = {
        results: {
          model: "Digger Crawler",
          name: "Sand Crawler",
          passengers: "30",
          vehicle_class: "wheeled"
        }
      };
      mockVehicles = [{
        model: "Digger Crawler",
        name: "Sand Crawler",
        passengers: "30",
        vehicle_class: "wheeled",
        type: "vehicle"
      }];
      api.fetchData = jest.fn(() => mockData);
      cleaners.cleanVehicles = jest.fn(() => mockVehicles);
    });

    it('should return vehicles if everything is ok', async () => {
      let result = await helpers.fetchVehicles();
      expect(api.fetchData).toHaveBeenCalledTimes(1);
      expect(cleaners.cleanVehicles).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockVehicles);
    });
  });
});