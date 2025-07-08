function validarFormulario() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var sexo = document.getElementById('sexo').value;
    var tipo = document.getElementById('tipo').value;
    var numero = document.getElementById('numero').value;
    var fechaNacimiento = document.getElementById('fecha-nacimiento').value;
    var telefono = document.getElementById('telefono').value;
    var estadoCivil = document.getElementById('estado-civil').value;
    var domicilio = document.getElementById('domicilio').value;
    
    // Expresión regular para verificar si el campo contiene solo letras y espacios
    var letrasEspaciosRegex = /^[A-Za-z\s]+$/;
    
    if (nombre === '' || apellido === '' || sexo === '' || tipo === '' || numero === '' || fechaNacimiento === '' || telefono === '' || estadoCivil === '' || domicilio === '') {
        alert('Por favor, complete todos los campos.');
        return false; // Evita que el formulario se envíe si hay campos vacíos
    }

    // Validación para nombre y apellido: verificar si contienen solo letras y espacios
    if (!nombre.match(letrasEspaciosRegex) || !apellido.match(letrasEspaciosRegex)) {
        alert('El nombre y el apellido solo deben contener letras y espacios.');
        return false;
    }

    // Verificar si el número de teléfono tiene el formato correcto
    var telefonoRegex = /^\d{10}$/; // Expresión regular para verificar que el número de teléfono tiene 10 dígitos
    if (!telefono.match(telefonoRegex)) {
        alert('Por favor, introduzca un número de teléfono válido.');
        return false;
    }
    
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
        const actualizarAgregados = () => {
        const contadorCarrito = document.getElementById("contador-carrito");
        if (contadorCarrito) contadorCarrito.textContent = carrito.length;
        };
    
        const actualizarTotal = () => {
        const totalCarrito = document.getElementById("total-carrito");
        if (totalCarrito) {
            let total = carrito.reduce((acc, prod) => acc + prod.price, 0);
            totalCarrito.textContent = `$${total.toFixed(2)}`;
        }
        };
    
        actualizarAgregados();
        actualizarTotal();
    });


