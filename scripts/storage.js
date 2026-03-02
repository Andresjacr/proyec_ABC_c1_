const STORAGE_KEYS = {
    ADMINS: "administrativos",
    DOCENTES: "docentes",
    CURSOS: "cursos",
    SESSION: "session"
};

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}