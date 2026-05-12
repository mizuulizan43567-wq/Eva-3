(function() {
    // ========== DATOS DE CATEGORÍAS ==========
    const categorias = [
        {
            id: 'neumaticos',
            nombre: 'Neumáticos',
            descripcion: 'proximamente',
            items: [
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba1.jpg' },
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba2.jpg' },
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba1.jpg' }
            ]
        },
        {
            id: 'reparacion',
            nombre: 'Reparación',
            descripcion: 'proximamente',
            items: [
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba1.jpg' },
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba2.jpg' },
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba1.jpg' }
            ]
        },
        {
            id: 'alineacion',
            nombre: 'Alineación',
            descripcion: 'proximamente',
            items: [
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba2.jpg' },
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba2.jpg' }
            ]
        },
        {
            id: 'balanceo',
            nombre: 'Balanceo',
            descripcion: 'proximamente',
            items: [
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba1.jpg' },
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba2.jpg' }
            ]
        },
        {
            id: 'valvulas',
            nombre: 'Válvulas',
            descripcion: 'Válvulas y sensores TPMS. Cambio, revisión y programación.',
            items: [
                { titulo: 'Válvula Estándar', descripcion: 'Cambio de válvula de goma con núcleo. Incluye instalación.', precio: '$4.500', imagen: 'img/prueba1.jpg' },
                { titulo: 'Sensor TPMS Universal', descripcion: 'Sensor de presión programable. Compatible con mayoría de vehículos.', precio: '$45.000', imagen: 'img/prueba2.jpg' }
            ]
        },
        {
            id: 'servicios',
            nombre: 'Servicios',
            descripcion: 'proximamente',
            items: [
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba2.jpg' },
                { titulo: 'proximamente', descripcion: 'proximamente', precio: '$proximamente', imagen: 'img/prueba1.jpg' }
            ]
        },
        {
            id: 'ofertas',
            nombre: 'Ofertas',
            descripcion: 'proximamente',
            items: [
                { titulo: 'proximamente', descripcion: 'proximamente', precio: 'proximamente', imagen: 'img/prueba2.jpg' },
                { titulo: 'proximamente', descripcion: 'proximamente', precio: 'proximamente', imagen: 'img/prueba1.jpg' }
            ]
        }
    ];

    // ========== ELEMENTOS DEL DOM ==========
    const navCategorias = document.getElementById('navCategorias');
    const contenidoPrincipal = document.getElementById('contenidoPrincipal');
    const bienvenida = document.getElementById('bienvenida');

    // ========== GENERAR BOTONES DE CATEGORÍA ==========
    function generarBotones() {
        navCategorias.innerHTML = '';
        categorias.forEach((cat, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn-categoria';
            btn.textContent = cat.nombre;
            btn.dataset.categoriaId = cat.id;
            btn.addEventListener('click', () => mostrarCategoria(cat.id, btn));
            if (index === 0) btn.classList.add('activo'); // Opcional
            navCategorias.appendChild(btn);
        });
    }

    // ========== MOSTRAR CATEGORÍA SELECCIONADA ==========
    function mostrarCategoria(categoriaId, botonClickeado) {
        // Ocultar bienvenida
        if (bienvenida) bienvenida.style.display = 'none';

        // Marcar botón activo
        document.querySelectorAll('.btn-categoria').forEach(b => b.classList.remove('activo'));
        if (botonClickeado) botonClickeado.classList.add('activo');

        // Buscar datos de la categoría
        const categoria = categorias.find(c => c.id === categoriaId);
        if (!categoria) return;

        // Eliminar contenido anterior de categoría
        const contenidoPrevio = contenidoPrincipal.querySelectorAll('.categoria-titulo, .categoria-descripcion, .grid-tarjetas');
        contenidoPrevio.forEach(el => el.remove());

        // Construir HTML nuevo
        const nuevoHTML = `
            <h2 class="categoria-titulo">${categoria.nombre}</h2>
            <p class="categoria-descripcion">${categoria.descripcion}</p>
            <div class="grid-tarjetas">
                ${categoria.items.map(item => `
                    <article class="tarjeta">
                        <img 
                            src="${item.imagen}" 
                            alt="${item.titulo}" 
                            class="tarjeta-imagen" 
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        >
                        <div class="tarjeta-cuerpo">
                            <h3>${item.titulo}</h3>
                            <p>${item.descripcion}</p>
                            <span class="tarjeta-precio">${item.precio}</span>
                        </div>
                    </article>
                `).join('')}
            </div>
        `;

        // Insertar antes del div de bienvenida (que sigue oculto)
        contenidoPrincipal.insertAdjacentHTML('afterbegin', nuevoHTML);

        // Scroll suave
        contenidoPrincipal.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ========== VOLVER AL INICIO ==========
    function volverAlInicio() {
        // Eliminar contenido de categorías
        const elementosCategoria = contenidoPrincipal.querySelectorAll('.categoria-titulo, .categoria-descripcion, .grid-tarjetas');
        elementosCategoria.forEach(el => el.remove());

        // Mostrar bienvenida
        if (bienvenida) bienvenida.style.display = '';

        // Desmarcar botones
        document.querySelectorAll('.btn-categoria').forEach(b => b.classList.remove('activo'));

        // Scroll al principio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ========== EVENTO CLICK EN LOGO ==========
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            volverAlInicio();
        });
    }

    // ========== INICIALIZAR ==========
    function inicializar() {
        generarBotones();
        // Si quieres que la primera categoría se muestre automáticamente, descomenta:
        // const primerBtn = navCategorias.querySelector('.btn-categoria');
        // if (primerBtn) primerBtn.click();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }
})();