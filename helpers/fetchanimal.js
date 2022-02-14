async function fetchAnimal () {
  const response = await fetch('https://zoo-animal-api.herokuapp.com/animals/rand');
  const data = await response.json();
  return data;
}