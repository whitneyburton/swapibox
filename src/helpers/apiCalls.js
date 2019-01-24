export const fetchFilmScript = async () => {
  const filmsURL = 'https://swapi.co/api/films/';
  const response = await fetch(filmsURL);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Error fetching films data.');
  }
}

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
    return planets;
  }
}

export const fetchPeople = async () => {
  let people = [];
  for (let i = 1; i < 3; i++) {
    try {
      const peopleURL = `https://swapi.co/api/people/?page=${i}`;
      const response = await fetch(peopleURL);
      const data = await response.json();
      people.push(...data.results);
    } catch (error) {
      console.log(error);
    } 
  }
  const peopleWithHomeworlds = await this.fetchHomeworld(people);
  const peopleWithSpecies = await this.fetchSpecies(peopleWithHomeworlds);
  this.setState({ people: peopleWithSpecies })
}