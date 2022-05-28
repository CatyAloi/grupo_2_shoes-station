const botonEnviarConsulta = document.querySelector("#enviar-consulta")

botonEnviarConsulta.addEventListener("click", enviarFormulario)


function enviarFormulario(event) {
    event.preventDefault() // evita que se envie el formulario al servidor

    const nombre = document.getElementById("nombre").value
    const email = document.getElementById("email").value
    const telefono = document.getElementById("telefono").value
    const mensaje = document.getElementById("mensaje").value


    //activar spinner

    axios.post('/contacto', 
    {
        nombre, 
        email, 
        telefono, 
        mensaje
    })
      .then(function (response) {
          const informacionDesdeElServidor = response.data.data
          console.log(informacionDesdeElServidor);
          abrirModalById(
            "modal1",
            informacionDesdeElServidor.nombre, 
            informacionDesdeElServidor.numeroTicket)
        //ocultar spinner
      })
      .catch(function (error) {
        console.log(error);
      });
    


}
