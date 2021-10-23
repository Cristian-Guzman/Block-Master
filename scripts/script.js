const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const cards = document.querySelector('.cards');
const busqueda = document.querySelector('#busqueda');
const btnSearch = document.querySelector('#search');

document.addEventListener('DOMContentLoaded', () => {
    getData();
})

const getData = async() => {
    let respuesta = await fetch(API_URL);
    let data = await respuesta.json();
    let {results} = data;
    showData(results);
}
const showData = (data) => {
    data.map(datos => {
        let {title, vote_average, release_date, poster_path, overview} = datos;
        // cardImg.innerHTML = ``;
        let card = document.createElement('DIV');
        card.classList.add('card');
        let infoCard = `
        <h1 class="card__title">${title}</h1>
        <div class="card__puntuacion"></div>
        <div class="card__img"><img src="${IMG_PATH + poster_path}"></div>`;
        card.innerHTML = infoCard;
        /* let cardPuntuacion = document.createElement('DIV').classList.add('card__puntuacion');
        let cardImg = document.createElement('DIV').classList.add('card__img'); */
        let fragment = document.createDocumentFragment();
        fragment.appendChild(card);
        cards.appendChild(fragment);
    })
}

/* Al enviar la información del query, este retorna los nombres de las películas que coinciden con la info
suministrada en el input.*/
btnSearch.addEventListener('click', async e=> {
    let busquedaValue = busqueda.value;
    let link = SEARCH_URL + busquedaValue+'"';
    let respuesta = await fetch(link);
    let data = await respuesta.json();
    const {results} = data;
    cards.innerHTML = "";
    showData(results);
    e.preventDefault();
})