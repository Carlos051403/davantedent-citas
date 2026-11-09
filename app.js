class Cita {
    constructor(nombre, apellidos, dni, telefono, fechaNacimiento, fecha, hora, observaciones) {
        this.id = Date.now().toString(); // Identificador unico en el instante actual
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.fecha = fecha;
        this.hora = hora;
        this.observaciones = observaciones;
    }
}

// Referencia globales al DOM con const ya que estos elementos en el HTML no cambian
const formulario = document.getElementById("formulario-cita");
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const filaVacia = document.getElementById("fila-vacia");

// Recuperamos las citas guardadas, o creamos un array vacío si es la primera vez
let listaCitas = JSON.parse(localStorage.getItem("citasDavanteDent")) || [];

// Pintamos la tabla nada más abrir la página
renderizarTabla();

//Interceptamos el evento del envio del formulario
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault(); // Esto evita que el navegador se recargue por defecto al enviar los datos

    // Con esto recolectamos los valores escritos por el usuario
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const fechaNacimiento = document.getElementById("fecha-nac").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const observaciones = document.getElementById("observaciones").value.trim();

    limpiarErrores(); // Se limpian errores previos

    let tieneErrores = false; // validación de datos solicitados 

    //Condicional para comprobar que el tlf solo tiene números sin textos
    if (isNaN(telefono) || telefono === "") {
        mostrarError("telefono");
        tieneErrores = true;
    }

    //con este bloque si hay errores, detenemos la ejecucion aqui y no se ccrea la cita
    if (tieneErrores) {
        alert("Por favor, corrige los campos marcados en rojo. El telefono debe ser númerico")
        return;
    }

    // Si todo es correcto creamos el objeto cita
    const nuevaCita = new Cita(nombre, apellidos, dni, telefono, fechaNacimiento, fecha, hora, observaciones);
    
    // Leemos si estamos en modo edición o creación
    const editIndex = document.getElementById("cita-id").value;

    if (editIndex === "") {
        // Si está vacío, es un registro nuevo
        listaCitas.push(nuevaCita);
    } else {
        // Si tiene un número, sobrescribimos el paciente en esa posición exacta
        listaCitas[editIndex] = nuevaCita;
        
        // Reseteamos el sistema para el próximo cliente
        document.getElementById("cita-id").value = "";
        document.getElementById("btn-guardar").textContent = "Guardar Cita";
    }

    // Se llama a la función que dibujara la tabla 
    renderizarTabla();
    guardarEnMemoria();

    // Con esto se limpia el formulario para el proximo cliente
    formulario.reset();

});

// Funcion Auxiliar Visual 

// Función para pintar de rojo el campo que tiene un error
function mostrarError(idElemento) {
    document.getElementById(idElemento).classList.add("error-input");
}

// Función para limpiar los bordes rojos antes de volver a comprobar
function limpiarErrores() {
    const camposConError = document.querySelectorAll(".error-input");
    
    camposConError.forEach(function(campo) {
        campo.classList.remove("error-input");
    });
}

// Manipulación del DOM

// Funcion para dibujar las citas en la tabla HTML
function renderizarTabla() {
    // 1. Limpiamos las filas antiguas de pacientes
    const filasAntiguas = cuerpoTabla.querySelectorAll(".fila-paciente");
    filasAntiguas.forEach(function(fila) {
        fila.remove();
    });

    // 2. Si la lista está vacía, mostramos la fila con el texto exacto requerido
    if (listaCitas.length === 0) {
        const filaVacia = document.createElement("tr");
        filaVacia.classList.add("fila-paciente");
        filaVacia.innerHTML = `<td colspan="6" style="text-align: center; padding: 15px; color: #666;">dato vacío</td>`;
        cuerpoTabla.appendChild(filaVacia);
        return;
    }

    // 3. Si hay citas, dibujamos cada paciente alineado con sus columnas
    listaCitas.forEach(function(cita, index) {
        const fila = document.createElement("tr");
        fila.classList.add("fila-paciente");

        fila.innerHTML = `
            <td style="text-align: center; padding: 10px;">${index + 1}</td>
            <td style="text-align: center; padding: 10px;">${cita.fecha} <br> ${cita.hora}</td>
            <td style="text-align: center; padding: 10px;">${cita.nombre} ${cita.apellidos}</td>
            <td style="text-align: center; padding: 10px;">${cita.dni}</td>
            <td style="text-align: center; padding: 10px;">${cita.telefono}</td>
            <td style="text-align: center; padding: 10px;">
                <button type="button" class="btn-editar" style="cursor:pointer; margin-right:5px;" onclick="cargarCita(${index})">Editar</button>
                <button type="button" class="btn-borrar" style="cursor:pointer; color:red;" onclick="borrarCita(${index})">Borrar</button>
            </td>
        `;

        cuerpoTabla.appendChild(fila);
    });
}

//Funcion para eliminar paciente de la lista
function borrarCita(index) {
    // Metodo splice dentro del array en la posicion (index) y elimmina 1 elemento
    listaCitas.splice(index, 1);

    // se redibuja la tabla al tener un paciente menos
    renderizarTabla();
    guardarEnMemoria();
}

// Funcion de rellenar el formulario
function cargarCita(index) {
    const cita = listaCitas[index];


    // Volcamos los datos en las cajas de texto
    document.getElementById("nombre").value = cita.nombre;
    document.getElementById("apellidos").value = cita.apellidos;
    document.getElementById("dni").value = cita.dni;
    document.getElementById("telefono").value = cita.telefono;
    document.getElementById("fecha-nac").value = cita.fechaNacimiento;
    document.getElementById("fecha").value = cita.fecha;
    document.getElementById("hora").value = cita.hora;
    document.getElementById("observaciones").value = cita.observaciones;

    // se guarda la posicion en el input oculto para saber a quien estamos editando
    document.getElementById("cita-id").value = index;

    // Cambiamos el texto del botón principal para dar feedback visual
    document.getElementById("btn-guardar").textContent = "Actualizar Cita";
}

// Función para que persista los datos en el navegador
function guardarEnMemoria() {
    localStorage.setItem("citasDavanteDent", JSON.stringify(listaCitas));
}

