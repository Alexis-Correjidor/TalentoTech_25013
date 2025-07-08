let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosTotales = [];

document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    actualizarAgregados();
    actualizarTotal();

    // Evento de búsqueda
    const formBusqueda = document.getElementById("form-busqueda");
    formBusqueda.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = document.getElementById("campo-busqueda").value.trim().toLowerCase();
        if (texto) {
            const filtrados = productosTotales.filter(producto =>
                producto.title.toLowerCase().includes(texto)
            );
            if (filtrados.length > 0) {
                renderizarProductos(filtrados);
            } else {
                mostrarMensaje("No se encontraron coincidencias");
            }
        }
    });

    // Evento botón Limpiar
    const btnLimpiar = document.getElementById("btn-limpiar");
    btnLimpiar.addEventListener("click", () => {
        document.getElementById("campo-busqueda").value = "";
        renderizarProductos(); // restaura todo
    });
});

const renderizarProductos = (productos = null) => {
    const url = "https://dummyjson.com/products?limit=10";

    if (productos) {
        mostrarProductos(productos);
        return;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            productosTotales = data.products;
            mostrarProductos(productosTotales);
        })
        .catch(err => console.error("Error: ", err));
};

const mostrarProductos = (productos) => {
    let contenedorProductos = document.getElementById("contenedor-productos");
    contenedorProductos.innerHTML = "";

    for (const producto of productos) {
        let tarjetaProducto = document.createElement("div");
        tarjetaProducto.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";

        tarjetaProducto.innerHTML = `
            <div class="card h-100 bg-dark text-white bg-opacity-75" style="min-height: 350px;">
                <img src="${producto.images[0]}" class="card-img-top img-producto" alt="${producto.title}" style="height: 180px; object-fit: contain; padding: 10px;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${producto.title}</h5>
                    <p class="card-text fw-bold">$${producto.price.toFixed(2)}</p>
                    <button class="btn btn-primary mt-auto btn-agregar">Agregar</button>
                </div>
            </div>
        `;

        tarjetaProducto.querySelector(".btn-agregar").addEventListener("click", () => {
            alert(`${producto.title} agregado al carrito`);
            agregarProducto(producto);
            actualizarAgregados();
            actualizarTotal();
        });

        contenedorProductos.appendChild(tarjetaProducto);
    }
};

const mostrarMensaje = (mensaje) => {
    let contenedorProductos = document.getElementById("contenedor-productos");
    contenedorProductos.innerHTML = `
        <div class="text-center text-white fs-4 mt-5">${mensaje}</div>
    `;
};

const agregarProducto = (producto) => {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const actualizarAgregados = () => {
    const contadorCarrito = document.getElementById("contador-carrito");
    contadorCarrito.textContent = carrito.length;
};

const actualizarTotal = () => {
    const totalCarrito = document.getElementById("total-carrito");
    let total = carrito.reduce((acc, prod) => acc + prod.price, 0);
    totalCarrito.textContent = `$${total.toFixed(2)}`;
};

// irAOtraPagina fuera del DOMContentLoaded
function irAOtraPagina() {
    window.location.href = "./pages/registrarse.html";
}
