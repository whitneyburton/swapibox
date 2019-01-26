import { fetchResidents, fetchHomeworld, fetchSpecies, distillVehicleProperties } from './apiHelpers';

export const fetchData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Error fetching data.')
  }
}

export const fetchPlanets = async () => {
  const data = await fetchData('https://swapi.co/api/planets/');
  if (data) {
    return await fetchResidents(data.results);
  }
};

export const fetchPeople = async () => {
  const data = await fetchData('https://swapi.co/api/people/');
  if (data) {
    const peopleWithHomeworlds = await fetchHomeworld(data.results);
    return await fetchSpecies(peopleWithHomeworlds);
  }
};

export const fetchVehicles = async () => {
  const data = await fetchData(`https://swapi.co/api/vehicles/?page=1`);
  if (data) {
    return await distillVehicleProperties(data.results);
  }
}