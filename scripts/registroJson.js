const btnGuardar = document.querySelector('.btnGuardar');
const btnBuscar = document.querySelector('.btnBuscar');
const btnEditar = document.querySelector('.btnEditar');
const btnEliminar = document.querySelector('.btnEliminar');
const API_REGISTRO = 'http://localhost:4000/results';

// Guarda toda la información de los datos ingresados en las casillas de registro
btnGuardar.addEventListener('click', async e => {
    e.preventDefault();
    let title = document.querySelector('#titulo').value;
    let url = document.querySelector('#url').value;
    let fecha = document.querySelector('#fecha').value;
    let sinopsis = document.querySelector('#sinopsis').value;
    let promedio = document.querySelector('#promedio').value;
    if (url === "" || fecha === "" || sinopsis === "" || promedio === "") {
        alert('Rellena todos los campos');
    } else {
        await fetch(API_REGISTRO, {
            method: 'POST',
            body: JSON.stringify({
                title,
                url,
                fecha,
                sinopsis,
                promedio
            }),
            headers: {  
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        alert('Usuario guardado exitosamente');
    }
})

// Trae los datos correspondientes al usuario ingresado
btnBuscar.addEventListener('click', async e => {
    let title = document.querySelector('#titulo').value;
    document.getElementById("titulo").readOnly = true;

    const datos = await fetch(API_REGISTRO);
    const data = await datos.json();
    const buscado = data.find(user => user.title.toLowerCase() === title.toLowerCase())

    const { vote_average, release_date, poster_path, overview, id } = buscado;

    document.querySelector('#idP').value = id;
    document.querySelector('#url').value = poster_path;
    document.querySelector('#fecha').value = release_date;
    document.querySelector('#sinopsis').value = overview;
    document.querySelector('#promedio').value = vote_average;
})

// Da la opción de poder editar un usuario ya existente
btnEditar.addEventListener('click', async e => {
    let title = document.querySelector('#titulo').value;
    let id = document.getElementById('idP').value;
    let poster_path = document.querySelector('#url').value;
    let release_date = document.querySelector('#fecha').value;
    let overview = document.querySelector('#sinopsis').value;
    let vote_average = document.querySelector('#promedio').value;

    await fetch(API_REGISTRO +"/"+ id, {
        method: 'PUT',
        body: JSON.stringify({
            poster_path,
            release_date,
            overview,
            vote_average, 
            id,
            title
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
})

// Da la opción de eliminar un usuario ya creado
btnEliminar.addEventListener('click', async e => {
    const id = document.getElementById('idP').value;
    await fetch(API_REGISTRO +"/"+ id, {
        method: 'DELETE'
    });
})