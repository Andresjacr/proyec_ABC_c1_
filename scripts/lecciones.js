const KEY = "cursos";
const cursoId = localStorage.getItem("cursoSeleccionado");
const moduloCodigo = localStorage.getItem("moduloSeleccionado");
let editandoLeccion = null;

function getCursos(){
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveCursos(data){
    localStorage.setItem(KEY, JSON.stringify(data));
}

function agregarLeccion(){
    const titulo = document.getElementById("titulo").value.trim();
    const intensidad = document.getElementById("intensidad").value.trim();
    const contenido = document.getElementById("contenido").value.trim();
    const multimedia = document.getElementById("multimedia").value.trim();

    let cursos = getCursos();
    let curso = cursos.find(c => c.id === cursoId);
    let modulo = curso.modulos.find(m => m.codigo === moduloCodigo);

    if(editandoLeccion){
        const lec = modulo.lecciones.find(l => l.titulo === editandoLeccion);
        lec.titulo = titulo;
        lec.intensidad = intensidad;
        lec.contenido = contenido;
        lec.multimedia = multimedia;
        editandoLeccion = null;
    } else {
        modulo.lecciones.push({
            titulo,
            intensidad,
            contenido,
            multimedia
        });
    }

    saveCursos(cursos);
    renderLecciones();
}

function editarLeccion(titulo){
    let curso = getCursos().find(c => c.id === cursoId);
    let modulo = curso.modulos.find(m => m.codigo === moduloCodigo);
    let lec = modulo.lecciones.find(l => l.titulo === titulo);

    document.getElementById("titulo").value = lec.titulo;
    document.getElementById("intensidad").value = lec.intensidad;
    document.getElementById("contenido").value = lec.contenido;
    document.getElementById("multimedia").value = lec.multimedia;

    editandoLeccion = titulo;
}

function eliminarLeccion(titulo){
    if(!confirm("¿Eliminar lección?")) return;

    let cursos = getCursos();
    let curso = cursos.find(c => c.id === cursoId);
    let modulo = curso.modulos.find(m => m.codigo === moduloCodigo);

    modulo.lecciones = modulo.lecciones.filter(l => l.titulo !== titulo);

    saveCursos(cursos);
    renderLecciones();
}

function renderLecciones(){
    const cont = document.getElementById("listaLecciones");
    cont.innerHTML = "";

    let curso = getCursos().find(c => c.id === cursoId);
    let modulo = curso.modulos.find(m => m.codigo === moduloCodigo);

    modulo.lecciones.forEach(lec => {
        cont.innerHTML += `
            <div class="curso-item">
                <div>
                    <strong>${lec.titulo}</strong> - ${lec.intensidad}h
                </div>
                <div>
                    <button onclick="editarLeccion('${lec.titulo}')">Editar</button>
                    <button onclick="eliminarLeccion('${lec.titulo}')">Eliminar</button>
                </div>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", renderLecciones);