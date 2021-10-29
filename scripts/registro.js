const formulario = document.querySelector('#formulario');
const btnCorreo = document.querySelector('#btnCorreo');
const btnEditar = document.querySelector('#btnEditar');
const btnEliminar = document.querySelector('#btnEliminar');
const API = 'http://localhost:4000/usuarios';
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.addEventListener('click', () => {
  modal.style.display = "block";
})

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
    modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', e => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
})

formulario.addEventListener('click', async e => {
    debugger
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
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
    });
})

btnCorreo.addEventListener('click', async e => {
    let correo = document.querySelector('#email').value;
    document.getElementById("email").readOnly = true;

    const datos = await fetch(API);
    const data = await datos.json();
    console.log(data);
    const buscado = data.find(user => user.email === correo)
    
    console.log(buscado);

    const {id, name, lastName, email} = buscado;

    document.getElementById('id').value = id;
    document.querySelector('#name').value = name;
    document.querySelector('#lastName').value = lastName;
    document.querySelector('#email').value = email;
})

btnEditar.addEventListener('click', async e => {
    let name = document.querySelector('#name').value;
    let lastName = document.querySelector('#lastName').value;
    let email = document.querySelector('#email').value;
    let id = document.getElementById('id').value;

    await fetch(API +"/"+ id, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            lastName,
            email
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });
})

btnEliminar.addEventListener('click', async e => {
    const id = document.getElementById('id').value;
    await fetch(API +"/"+ id, {
        method: 'DELETE'
    });
})