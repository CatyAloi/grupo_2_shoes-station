
var elements = document.querySelectorAll('.talle_radio')
elements.forEach(function(element){
    
    element.addEventListener("click", function(){
      
       let botonagregar = document.getElementById("botonag");
       
       if (this.checked==true){
           
        botonagregar.disabled = false
        botonagregar.style.backgroundImage = "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)" ;
        
       
    }else{
        botonagregar.disable = true;
    }
});


})

