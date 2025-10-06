import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const getPeliculas = async () =>{
    const peliculas = await getDocs(collection(db,'peliculas'))
    let html =`<br/><h1>Cartelera prox</h1><br/>`

    peliculas.forEach(indice => {
        const pelicula = indice.data();

        html +=`

				<div class="contenido-pelicula">
				<div class="datos-pelicula">
				<h2>${pelicula.Titulo}</h2><br/>
				<p>${pelicula.Sinopsis}</p>
				<br/>
                <div class="boton-pelicula"> 
                <a href="pelicula.html?id=${pelicula.id}" >
                <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                </a>
               	</div>
               	<div class="boton-pelicula"> 
               		<a href="https://www.youtube.com/v/${pelicula.Link}" target=_blank  onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
               		<img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
               		</a>
                        </div> 
					</div>
					<img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"/><br/><br/>
            `
    });
    document.getElementById("contenido-interno").innerHTML = html;
}
getPeliculas()