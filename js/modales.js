//////// MODAL IMPORTAR CHISTES ////////////////////

// A futuro: si hay algo dentro del localStorage que no lo machaque y lo añada

botonImportarChistes.onclick = function () {

    mostrarOcultarModales('ocultarImportarChistes', 'modalImportarChistes');
    desactivarActivarScroll('ocultarImportarChistes', 'modalImportarChistes');

    inputArchivo.addEventListener("change", handleFiles);
    function handleFiles() {
        // A futuro: un modal personalidado
        alert("Archivo cargado!");
        const fileList = this.files;

        let miArchivo = fileList[0];


        let reader = new FileReader();

        reader.readAsText(miArchivo);

        reader.onload = function () {
            let chistesObjeto = JSON.parse(reader.result);
            dibujarTabla(chistesObjeto);
            mostrarOcultarModales('ocultarImportarChistes', 'modalImportarChistes');
            desactivarActivarScroll('ocultarImportarChistes', 'modalImportarChistes');
            let chistesEnJson = JSON.stringify(chistesObjeto);
            localStorage.setItem("listaChistes", chistesEnJson);
        }

        reader.onerror = function () {
            console.log(reader.error);
        }

    }
}

//////// FIN MODAL IMPORTAR CHISTES ////////////////////

//////// MODAL EXPORTAR CHISTES ////////////////////

botonExportarChistes.onclick = function () {

    mostrarOcultarModales('ocultarExportarChistes', 'modalExportarChistes');
    desactivarActivarScroll('ocultarExportarChistes', 'modalExportarChistes');

    // Fecha para utilizarla al generar el nombre del archivo

    let fechaArchivo = new Date();
    fechaArchivo = fechaArchivo.toLocaleString();
    fechaArchivo = fechaArchivo.replace(',', '');
    fechaArchivo = fechaArchivo.replace(' ', '-');
    fechaArchivo = fechaArchivo.replaceAll('/', '-');
    fechaArchivo = fechaArchivo.replaceAll(':', '-');


    chistesAlmacenados = localStorage.getItem('listaChistes');

    // exportarChistes hacerle un blob con los datos de chistesAlmacenados
    let nombreArchivo = 'chistacos' + fechaArchivo + '.json';
    enlaceExportar.setAttribute("download", nombreArchivo);
    enlaceExportar.href = window.URL.createObjectURL(
        new Blob([chistesAlmacenados], { type: ".json" })
    );

}

//////// FIN MODAL EXPORTAR CHISTES ////////////////////

//////// MODAL NUEVO CHISTE ////////////////////

botonNuevoChiste.onclick = function () {

    mostrarOcultarModales('ocultarCrearChiste', 'modalCrear');
    desactivarActivarScroll('ocultarCrearChiste', 'modalCrear');

}


botonCrearChiste.onclick = function () {
    let tituloChiste = formCrearChiste.tituloChiste.value.replaceAll("\"", "");
    let textoChiste = formCrearChiste.textoChiste.value.replaceAll("\"", "");
    textoChiste = textoChiste.replace(/(\r\n|\n|\r)/gm, " ");
    let categoriaChiste = formCrearChiste.categoriaChiste.value;
    let puntuacionChiste = valoracionChistaco.value;

    if (
        localStorage.getItem("listaChistes") === null ||
        localStorage.getItem("listaChistes") == '{}'
    ) {

        let primerChiste = {
            "1": {
                titulo: '',
                chiste: '',
                categoria: '',
                valoracion: 0,
                id: 1
            }
        };

        primerChiste['1']['titulo'] = tituloChiste;
        primerChiste['1']['chiste'] = textoChiste;
        primerChiste['1']['categoria'] = categoriaChiste;
        primerChiste['1']['valoracion'] = puntuacionChiste;

        primerChiste = JSON.stringify(primerChiste);
        localStorage.setItem("listaChistes", primerChiste);


    } else {
        chistesAlmacenados = localStorage.getItem('listaChistes');
        chistesAlmacenadosObjeto = JSON.parse(chistesAlmacenados);

        let ultimoId = 0;
        for (let listadoChistes of Object.keys(chistesAlmacenadosObjeto)) {
            var chisteEspecifico = chistesAlmacenadosObjeto[listadoChistes];

            for (let chisteEspecifico of Object.keys(chistesAlmacenadosObjeto[listadoChistes])) {
                var contenidoChisteEspecifico = chistesAlmacenadosObjeto[listadoChistes][chisteEspecifico]

                if (chisteEspecifico == 'id') {

                    if (ultimoId < contenidoChisteEspecifico) {
                        ultimoId = contenidoChisteEspecifico;
                    }
                }
            }
        }

        let nuevoId = ultimoId + 1;
        let cadena = `,
                    "${nuevoId}": {
                      "titulo": "${tituloChiste}",
                      "chiste": "${textoChiste}",
                      "categoria": "${categoriaChiste}",
                      "valoracion": ${puntuacionChiste},
                      "id": ${nuevoId}
                    } }`;
        chistesAlmacenados = chistesAlmacenados.slice(0, -1) + cadena;
        // Si no lo paso a objeto y después a json queda feo
        chistesAlmacenados = JSON.parse(chistesAlmacenados);

        chistesAlmacenados = JSON.stringify(chistesAlmacenados);
        localStorage.removeItem('listaChistes');
        localStorage.setItem("listaChistes", chistesAlmacenados);
    }

    chistesAlmacenados = localStorage.getItem('listaChistes');
    chistesAlmacenados = JSON.parse(chistesAlmacenados);
    cuerpoTabla.innerHTML = "";
    dibujarTabla(chistesAlmacenados);

    mostrarOcultarModales('ocultarCrearChiste', 'modalCrear');
    desactivarActivarScroll('ocultarCrearChiste', 'modalCrear');

    formCrearChiste.tituloChiste.value = "";
    formCrearChiste.textoChiste.value = "";
    formCrearChiste.categoriaChiste.value = "negros";

};

// Mostrar el valor del input:range al usuario en crear
valoracionChistaco.onchange = function () {
    spanValorChiste.innerHTML = valoracionChiste.value;
};

//////// FIN MODAL NUEVO CHISTE ////////////////////

///////////// MODAL Modificar Chiste específico ///////////

function modificarChisteEsp(chisteEspecifico) {
    mostrarOcultarModales('ocultarModificarChiste', 'modalEditar');
    desactivarActivarScroll('ocultarModificarChiste', 'modalEditar');
    let indiceChiste = chisteEspecifico.dataset.ide;

    chistesAlmacenados = localStorage.getItem('listaChistes');
    chistesAlmacenadosObjeto = JSON.parse(chistesAlmacenados);;


    let chisteModificar;

    function cargarChisteFormulario(objetoChistes, indice) {
        for (k in objetoChistes) {
            if (k == indice) {
                chisteModificar = objetoChistes[k];
            } else if (typeof objetoChistes[k] === 'object') {
                cargarChisteFormulario(objetoChistes[k], indice);
            }
        }
    }
    cargarChisteFormulario(chistesAlmacenadosObjeto, indiceChiste);
    formEditarChiste.tituloChisteModificar.value = chisteModificar.titulo;
    formEditarChiste.textoChisteModificar.value = chisteModificar.chiste;
    formEditarChiste.categoriaChisteModificar.value = chisteModificar.categoria;
    formEditarChiste.valoracionChisteEditar.value = chisteModificar.valoracion;
    valorRangeEditar.innerHTML = chisteModificar.valoracion;

    botonModificarChiste.onclick = function () {

        let tituloChiste = formEditarChiste.tituloChisteModificar.value.replaceAll("\"", "");
        let textoChiste = formEditarChiste.textoChisteModificar.value.replaceAll("\"", "");
        textoChiste = textoChiste.replace(/(\r\n|\n|\r)/gm, " ");
        let categoriaChiste = formEditarChiste.categoriaChisteModificar.value;
        let puntuacionChiste = valoracionChisteEditar.value;

        chistesAlmacenados = localStorage.getItem('listaChistes');
        chistesAlmacenadosObjeto = JSON.parse(chistesAlmacenados);

        function modificarObjeto(objetoChistes, indice) {
            for (k in objetoChistes) {
                if (k == indice) {
                    objetoChistes[k].titulo = tituloChiste;
                    objetoChistes[k].chiste = textoChiste;
                    objetoChistes[k].categoria = categoriaChiste;
                    objetoChistes[k].valoracion = puntuacionChiste;
                } else if (typeof objetoChistes[k] === 'object') {
                    modificarObjeto(objetoChistes[k], indice);
                }
            }
        }
        modificarObjeto(chistesAlmacenadosObjeto, indiceChiste);

        chistesAlmacenados = JSON.stringify(chistesAlmacenadosObjeto);
        localStorage.removeItem('listaChistes');
        localStorage.setItem("listaChistes", chistesAlmacenados);

        chistesAlmacenados = JSON.parse(chistesAlmacenados);
        cuerpoTabla.innerHTML = "";
        dibujarTabla(chistesAlmacenados);

        mostrarOcultarModales('ocultarModificarChiste', 'modalEditar');
        desactivarActivarScroll('ocultarModificarChiste', 'modalEditar');

    }

}


valoracionChisteEditar.onchange = function () {
    valorRangeEditar.innerHTML = valoracionChisteEditar.value;
}


  //////////// FIN MODAL Modificar Chiste específico ///////////

