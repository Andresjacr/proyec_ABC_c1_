function safeGet(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function safeSet(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

const form = document.getElementById("docenteForm");
const tabla = document.getElementById("tablaDocentes");

function generarId() {
  return "DOC" + Date.now();
}

function renderDocentes() {
  const docentes = safeGet("docentes");
  tabla.innerHTML = "";

  docentes.forEach(docente => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${docente.nombres}</td>
      <td>${docente.email}</td>
      <td>${docente.especialidad}</td>
      <td>
        <span class="action-btn" onclick="editarDocente('${docente.id}')">Editar</span>
        <span class="action-btn" onclick="eliminarDocente('${docente.id}')">Eliminar</span>
      </td>
    `;

    tabla.appendChild(tr);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const id = document.getElementById("docenteId").value;
  const nombres = document.getElementById("nombres").value;
  const email = document.getElementById("email").value;
  const especialidad = document.getElementById("especialidad").value;

  let docentes = safeGet("docentes");

  if (id) {
    docentes = docentes.map(d =>
      d.id === id ? { id, nombres, email, especialidad } : d
    );
  } else {
    docentes.push({
      id: generarId(),
      nombres,
      email,
      especialidad
    });
  }

  safeSet("docentes", docentes);
  form.reset();
  renderDocentes();
});

function editarDocente(id) {
  const docentes = safeGet("docentes");
  const docente = docentes.find(d => d.id === id);

  document.getElementById("docenteId").value = docente.id;
  document.getElementById("nombres").value = docente.nombres;
  document.getElementById("email").value = docente.email;
  document.getElementById("especialidad").value = docente.especialidad;
}

function eliminarDocente(id) {

  const cursos = safeGet("cursos");

  const tieneCursos = cursos.some(curso => curso.docenteId === id);

  if (tieneCursos) {
    alert("No puedes eliminar este docente porque tiene cursos asignados.");
    return;
  }

  let docentes = safeGet("docentes");
  docentes = docentes.filter(d => d.id !== id);

  safeSet("docentes", docentes);
  renderDocentes();
}

document.addEventListener("DOMContentLoaded", renderDocentes);