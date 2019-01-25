export const fetchResidents = (planets) => {
  const unresolvedPromises = planets.map(async planet => {
    if (planet.residents.length > 0) {
      let residents = [];
      let allResidents = await fetchEachResident(planet.residents);
      residents.push(...allResidents);
      return ({
        type: 'planet',
        planet: planet.name, 
        terrain: planet.terrain,
        population: planet.population,
        climate: planet.climate, 
        residents
      })
    } else {
      return ({
        type: 'planet',
        planet: planet.name, 
        terrain: planet.terrain,
        population: planet.population,
        climate: planet.climate, 
        residents: 'No Residents'
      })
    }
  })
  return Promise.all(unresolvedPromises);
}

export const fetchEachResident = (URLS) => {
  const unresolvedPromises = URLS.map(async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
  })
  return Promise.all(unresolvedPromises)
}

export const fetchHomeworld = (people) => {
  const unresolvedPromises = people.map(async person => {
    const response = await fetch(person.homeworld);
    const data = await response.json();
    return ({
      ...person,
      homeworld: data.name,
      population: data.population,
    })
  })
  return Promise.all(unresolvedPromises);
}

export const fetchSpecies = (people) => {
  const unresolvedPromises = people.map(async person => {
    if (person.species.length > 0) {
      const response = await fetch(person.species[0]);
      const data = await response.json();
      return ({
        type: 'person',
        name: person.name,
        homeworld: person.homeworld,
        population: person.population,
        species: data.name,
        language: data.language
      })
    } else {
      return ({
        type: 'person',
        name: person.name,
        homeworld: person.homeworld,
        population: person.population,
        species: 'unknown',
        language: 'unknown'
      })
    }
  })
  return Promise.all(unresolvedPromises);
}

export const distillVehicleProperties = (vehicles) => {
  const distilledVehicles = vehicles.map(vehicle => {
    return {
      type: 'vehicle',
      name: vehicle.name,
      model: vehicle.model,
      class: vehicle.vehicle_class,
      passengers: vehicle.passengers
    }
  })
  return distilledVehicles;
}