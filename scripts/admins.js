const STORAGE_KEY = "campus_administrativos"

let administrativos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

let editIndex = null

const form = document.getElementById("formAdministrativo")
const tabla = document.getElementById("tablaAdministrativos")

function guardarDatos(){

localStorage.setItem(STORAGE_KEY, JSON.stringify(administrativos))

}

function renderTabla(){

tabla.innerHTML=""

administrativos.forEach((admin,index)=>{

const fila = document.createElement("tr")

fila.innerHTML = `

<td>${admin.identificacion}</td>
<td>${admin.nombres}</td>
<td>${admin.apellidos}</td>
<td>${admin.email}</td>
<td>${admin.telefono}</td>
<td>${admin.cargo}</td>

<td>

<button class="btn btn-editar" onclick="editarAdmin(${index})">
Editar
</button>

<button class="btn btn-eliminar" onclick="eliminarAdmin(${index})">
Eliminar
</button>

</td>

`

tabla.appendChild(fila)

})

}

form.addEventListener("submit",function(e){

e.preventDefault()

const nuevoAdmin = {

identificacion:document.getElementById("identificacion").value.trim(),
nombres:document.getElementById("nombres").value.trim(),
apellidos:document.getElementById("apellidos").value.trim(),
email:document.getElementById("email").value.trim(),
telefono:document.getElementById("telefono").value.trim(),
cargo:document.getElementById("cargo").value.trim()

}

if(editIndex === null){

administrativos.push(nuevoAdmin)

}else{

administrativos[editIndex] = nuevoAdmin
editIndex = null

}

guardarDatos()

renderTabla()

form.reset()

})

function editarAdmin(index){

const admin = administrativos[index]

document.getElementById("identificacion").value = admin.identificacion
document.getElementById("nombres").value = admin.nombres
document.getElementById("apellidos").value = admin.apellidos
document.getElementById("email").value = admin.email
document.getElementById("telefono").value = admin.telefono
document.getElementById("cargo").value = admin.cargo

editIndex = index

}

function eliminarAdmin(index){

const confirmar = confirm("¿Seguro que deseas eliminar este administrativo?")

if(confirmar){

administrativos.splice(index,1)

guardarDatos()

renderTabla()

}

}

renderTabla()