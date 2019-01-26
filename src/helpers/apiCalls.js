import { fetchResidents, fetchHomeworld, fetchSpecies, distillVehicleProperties } from './apiHelpers';

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
  const planetsURL = 'https://swapi.co/api/planets/';
  const response = await fetch(planetsURL);
  if (response.ok) {
    const data = await response.json();
    const planetsWithResidents = await fetchResidents(data.results);
    return planetsWithResidents;
  } else {
    throw new Error('Error fetching planets data');
  }
};

export const fetchPeople = async () => {
  const peopleURL = 'https://swapi.co/api/people/';
  const response = await fetch(peopleURL);
  if (response.ok) {
    const data = await response.json();
    const peopleWithHomeworlds = await fetchHomeworld(data.results);
    const peopleWithSpecies = await fetchSpecies(peopleWithHomeworlds);
    return peopleWithSpecies;
  } else {
    throw new Error('Error fetching people data');
  }
};

export const fetchVehicles = async () => {
    const vehiclesURL = `https://swapi.co/api/vehicles/?page=1`;
    const response = await fetch(vehiclesURL);
    if (response.ok) {
      const data = await response.json();
      const allVehicles = await distillVehicleProperties(data.results);
      return allVehicles;
    } else {
      throw new Error('Error fetching vehicles data');
    }
}