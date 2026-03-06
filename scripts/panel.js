const session = JSON.parse(localStorage.getItem("session"))

if(!session){

window.location.href = "login.html"

}

// Mostrar nombre usuario
const user = JSON.parse(localStorage.getItem("session"))

if(user){

document.getElementById("userName").textContent = user.nombres

}

function safeGet(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function calcularTotales() {

  const cursos = safeGet("cursos");
  const docentes = safeGet("docentes");

  let totalCursos = cursos.length;
  let totalModulos = 0;
  let totalLecciones = 0;

  cursos.forEach(curso => {

    if (!curso.modulos || !Array.isArray(curso.modulos)) {
      curso.modulos = [];
    }

    totalModulos += curso.modulos.length;

    curso.modulos.forEach(modulo => {

      if (!modulo.lecciones || !Array.isArray(modulo.lecciones)) {
        modulo.lecciones = [];
      }

      totalLecciones += modulo.lecciones.length;
    });

  });

  return {
    totalCursos,
    totalModulos,
    totalLecciones,
    totalDocentes: docentes.length
  };
}

function actualizarResumen() {
  const totales = calcularTotales();

  document.getElementById("totalCursos").textContent = totales.totalCursos;
  document.getElementById("totalModulos").textContent = totales.totalModulos;
  document.getElementById("totalLecciones").textContent = totales.totalLecciones;
  document.getElementById("totalDocentes").textContent = totales.totalDocentes;

  crearGrafica(totales);
}

let grafica;

function crearGrafica(data) {

  const ctx = document.getElementById("miGrafica");

  if (grafica) {
    grafica.destroy();
  }

  grafica = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Cursos", "Módulos", "Lecciones", "Docentes"],
      datasets: [{
        label: "Cantidad",
        data: [
          data.totalCursos,
          data.totalModulos,
          data.totalLecciones,
          data.totalDocentes
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", actualizarResumen);

function logout(){

localStorage.removeItem("session")

window.location.href = "login.html"

}