/**open container when click at pokemon */
function openInfo(id) {
    document.getElementById('open-container-poke').classList.add('show');
    document.getElementById('search').classList.add('hide');
    fetchPokemonInfo(id);
    updateCurrentPokemonImage(id);
};

//set pokemon image (sprite if have one)
function updateCurrentPokemonImage(id) {
    const currentPokemonImage = document.getElementById('poke-image-container');
    const img = new Image();

    img.onload = function () {
        currentPokemonImage.src = this.src;
    };

    if (id >= 650) {//no animated pokemon sprites >650 in BW
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
            + id + '.png';
    } else {
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + id + '.gif';
    };
};

//set pokemon info(description), id, name, types, height and weitgh.
function setPokemonInfo(pokemon, id, species) {
    document.getElementById('current-pokemon-info').classList.remove('hide');
    document.getElementById('current-pokemon-id').innerHTML = 'N° ' + pokemon.id;
    document.getElementById('current-pokemon-name').innerHTML = dressUpPayloadValue(pokemon.name);
    //to search pokemon
    if (thisList.length < 1010) {
        for (const key in thisList) {
            thisList.find(e => {
                if (e.id == id) {
                    let pokeArray = [e]
                    document.getElementById('current-pokemon-types').innerHTML = getTypeContainer(pokeArray[0].types);
                    document.getElementById('current-pokemon-types').innerHTML = getTypeContainer(pokeArray[0].types);
                }
            })
        };
    } else {
        document.getElementById('current-pokemon-types').innerHTML = getTypeContainer(thisList[id - 1].types);
        document.getElementById('current-pokemon-types').innerHTML = getTypeContainer(thisList[id - 1].types);
    }

    document.getElementById('current-pokemon-height').innerHTML = pokemon.height / 10 + 'm';
    document.getElementById('current-pokemon-weight').innerHTML = pokemon.weight / 10 + 'kg';

    for (i = 0; i < species.flavor_text_entries.length; i++) {
        if (species.flavor_text_entries[i].language.name == 'en') {
            document.getElementById('current-pokemon-description').innerHTML = dressUpPayloadValue(species.flavor_text_entries[i].flavor_text.replace('', ' '));

            break;
        };
    };
};

//set base stats pokemon and total
function setPokemonStats(pokemon) {
    document.getElementById('current-pokemon-stats-atk').innerHTML = pokemon.stats[0].base_stat;
    document.getElementById('current-pokemon-stats-hp').innerHTML = pokemon.stats[1].base_stat;
    document.getElementById('current-pokemon-stats-def').innerHTML = pokemon.stats[2].base_stat;
    document.getElementById('current-pokemon-stats-spa').innerHTML = pokemon.stats[3].base_stat;
    document.getElementById('current-pokemon-stats-spd').innerHTML = pokemon.stats[4].base_stat;
    document.getElementById('current-pokemon-stats-speed').innerHTML = pokemon.stats[5].base_stat;
    document.getElementById('current-pokemon-stats-total').innerHTML = pokemon.stats[0].base_stat + pokemon.stats[1].base_stat + pokemon.stats[2].base_stat + pokemon.stats[3].base_stat + pokemon.stats[4].base_stat + pokemon.stats[5].base_stat;
};

//set pokemon abilities
function setPokemonAbilities(pokemon) {
    document.getElementById('current-pokemon-abilitiy-0').innerHTML = dressUpPayloadValue(pokemon.abilities[0].ability.name);
    if (pokemon.abilities[1]) {
        document.getElementById('current-pokemon-abilitiy-1').classList.remove('hide');
        document.getElementById('current-pokemon-abilitiy-1').innerHTML = dressUpPayloadValue(pokemon.abilities[1].ability.name);
    } else {
        document.getElementById('current-pokemon-abilitiy-1').classList.add('hide');
    };
};

//set all evolutions 
function setEvolutionChain(evolutionChain) {
    const chain = evolutionChain.chain
    const chainContainer = document.getElementById('current-pokemon-evolution-chain-container')
    const chainImages = [document.getElementById('current-pokemon-evolution-0'), document.getElementById('current-pokemon-evolution-1'), document.getElementById('current-pokemon-evolution-2')]
    const chainLevels = [document.getElementById('current-pokemon-evolution-level-0'), document.getElementById('current-pokemon-evolution-level-1')]

    if (chain.evolves_to.length != 0) {
        chainContainer.classList.remove('hide');

        setEvolution(chain, 0);

        if (chain.evolves_to[0].evolves_to.length != 0) {
            setEvolution(chain.evolves_to[0], 1);

            chainImages[2].classList.remove('hide');
            chainLevels[1].classList.remove('hide');
        } else {
            chainImages[2].classList.add('hide');
            chainLevels[1].classList.add('hide');
        };
    } else {
        chainContainer.classList.add('hide');
    };
};

function setEvolution(chain, no) {
    const chainImages = [document.getElementById('current-pokemon-evolution-0'), document.getElementById('current-pokemon-evolution-1'), document.getElementById('current-pokemon-evolution-2')];
    const chainLevels = [document.getElementById('current-pokemon-evolution-level-0'), document.getElementById('current-pokemon-evolution-level-1')];

    chainImages[no].src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + filterIdFromSpeciesURL(chain.species.url) + '.png';
    chainImages[no].setAttribute('onClick', 'javascript: ' + 'openInfo(' + filterIdFromSpeciesURL(chain.species.url) + ')');
    chainImages[no + 1].src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + filterIdFromSpeciesURL(chain.evolves_to[0].species.url) + '.png';
    chainImages[no + 1].setAttribute('onClick', 'javascript: ' + 'openInfo(' + filterIdFromSpeciesURL(chain.evolves_to[0].species.url) + ')');

    if (chain.evolves_to[0].evolution_details[0].min_level) {
        chainLevels[no].innerHTML = 'Lv. ' + chain.evolves_to[0].evolution_details[0].min_level;
    } else {
        chainLevels[no].innerHTML = '?';
    };
};

//a simple replace to delete '/' from 
function filterIdFromSpeciesURL(url) {
    return url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
};


