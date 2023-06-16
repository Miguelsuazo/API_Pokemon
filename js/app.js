let allPokemon = [""]; //array with all original pokemon without info 

/*fetch all pokemon name,id from https://pokeapi.co/docs/v2*/
async function getAllpokeNames() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=1010';
    let response = await fetch(url);
    let responseAsJson = await response.json();//we get all pokemon

    for (let index in responseAsJson.results) {//push in a array all pokemon
        allPokemon.push({
            id: (parseInt(index) + 1),
            name: responseAsJson.results[index].name,
            types: []
        });
    }
    getAllPTypes();

};

/*fetch all types from https://pokeapi.co/docs/v2 */
async function getAllPTypes() {
    for (let i = 0; i < 18; i++) {
        let url = 'https://pokeapi.co/api/v2/type/' + (i + 1)
        let response = await fetch(url)
        let responseAsJson = await response.json()//we get the 19 types of pokemon and the pokemon that belong to them.
        const wichTypePoke = responseAsJson.pokemon //which pokemon belongs to which type

        for (let x = 0; x < wichTypePoke.length; x++) {
            idPoke = wichTypePoke[x].pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
            if (allPokemon[idPoke] && idPoke <= allPokemon.length) { //if the id is the same then we put it inside the array
                allPokemon[idPoke].types.unshift(responseAsJson.name);
            }
        }
    }
    loadingPokemon();
};

//fetch all pokemon info from api https://pokeapi.co/docs/v2*/
async function fetchPokemonInfo(id) {
    const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const urlSpecies = 'https://pokeapi.co/api/v2/pokemon-species/' + id;
    const responsePokemon = await fetch(urlPokemon);
    const responseSpecies = await fetch(urlSpecies);
    const pokemon = await responsePokemon.json();
    const species = await responseSpecies.json();
    
    const reponseEvolutions = await fetch(species.evolution_chain.url);
    const evolution_chain = await reponseEvolutions.json();

    setPokemonInfo(pokemon, id, species);
    setPokemonStats(pokemon);
    setPokemonAbilities(pokemon);
    setEvolutionChain(evolution_chain);
        
};

//loading more pokemon in main container
function loadingPokemon() {
    allPokemon.shift();
    thisList = allPokemon;
    updatePokemonList();
}