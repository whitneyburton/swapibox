import { fetchResidents, fetchHomeworld, fetchSpecies, distillVehicleProperties } from './helpers';

export const fetchFilmScript = async () => {
  const filmsURL = 'https://swapi.co/api/films/';
  const response = await fetch(filmsURL);
  if (response.ok) {
    const films = await response.json();
    return films;
  } else {
    throw new Error('Error fetching films data.');
  }
};

export const fetchPlanets = async () => {
  let planets = [];
  for (let i = 1; i < 3; i++) {
    const planetsURL = `https://swapi.co/api/planets/?page=${i}`;
    const response = await fetch(planetsURL);
    if (response.ok) {
      const data = await response.json();
      planets.push(...data.results);
    } else {
      throw new Error('Error fetching planets data');
    }
  }
  if (planets.length > 0) {
    const planetsWithResidents = await fetchResidents(planets);
    return planetsWithResidents;
  }
};

export const fetchPeople = async () => {
  let people = [];
  for (let i = 1; i < 3; i++) {
    const peopleURL = `https://swapi.co/api/people/?page=${i}`;
    const response = await fetch(peopleURL);
    if (response.ok) {
      const data = await response.json();
      people.push(...data.results);
    } else {
      throw new Error('Error fetching people data');
    }
  }
  const peopleWithHomeworlds = await fetchHomeworld(people);
  const peopleWithSpecies = await fetchSpecies(peopleWithHomeworlds);
  return peopleWithSpecies;
};

export const fetchVehicles = async () => {
  let vehicles = [];
  for (let i = 1; i < 3; i++) {
    const vehiclesURL = `https://swapi.co/api/vehicles/?page=${i}`;
    const response = await fetch(vehiclesURL);
    if (response.ok) {
      const data = await response.json();
      const allVehicles = await distillVehicleProperties(data.results);
      vehicles.push(...allVehicles)
    } else {
      throw new Error('Error fetching vehicles data');
    }
  }
  return vehicles;
}