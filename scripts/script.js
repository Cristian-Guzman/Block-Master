const trailerI = 'https://api.themoviedb.org/3/movie/';
const trailerF = '/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US';
const defaultURL = 'https://www.youtube.com/embed/';
const API_TOP = 'https://api.themoviedb.org/3/movie/top_rated?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=';
const MENOS_POP = '/discover/movie?sort_by=popularity.asc';
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=';
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
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

const trailer = async (id) => {
    const response = await fetch(trailerI + id + trailerF);
    const data = await response.json();
    const { results } = data;
    const key = results[0].key;
    return key
}

const getData = async () => {
    let respuesta = await fetch(API_URL);
    let data = await respuesta.json();
    let { results } = data;
    showData(results);
    /* votacion(results); */
}
const showData = (data) => {
    data.map(async (datos, indice) => {
        console.log(datos);
        let { title, vote_average, release_date, poster_path, overview, id, backdrop_path } = datos;

        let iFrame = document.createElement('DIV');
        let card = document.createElement('DIV');
        const trailerWait = await trailer(id);
        card.classList.add('card');
        iFrame.classList.add('modal-video');
        let infoCard = `
        <div class="card__puntuacion"><img src="./img/star.png"><span class="vote-average">${vote_average.toFixed(1)}</span><span class="card__puntuacion-curva">
        </span></div>
        <div class="card__img"><img src="${IMG_PATH + poster_path}"></div>`;
        const iframe = `<div class="modal-contenido contenedor"><div class="poster"><img class="poster__img" src="${IMG_PATH + poster_path}" alt="">
        </div><div class="poster__info"><div class="informacion-pelicula"><h2>${title}</h2><p>${overview}.</p>
            <p>${release_date}</p>
        </div>
        <div class="botones">
          <span class="boton amarillo">
            <span><img class="slider__imagen" src="img/play.png" alt=""></span>
            <p>Ver ahora</p>
          </span>
          <span class="boton negro">
            <span><img class="slider__imagen" src="img/plus.png" alt=""></span>
            <p>Ver después</p>
          </span>
        </div>
      </div>
      <div class="" style="display: none; aspect-ratio: 16 / 9;"><iframe id="youtube-4095" frameborder="0"
          allowfullscreen="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="${title}" width="640" height="360" src="${defaultURL + trailerWait}"></iframe>
        <div class="plyr__poster"
          style="background-image: url(&quot;https://i.ytimg.com/vi/p9iFkkf0TCU/maxresdefault.jpg&quot;);">
        </div>
      </div>
    </div>`;
        iFrame.innerHTML = iframe;
        card.innerHTML = infoCard;
        
        let fragment = document.createDocumentFragment();
        card.appendChild(iFrame);
        fragment.appendChild(card);
        cards.appendChild(fragment);
        
        let modalVideo = document.querySelectorAll('.modal-video')[indice];
        let cardImg = document.querySelectorAll('.card__img')[indice];
        cardImg.addEventListener('click', e => {
            modalVideo.style.display = "block";
        })
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
menosValoradas.addEventListener('click', async e => {
    cards.innerHTML = '';
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.asc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=');
    const data = await response.json();
    let { results } = data;
    showData(results);
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