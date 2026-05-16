(function() {
    // ==================== SEGURIDAD Y VALIDACIONES ====================
    
    // Sanitización para evitar XSS
    function sanitizar(texto) {
        if (!texto) return '';
        return texto.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }
    
    // Validación de email
    function validarEmail(email) {
        const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return re.test(email);
    }
    
    // Validación de teléfono chileno (formato +56 9 xxxx xxxx o 9 xxxx xxxx)
    function validarTelefono(tel) {
        const re = /^(\+56\s?)?9\s?\d{4}\s?\d{4}$/;
        return re.test(tel);
    }
    
    // Validación de patente chilena (antigua ABCD12 o nueva AB12CD)
    function validarPatente(patente) {
        if (!patente) return true; // opcional
        const re = /^[A-Za-z]{4}\d{2}$|^[A-Za-z]{2}\d{4}$/;
        return re.test(patente);
    }
    
    // Hash simple de contraseña (solo para simulación, NUNCA usar en producción real)
    function hashPassword(pwd) {
        let hash = 0;
        for (let i = 0; i < pwd.length; i++) {
            hash = ((hash << 5) - hash) + pwd.charCodeAt(i);
            hash |= 0;
        }
        return hash.toString();
    }
    
    // ==================== DATOS DE CATEGORÍAS (mismos que antes) ====================
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
    
    // ==================== ELEMENTOS DEL DOM ====================
    let btnAbrirRegistro, modalRegistro, btnCerrarModal, formRegistro, mensajeRegistro;
    let btnVerUsuarios, modalUsuarios, btnCerrarModalUsuarios, listaUsuarios;
    let navCategorias, contenidoPrincipal, bienvenida;
    
    // ==================== FUNCIONES AUXILIARES ====================
    function limpiarErroresFormulario() {
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        document.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));
    }
    
    function mostrarError(campoId, mensaje) {
        const errorSpan = document.getElementById(`error-${campoId}`);
        if (errorSpan) errorSpan.textContent = mensaje;
        const campo = document.getElementById(campoId);
        if (campo) campo.classList.add('error-input');
    }
    
    function cerrarModalRegistro() {
        if (modalRegistro) modalRegistro.classList.remove('activo');
        if (formRegistro) formRegistro.reset();
        limpiarErroresFormulario();
        if (mensajeRegistro) {
            mensajeRegistro.textContent = '';
            mensajeRegistro.className = 'form-mensaje';
        }
    }
    
    function cerrarModalUsuarios() {
        if (modalUsuarios) modalUsuarios.classList.remove('activo');
    }
    
    // ==================== RENDERIZADO DE TARJETAS (SEGURO, SIN INNERHTML) ====================
    function renderizarTarjetas(categoria) {
        // Eliminar contenido anterior de categorías
        const anteriores = contenidoPrincipal.querySelectorAll('.categoria-titulo, .categoria-descripcion, .grid-tarjetas');
        anteriores.forEach(el => el.remove());
        
        // Crear título
        const titulo = document.createElement('h2');
        titulo.className = 'categoria-titulo';
        titulo.textContent = categoria.nombre;
        
        // Crear descripción
        const descripcion = document.createElement('p');
        descripcion.className = 'categoria-descripcion';
        descripcion.textContent = categoria.descripcion;
        
        // Crear grid
        const grid = document.createElement('div');
        grid.className = 'grid-tarjetas';
        
        // Recorrer items y crear cada tarjeta con createElement
        categoria.items.forEach(item => {
            const tarjeta = document.createElement('article');
            tarjeta.className = 'tarjeta';
            
            const img = document.createElement('img');
            img.className = 'tarjeta-imagen';
            img.src = item.imagen;
            img.alt = sanitizar(item.titulo);
            img.loading = 'lazy';
            img.onerror = () => { img.style.display = 'none'; };
            
            const cuerpo = document.createElement('div');
            cuerpo.className = 'tarjeta-cuerpo';
            
            const h3 = document.createElement('h3');
            h3.textContent = sanitizar(item.titulo);
            
            const p = document.createElement('p');
            p.textContent = sanitizar(item.descripcion);
            
            const precio = document.createElement('span');
            precio.className = 'tarjeta-precio';
            precio.textContent = item.precio;
            
            cuerpo.appendChild(h3);
            cuerpo.appendChild(p);
            cuerpo.appendChild(precio);
            tarjeta.appendChild(img);
            tarjeta.appendChild(cuerpo);
            grid.appendChild(tarjeta);
        });
        
        // Insertar antes de la bienvenida
        contenidoPrincipal.insertBefore(titulo, bienvenida);
        contenidoPrincipal.insertBefore(descripcion, bienvenida);
        contenidoPrincipal.insertBefore(grid, bienvenida);
        
        // Ocultar bienvenida
        bienvenida.style.display = 'none';
    }
    
    // ==================== GENERAR BOTONES DE CATEGORÍAS ====================
    function generarBotones() {
        if (!navCategorias) return;
        navCategorias.innerHTML = '';
        categorias.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'btn-categoria';
            btn.textContent = cat.nombre;
            btn.dataset.id = cat.id;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.btn-categoria').forEach(b => b.classList.remove('activo'));
                btn.classList.add('activo');
                renderizarTarjetas(cat);
            });
            navCategorias.appendChild(btn);
        });
    }
    
    // ==================== VOLVER AL INICIO ====================
    function volverAlInicio() {
        const elementosCategoria = contenidoPrincipal.querySelectorAll('.categoria-titulo, .categoria-descripcion, .grid-tarjetas');
        elementosCategoria.forEach(el => el.remove());
        bienvenida.style.display = '';
        document.querySelectorAll('.btn-categoria').forEach(b => b.classList.remove('activo'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // ==================== REGISTRO DE USUARIO CON VALIDACIONES ====================
    function manejarRegistro(e) {
        e.preventDefault();
        limpiarErroresFormulario();
        let valido = true;
        
        // Obtener valores y sanitizar
        const nombre = sanitizar(document.getElementById('nombre').value.trim());
        const apellido = sanitizar(document.getElementById('apellido').value.trim());
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const password = document.getElementById('password').value;
        const confirmar = document.getElementById('confirmar_password').value;
        const marca = sanitizar(document.getElementById('marca').value.trim());
        const modelo = sanitizar(document.getElementById('modelo').value.trim());
        const anio = document.getElementById('anio').value;
        const patente = sanitizar(document.getElementById('patente').value.trim().toUpperCase());
        const tipo_neumatico = document.getElementById('tipo_neumatico').value;
        
        // Validaciones campo por campo
        if (!nombre) { mostrarError('nombre', 'El nombre es obligatorio'); valido = false; }
        if (!apellido) { mostrarError('apellido', 'El apellido es obligatorio'); valido = false; }
        
        if (!email) { mostrarError('email', 'El email es obligatorio'); valido = false; }
        else if (!validarEmail(email)) { mostrarError('email', 'Email inválido (ej: nombre@dominio.com)'); valido = false; }
        
        if (!telefono) { mostrarError('telefono', 'El teléfono es obligatorio'); valido = false; }
        else if (!validarTelefono(telefono)) { mostrarError('telefono', 'Formato: +56 9 1234 5678 o 9 1234 5678'); valido = false; }
        
        if (!password) { mostrarError('password', 'La contraseña es obligatoria'); valido = false; }
        else if (password.length < 6) { mostrarError('password', 'Mínimo 6 caracteres'); valido = false; }
        
        if (!confirmar) { mostrarError('confirmar', 'Confirma tu contraseña'); valido = false; }
        else if (password !== confirmar) { mostrarError('confirmar', 'Las contraseñas no coinciden'); valido = false; }
        
        if (!marca) { mostrarError('marca', 'La marca es obligatoria'); valido = false; }
        if (!modelo) { mostrarError('modelo', 'El modelo es obligatorio'); valido = false; }
        if (!anio) { mostrarError('anio', 'El año es obligatorio'); valido = false; }
        else if (anio < 1900 || anio > 2026) { mostrarError('anio', 'Año entre 1900 y 2026'); valido = false; }
        
        if (patente && !validarPatente(patente)) { mostrarError('patente', 'Formato: ABCD12 o AB12CD'); valido = false; }
        
        if (!valido) {
            mensajeRegistro.textContent = 'Corrige los errores en el formulario';
            mensajeRegistro.className = 'form-mensaje error';
            return;
        }
        
        // Verificar si el email ya existe
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuariosVulcanizadora') || '[]');
        if (usuariosGuardados.some(u => u.email === email)) {
            mensajeRegistro.textContent = 'Este correo electrónico ya está registrado';
            mensajeRegistro.className = 'form-mensaje error';
            return;
        }
        
        // Crear objeto usuario (contraseña hasheada)
        const nuevoUsuario = {
            id: Date.now(),
            nombre,
            apellido,
            email,
            telefono,
            passwordHash: hashPassword(password),
            vehiculo: { marca, modelo, anio, patente, tipo_neumatico },
            fechaRegistro: new Date().toISOString()
        };
        
        usuariosGuardados.push(nuevoUsuario);
        localStorage.setItem('usuariosVulcanizadora', JSON.stringify(usuariosGuardados));
        
        // Éxito
        mensajeRegistro.textContent = `¡Cuenta creada con éxito! Bienvenido/a ${nombre}`;
        mensajeRegistro.className = 'form-mensaje exito';
        
        setTimeout(() => {
            cerrarModalRegistro();
        }, 2000);
    }
    
    // ==================== MOSTRAR LISTA DE USUARIOS (MODAL) ====================
    function mostrarListaUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuariosVulcanizadora') || '[]');
        if (!listaUsuarios) return;
        
        listaUsuarios.innerHTML = '';
        
        if (usuarios.length === 0) {
            listaUsuarios.textContent = 'No hay usuarios registrados aún.';
            modalUsuarios.classList.add('activo');
            return;
        }
        
        const contenedor = document.createElement('div');
        contenedor.className = 'lista-usuarios-container';
        
        usuarios.forEach(u => {
            const card = document.createElement('div');
            card.className = 'usuario-card';
            // Usamos innerHTML solo aquí porque los datos ya están sanitizados al guardarse
            // Además, el contenido es interno y no hay riesgo de XSS gracias a sanitizar
            card.innerHTML = `
                <p><strong>${sanitizar(u.nombre)} ${sanitizar(u.apellido)}</strong> (${sanitizar(u.email)})</p>
                <p>📞 ${sanitizar(u.telefono)} | 🚗 ${sanitizar(u.vehiculo.marca)} ${sanitizar(u.vehiculo.modelo)} (${u.vehiculo.anio})</p>
                <p>📅 ${new Date(u.fechaRegistro).toLocaleDateString()}</p>
            `;
            contenedor.appendChild(card);
        });
        
        listaUsuarios.appendChild(contenedor);
        modalUsuarios.classList.add('activo');
    }
    
    // ==================== INICIALIZACIÓN ====================
    function inicializar() {
        // Obtener elementos del DOM
        btnAbrirRegistro = document.getElementById('btnAbrirRegistro');
        modalRegistro = document.getElementById('modalRegistro');
        btnCerrarModal = document.getElementById('btnCerrarModal');
        formRegistro = document.getElementById('formRegistro');
        mensajeRegistro = document.getElementById('mensajeRegistro');
        btnVerUsuarios = document.getElementById('btnVerUsuarios');
        modalUsuarios = document.getElementById('modalUsuarios');
        btnCerrarModalUsuarios = document.getElementById('btnCerrarModalUsuarios');
        listaUsuarios = document.getElementById('listaUsuarios');
        navCategorias = document.getElementById('navCategorias');
        contenidoPrincipal = document.getElementById('contenidoPrincipal');
        bienvenida = document.getElementById('bienvenida');
        
        // Eventos de modales
        if (btnAbrirRegistro) btnAbrirRegistro.addEventListener('click', () => modalRegistro.classList.add('activo'));
        if (btnCerrarModal) btnCerrarModal.addEventListener('click', cerrarModalRegistro);
        if (btnVerUsuarios) btnVerUsuarios.addEventListener('click', mostrarListaUsuarios);
        if (btnCerrarModalUsuarios) btnCerrarModalUsuarios.addEventListener('click', cerrarModalUsuarios);
        
        // Cerrar modales al hacer clic fuera del contenido
        window.addEventListener('click', (e) => {
            if (e.target === modalRegistro) cerrarModalRegistro();
            if (e.target === modalUsuarios) cerrarModalUsuarios();
        });
        
        // Envío del formulario
        if (formRegistro) formRegistro.addEventListener('submit', manejarRegistro);
        
        // Click en el logo para volver al inicio
        const logoLink = document.querySelector('.logo-link');
        if (logoLink) logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            volverAlInicio();
        });
        
        // Generar botones de categorías
        generarBotones();
    }
    
    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }
})();