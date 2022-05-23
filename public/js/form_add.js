
window.addEventListener('load', function(){

    let formulario = document.querySelector("form.add");

    formulario.addEventListener("submit", function(e){
        let errores = [];

        let campoNombre = document.querySelector("input.nameproduct");
        if(campoNombre.value == "") {
            errores.push("Debe colocar el Nombre del producto");

        } else if (campoNombre.value.length < 30) {
            errores.push("El Nombre del producto debe tener al menos 30 caracteres");
        }

        let campoPrecio = document.querySelector("input.priceproduct");
        if(campoPrecio.value == "") {
            errores.push("Debe colocar el Precio del producto");

        } 

        let campoDescripcion = document.querySelector("textarea.descriproduct");
        if(campoDescripcion.value == 0) {
            errores.push("Debe agregar la Descripción del producto");

       } else if (campoDescripcion.value.trim().length < 30) {
            errores.push("La Descripción debe tener al menos 30 caracteres");  
    
        }

        let campoStock = document.querySelector("input.stockproduct");
        if(campoStock.value == "") {
            errores.push("Debe agregar la cantidad de Stock del producto");
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
