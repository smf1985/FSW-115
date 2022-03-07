async function getData() {
    const pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const pokemonArr = pokemon.data.results;
    const pendingPokemonPromises = [];
    for (let i = 0; i < pokemonArr.length; i++) {
        pendingPokemonPromises.push(axios.get(pokemonArr[i].url));
    }
    Promise.all(pendingPokemonPromises)
        .then(res => getSpecies(res))
        .catch(err => console.log(err))
}

function getSpecies(data) {
    const pendingSpeciesPromises = [];
    for (let i = 0; i < data.length; i++) {
        let speciesUrl = data[i].data.species.url
        pendingSpeciesPromises.push(axios.get(speciesUrl));
    }
    Promise.all(pendingSpeciesPromises)
        .then(res => postToDOM(data))
        .catch(err => console.log(err))
}

function postToDOM(data) {
    const pokemonList = document.querySelector('#pokemonList');
    for (let i = 0; i < data.length; i++) {
        let div = document.createElement('div');
        let nameLi = document.createElement('li');
        nameLi.textContent = data[i].data.name;
        pokemonList.appendChild(div);
        div.appendChild(nameLi);
        let attributesList = document.createElement('ol');
        let heightLi = document.createElement('li');
        heightLi.textContent = `Height: ${data[i].data.height}`;
        let weightLi = document.createElement('li');
        weightLi.textContent = `Weight: ${data[i].data.weight}`;
        let orderLi = document.createElement('li');
        orderLi.textContent = `Order: ${data[i].data.order}`;
        attributesList.append(heightLi, weightLi, orderLi);
        nameLi.appendChild(attributesList);
    }
}
getData();