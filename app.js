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

// Con este Array global almacenamos las citas en la memoria de la aplicación
let listaCitas = [];

//Interceptamos el evento del envio del formulario
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault(); // Esto evita que el navegador se recargue por defecto al enviar los datos

    // Con esto recolectamos los valores escritos por el usuario
    const citaId = document.getElementById("cita-id").value;
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const telefono = document.getElementById("telefono").vale.trim();
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
    
    // Guardamos el objeto recien creado en nuestra lista Array
    listaCitas.push(nuevaCita);

    // Se llama a la función que dibujara la tabla 
    renderizarTabla();

    // Con esto se limpia el formulario para el proximo cliente
    formulario.requestFullscreen();
    
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