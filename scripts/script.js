const MAS_POP = '/discover/movie?sort_by=popularity.desc';
const MENOS_POP = '/discover/movie?sort_by=popularity.asc';
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page='
const API_TOP = 'https://api.themoviedb.org/3/movie/top_rated?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=';
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const cards = document.querySelector('.cards');
const busqueda = document.querySelector('#busqueda');
const btnSearch = document.querySelector('#search');
const todasValor = document.querySelector('.todas');
const masValoradas = document.querySelector('.masValoradas');
const menosValoradas = document.querySelector('.menosValoradas');
const total_pages = 5;

document.addEventListener('DOMContentLoaded', () => {
    getData();
})

const getData = async () => {
    let respuesta = await fetch(API_URL);
    let data = await respuesta.json();
    let { results } = data;
    showData(results);
    votacion(results);
}
const showData = (data) => {
    data.map(datos => {
        let { title, vote_average, release_date, poster_path, overview } = datos;

        // cardImg.innerHTML = ``;
        let card = document.createElement('DIV');
        card.classList.add('card');
        let infoCard = `
        <div class="card__puntuacion"><img src="../img/star.png"><span class="vote-average">${vote_average.toFixed(1)}</span><span class="card__puntuacion-curva">
        </span></div>
        <div class="card__img"><img src="${IMG_PATH + poster_path}"></div>`;
        card.innerHTML = infoCard;
        /* let cardPuntuacion = document.createElement('DIV').classList.add('card__puntuacion');
        let cardImg = document.createElement('DIV').classList.add('card__img'); */
        let fragment = document.createDocumentFragment();
        fragment.appendChild(card);
        cards.appendChild(fragment);
        // votacionMayor(vote_average) 
    })
}

/* const votacionMayor = (data) => {
    let cardPuntuacion = document.querySelector('.card__puntuacion');
    let cardPuntuacionCurva = document.querySelector('.card__puntuacion-curva');
    if (data > 6) {
        cardPuntuacion.style.border = '3px solid #FED941';
        cardPuntuacionCurva.style.border = '3px solid #FED941';
        cardPuntuacionCurva.style.borderLeftColor = 'transparent';
    }
    else {
        cardPuntuacion.style.border = '3px solid #0E3FA9';
        cardPuntuacionCurva.style.border = '3px solid #0E3FA9';
        cardPuntuacionCurva.style.borderLeftColor = 'transparent';

    }
}
 */
todasValor.addEventListener('click', async e => {
    cards.innerHTML = '';
    
    showData(results);
})
masValoradas.addEventListener('click', async e => {
    cards.innerHTML = '';
    const response = await fetch(API_TOP);
    const data = await response.json();
    let { results } = data;
    showData(results);
})
menosValoradas.addEventListener('click', e => {
    if (api === "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1") {
    } else {
        showData(voteLow);
    }
})
const votacion = async (api) => {
    let voteHigh = api.filter(e => e.vote_average > 6);
    let voteLow = api.filter(e => e.vote_average <= 6);
    console.log(voteHigh);
    console.log(voteLow);
}

/* Al enviar la información del query, este retorna los nombres de las películas que coinciden con la info
suministrada en el input.*/
btnSearch.addEventListener('click', async e => {
    let busquedaValue = busqueda.value;
    let link = SEARCH_URL + busquedaValue + '"';
    let respuesta = await fetch(link);
    let data = await respuesta.json();
    const { results } = data;
    cards.innerHTML = "";
    showData(results);
    e.preventDefault();
})
async function fetchMetaData() {
    let allData = [];
    let morePagesAvailable = true;
    let currentPage = 0;

    while (morePagesAvailable) {
        currentPage++;
        const response = await fetch(`${API_URL}${currentPage}`)
        let { results } = await response.json();
        results.forEach(e => allData.unshift(e));
        morePagesAvailable = currentPage < total_pages;
        //   console.log(results);
    }
    return allData;
}

/* Creando el scroll infinito */
let currentPage = 1;
const onScroll = async () => {
    if (document.body.scrollHeight - window.innerHeight === window.scrollY) {
        currentPage++;
        const response = await fetch(`${API_URL}${currentPage}`)
        let { results } = await response.json();
        showData(results);
    }
}

window.addEventListener('scroll', onScroll)

// function asignarAtributos(movie) {
//     querySelector('.card__img').setAttribute("src", IMG_PATH + movie.poster_path);
//     querySelector('card__puntuacion').setAttribute("class", colorVoteAverage(movie));
//     querySelector('.vote-average').textContent = movie.vote_average.toFixed(1);
//     const clone = cloneNode(true);
//     fragment.appendChild(clone);
// }
// let todas = document.getElementsByClassName('todas');
// todas.addEventListener('click', async () => {
//     masValoradas.setAttribute("class", "");
//     menosValoradas.setAttribute("class", "");
//     todas.setAttribute("class", "active");
//     let dataBase = await getData();
//     dataBase.forEach(movie => {
//         document.querySelector('.head-line').textContent = 'Todas las películas'
//         asignarAtributos(movie);
//     })
//     insertarAtributos(); 
// });