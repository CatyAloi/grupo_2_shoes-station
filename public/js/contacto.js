window.addEventListener('load', function(){

    let formulario = document.querySelector("form.contact");
    

    formulario.addEventListener("submit", function(e){
        let errores = [];
        let campoNombre = document.querySelector("input.name");
        if(campoNombre.value == "") {
            errores.push("Debe colocar su Nombre y Apellido");

        } else if (campoNombre.value.length < 2) {
            errores.push("Debe tener al menos dos (2) caracteres");
        }

        let campoEmail = document.querySelector("input.email");
        if(campoEmail.value == "") {
                errores.push("Debe ingresar un correo");
    
        } 

    let campoPhone = document.querySelector("input.phone");
        if(campoPhone.value == "") {
                errores.push("Debe ingresar un número telefónico");
        }

    let campoMessage = document.querySelector("textarea.message");
        if(campoMessage.value == "") {
                errores.push("Por favor escriba su mensaje");
        } else if (campoMessage.value.length < 20) {
        errores.push("Debe tener al menos veinte (20) caracteres");
    }

        if(errores.length > 0){
            e.preventDefault();

            let ulErrores = document.querySelector("div.errores ul");
            for (let i = 0; i < errores.length; i++ ){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }

     
        }
        
                  
    });

        
    })

    

   