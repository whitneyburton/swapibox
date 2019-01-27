import { fetchData } from './apiCalls';
import * as cleaners from './apiCleaners';

export const fetchPlanets = async () => {
  const data = await fetchData('https://swapi.co/api/planets/');
  if (data) {
    return await cleaners.fetchResidents(data.results);
  }
};

export const fetchPeople = async () => {
  const data = await fetchData('https://swapi.co/api/people/');
  if (data) {
    const peopleWithWorlds = await cleaners.fetchHomeworld(data.results);
    return await cleaners.fetchSpecies(peopleWithWorlds);
  }
};

export const fetchVehicles = async () => {
  const data = await fetchData(`https://swapi.co/api/vehicles/`);
  if (data) {
    return await cleaners.distillVehicleProperties(data.results);
  }
};