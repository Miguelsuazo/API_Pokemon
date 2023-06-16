const pokeDex = document.getElementById('pokedex-container');//container Pokemon
let showPokemon = 0;//
let numberShowPoke = 29;//
let thisList = [];// List



//object with all type colors
const valuesColor =
{
    'grass': '#91F291',
    'fire': '#FF4211',
    'water': '#6390F0',
    'bug': '#A6B91A',
    'normal': '#A8A77A',
    'electric': 'yellow',
    'poison': '#B388EB',
    'fighting': '#C22E28',
    'psychic': '#e5709b',
    'ice': 'aquamarine',
    'rock': '#B6A136',
    'ground': 'sienna',
    'dragon': 'mediumpurple',
    'fairy': 'pink',
    'ghost': '#7B6D8D',
    'flying': 'turquoise',
    'dark': '#5C6660',
    'steel': '#89a1b0'
};

//update list of pokemon in main page
function updatePokemonList() {
    if (showPokemon <= numberShowPoke) {
        createContainerPoke(showPokemon);
    };
};

//create container of pokemon
function createContainerPoke(nPokeShow) {
    if (thisList[nPokeShow]) {
        document.getElementById('pokedex-container').insertAdjacentHTML('beforeend', `
        <div onclick="openInfo(${thisList[nPokeShow].id})" class="container-poke" style="background: white">        
            <span>N° ${thisList[nPokeShow].id}</span>   
            <img class="img-pokemon poke-data" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${thisList[nPokeShow].id}.png">
            <h3>${thisList[nPokeShow].name}</h3>
            ${getTypeContainer(thisList[nPokeShow].types)}
            </div>`)
        showPokemon += 1;
        updatePokemonList();
    }
};

//if it reaches the maximum scroll bar then add more pokemon
function addPokemonScroll() {
    if (window.scrollY + 100 >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
        incrementShowPoke(30);
        updatePokemonList();
    };
};

//extension of addPokemonScroll
function incrementShowPoke(addShow) {

    if (numberShowPoke + addShow <= thisList.length) {
        numberShowPoke += addShow;
    } else {
        numberShowPoke = thisList.length - 1;
    };
};

//tranform string to array and add Capitalize: > return array
function dressUpPayloadValue(string) {
    let splitStr = string.toLowerCase().split('-');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    };
    return splitStr.join(' ');
};

//set color in modalsContainer
function setColorContainer(color) {
    let container = document.getElementById('color-container');

    container.style.backgroundColor = color;

}

//obtain pokemon types
function getTypeContainer(arrays) {
    let templateHtml = '<div class="type-main">';

    for (let i = 0; i < arrays.length; i++) {
        templateHtml += `<div class="type-container" style="background: ${valuesColor[(arrays[i])]};"><h4>${arrays[i]}</h4>
        </div>`;
    };
    setColorContainer(valuesColor[(arrays[0])]);
    return templateHtml + '</div>';
}

//function search bar
function search() {
    setTimeout(function () {
        let searchResults = [];
        for (let i = 0; i < allPokemon.length; i++) {
            if (allPokemon[i].name) {
                if (allPokemon[i].name.replaceAll('-', ' ').includes(document.getElementById('search-pokemon').value.toLowerCase())) {
                    searchResults.push(allPokemon[i]);
                };
            };
        };
        document.getElementById('pokedex-container').innerHTML = '';
        thisList = searchResults;
        showPokemon = 0;
        numberShowPoke = 0;

        incrementShowPoke(30);
        updatePokemonList();

    }, 1);
};

//clean searchBar
document.getElementById('search-pokemon').value = '';

//get all pokemon from API
document.addEventListener('onload', getAllpokeNames());

//for addPokemonScroll()
window.addEventListener('scroll', function () {
    addPokemonScroll();
});

//close the modal if click outside and remove gray background.
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('open-container-poke') || e.target.classList.contains('container-close')) {
        document.getElementById('search').classList.remove('hide');
        document.getElementById('current-pokemon-info').classList.add('hide');
        document.querySelector('.open-container-poke').classList.remove('show');
        setColorContainer();
    }
});

