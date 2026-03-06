const form = document.getElementById("loginForm")

form.addEventListener("submit", function(e){

e.preventDefault()

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const admins = JSON.parse(localStorage.getItem("campus_administrativos")) || []

const admin = admins.find(a => a.email === email)

if(admin){

localStorage.setItem("session", JSON.stringify(admin))

window.location.href = "panel.html"

}else{

document.getElementById("error").textContent = "Usuario no encontrado"

}

})