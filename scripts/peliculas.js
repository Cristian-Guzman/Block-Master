const API = 'http://localhost:4004/usuarios';
const API_REGISTRO = 'http://localhost:4000/results';

const getPeliculas = async () => {
    const response = await fetch(API_REGISTRO);
    const data = await response.json();
    return data
}
getPeliculas()


export default getPeliculas;