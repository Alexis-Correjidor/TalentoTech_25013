document.addEventListener("DOMContentLoaded", () => {
    const renderizarProductos = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
        actualizarContadores(carrito);
    
        let seccionProductos = document.getElementById("contenedor-carrito");
        seccionProductos.innerHTML = "";
    
        if (!carrito.length) {
        let mensajeCarrito = document.createElement("p");
        mensajeCarrito.classList.add("text-white", "text-center", "fs-4", "mt-5");
        mensajeCarrito.textContent = "No hay productos en el carrito";
        seccionProductos.appendChild(mensajeCarrito);
        } else {
        let fila = document.createElement("div");
        fila.className = "row justify-content-center";

        carrito.forEach((elemento, index) => {
            let tarjeta = document.createElement("div");
            tarjeta.className = "col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4";

        tarjeta.innerHTML = `
        <div class="card h-100 bg-dark text-white bg-opacity-75" style="min-height: 350px;">
            <img src="${elemento.images[0]}" class="card-img-top" alt="${elemento.title}" style="height: 180px; object-fit: contain; padding: 10px;">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${elemento.title}</h5>
                <p class="card-text">$${elemento.price}</p>
                <button class="btn btn-primary mt-auto btn-eliminar">Eliminar</button>
            </div>
        </div>
        `;

        tarjeta.querySelector(".btn-eliminar").addEventListener("click", () => {
            eliminarProducto(index);
        });

        fila.appendChild(tarjeta);
        });

        seccionProductos.appendChild(fila);
        }

    renderizarBotones();
    };

    const actualizarContadores = (carrito) => {
        const contador = document.getElementById("contador-carrito");
        const total = document.getElementById("total-carrito");
    
        let suma = carrito.reduce((acc, item) => acc + item.price, 0);
    
        contador.textContent = carrito.length;
        total.textContent = `$${suma.toFixed(2)}`;
    };

    const eliminarProducto = (indice) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(indice, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarProductos();
    };

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito");
        renderizarProductos();
    };

    const renderizarBotones = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let acciones = document.getElementById("acciones-carrito");
        acciones.innerHTML = "";
    
        if (carrito.length) {
        let div = document.createElement("div");
        div.className = "d-flex justify-content-center gap-3 mt-4";

        let btnVaciar = document.createElement("button");
        btnVaciar.textContent = "Vaciar carrito";
        btnVaciar.className = "btn btn-danger";
        btnVaciar.addEventListener("click", vaciarCarrito);

        let btnFinalizar = document.createElement("button");
        btnFinalizar.textContent = "Finalizar compra";
        btnFinalizar.className = "btn btn-success";
        btnFinalizar.addEventListener("click", () => {
            let confirmado = confirm("¿Estás seguro que deseas finalizar la compra?");
            if (confirmado) {
            alert("¡Gracias por tu compra!");
            localStorage.removeItem("carrito");
            window.location.href = "../index.html";
            }
        });

        div.appendChild(btnVaciar);
        div.appendChild(btnFinalizar);
        acciones.appendChild(div);
        }
    };

    renderizarProductos();
});

