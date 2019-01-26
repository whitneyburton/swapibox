export const fetchData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    console.log(data)
    return data;
  } else {
    throw new Error('Error fetching data.')
  }
};