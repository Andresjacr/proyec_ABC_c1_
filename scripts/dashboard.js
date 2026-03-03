const currentUser = JSON.parse(localStorage.getItem("session"));

if (currentUser){
  console.log("usuario logueado:", currentUser.nombres);
}

const welcomeMessage = document.getElementById("welcomeMessage");

if (currentUser) {
  welcomeMessage.textContent = `Hola, ${currentUser.nombres} ${currentUser.apellidos}`;
}

const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("session");
  window.location.href = "../index.html";
});