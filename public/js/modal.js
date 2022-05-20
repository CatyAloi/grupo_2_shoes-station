
function handleOnSubmitFormContacto(event){
    event.preventDefault(); 
    const Nombre = document.getElementById("Nombre").value
    const Email = document.getElementById("Email").value
    const Telefono = document.getElementById("Telefono").value
    const mensaje = document.getElementById("mensaje").value

    //activar spinner

    axios.post('/contacto', 
    {
        Nombre, 
        Email, 
        Telefono, 
        mensaje, 

    })
      .then(function (response) {
          const informacionDesdeElServidor = response.data
          abrirModalById(
            "modal1",
            informacionDesdeElServidor.nombre, 
            informacionDesdeElServidor.numeroTicket,
            informacionDesdeElServidor.telefono,
            informacionDesdeElServidor.mensaje 
            ) 
        //ocultar spinner
      })
      .catch(function (error) {
        console.log(error);
      });
    
}

document.querySelector('#form-contacto').addEventListener("submit", handleOnSubmitFormContacto);

function abrirModalById(modalId, nombre, numeroTicket, telefono, mensaje) {
   
    const modal = document.getElementById(modalId)

    modal.querySelector("#nombre").innerHTML = nombre
    modal.querySelector("#ticket").innerHTML = numeroTicket
    modal.querySelector("#telefono").innerHTML = telefono
    modal.querySelector("#mensaje").innerHTML = mensaje    
    modal.classList.add('isVisible')
    modal.classList.remove('isNotVisible')
}

const botonesCerrarModal = document.querySelectorAll('.close-modal')

botonesCerrarModal.forEach(elemento => {
    elemento.addEventListener('click', cerrarModal)
})

function cerrarModal() {
    document.querySelector('.modal').classList.remove('isVisible')
    document.querySelector('.modal').classList.add('isNotVisible')
}


