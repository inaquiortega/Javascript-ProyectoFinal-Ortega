const ingresarTareas = document.getElementById('ingresarTarea');
const agregarTareas = document.getElementById('agregarTarea');
const listaTareas = document.getElementById('listaDeTareas');

let tareas = JSON.parse(sessionStorage.getItem('tareas')) || [];

function agregarTarea() {
    const txtTarea = ingresarTareas.value.trim();
    if (txtTarea) {
        const tarea = { Texto: txtTarea, Fecha: new Date() };
        tareas.push(tarea);
        actualizarListaTareas();
        ingresarTareas.value = '';
        sessionStorage.setItem('tareas', JSON.stringify(tareas));
        mostrarNotificacion("¡Recuerdo agregado correctamente!");
    }
}
function mostrarNotificacion(message) {
    Toastify({
        text: "¡Recuerdo agregado correctamente!",
        className: "notificacion",
        style: {
            background: "linear-gradient(to right, #000000, #990000)"
        },
        offset: {
            x: 20,
            y: 20
        },
    }).showToast();
}

function actualizarListaTareas() {
    listaTareas.innerHTML = '';
    tareas.forEach((tarea, index) => {
        const listaItems = document.createElement('li');
        listaItems.innerHTML = `
            ${tarea.Texto}
            <button onclick="editarTarea(${index})">Editar</button>
            <button onclick="eliminarTarea(${index})">Borrar</button>
        `;
        listaTareas.appendChild(listaItems);
    });
}

function editarTarea(index) {
    const actualizarTexto = prompt('Editar tarea:', tareas[index].text);
    if (actualizarTexto !== null) {
        tareas[index].text = actualizarTexto;
        actualizarListaTareas();
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    actualizarListaTareas();
}

agregarTareas.addEventListener('click', agregarTarea);
ingresarTarea.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});

window.addEventListener('beforeunload', function () {
    sessionStorage.clear();
});