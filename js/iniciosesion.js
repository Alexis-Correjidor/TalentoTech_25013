document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    clearErrors();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let hasError = false;

    if (!email) {
        showError('email', 'Por favor ingrese su correo electrónico.');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError('email', 'Por favor ingrese un correo electrónico válido.');
        hasError = true;
    }

    if (!password) {
        showError('password', 'Por favor ingrese su contraseña.');
        hasError = true;
    }

    if (!hasError) {
        alert('Formulario enviado con éxito.');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerText = message;
    field.parentElement.appendChild(error);
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(function(error) {
        error.remove();
    });
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
