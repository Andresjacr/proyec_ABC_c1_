// Obtener datos seguros
function safeGet(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Guardar datos
function safeSet(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Inicializar docentes
if (!localStorage.getItem("docentes")) {
    safeSet("docentes", []);
}


// Renderizar docentes en la tabla
function renderDocentes() {

    const docentes = safeGet("docentes");
    const tabla = document.getElementById("tablaDocentes");

    if (!tabla) return;

    tabla.innerHTML = "";

    docentes.forEach((docente, index) => {

        tabla.innerHTML += `
        <tr>
            <td>${docente.codigo}</td>

            <td>
                <img src="${docente.foto}" 
                style="width:50px;height:50px;border-radius:50%;object-fit:cover;">
            </td>

            <td>${docente.nombres} ${docente.apellidos}</td>
            <td>${docente.email}</td>
            <td>${docente.area}</td>

            <td>
                <button onclick="editarDocente(${index})">Editar</button>
                <button onclick="eliminarDocente(${index})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}


// Crear docente
if (document.getElementById("formDocente")) {

    document.getElementById("formDocente")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const archivo = document.getElementById("fotoDocente").files[0];

        if (!archivo) {
            alert("Debes seleccionar una foto");
            return;
        }

        const reader = new FileReader();

        reader.onload = function() {

            const docentes = safeGet("docentes");

            const nuevoDocente = {

                codigo: document.getElementById("codigo").value,
                identificacion: document.getElementById("identificacion").value,
                nombres: document.getElementById("nombres").value,
                apellidos: document.getElementById("apellidos").value,
                email: document.getElementById("email").value,
                area: document.getElementById("area").value,

                foto: reader.result, // imagen en base64

                cursos: []
            };

            docentes.push(nuevoDocente);

            safeSet("docentes", docentes);

            document.getElementById("formDocente").reset();

            renderDocentes();
        };

        reader.readAsDataURL(archivo);
    });
}


// Eliminar docente
function eliminarDocente(index) {

    const docentes = safeGet("docentes");

    if (confirm("¿Eliminar este docente?")) {

        docentes.splice(index, 1);

        safeSet("docentes", docentes);

        renderDocentes();
    }
}


// Editar docente
function editarDocente(index) {

    const docentes = safeGet("docentes");

    const docente = docentes[index];

    document.getElementById("codigo").value = docente.codigo;
    document.getElementById("identificacion").value = docente.identificacion;
    document.getElementById("nombres").value = docente.nombres;
    document.getElementById("apellidos").value = docente.apellidos;
    document.getElementById("email").value = docente.email;
    document.getElementById("area").value = docente.area;

    eliminarDocente(index);
}


// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {

    renderDocentes();

});