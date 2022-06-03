// Funciones generales //

function mostrarOcultarModales(clase, modal) {
    switch (modal) {
        case 'modalImportarChistes':
            modalImportarChistes.classList.toggle(clase);
            break;
        case 'modalExportarChistes':
            modalExportarChistes.classList.toggle(clase);
            break;
        case 'modalCrear':
            modalCrear.classList.toggle(clase);
            break;
        case 'modalEditar':
            modalEditar.classList.toggle(clase);
            break;
        default:
            console.log("La función mostrarOcultarModales se ha roto en clase " + clase + " y modal " + modal);
    }

}

function desactivarActivarScroll(clase, modal) {
    switch (modal) {
        case 'modalImportarChistes':
            if (!modalImportarChistes.classList.contains(clase)) {
                // A futuro: hacerlor con una clase para que no salga un style en el body 
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
            break;
        case 'modalExportarChistes':
            if (!modalExportarChistes.classList.contains(clase)) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
            break;
        case 'modalCrear':
            if (!modalCrear.classList.contains(clase)) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
            break;
        case 'modalEditar':
            if (!modalEditar.classList.contains(clase)) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
            break;
        default:
            console.log("La función desactivarActivarScroll se ha roto en clase " + clase + " y modal " + modal);
    }

}

botonCerrarImportarChistes.onclick = function () {
    mostrarOcultarModales('ocultarImportarChistes', 'modalImportarChistes');
    desactivarActivarScroll('ocultarImportarChistes', 'modalImportarChistes');
}

botonCerrarExportar.onclick = function () {
    mostrarOcultarModales('ocultarExportarChistes', 'modalExportarChistes');
    desactivarActivarScroll('ocultarExportarChistes', 'modalExportarChistes');
}

botonCerrarCrearChistes.onclick = function () {
    mostrarOcultarModales('ocultarCrearChiste', 'modalCrear');
    desactivarActivarScroll('ocultarCrearChiste', 'modalCrear');
}

botonCerrarModificarChiste.onclick = function () {
    mostrarOcultarModales('ocultarModificarChiste', 'modalEditar');
    desactivarActivarScroll('ocultarModificarChiste', 'modalEditar');
}

function dibujarTabla(objetoChistes) {
    for (const elemento in objetoChistes) {
        let cadena = `<tr>
                    <td>${objetoChistes[elemento].titulo}</td>
                    <td>${objetoChistes[elemento].chiste}</td>
                    <td>${objetoChistes[elemento].categoria}</td>
                    <td>${objetoChistes[elemento].valoracion}/10</td>`;

        cadena += `
                    <td>
                    <button title="Borrar chiste" type="button" class="botonGeneral boton-borrar-chiste" onclick="borrarChisteEsp(this)" data-ide="${objetoChistes[elemento].id}">
                        <i class="bi bi-shield-fill-x"></i>
                    </button>
                    <button title="Editar chiste" type="button" class="botonGeneral" onclick="modificarChisteEsp(this)" data-ide="${objetoChistes[elemento].id}">
                        <i class="bi bi-archive-fill"></i>
                    </button>
                    </td>
                    </tr>
                    `;
        cuerpoTabla.innerHTML += cadena;
    }

}

// Fin Funciones generales //

//////// COMPRUEBA SI HAY DATOS EN EL localStorege Y SI HAY LOS PINTA ////////////////////

let listaChistesLS = localStorage.getItem('listaChistes');

if (listaChistesLS) {
    chistesAlmacenados = localStorage.getItem('listaChistes');
    chistesAlmacenadosObjeto = JSON.parse(chistesAlmacenados);
    dibujarTabla(chistesAlmacenadosObjeto);
}

//////// FIN COMPRUEBA SI HAY DATOS EN EL localStorege Y SI HAY LOS PINTA ////////////////////

//////// Botonazo para borrar todos los chistes de la tabla y del localStorage /////////////
// A futuro: un modal
botonBorrarTodos.onclick = function () {
    //localStorage.removeItem('listaChistes');
    localStorage.clear();
    cuerpoTabla.innerHTML = "";
}

//////// FIN Botonazo para borrar todos los chistes de la tabla y del localStorage /////////////


//////// BOTON Borrar chiste especifico /////////
// A futuro: modal para confirmar

function borrarChisteEsp(elemento) {
    let indiceExtraido = elemento.dataset.ide;
    let indiceNumerando = 1;
    let objetoAuxiliar = {};

    chistesAlmacenados = localStorage.getItem('listaChistes');
    chistesAlmacenadosObjeto = JSON.parse(chistesAlmacenados);
    // funcion recursiva
    function eliminarObjeto(objetoChistes, indice) {
        for (k in objetoChistes) {
            if (k == indice) {
                delete objetoChistes[k];
            } else if (typeof objetoChistes[k] === 'object') {
                eliminarObjeto(objetoChistes[k], indice);
            }
        }
    }
    eliminarObjeto(chistesAlmacenadosObjeto, indiceExtraido);
    chistesAlmacenados = JSON.stringify(chistesAlmacenadosObjeto);
    localStorage.removeItem("listaChistes");
    localStorage.setItem("listaChistes", chistesAlmacenados);

    cuerpoTabla.innerHTML = "";
    dibujarTabla(chistesAlmacenadosObjeto);

}

  //////// FIN BOTON Borrar chiste especifico /////////