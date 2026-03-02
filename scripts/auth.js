// Crear admin por defecto
if (!localStorage.getItem(STORAGE_KEYS.ADMINS)) {
    setData(STORAGE_KEYS.ADMINS, [{
        identificacion: "1",
        nombres: "Admin",
        apellidos: "Principal",
        email: "admin@gmail.com",
        telefono: "3000000000",
        cargo: "Administrador",
        password: "password"
    }]);
}

// Login
if (document.getElementById("loginForm")) {

    document.getElementById("loginForm")
    .addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const admins = getData(STORAGE_KEYS.ADMINS);

        const encontrado = admins.find(admin =>
            admin.email === email && admin.password === password
        );

        if (encontrado) {
            localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(encontrado));
            window.location.href = "pages/dashboard.html";
        } else {
            document.getElementById("error-msg").textContent = "Credenciales incorrectas";
        }
    });
}

// Protección rutas
if (window.location.pathname.includes("pages/dashboard.html") ||
    window.location.pathname.includes("docentes.html")) {

    if (!localStorage.getItem(STORAGE_KEYS.SESSION)) {
        window.location.href = "../index.html";
    }
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    window.location.href = "../index.html";
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
        window.location.href = "../index.html";
    });
}
