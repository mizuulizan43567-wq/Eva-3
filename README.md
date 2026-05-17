# Eva-3
v1.4

Quiero que actúes como un desarrollador frontend senior. Necesito que generes el código completo de una página web para una vulcanizadora llamada "Vulcanización Don Miguel". El proyecto debe cumplir con los siguientes requisitos técnicos y de diseño, **respetando exactamente el estilo visual original** que se describe abajo.

## Requisitos funcionales y técnicos

### 1. Estructura de archivos
Genera tres archivos:
- `index.html`
- `style.css`
- `codigo.js`
- Además, un `README.md` que documente el uso de IA (explicando qué prompts se usaron y cómo se mejoró el código).

### 2. Diseño visual (debe mantenerse fiel a esta descripción)
- Tema oscuro con acento naranja (`#f15a24`).
- Header con sticky, gradiente negro, borde inferior naranja.
- Logo a la izquierda: un círculo con icono "⚙" y texto "Vulcanización Don Miguel" y "Profesionales · Desde 1998".
- Al lado derecho del logo, dos botones redondeados: "Crear cuenta" (naranja) y "Ver usuarios" (verde oscuro `#2c5f2d`). En móviles se apilan verticalmente.
- Navegación de categorías (botones generados dinámicamente): Neumáticos, Reparación, Alineación, Balanceo, Válvulas, Servicios, Ofertas.
- Contenido principal: una bienvenida con icono de llanta girando. Al hacer clic en una categoría, se muestran tarjetas con imagen, título, descripción y precio.
- Footer con copyright y contacto.
- Modales: uno para registro de usuarios, otro para mostrar la lista de usuarios registrados. Ambos con overlay oscuro, cierre con "X" y clic fuera.

### 3. Formulario de registro (en modal)
- Campos obligatorios: nombre, apellido, email, teléfono, contraseña, confirmar contraseña, marca, modelo, año.
- Opcional: patente (con validación de formato chileno), tipo de neumático (select).
- Validaciones en JavaScript (además de HTML5):
  - Email: formato estándar.
  - Teléfono chileno: +56 9 XXXX XXXX o 9 XXXX XXXX.
  - Año: entre 1900 y 2026.
  - Patente chilena: formato antiguo (ABCD12) o nuevo (AB12CD), opcional.
  - Contraseña: mínimo 6 caracteres, y debe coincidir con confirmación.
- Mostrar mensajes de error específicos debajo de cada campo y borde rojo en el campo.
- Al enviar, se debe **sanitizar** el texto (escapar caracteres HTML) para prevenir XSS.
- La contraseña no se guarda en texto plano: usa un hash simple (por ejemplo, conversión a entero, solo para simulación).
- Guardar el usuario en `localStorage` con un array de objetos. No permitir emails duplicados.
- Mostrar mensaje de éxito y cerrar el modal tras 2 segundos.

### 4. Lista de usuarios (modal aparte)
- Botón "Ver usuarios" abre un modal que muestra todas las cuentas registradas en `localStorage`.
- Cada usuario se muestra como una tarjeta con nombre, email, teléfono, vehículo y fecha de registro.
- Si no hay usuarios, mostrar mensaje adecuado.

### 5. Categorías y productos
- Los datos de categorías e ítems deben estar en un array de objetos dentro del JS. Usa los mismos datos que proporcioné originalmente (7 categorías con sus respectivos items, incluyendo imágenes de Unsplash).
- Al hacer clic en una categoría, se deben **renderizar las tarjetas sin usar `innerHTML`** (usa `createElement`, `textContent`, etc.). El resultado visual debe ser idéntico a usar innerHTML.
- Las tarjetas deben tener imagen, título, descripción, precio, y efectos hover.
- Al hacer clic en el logo, se vuelve al inicio (se ocultan las tarjetas y se muestra la bienvenida).

### 6. Seguridad y buenas prácticas
- Todo el código JS debe estar envuelto en una IIFE para evitar contaminar el ámbito global.
- Uso de `sanitizar()` para cualquier texto que se muestre en el DOM.
- Prevención de XSS: no usar `innerHTML` con datos del usuario (solo en la lista de usuarios donde los datos ya están sanitizados al guardarse, pero justifica).
- Los eventos deben estar correctamente asignados y no generar fugas de memoria.
- Código modular, funciones pequeñas y reutilizables, comentarios en español.

### 7. Responsive
- Usa media queries para que en tablets y móviles el header se apile, los botones ocupen todo el ancho, las tarjetas se adapten.
- El modal debe ser scrollable si el contenido excede la altura.

### 8. Documentación de IA (README.md)
- Incluir una sección "Uso de Inteligencia Artificial" donde se explique:
  - Qué prompts se dieron a la IA (por ejemplo, "Necesito un formulario con validaciones de teléfono chileno", "Cómo prevenir XSS", "Refactoriza para evitar innerHTML").
  - Cómo se mejoró el código gracias a la IA (validaciones, seguridad, modularidad).
  - Evidencia de las mejoras (comentarios en el código, estructura).

### 9. Entregable final
- Proporciona el código completo de cada archivo en bloques separados, listo para copiar y pegar.
- Asegúrate de que no haya errores de sintaxis y que funcione en un navegador moderno.

**Importante:** El diseño original debe mantenerse casi intacto (colores, fuentes, bordes, sombras, animaciones). Solo agrega los elementos nuevos (botón "Ver usuarios", mensajes de error, modal de lista) sin alterar el aspecto general que ya existía. El código CSS original ya lo tengo, pero puedes pedírmelo si lo necesitas. En caso de no tenerlo, genera uno coherente con la descripción visual.