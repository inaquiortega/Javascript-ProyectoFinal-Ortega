const ingresarTarea = document.getElementById('ingresarTarea');
const agregarTarea = document.getElementById('agregarTareas');
const listaTareas = document.getElementById('listaDeTareas');
const borrarTodasLasTareasBoton = document.getElementById('borrarTodasLasTareas');
const fraseDia = document.getElementById('fraseDelDia');

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

actualizarListaTareas();

window.addEventListener('load', () => {
    infoClima();
});

function agregarTareas() {
    const txtTarea = ingresarTarea.value.trim();
    if (txtTarea) {
        const tarea = { Texto: txtTarea, Fecha: new Date() };
        tareas.push(tarea);
        actualizarListaTareas();
        ingresarTarea.value = '';
        localStorage.setItem('tareas', JSON.stringify(tareas));
        mostrarNotificacion("¡Recuerdo agregado correctamente!");
    }
}

function mostrarNotificacion(mensaje) {
    Toastify({
        text: mensaje,
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
    Swal.fire({
        title: 'Editar recuerdo',
        input: 'text',
        inputPlaceholder: 'Nuevo recuerdo',
        inputValue: tareas[index].Texto,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Debes ingresar un recuerdo válido';
            }
        },
        customClass: {
            title: 'txtBold2'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            tareas[index].Texto = result.value;
            actualizarListaTareas();
            localStorage.setItem('tareas', JSON.stringify(tareas));
            mostrarNotificacion("¡Tarea editada correctamente!");
        }
    });
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    actualizarListaTareas();
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function borrarTodasLasTareas() {
    tareas = [];
    actualizarListaTareas();
    localStorage.removeItem('tareas');
}

agregarTarea.addEventListener('click', agregarTareas);
ingresarTarea.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        agregarTareas();
    }
});

window.addEventListener('beforeunload', function () {
    localStorage.setItem('tareas', JSON.stringify(tareas));
});

borrarTodasLasTareasBoton.addEventListener('click', borrarTodasLasTareas);

const fraseYa = document.getElementById('fraseDelDia');

function fraseAleatoria() {
    return fetch('https://my.api.mockaroo.com/frasesTotalRecall.json?key=8c27d090')
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('Error');
            }
            return respuesta.json();
        })
        .then(frases => {
            const randomIndex = Math.floor(Math.random() * frases.length);
            const randomFrase = frases[randomIndex];
            fraseYa.textContent = `Frase del día: ${randomFrase}`;
        })
        .catch(error => {
            console.error('Error', error);
        });
}

fraseAleatoria();
