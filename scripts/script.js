const MAS_POP = '/discover/movie?sort_by=popularity.desc';
const MENOS_POP = '/discover/movie?sort_by=popularity.asc';
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page='
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const cards = document.querySelector('.cards');
const busqueda = document.querySelector('#busqueda');
const btnSearch = document.querySelector('#search');
const todasValor = document.querySelector('.todas');
const masValoradas = document.querySelector('.masValoradas');
const menosValoradas = document.querySelector('.menosValoradas');

document.addEventListener('DOMContentLoaded', () => {
    getData();
})

const mostrarInformacion = async () => {
    let respuesta = await fetch('https://api.themoviedb.org/3/movie/550?api_key=3fd2be6f0c70a2a598f084ddfb75487c&' + MENOS_POP);
    let datos = await respuesta.json();
    console.log(datos);
}
mostrarInformacion()

const getData = async() => {
    let respuesta = await fetch(API_URL);
    let data = await respuesta.json();
    let {results} = data;
    showData(results);
    votacion();
}
const showData = (data) => {
    data.map(datos => {
        let {title, vote_average, release_date, poster_path, overview} = datos;
        // cardImg.innerHTML = ``;
        let card = document.createElement('DIV');
        card.classList.add('card');
        let infoCard = `
        <div class="card__puntuacion"><img src="../img/star.png"><span>${vote_average.toFixed(1)}</span><span class="card__puntuacion-curva"></span></div>
        <div class="card__img"><img src="${IMG_PATH + poster_path}"></div>`;
        card.innerHTML = infoCard;  
        /* let cardPuntuacion = document.createElement('DIV').classList.add('card__puntuacion');
        let cardImg = document.createElement('DIV').classList.add('card__img'); */
        let fragment = document.createDocumentFragment();
        fragment.appendChild(card);
        cards.appendChild(fragment);
    })
}

const votacion = async() => {
    
    let respuesta = await fetch(API_URL+"1");
    let data = await respuesta.json();
    const {results} = data;
    let cardPuntuacion = document.querySelectorAll('.card__puntuacion');
    let cardPuntuacionCurva = document.querySelectorAll('.card__puntuacion-curva');
    let voteHigh = results.filter(e => e.vote_average > 6.0);
    let voteLow = results.filter(e => e.vote_average < 6.0);

    voteHigh.forEach((e,i) => {
        cardPuntuacion[i].style.border = '3px solid #FED941';
        cardPuntuacionCurva[i].style.border = '3px solid #FED941';
        cardPuntuacionCurva[i].style.borderLeftColor = 'transparent';
    })
    masValoradas.addEventListener('click', e =>{
        cards.innerHTML = '';
        showData(voteHigh);
        console.log('funciona bb');
    })
    menosValoradas.addEventListener('click', e =>{
        cards.innerHTML = '';
        showData(voteLow);
        console.log('funciona bb');
    })
    voteLow.forEach((e) => {
        // cardPuntuacion[i].style.border = '3px solid #0E3FA9';
        // cardPuntuacionCurva[i].style.border = '3px solid #0E3FA9';
        // cardPuntuacionCurva[i].style.borderLeftColor = 'transparent';
        // console.log(e);
    })
        // console.log(voteLow);
        // console.log(voteHigh);
    // results.forEach((datos, i) => {
        //     const {vote_average} = datos;
        //         let array = [];
    //     if (vote_average > 6) {
    //         let objetos = datos;
    //         // console.log(objetos);
    //         // masValoradas.addEventListener('click', e => {
    //             // })
    //         } else {
    //         }
    //         // console.table(array);
    // });
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
async function fetchMetaData() {
    let allData = [];
    let morePagesAvailable = true;
    let currentPage = 0;
    const total_pages = 100;
  
    while(morePagesAvailable) {
      currentPage++;
      const response = await fetch(`${API_URL}${currentPage}`)
      let { results } = await response.json();
      results.forEach(e => allData.unshift(e));
      morePagesAvailable = currentPage < total_pages;
    //   console.log(results);
    }
    // console.log(allData);
    return allData;
  }
  console.log(fetchMetaData())
  
/* Creando el scroll infinito */
let currentPage = 1;
const onScroll = async() => {
if (document.body.scrollHeight - window.innerHeight === window.scrollY) {
    let morePagesAvailable = true;

    while(morePagesAvailable) {
        currentPage++;
        const response = await fetch(`${API_URL}${currentPage}`)
        let { results } = await response.json();
        showData(results)
        morePagesAvailable = currentPage < total_pages;
      }
    }
}

window.addEventListener('scroll', onScroll) 