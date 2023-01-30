// class Paginador {
//     constructor(listaObjetos, cantidadPorPagina) {
//         this.listaObjetos = listaObjetos;
//         this.cantidadPorPagina = cantidadPorPagina;
//     }
//     obtenerPagina(pagina_actual = 1) {
//         if(pagina_actual < 1) throw new Error('La pagina no puede ser menor a 1');
//         if(pagina_actual > this.obtenerCantidadDePaginas()) pagina_actual = this.obtenerCantidadDePaginas();
//         const inicio = (pagina_actual - 1) * this.cantidadPorPagina;
//         const fin = pagina_actual * this.cantidadPorPagina;
//         const elementosPorPagina = this.listaObjetos.slice(inicio, fin);
//         return elementosPorPagina;
//     }
//     obtenerCantidadDePaginas() {
//         //math.ceil es para redondear para arriba 
//         return Math.ceil(this.listaObjetos.length / this.cantidadPorPagina);
//     }
//     obtenerPaginaAnterior(pagina) {
//         return pagina === 1? 1 : (parseInt(pagina) - 1);
//     }

//     obtenerPaginaSiguiente(pagina) {
//         return pagina >= this.obtenerCantidadDePaginas()? 
//             this.obtenerCantidadDePaginas() : (parseInt(pagina) + 1);
//     }

// }

// module.exports = Paginador;

//================ Parte del Paginador (Pertenece a la vista de catalogo)
{/* <div class="control-paginas" style="justify-content: center; display:flex;">
        <%- include ('../partials/controlesPaginacion', { controlPaginas, rutaLista: "/catalogo" }) %>
</div> */}