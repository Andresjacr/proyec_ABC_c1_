// Mostrar nombre del usuario
const user = JSON.parse(localStorage.getItem("session"));

if (user && document.getElementById("userName")) {
    document.getElementById("userName").textContent = user.nombres;
}


// Función para obtener datos seguros
function safeGet(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}


// Actualizar resumen del panel
function actualizarResumen() {

    const cursos = safeGet("cursos");
    const modulos = safeGet("modulos");
    const lecciones = safeGet("lecciones");
    const docentes = safeGet("docentes");

    document.getElementById("totalCursos").textContent = cursos.length;
    document.getElementById("totalModulos").textContent = modulos.length;
    document.getElementById("totalLecciones").textContent = lecciones.length;
    document.getElementById("totalDocentes").textContent = docentes.length;
}


// Crear gráfica
function crearGrafica() {

    const cursos = safeGet("cursos");
    const modulos = safeGet("modulos");
    const lecciones = safeGet("lecciones");
    const docentes = safeGet("docentes");

    const ctx = document.getElementById('miGrafica');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cursos', 'Módulos', 'Lecciones', 'Docentes'],
            datasets: [{
                label: 'Cantidad Registrada',
                data: [
                    cursos.length,
                    modulos.length,
                    lecciones.length,
                    docentes.length
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


// Ejecutar cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
    actualizarResumen();
    crearGrafica(); // 👈 ESTA LÍNEA FALTABA
});