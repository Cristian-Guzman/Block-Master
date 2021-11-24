import getPeliculas from "./peliculas.js";

const trailerI = 'https://api.themoviedb.org/3/movie/';
const trailerF = '/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US';
const defaultURL = 'https://www.youtube.com/embed/';
const API_TOP = 'https://api.themoviedb.org/3/movie/top_rated?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=';
const MENOS_POP = 'https://api.themoviedb.org/3/discover/movie?api_key=3fa24de710feb7c63980b6f2b06381f9&language=en-US&sort_by=vote_average.asc&include_adult=false&vote_count.gte=2500&vote_average.te=7&page=';
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

// Cuando la página carga se llaman estas funciones
document.addEventListener('DOMContentLoaded', () => {
    getData();
    formularioModal();
})

// Trae la información de cada trailer
const trailer = async (id) => {
    const response = await fetch(trailerI + id + trailerF);
    const data = await response.json();
    const { results } = data;
    const key = results[0].key;
    return key
}

// Descompone la información de la API
const getData = async () => {
    let respuesta = await fetch(API_URL);
    let data = await respuesta.json();
    let { results } = data;
    showData(results);
}

// Agrega cada película con su respectiva información.
const showData = (data) => {
    data.map(async (datos, indice) => {
        let { title, vote_average, release_date, poster_path, overview, id, backdrop_path } = datos;

        const trailerWait = await trailer(id);
        let iFrame = document.createElement('DIV');
        let card = document.createElement('DIV');
        card.classList.add('card');
        iFrame.classList.add('modal-video');
        let image;
        if(poster_path === null) {
            image = '../img/broke.png'
        } else {
            image = IMG_PATH + poster_path;
        }
        let infoCard = `
        <div class="card__puntuacion"><img src="./img/star.png"><span class="vote-average">${vote_average.toFixed(1)}</span>
        </span></div>
        <div class="card__img"><img src="${image}"></div>`;
        const iframe = `<div class="modal-contenido contenedor"><div class="poster"><img class="poster__img" src="${IMG_PATH + poster_path}" alt="">
        </div><div class="poster__info"><div class="informacion-pelicula"><h2>${title}</h2><p>${overview}.</p>
            <p>${release_date}</p>
        </div>
        <div class="botones">
          <span class="boton amarillo verAhora">
            <span><img class="slider__imagen" src="img/play.png" alt=""></span>
            <p>Ver ahora</p>
          </span>
          <span class="boton negro">
            <span><img class="slider__imagen" src="img/plus.png" alt=""></span>
            <p>Ver después</p>
          </span>
        </div>
        <button class="close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2.27604 0.390625L0.390625 2.27604L10.1146 12L0.390625 21.724L2.27604 23.6094L12 13.8854L21.724 23.6094L23.6094 21.724L13.8854 12L23.6094 2.27604L21.724 0.390625L12 10.1146L2.27604 0.390625Z" fill="#FFFFFE"/>
            </svg>
        </button>
      </div>
    <div class="modal-trailer">
        <div class="trailer" style="aspect-ratio: 16 / 9;"><iframe id="youtube-4095" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
        
        document.querySelectorAll('.card__puntuacion')[indice].classList.add(colorVoteAverage(vote_average));
        const close = document.querySelectorAll('.close')[indice];
        let modalVideo = document.querySelectorAll('.modal-video')[indice];
        let cardImg = document.querySelectorAll('.card__img')[indice];
        let mostrarTrailer = document.querySelectorAll('.modal-trailer')[indice];
        let verAhora = document.querySelectorAll('.verAhora')[indice];
        verAhora.addEventListener('click', e => {
            mostrarTrailer.classList.add('trailer-view');
        })
        cardImg.addEventListener('click', e => {
            modalVideo.style.display = 'block'; 
        })
        close.addEventListener('click', e => {
            modalVideo.style.display = 'none'; 
        })

        // Si el usuario hace click en el botón con la X o da click fuera del modal, entonces el modal se cierra
        document.addEventListener("click", function(event) {
                if (event.target.matches(".close")) modalVideo.style.display = 'none'; 
                if (event.target.matches(".modal-trailer")) mostrarTrailer.style.display = 'none';
            },
            false
        )
    })
}

try {
    async function traerPeliculas() {
        const movies = await getPeliculas();
        showData(movies)
    }
    traerPeliculas()
} catch (error) {
    console.log(error);
}

// Cambia color del borde de calificación de peliculas según su valor
function colorVoteAverage(movie) {
    if (movie < 7) {
        return "blue";
    } else {
        return "yellow";
    }
}

// Al tocar el botón "todas", este despliega todas las películas
todasValor.addEventListener('click', async e => {
    cards.innerHTML = '';
    todasValor.classList.add('active');
    masValoradas.classList.remove('active');    
    menosValoradas.classList.remove('active');    
    getData();
})

// Al tocar el botón "Mas valoradas", este despliega todas las películas más valoradas
masValoradas.addEventListener('click', async e => {
    cards.innerHTML = '';
    const response = await fetch(API_TOP);
    const data = await response.json();
    let { results } = data;
    todasValor.classList.remove('active');
    masValoradas.classList.add('active');    
    menosValoradas.classList.remove('active');    
    showData(results);
})

// Al tocar el botón "Menos valoradas", este despliega todas las películas menos valoradas
menosValoradas.addEventListener('click', async e => {
    cards.innerHTML = '';
    const response = await fetch(MENOS_POP);
    const data = await response.json();
    let { results } = data;
    todasValor.classList.remove('active');
    masValoradas.classList.remove('active');    
    menosValoradas.classList.add('active');    
    showData(results);
})

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

window.addEventListener('scroll', onScroll);