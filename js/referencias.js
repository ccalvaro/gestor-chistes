// revisara nombres y uso de variables
// Elementos generales
let cuerpoTabla = document.querySelector('tbody');
let spanValorChiste = document.querySelector('.valorRange');

// modales
let modalImportarChistes = document.querySelector('.modalImportarChistes');
let modalExportarChistes = document.querySelector('.modalExportar');
let modalCrear = document.querySelector('.modalCrear');
let modalEditar = document.querySelector('.modalEditar');

// formularios
// inportar
let formImportarChistes = document.querySelector('#formImportarChistes');
let inputArchivo = document.querySelector('#inputArchivo');
// exportar
let enlaceExportar = document.querySelector('.enviarExportarChistes');
// crear chiste
let formCrearChiste = document.forms.formCrearChiste;
let valoracionChistaco = document.querySelector('#valoracionChiste');
// modificar chiste
let formEditarChiste = document.forms.formEditarChiste;
let valorRangeEditar = document.querySelector('.valorRangeEditar');
let botonModificarChiste = document.querySelector('.botonModificarChiste');
let valoracionChisteEditar = document.querySelector('#valoracionChisteEditar');

// Elementos botones
let botonNuevoChiste = document.querySelector('#botonNuevoChiste');
let botonImportarChistes = document.querySelector('#botonImportarChistes');
let botonCerrarImportarChistes = document.querySelector('#cerrarImportarChistes');
let botonExportarChistes = document.querySelector('#botonExportarChistes');
let botonCerrarExportar = document.querySelector('.botonCerrarExportarChistes');
let botonCrearChiste = document.querySelector('.botonCrearChiste');
let botonCerrarCrearChistes = document.querySelector('.botonCerrarCrearChiste');
let botonCerrarModificarChiste = document.querySelector('.botonCerrarModificarChiste');
let botonBorrarTodos = document.querySelector('#botonBorrarTodos');
let botonBorrarChiste = document.querySelector('.boton-borrar-chiste');


// Informacion
let chistesAlmacenados = localStorage.getItem('listaChistes');
let chistesAlmacenadosObjeto = JSON.parse(chistesAlmacenados);;