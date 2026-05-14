let misEstudios = [
    { titulo: "Curso de Programación", institucion: "Cojali" },
    { titulo: "Automatización Web", institucion: "Logirail" }
];

function renderizarEstudios() {
    const contenedor = document.getElementById('lista-estudios');
    contenedor.innerHTML = "";
    misEstudios.forEach((estudio) => {
        contenedor.innerHTML += `
            <div class="estudio-item">
                <strong>${estudio.titulo}</strong>
                <p>${estudio.institucion}</p>
            </div>`;
    });
}

function gestionarNuevoEstudio() {
    const titulo = document.getElementById('nuevo-titulo').value;
    const inst = document.getElementById('nueva-inst').value;
    if (titulo && inst) {
        misEstudios.push({ titulo, institucion: inst });
        renderizarEstudios();
        document.getElementById('nuevo-titulo').value = "";
        document.getElementById('nueva-inst').value = "";
    } else {
        alert("Rellena ambos campos");
    }
}

async function buscarGitHub() {
    const nombre = document.getElementById('usuario-github').value;
    const contenedor = document.getElementById('resultado-github');
    if (!nombre) return alert("Escribe un usuario");

    contenedor.innerHTML = "<p>Buscando...</p>";
    try {
        const res = await fetch(`https://api.github.com/users/${nombre}/repos`);
        const repos = await res.json();
        contenedor.innerHTML = "";
        
        if (repos.length > 0) {
            repos.forEach(repo => {
                contenedor.innerHTML += `
                    <div class="estudio-item">
                        <strong>${repo.name}</strong>
                        <p>${repo.description || "Sin descripción"}</p>
                        <a href="${repo.html_url}" target="_blank" style="color:inherit; font-size:0.8em;">Ver código ➔</a>
                    </div>`;
            });
        } else {
            contenedor.innerHTML = "<p>No se encontraron proyectos.</p>";
        }
    } catch (error) {
        contenedor.innerHTML = "<p>Error al conectar con GitHub.</p>";
    }
}

const btnTema = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('tema') === 'oscuro') {
    body.classList.add('dark-mode');
    btnTema.innerText = '☀️ Modo Claro';
}

btnTema.onclick = () => {
    body.classList.toggle('dark-mode');
    const esOscuro = body.classList.contains('dark-mode');
    localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
    btnTema.innerText = esOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
};

// Iniciar la lista de estudios al cargar
renderizarEstudios();