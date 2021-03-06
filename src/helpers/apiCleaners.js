import { fetchData } from './apiCalls';

export const fetchResidents = (planets) => {
  const unresolvedPromises = planets.map(async planet => {
    if (planet.residents.length > 0) {
      let residents = await fetchEachResident(planet.residents);
      return ({
        type: 'planet',
        name: planet.name,
        terrain: planet.terrain,
        population: planet.population,
        climate: planet.climate,
        residents: residents
      });
    } else {
      return ({
        type: 'planet',
        name: planet.name,
        terrain: planet.terrain,
        population: planet.population,
        climate: planet.climate,
        residents: ['No Residents']
      });
    }
  });
  return Promise.all(unresolvedPromises);
};

export const fetchEachResident = (URLS) => {
  const unresolvedPromises = URLS.map(async url => {
    const response = await fetchData(url);
    return response.name;
  });
  return Promise.all(unresolvedPromises);
};

export const fetchHomeworld = (people) => {
  const unresolvedPromises = people.map(async person => {
    const response = await fetchData(person.homeworld);
    return ({
      ...person,
      homeworld: response.name,
      population: response.population,
    });
  });
  return Promise.all(unresolvedPromises);
};

export const fetchSpecies = (people) => {
  const unresolvedPromises = people.map(async person => {
    if (person.species.length > 0) {
      const response = await fetchData(person.species[0]);
      return ({
        type: 'person',
        name: person.name,
        homeworld: person.homeworld,
        population: person.population,
        species: response.name,
        language: response.language
      });
    } else {
      return ({
        type: 'person',
        name: person.name,
        homeworld: person.homeworld,
        population: person.population,
        species: 'unknown',
        language: 'unknown'
      });
    }
  });
  return Promise.all(unresolvedPromises);
};

export const cleanVehicles = (vehicles) => {
  const cleanedVehicles = vehicles.map(vehicle => {
    return {
      type: 'vehicle',
      name: vehicle.name,
      model: vehicle.model,
      class: vehicle.vehicle_class,
      passengers: vehicle.passengers
    };
  });
  return cleanedVehicles;
};