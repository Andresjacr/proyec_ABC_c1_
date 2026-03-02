if (window.location.pathname.includes("docentes.html")) {

    if (!localStorage.getItem(STORAGE_KEYS.DOCENTES)) {
        setData(STORAGE_KEYS.DOCENTES, []);
    }

    renderDocentes();

    document.getElementById("formDocente")
    ?.addEventListener("submit", function(e) {
        e.preventDefault();

        const docentes = getData(STORAGE_KEYS.DOCENTES);

        const nuevoDocente = {
            codigo: document.getElementById("codigo").value,
            identificacion: document.getElementById("identificacion").value,
            nombres: document.getElementById("nombres").value,
            apellidos: document.getElementById("apellidos").value,
            email: document.getElementById("emailDocente").value,
            foto: document.getElementById("foto").value,
            area: document.getElementById("area").value,
            cursos: []
        };

        docentes.push(nuevoDocente);
        setData(STORAGE_KEYS.DOCENTES, docentes);

        this.reset();
        renderDocentes();
    });
}

function renderDocentes() {
    const docentes = getData(STORAGE_KEYS.DOCENTES);
    const tabla = document.getElementById("tablaDocentes");

    if (!tabla) return;

    tabla.innerHTML = "";

    docentes.forEach((docente, index) => {
        tabla.innerHTML += `
            <tr>
                <td>${docente.codigo}</td>
                <td>${docente.nombres} ${docente.apellidos}</td>
                <td>${docente.email}</td>
                <td>${docente.area}</td>
                <td>
                    <button onclick="eliminarDocente(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function eliminarDocente(index) {
    const docentes = getData(STORAGE_KEYS.DOCENTES);

    if (docentes[index].cursos.length > 0) {
        alert("No se puede eliminar, tiene cursos asignados");
        return;
    }

    docentes.splice(index, 1);
    setData(STORAGE_KEYS.DOCENTES, docentes);

    renderDocentes();
}