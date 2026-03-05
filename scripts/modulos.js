const KEY = "cursos";
const cursoId = localStorage.getItem("cursoSeleccionado");
let editandoModulo = null;

function getCursos(){
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveCursos(data){
    localStorage.setItem(KEY, JSON.stringify(data));
}

function agregarModulo(){
    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    let cursos = getCursos();
    let curso = cursos.find(c => c.id === cursoId);

    if(editandoModulo){
        const mod = curso.modulos.find(m => m.codigo === editandoModulo);
        mod.codigo = codigo;
        mod.nombre = nombre;
        mod.descripcion = descripcion;
        editandoModulo = null;
    } else {
        curso.modulos.push({
            codigo,
            nombre,
            descripcion,
            lecciones: []
        });
    }

    saveCursos(cursos);
    renderModulos();
}

function editarModulo(codigo){
    const curso = getCursos().find(c => c.id === cursoId);
    const mod = curso.modulos.find(m => m.codigo === codigo);

    document.getElementById("codigo").value = mod.codigo;
    document.getElementById("nombre").value = mod.nombre;
    document.getElementById("descripcion").value = mod.descripcion;

    editandoModulo = codigo;
}

function eliminarModulo(codigo){
    if(!confirm("¿Eliminar módulo?")) return;

    let cursos = getCursos();
    let curso = cursos.find(c => c.id === cursoId);

    curso.modulos = curso.modulos.filter(m => m.codigo !== codigo);

    saveCursos(cursos);
    renderModulos();
}

function renderModulos(){
    const cont = document.getElementById("listaModulos");
    cont.innerHTML = "";

    let curso = getCursos().find(c => c.id === cursoId);

    curso.modulos.forEach(mod => {
        cont.innerHTML += `
            <div class="curso-item">
                <div>
                    <strong>${mod.nombre}</strong>
                </div>
                <div>
                    <button onclick="verLecciones('${mod.codigo}')">Lecciones</button>
                    <button onclick="editarModulo('${mod.codigo}')">Editar</button>
                    <button onclick="eliminarModulo('${mod.codigo}')">Eliminar</button>
                </div>
            </div>
        `;
    });
}

function verLecciones(codigo){
    localStorage.setItem("moduloSeleccionado", codigo);
    window.location.href = "lecciones.html";
}

document.addEventListener("DOMContentLoaded", renderModulos);