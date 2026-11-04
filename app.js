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
    
    // Guardamos el objeto recien creado en nuestra lista Array
    listaCitas.push(nuevaCita);

    // Se llama a la función que dibujara la tabla 
    renderizarTabla();

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
    // 1. Limpieza segura: borramos solo las filas antiguas sin romper la estructura base del HTML
    const filasAntiguas = cuerpoTabla.querySelectorAll(".fila-paciente");
    filasAntiguas.forEach(function(fila) {
        fila.remove();
    });

    // 2. Ocultamos el mensaje de "dato vacío"
    if (listaCitas.length > 0 && filaVacia) {
        filaVacia.style.display = "none";
    }

    // 3. Dibujamos cada cita alineada con tus encabezados azules
    listaCitas.forEach(function(cita, index) {
        const fila = document.createElement("tr");
        fila.classList.add("fila-paciente"); // Etiqueta clave para que la limpieza segura funcione
        
        // 4. Inyectamos los datos en 5 columnas exactas para que no se rompa tu diseño
        fila.innerHTML = `
            <td style="text-align: center; padding: 10px;">${index + 1}</td>
            <td style="text-align: center; padding: 10px;">${cita.fecha} <br> ${cita.hora}</td>
            <td style="text-align: center; padding: 10px;">${cita.nombre} ${cita.apellidos}</td>
            <td style="text-align: center; padding: 10px;">${cita.dni}</td>
            <td style="text-align: center; padding: 10px;">${cita.telefono}</td>
            <td style="text-align: center; padding: 10px;">
                <button class="btn-editar" style="cursor:pointer; margin-right:5px;">Editar</button>
                <button class="btn-borrar" style="cursor:pointer; color:red;">Borrar</button>
            </td>
        `;
        
        cuerpoTabla.appendChild(fila);
    });
}