window.addEventListener('load', function(){

    let formulario = document.querySelector("form.registro");
    

    formulario.addEventListener("submit", function(e){
        let errores = [];
        let campoNombre = document.querySelector("input.name");
        if(campoNombre.value == "") {
            errores.push("Debe ingresar su Nombre");

        } else if (campoNombre.value.length < 2) {
            errores.push("El campo del Nombre debe tener al menos dos (2) caracteres");
        }

        let campoApellido = document.querySelector("input.lastname");
        if(campoApellido.value == "") {
            errores.push("Debe ingresar su Apellido");

        } else if (campoApellido.value.length < 2) {
            errores.push("El campo Apellido debe tener al menos dos (2) caracteres");
        }

        let campoPhone = document.querySelector("input.phone");
        if(campoPhone.value == "") {
                errores.push("Debe ingresar un número de teléfono");
        } else if (campoPhone.value.length < 11) {
            errores.push("El campo Teléfono debe tener al menos once (11) digitos");
        }

       

        let campoEmail = document.querySelector("input.email");
        if(campoEmail.value == "") {
                errores.push("Debe ingresar un email válido");
    
        } 

           let campoClave = document.querySelector("input.clave");
        if(campoClave.value == "") {
                errores.push("Debe ingresar una Contraseña");
        } else if (campoClave.value.length < 8) {
                errores.push("La Contraseña debe tener mínimo ocho (08) caracteres");
        }
    

        if(errores.length > 0){
            e.preventDefault();
            
            let ulErrores = document.querySelector("div.errores ul");
            ulErrores.innerHTML = ""
            for (let i = 0; i < errores.length; i++ ){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }

     
        }
        
                  
    });

})