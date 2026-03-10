console.log("JS funcionando");

// Obtener datos
function safeGet(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Guardar datos
function safeSet(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Inicializar almacenamiento
if (!localStorage.getItem("Students")) {
    safeSet("Students", []);
}

// =============================
// RENDERIZAR TABLA
// =============================

function renderStudents() {

    const Students = safeGet("Students");
    const tabla = document.getElementById("tablaStudents");

    if (!tabla) return;

    tabla.innerHTML = "";

    Students.forEach((student, index) => {

        tabla.innerHTML += `
        <tr>
            <td>${student.identificacion}</td>
            <td>${student.nombres} ${student.apellidos}</td>
            <td>${student.genero}</td>
            <td>${student.fecha_nacimiento}</td>
            <td>${student.direccion}</td>
            <td>${student.telefono}</td>
            <td>${student.curso}</td>
            <td>
                <button onclick="editarStudents(${index})">Editar</button>
                <button onclick="eliminarStudents(${index})">Eliminar</button>
            </td>
        </tr>
        `;

    });

}

// =============================
// CREAR ESTUDIANTE
// =============================

const form = document.getElementById("formstudents");

if (form) {

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        const Students = safeGet("Students");

        const nuevoStudent = {
            identificacion: document.getElementById("identificacion").value,
            nombres: document.getElementById("nombres").value,
            apellidos: document.getElementById("apellidos").value,
            genero: document.getElementById("genero").value,
            fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
            direccion: document.getElementById("direccion").value,
            telefono: document.getElementById("telefono").value,
            curso: document.getElementById("curso").value
        };

        Students.push(nuevoStudent);

        safeSet("Students", Students);

        form.reset();

        renderStudents();

    });

}

// =============================
// ELIMINAR ESTUDIANTE
// =============================

function eliminarStudents(index) {

    const Students = safeGet("Students");

    if (confirm("¿Eliminar este estudiante?")) {

        Students.splice(index, 1);

        safeSet("Students", Students);

        renderStudents();

    }

}

// =============================
// EDITAR ESTUDIANTE
// =============================

function editarStudents(index) {

    const Students = safeGet("Students");

    const student = Students[index];

    document.getElementById("identificacion").value = student.identificacion;
    document.getElementById("nombres").value = student.nombres;
    document.getElementById("apellidos").value = student.apellidos;
    document.getElementById("genero").value = student.genero;
    document.getElementById("fecha_nacimiento").value = student.fecha_nacimiento;
    document.getElementById("direccion").value = student.direccion;
    document.getElementById("telefono").value = student.telefono;
    document.getElementById("curso").value = student.curso;

    eliminarStudents(index);

}

// =============================
// CARGAR TABLA AL ABRIR PAGINA
// =============================

document.addEventListener("DOMContentLoaded", function () {
    renderStudents();
});
