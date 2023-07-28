// Función constructora "Usuario" con parámetros nombre y clave
function Usuario(nombre, clave) {
    this.nombre = nombre;
    this.clave = clave;

    // Método "validarDatos" -> compara usuario y clave con los almacenados en "Usuario"
    this.validarDatos = function (usuario, clave) {
        return usuario === this.nombre && clave === this.clave;
    };
}

// Array que tiene tres usuarios válidos con sus respectivas claves (instancias de la función construcora "Usuario")
let usuariosValidos = [];

// Elementos del DOM
const inputUsuario = document.getElementById('usuario');
const inputClave = document.getElementById('clave');
const botonLogin = document.getElementById('botonLogin');

// Función que permite mostrar mensajes en el DOM
function mostrarMensaje(mensaje) {
    const mensajeDOM = document.createElement('p');
    mensajeDOM.textContent = mensaje;

    // Eliminar mensajes anteriores antes de mostrar el nuevo mensaje (para no crear una acumulación de mensajes)
    const contenedorMensajes = document.getElementById('mensajes');
    contenedorMensajes.innerHTML = '';
    contenedorMensajes.appendChild(mensajeDOM);
}

// Función para validar los datos del formulario
function validarFormulario() {
    const usuario = inputUsuario.value;
    const clave = inputClave.value;

    // Verifica si los campos están completos
    if (usuario !== '' && clave !== '') {
        const usuarioValido = usuariosValidos.find(u => u.validarDatos(usuario, clave));

        // Comprueba que los datos sean correctos para ingresar
        if (usuarioValido) {
            mostrarMensaje('¡Ingresó correctamente!');
            console.log('El usuario ingresó al sitio.'); // Muestra mensaje en consola para verificar que ingresó correctamente

            // Almacenar en el Local Storage
            const usuarioJSON = JSON.stringify(usuario);
            localStorage.setItem('usuario', usuarioJSON);

            return true;
        } else {
            mostrarMensaje('Usuario o clave incorrectos.');
            return false;
        }
    } else {
        mostrarMensaje('Por favor, complete todos los campos.');
        return false;
    }
}

// Evento click del botón de login
botonLogin.addEventListener('click', function () {
    if (intentos.length < 3 && !validacion) {
        validacion = validarFormulario();
        intentos.push(validacion);
    }

    if (!validacion) {
        mostrarMensaje('Le quedan ' + (3 - intentos.length) + ' intento(s). Por favor, inténtelo nuevamente.');
    }

    if (intentos.length === 3 && !validacion) {
        mostrarMensaje('Ha agotado el número máximo de intentos. Por favor, inténtelo más tarde.');
        console.log('El usuario agotó el número máximo de intentos para ingresar al sitio.');
    }

    if (validacion) {
        window.location.href = './pagina/perfil.html';
    }
});

// Recuperar datos del Local Storage
const usuarioJSON = localStorage.getItem('usuario');
if (usuarioJSON) {
    const usuario = JSON.parse(usuarioJSON);
    inputUsuario.value = usuario;
}

// Registro de usuario
const registroContenedor = document.createElement('div');
registroContenedor.id = 'registro-contenedor';
registroContenedor.classList.add('container')

const registroTitulo = document.createElement('h2');
registroTitulo.textContent = 'Registrarse:';
registroContenedor.appendChild(registroTitulo);

const registroUsuario = document.createElement('input');
registroUsuario.type = 'text';
registroUsuario.placeholder = 'Ingrese un nombre de usuario';
registroContenedor.appendChild(registroUsuario);

const registroClave = document.createElement('input');
registroClave.type = 'password';
registroClave.placeholder = 'Ingrese una clave';
registroContenedor.appendChild(registroClave);

const registroBoton = document.createElement('button');
registroBoton.textContent = 'Registrarse';
registroContenedor.appendChild(registroBoton);

document.body.appendChild(registroContenedor);

registroBoton.addEventListener('click', function () {
    const username = registroUsuario.value;
    const password = registroClave.value;

    if (username !== '' && password !== '') {
        const nuevoUsuario = new Usuario(username, password);
        usuariosValidos.push(nuevoUsuario);

        mostrarMensaje('¡Usuario registrado correctamente!');
        console.log('Nuevo usuario registrado');

        // Almacenar en el Local Storage
        const usuariosJSON = JSON.stringify(usuariosValidos);
        localStorage.setItem('usuarios', usuariosJSON);

        registroUsuario.value = '';
        registroClave.value = '';
    } else {
        mostrarMensaje('Por favor, complete todos los campos.');
    }
});

// Recuperar usuarios del Local Storage
const usuariosJSON = localStorage.getItem('usuarios');
if (usuariosJSON) {
    const usuariosArray = JSON.parse(usuariosJSON);
    usuariosValidos = usuariosArray.map(usuario => new Usuario(usuario.nombre, usuario.clave));
} else {
    usuariosValidos = [
        new Usuario('usuario1', 'clave1'),
        new Usuario('usuario2', 'clave2'),
        new Usuario('usuario3', 'clave3'),
    ];
}

let intentos = []; // Array que almacena resultados de los intentos (true or false)
let validacion = false;