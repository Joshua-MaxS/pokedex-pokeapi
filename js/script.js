const pokemonList = document.querySelector('#pokemon-list');
const btnHeaders = document.querySelectorAll('.btn-header');

for (let i = 1; i < 151; i++) {
	const URL = `https://pokeapi.co/api/v2/pokemon/${i}`;
	fetch(URL)
		.then(response => response.json())
		.then(data => showPokemon(data));
}

const showPokemon = poke => {
	let types = poke.types.map(
		type => `
  <p class="${type.type.name} type">${type.type.name}</p>
  `,
	);
	types = types.join('');

	let pokeId = poke.id.toString();
	if (pokeId.length === 1) {
		pokeId = `00${pokeId}`;
	} else if (pokeId.length === 2) {
		pokeId = `0${pokeId}`;
	}

	const div = document.createElement('div');
	div.classList.add('pokemon');
	div.innerHTML = `<p class="pokemon-id-back">#${pokeId}</p>

  <div class="pokemon-img">
    <img
      src=${poke.sprites.other['official-artwork'].front_default}
      alt="${poke.name}"
    />
  </div>

  <div class="pokemon-inf">
    <div class="name-container">
      <p class="pokemon-id">#${pokeId}</p>

      <h2 class="pokemon-name">${poke.name}</h2>
    </div>

    <div class="pokemon-types">
      ${types}
    </div>

    <div class="pokemon-stats">
      <p class="stat">${poke.height}M</p>
      <p class="stat">${poke.weight}KG</p>
    </div>
  </div>`;
	pokemonList.appendChild(div);
};

btnHeaders.forEach(btn => {
	btn.addEventListener('click', event => {
		const btnId = event.currentTarget.id;

		pokemonList.innerHTML = '';

		for (let i = 1; i < 151; i++) {
			const URL = `https://pokeapi.co/api/v2/pokemon/${i}`;
			fetch(URL)
				.then(response => response.json())
				.then(data => {
					if (btnId === 'all') {
						showPokemon(data);
					} else {
						const types = data.types.map(type => type.type.name);

						if (types.some(type => type.includes(btnId))) {
							showPokemon(data);
						}
					}
				});
		}
	});
});
