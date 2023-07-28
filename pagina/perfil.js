// Variables globales
const containerPerfil = document.getElementById("containerPerfil"); // Agrega el perfil de usuario
const botonCargar = document.getElementById("botonCargar"); // Botón para que se muestre un nuevo perfil de usuario cuando se hace click

// Evento "click" del botón anterior
botonCargar.addEventListener("click", () => {
  obtenerPerfil(); // Función "obtenerPerfil" que muestra un perfil aleatorio utilizando la API
});

function obtenerPerfil() {
  setTimeout(() => { // Se simula una espera de carga
    fetch("https://randomuser.me/api/")
      .then((response) => response.json()) // Convierte la respuesta a JSON
      .then((data) => {
        const user = data.results[0]; // Primera posición del array "results" que muestra los datos del perfil de usuario
        mostrarPerfil(user);
      })
      .catch((error) => {
        console.error("Error al obtener el perfil:", error);
      });
  }, 1000);
}

function mostrarPerfil(user) {
  // Creación de elementos HTML para mostrar la información del perfil
  const cartaPerfil = document.createElement("div");
  cartaPerfil.classList.add("cartaPerfil");

  // Imagen
  const imagenPerfil = document.createElement("img");
  imagenPerfil.src = user.picture.large;
  cartaPerfil.appendChild(imagenPerfil);

  // Nombre
  const nombrePerfil = document.createElement("h3");
  nombrePerfil.textContent = `${user.name.first} ${user.name.last}`;
  cartaPerfil.appendChild(nombrePerfil);

  // Mail
  const mailPerfil = document.createElement("p");
  mailPerfil.textContent = user.email;
  cartaPerfil.appendChild(mailPerfil);

  // Elemento contenedor "containerPerfil"
  containerPerfil.appendChild(cartaPerfil);
}

// setInterval para llamar a la función "obtenerPerfil" cada 5 segundos
setInterval(() => {
  obtenerPerfil();
}, 5000);

// Async/await - función asíncrona
async function obtenerPerfilAsync() {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const user = data.results[0];
    mostrarPerfil(user);
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
  }
}

botonCargar.addEventListener("click", () => {
  obtenerPerfilAsync();
});

// Recuperar datos del Local Storage
const usuarioJSON = localStorage.getItem('usuario');
if (usuarioJSON) {
  const usuario = JSON.parse(usuarioJSON);
  const nombreDeUsuarioElement = document.getElementById('nombreDeUsuario');
  nombreDeUsuarioElement.textContent = usuario;

  const avatarElement = document.getElementById('avatar');
  const avatarUrl = `https://api.multiavatar.com/${usuario}.svg`;
  avatarElement.src = avatarUrl;

  const numSeguidoresElement = document.getElementById('numSeguidores');
  const numSeguidores = getRandomNumber(200, 10000); // Genera números aleatorios para los números de seguidores
  numSeguidoresElement.textContent = numSeguidores;

  const numSeguidosElement = document.getElementById('numSeguidos');
  const numSeguidos = getRandomNumber(200, 1000); // Genera números aleatorios para los números de seguidos
  numSeguidosElement.textContent = numSeguidos;

  // Array skills (habilidades)
  const skills = ['UX/UI', 'Front End Developer', 'Back End Developer', 'HTML', 'CSS', 'JavaScript', 'React', 'Node', 'Git', 'Python', 'Ruby'];
  const containerSkills = document.querySelector('.skills');

  // Función "getRandomSkill" para obtener una habilidad aleatoria sin repetir
  function getRandomSkill(skillsUsadas) {
    const skillsDisponibles = skills.filter(skill => !skillsUsadas.includes(skill)); // Filtra las habilidades disponibles y da una habilidad aleatoria
    if (skillsDisponibles.length === 0) {
      return null; // Si todas las habilidades ya se usaron, retorna null
    }
    const randomSkillIndex = getRandomNumber(0, skillsDisponibles.length - 1);
    return skillsDisponibles[randomSkillIndex];
  }

  const skillsUsadas = [];
  for (let i = 0; i < 3; i++) {
    const randomSkill = getRandomSkill(skillsUsadas);
    if (randomSkill !== null) {
      skillsUsadas.push(randomSkill);
      const etiquetaSkills = document.createElement('div');
      etiquetaSkills.classList.add('skills-etiqueta');
      etiquetaSkills.textContent = randomSkill;
      containerSkills.appendChild(etiquetaSkills);
    }
  }
} else {
  window.location.href = './index.html'; // Redirección en caso de no encontrar usuario en el Local Storage
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}