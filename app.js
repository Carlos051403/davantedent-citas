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

    console.log("¡Formulario interceptado correctamente!");
});