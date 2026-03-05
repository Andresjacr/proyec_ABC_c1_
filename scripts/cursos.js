const KEY = "cursos";
let editandoId = null;

function getCursos(){
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveCursos(data){
    localStorage.setItem(KEY, JSON.stringify(data));
}

function agregarCurso(){
    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const docenteId = document.getElementById("docenteId").value.trim();

    if(!nombre || !descripcion || !docenteId){
        alert("Todos los campos son obligatorios");
        return;
    }

    let cursos = getCursos();

    if(editandoId){
        const curso = cursos.find(c => c.id === editandoId);
        curso.nombre = nombre;
        curso.descripcion = descripcion;
        curso.docenteId = docenteId;
        editandoId = null;
    } else {
        cursos.push({
            id: "CUR" + Date.now(),
            nombre,
            descripcion,
            docenteId,
            modulos: []
        });
    }

    saveCursos(cursos);
    limpiar();
    renderCursos();
}

function editarCurso(id){
    const curso = getCursos().find(c => c.id === id);

    document.getElementById("nombre").value = curso.nombre;
    document.getElementById("descripcion").value = curso.descripcion;
    document.getElementById("docenteId").value = curso.docenteId;

    editandoId = id;
}

function eliminarCurso(id){
    if(!confirm("¿Seguro que quieres eliminar este curso?")) return;

    let cursos = getCursos().filter(c => c.id !== id);
    saveCursos(cursos);
    renderCursos();
}

function renderCursos(){
    const cont = document.getElementById("listaCursos");
    cont.innerHTML = "";

    getCursos().forEach(curso => {
        cont.innerHTML += `
            <div class="curso-item">
                <div>
                    <strong>${curso.nombre}</strong><br>
                    <small>${curso.descripcion}</small>
                </div>
                <div>
                    <button onclick="verModulos('${curso.id}')">Módulos</button>
                    <button onclick="editarCurso('${curso.id}')">Editar</button>
                    <button onclick="eliminarCurso('${curso.id}')">Eliminar</button>
                </div>
            </div>
        `;
    });
}

function verModulos(id){
    localStorage.setItem("cursoSeleccionado", id);
    window.location.href = "modulos.html";
}

function limpiar(){
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("docenteId").value = "";
}

document.addEventListener("DOMContentLoaded", renderCursos);