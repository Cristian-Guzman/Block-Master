const formulario = document.querySelector('#formulario');
const btnCorreo = document.querySelector('#btnCorreo');
const btnEditar = document.querySelector('#btnEditar');
const btnEliminar = document.querySelector('#btnEliminar');
const API = 'http://localhost:4004/usuarios';
const modal = document.querySelector(".modal");
/* const modalVideo = document.querySelector('.modal-contenido'); */

// Trae el botón que abre el modal
const btn = document.getElementById("myBtn");


// Cuando el usuario toca el botón, se abre el modal
btn.addEventListener('click', () => {
  modal.style.display = "block";
})


formulario.addEventListener('click', async e => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    if (name === "" || lastName === "" || email === "") {
        alert('Rellena todos los campos');
    } else {
        await fetch(API, {
            method: 'POST',
            body: JSON.stringify({
                name,
                lastName,
                email
            }),
            headers: {  
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        alert('Usuario guardado exitosamente');
    }
})

// btnCorreo.addEventListener('click', async e => {
//     let correo = document.querySelector('#email').value;
//     document.getElementById("email").readOnly = true;

//     const datos = await fetch(API);
//     const data = await datos.json();
//     console.log(data);
//     const buscado = data.find(user => user.email === correo)
    
//     console.log(buscado);

//     const {id, name, lastName, email} = buscado;

//     document.getElementById('id').value = id;
//     document.querySelector('#name').value = name;
//     document.querySelector('#lastName').value = lastName;
//     document.querySelector('#email').value = email;
// })

// btnEditar.addEventListener('click', async e => {
//     let name = document.querySelector('#name').value;
//     let lastName = document.querySelector('#lastName').value;
//     let email = document.querySelector('#email').value;
//     let id = document.getElementById('id').value;

//     await fetch(API +"/"+ id, {
//         method: 'PUT',
//         body: JSON.stringify({
//             name,
//             lastName,
//             email
//         }),
//         headers: {
//             "Content-Type": "application/json; charset=UTF-8"
//         }
//     });
// })

// btnEliminar.addEventListener('click', async e => {
//     const id = document.getElementById('id').value;
//     await fetch(API +"/"+ id, {
//         method: 'DELETE'
//     });
// })