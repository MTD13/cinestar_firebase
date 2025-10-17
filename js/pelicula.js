import { db } from "./firebase.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const getPelicula = async () => {
  const id = new URLSearchParams(window.location.search).get("id"); // obtiene el id de la URL
  
  if (!id) {
    console.error("⚠️ No se recibió ID en la URL");
    return;
  }

  // 🔍 Buscar en la colección "peliculas" donde el campo "id" sea igual al valor recibido
  const q = query(collection(db, "peliculas"), where("id", "==", id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    document.getElementById("contenido-interno").innerHTML = "<p>Película no encontrada.</p>";
    return;
  }

  // Obtener los datos de la primera coincidencia
  let pelicula;
  querySnapshot.forEach((doc) => {
    pelicula = doc.data();
  });

  // Generar el HTML del detalle
  const html = `
    <div class="detalle-pelicula">
      <h1>${pelicula.Titulo}</h1><br/>
      <img src="img/pelicula/${id}.jpg" width="220" height="320"/><br/><br/>
      <p><strong>Sinopsis:</strong> ${pelicula.Sinopsis}</p><br/>
      <p><strong>Duración:</strong> ${pelicula.Duracion || "No especificada"}</p><br/>
      <p><strong>Género:</strong> ${pelicula.Genero || "No especificado"}</p><br/>
      <p><strong>Clasificación:</strong> ${pelicula.Clasificacion || "No especificada"}</p><br/>
      
      <div class="boton-pelicula">
        <a href="https://www.youtube.com/v/${pelicula.Link}" target="_blank">
          <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
        </a>
      </div>
    </div>
  `;

  document.getElementById("contenido-interno").innerHTML = html;
};

getPelicula();











