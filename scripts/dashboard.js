const session = JSON.parse(localStorage.getItem("session"));

const welcomeMessage = document.getElementById("welcomeMessage");

if (session) {
  welcomeMessage.textContent = `Hola, ${session.nombres} ${session.apellidos}`;
}

const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("session");
  window.location.href = "../index.html";
});