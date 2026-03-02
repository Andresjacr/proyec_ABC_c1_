const session = JSON.parce (localStorage.getItem(session));
if (!session) {
    window.location.href = "index.html";
}