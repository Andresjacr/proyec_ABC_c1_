// Obtener datos seguros
function safeGet(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Guardar datos
function safeSet(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Inicializar studentss
if (!localStorage.getItem("Students")) {
    safeSet("Students", []);
}


// Renderizar Students en la tabla
function renderStudents() {

    const Students = safeGet("Students");
    const tabla = document.getElementById("tablaStudents");

    if (!tabla) return;

    tabla.innerHTML = "";

    Students.forEach((students, index) => {

        tabla.innerHTML += `
        <tr>
            <td>${students.identificacion}</td>
            <td>${students.nombres} ${students.apellidos}</td>
            <td>${students.genero}</td>
            <td>${students.fecha_nacimiento}</td>
            <td>${students.direccion}</td>
            <td>${students.telefono}</td>
            <td>${students.curso}</td>

            <td>
                <button onclick="editarstudents(${index})">Editar</button>
                <button onclick="eliminarstudents(${index})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}


// Crear students
if (document.getElementById("formstudents")) {

    document.getElementById("formstudents")
    .addEventListener("submit", function(e) {

        e.preventDefault();



        const reader = new FileReader();

        reader.onload = function() {

            const Students = safeGet("Students");

            const nuevostudents = {

                identificacion: document.getElementById("identificacion").value,
                nombres: document.getElementById("nombres").value,
                apellidos: document.getElementById("apellidos").value,
                email: document.getElementById("genero").value,
                fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
                direccion: document.getElementById("direccion").value,
                telefono: document.getElementById("telefono").value,
                curso: document.getElementById("curso").value,


                cursos: []
            };

            Students.push(nuevostudents);

            safeSet("Students", Students);

            document.getElementById("formstudents").reset();

            renderStudents();
        };

        reader.readAsDataURL(archivo);
    });
}


// Eliminar students
function eliminarStudents(index) {

    const Students = safeGet("Students");

    if (confirm("¿Eliminar este estudiante?")) {

        Students.splice(index, 1);

        safeSet("Students", Students);

        renderStudents();
    }
}


// Editar Students
function editarStudents(index) {

    const Students = safeGet("Students");

    const Student = Student[index];

    document.getElementById("identificacion").value = Students.identificacion;
    document.getElementById("nombres").value = Students.nombres;
    document.getElementById("apellidos").value = Students.apellidos;
    document.getElementById("genero").value = Students.genero;
    document.getElementById("fecha_nacimiento").value = Students.fecha_nacimiento;
    document.getElementById("telefono").value = Students.direccion;
    document.getElementById("direccion").value = Students.telefono;
    document.getElementById("curso").value = Students.curso;

    eliminarStudents(index);
}


// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {

    renderStudents();

});