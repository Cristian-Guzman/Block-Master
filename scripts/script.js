const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const cards = document.querySelector('.cards');

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
    console.log(data);
    data.map(datos => {
        let {title, vote_average, release_date, poster_path, overview} = datos;
        console.log(datos);
        // cardImg.innerHTML = ``;
        let card = document.createElement('DIV');
        let infoCard = `
        <div class="card__puntuacion"></div>
        <div class="card__img"><img src="${IMG_PATH + poster_path}">
        </div>`;
        card.innerHTML = infoCard;
        /* let cardPuntuacion = document.createElement('DIV').classList.add('card__puntuacion');
        let cardImg = document.createElement('DIV').classList.add('card__img'); */
        let fragment = document.createDocumentFragment();
        fragment.appendChild(card);
        cards.appendChild(fragment);
    })
}
