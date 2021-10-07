const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
fetch(getPokemonUrl(index + 1)).then(response => response.json()))


const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
	const elementTypes = types.map(typeInfo => typeInfo.type.name)



	accumulator += `


	<li class="card ${elementTypes[0]}">
		<div class="card-title">
			<h2 class="card-name">${name}</h2>
			<h2 class="card-id">${id}</h2>
		</div>
		<div class="card-pokemon">
			<img class="card-image" alt"${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" />
			<img class="card-pokeball" src="pokeball.png">
		</div>
		<h3 class="card-subtitle">${elementTypes.join(' | ')}</h3>

	</li>



	`

	
	return accumulator
}, '')



const insertPokemonsIntoPage = pokemons => {
	const ul = document.querySelector('[data-js="pokedex"]')
	ul.innerHTML = pokemons
}


  const pokemonPromises = generatePokemonPromises();
  Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage);