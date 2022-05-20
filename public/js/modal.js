/*
const botonesAbrirModal = document.querySelectorAll('.open-modal')

botonesAbrirModal.forEach(elemento => {
    elemento.addEventListener('click', abrirModal)
})

*/
function abrirModal(event) {
    const botonAbrirModal = event.target
    const modalObjetivo = botonAbrirModal.getAttribute('data-open-target')
    document.querySelector(modalObjetivo).classList.add('is-visible')
}


function abrirModalById(id, nombre, numeroTicket) {
   
    const modal = document.getElementById(id)

    modal.querySelector("#nombre").innerHTML = nombre
    modal.querySelector("#ticket").innerHTML = numeroTicket
    modal.classList.add('is-visible')
}




const botonesCerrarModal = document.querySelectorAll('.close-modal')

botonesCerrarModal.forEach(elemento => {
    elemento.addEventListener('click', cerrarModal)
})


function cerrarModal(event) {
    document.querySelector('.modal').classList.remove('is-visible')
}


