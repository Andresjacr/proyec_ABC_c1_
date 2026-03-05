if (window.location.pathname.includes("cursos.html")) {

    if (!localStorage.getItem(STORAGE_KEYS.CURSOS)) {
        setData(STORAGE_KEYS.CURSOS, []);
    }

    cargarDocentes();
    renderCursos();

    document.getElementById("formCurso")
    .addEventListener("submit", function(e) {
        e.preventDefault();

        const cursos = getData(STORAGE_KEYS.CURSOS);

        const nuevoCurso = {
            codigo: document.getElementById("codigoCurso").value,
            nombre: document.getElementById("nombreCurso").value,
            descripcion: document.getElementById("descripcionCurso").value,
            docenteId: document.getElementById("docenteSelect").value,
            modulos: [],
            activo: true
        };

        cursos.push(nuevoCurso);
        setData(STORAGE_KEYS.CURSOS, cursos);

        actualizarDocente(nuevoCurso.docenteId, nuevoCurso.codigo);

        this.reset();
        renderCursos();
    });
}
//cargar docentes//
function cargarDocentes() {
    const docentes = getData(STORAGE_KEYS.DOCENTES);
    const select = document.getElementById("docenteSelect");

    select.innerHTML = '<option value="">Seleccione un docente</option>';

    docentes.forEach(docente => {
        select.innerHTML += `
            <option value="${docente.codigo}">
                ${docente.nombres} ${docente.apellidos}
            </option>
        `;
    });
}

//actualisar cocente//
function actualizarDocente(docenteCodigo, cursoCodigo) {

    const docentes = getData(STORAGE_KEYS.DOCENTES);

    const docente = docentes.find(d => d.codigo === docenteCodigo);

    if (docente) {
    if (!docente.cursos) {
        docente.cursos = [];
    }

    docente.cursos.push(cursoCodigo);
    setData(STORAGE_KEYS.DOCENTES, docentes);
}
}

function renderCursos() {
    const cursos = getData(STORAGE_KEYS.CURSOS);
    const docentes = getData(STORAGE_KEYS.DOCENTES);
    const tabla = document.getElementById("tablaCursos");

    if (!tabla) return;

    tabla.innerHTML = "";

    cursos.forEach((curso, index) => {

        const docente = docentes.find(d => d.codigo === curso.docenteId);

        tabla.innerHTML += `
            <tr>
                <td>${curso.codigo}</td>
                <td>${curso.nombre}</td>
                <td>${docente ? docente.nombres : "Sin docente"}</td>
                <td>
                    <button onclick="eliminarCurso(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}
//renderisar cursos//
function renderCursos() {
    const cursos = getData(STORAGE_KEYS.CURSOS);
    const docentes = getData(STORAGE_KEYS.DOCENTES);
    const tabla = document.getElementById("tablaCursos");

    if (!tabla) return;

    tabla.innerHTML = "";

    cursos.forEach((curso, index) => {

        const docente = docentes.find(d => d.codigo === curso.docenteId);

        tabla.innerHTML += `
            <tr>
                <td>${curso.codigo}</td>
                <td>${curso.nombre}</td>
                <td>${docente ? docente.nombres : "Sin docente"}</td>
                <td>
                    <button onclick="eliminarCurso(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}
//eliminar cusros correctamente//
function eliminarCurso(index) {

    const cursos = getData(STORAGE_KEYS.CURSOS);
    const cursoEliminado = cursos[index];

    // Quitar del docente
    const docentes = getData(STORAGE_KEYS.DOCENTES);

    const docente = docentes.find(d => d.codigo === cursoEliminado.docenteId);

    if (docente) {
        docente.cursos = docente.cursos.filter(c => c !== cursoEliminado.codigo);
        setData(STORAGE_KEYS.DOCENTES, docentes);
    }

    cursos.splice(index, 1);
    setData(STORAGE_KEYS.CURSOS, cursos);

}