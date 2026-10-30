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