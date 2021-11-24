const formulario = document.querySelector('#formulario');
const API = 'http://localhost:4004/usuarios';
const modal = document.querySelector(".modal");
/* const modalVideo = document.querySelector('.modal-contenido'); */

// Trae el botón que abre el modal
const btn = document.getElementById("myBtn");

// Cuando el usuario toca el botón, se abre el modal
btn.addEventListener('click', () => {
  modal.style.display = "block";
})

// Si el usuario hace click en el botón con la X o da click fuera del modal, entonces el modal se cierra
document.addEventListener("click", function(event) {
    if (event.target.matches(".fade")) modal.style.display = 'none';
},
false
)

// Agregando el post para poder agregar datos al login de usuario
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
