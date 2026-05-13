(function() {

    // ========== REGISTRO DE USUARIO ==========
    const btnAbrirRegistro = document.getElementById('btnAbrirRegistro');
    const modalRegistro = document.getElementById('modalRegistro');
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    const formRegistro = document.getElementById('formRegistro');
    const mensajeRegistro = document.getElementById('mensajeRegistro');

    // Abrir modal
    if (btnAbrirRegistro) {
        btnAbrirRegistro.addEventListener('click', () => {
            modalRegistro.classList.add('activo');
        });
    }

    // Cerrar modal
    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', () => {
            modalRegistro.classList.remove('activo');
            mensajeRegistro.textContent = '';
            mensajeRegistro.className = 'form-mensaje';
            formRegistro.reset();
        });
    }

    // Cerrar al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modalRegistro) {
            modalRegistro.classList.remove('activo');
            mensajeRegistro.textContent = '';
            mensajeRegistro.className = 'form-mensaje';
            formRegistro.reset();
        }
    });

    // Manejar envío del formulario
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();

            const camposRequeridos = formRegistro.querySelectorAll('[required]');
            let valido = true;
            camposRequeridos.forEach(campo => {
                if (!campo.value.trim()) {
                    valido = false;
                    campo.style.borderColor = '#f44336';
                } else {
                    campo.style.borderColor = '#444';
                }
            });

            if (!valido) {
                mensajeRegistro.textContent = 'Por favor completa todos los campos obligatorios (*)';
                mensajeRegistro.className = 'form-mensaje error';
                return;
            }

            const datosUsuario = {
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                password: document.getElementById('password').value,
                vehiculo: {
                    marca: document.getElementById('marca').value,
                    modelo: document.getElementById('modelo').value,
                    anio: document.getElementById('anio').value,
                    patente: document.getElementById('patente').value,
                    tipo_neumatico: document.getElementById('tipo_neumatico').value
                },
                fechaRegistro: new Date().toISOString()
            };

            const usuarios = JSON.parse(localStorage.getItem('usuariosVulcanizadora') || '[]');
            usuarios.push(datosUsuario);
            localStorage.setItem('usuariosVulcanizadora', JSON.stringify(usuarios));

            mensajeRegistro.textContent = '¡Cuenta creada con éxito! Bienvenido/a ' + datosUsuario.nombre;
            mensajeRegistro.className = 'form-mensaje exito';

            setTimeout(() => {
                modalRegistro.classList.remove('activo');
                formRegistro.reset();
                mensajeRegistro.textContent = '';
                mensajeRegistro.className = 'form-mensaje';
            }, 2000);
        });
    }

    // ========== DATOS DE CATEGORÍAS ==========
    const categorias = [
        {
            id: 'neumaticos',
            nombre: 'Neumáticos',
            descripcion: 'Amplia gama de neumáticos para autos, camionetas y vehículos pesados.',
            items: [
                { titulo: 'Neumático Premium A1', descripcion: 'Ideal para ciudad y carretera. Excelente agarre en seco y mojado. Durabilidad de 60.000 km.', precio: '$89.990', imagen: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop' },
                { titulo: 'Neumático Todo Terreno X3', descripcion: 'Diseñado para off-road ligero. Banda de rodadura reforzada. Perfecto para SUV 4x4.', precio: '$129.990', imagen: 'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=600&h=400&fit=crop' },
                { titulo: 'Neumático Económico City', descripcion: 'Opción económica sin sacrificar seguridad. Bajo nivel de ruido y buena eficiencia de combustible.', precio: '$55.990', imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop' }
            ]
        },
        {
            id: 'reparacion',
            nombre: 'Reparación',
            descripcion: 'Reparación de pinchazos, cortes y daños en neumáticos. Rápido y confiable.',
            items: [
                { titulo: 'Reparación de Pinchazo', descripcion: 'Parche interno vulcanizado. Incluye desmontaje, reparación y balanceo.', precio: '$12.000', imagen: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop' },
                { titulo: 'Reparación de Corte Lateral', descripcion: 'Evaluación y reparación especializada para cortes en flanco. Solo si es seguro.', precio: '$18.500', imagen: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600&h=400&fit=crop' },
                { titulo: 'Vulcanización en Caliente', descripcion: 'Proceso de vulcanización profesional para daños mayores. Mayor durabilidad.', precio: '$25.000', imagen: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop' }
            ]
        },
        {
            id: 'alineacion',
            nombre: 'Alineación',
            descripcion: 'Alineación computarizada 3D para un desgaste parejo y manejo óptimo.',
            items: [
                { titulo: 'Alineación Delantera', descripcion: 'Ajuste de convergencia y camber en eje delantero. Ideal tras cambio de neumáticos.', precio: '$22.000', imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop' },
                { titulo: 'Alineación Total 4 Ruedas', descripcion: 'Recomendado para vehículos con tracción integral o después de golpe fuerte.', precio: '$35.000', imagen: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop' }
            ]
        },
        {
            id: 'balanceo',
            nombre: 'Balanceo',
            descripcion: 'Balanceo electrónico de alta precisión. Elimina vibraciones en el volante.',
            items: [
                { titulo: 'Balanceo por Rueda', descripcion: 'Incluye contrapesos y calibración. Tiempo estimado: 15 min por rueda.', precio: '$8.000', imagen: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop' },
                { titulo: 'Balanceo Premium', descripcion: 'Balanceo con máquina láser. Incluye limpieza de superficie de montaje.', precio: '$11.500', imagen: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop' }
            ]
        },
        {
            id: 'valvulas',
            nombre: 'Válvulas',
            descripcion: 'Válvulas y sensores TPMS. Cambio, revisión y programación.',
            items: [
                { titulo: 'Válvula Estándar', descripcion: 'Cambio de válvula de goma con núcleo. Incluye instalación.', precio: '$4.500', imagen: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop' },
                { titulo: 'Sensor TPMS Universal', descripcion: 'Sensor de presión programable. Compatible con mayoría de vehículos.', precio: '$45.000', imagen: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop' }
            ]
        },
        {
            id: 'servicios',
            nombre: 'Servicios',
            descripcion: 'Mantenimiento general: cambio de aceite, frenos, amortiguadores y más.',
            items: [
                { titulo: 'Cambio de Aceite', descripcion: 'Incluye filtro y aceite sintético 5W-30. Para motores nafteros.', precio: '$42.000', imagen: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop' },
                { titulo: 'Revisión de Frenos', descripcion: 'Inspección de pastillas, discos y líquido de frenos. Diagnóstico gratuito.', precio: 'Desde $15.000', imagen: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop' }
            ]
        },
        {
            id: 'ofertas',
            nombre: 'Ofertas',
            descripcion: 'Promociones imperdibles del mes. ¡Aprovecha nuestros descuentos!',
            items: [
                { titulo: 'Pack 4 Neumáticos + Alineación', descripcion: 'Compra 4 neumáticos premium y llévate la alineación totalmente gratis.', precio: 'Antes $380.000', imagen: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop' },
                { titulo: '2x1 en Balanceo', descripcion: 'Balancea 2 ruedas y la tercera es gratis. Válido hasta fin de mes.', precio: 'Ahorra $8.000', imagen: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop' }
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
            if (index === 0) btn.classList.add('activo');
            navCategorias.appendChild(btn);
        });
    }

    // ========== MOSTRAR CATEGORÍA SELECCIONADA ==========
    function mostrarCategoria(categoriaId, botonClickeado) {
        if (bienvenida) bienvenida.style.display = 'none';
        document.querySelectorAll('.btn-categoria').forEach(b => b.classList.remove('activo'));
        if (botonClickeado) botonClickeado.classList.add('activo');

        const categoria = categorias.find(c => c.id === categoriaId);
        if (!categoria) return;

        const contenidoPrevio = contenidoPrincipal.querySelectorAll('.categoria-titulo, .categoria-descripcion, .grid-tarjetas');
        contenidoPrevio.forEach(el => el.remove());

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

        contenidoPrincipal.insertAdjacentHTML('afterbegin', nuevoHTML);
        contenidoPrincipal.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ========== VOLVER AL INICIO ==========
    function volverAlInicio() {
        const elementosCategoria = contenidoPrincipal.querySelectorAll('.categoria-titulo, .categoria-descripcion, .grid-tarjetas');
        elementosCategoria.forEach(el => el.remove());
        if (bienvenida) bienvenida.style.display = '';
        document.querySelectorAll('.btn-categoria').forEach(b => b.classList.remove('activo'));
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }
})();