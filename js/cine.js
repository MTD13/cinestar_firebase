import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js"; 
const getCine = async ()=>{
    const id = new URLSearchParams(window.location.search).get("id") // recupera parametro


    const data = await getDocs(collection(db,"cines"))

    let html =""

    data.forEach(indice => {
        const cine = indice.data()
        
        if (String(cine.id) === String(id)) {

            html += `
                <h1>${cine.RazonSocial}</h1>
                <div class="cine-info">
                <p><b>Dirección:</b> ${cine.Direccion}</p>
                <p> <b>Telefono</b> : ${cine.Telefonos}</p>
                <br>

                <h2>Películas en cartelera</h2>
                <ul>${
                    cine.peliculas && cine.peliculas.length > 0
                    ? cine.peliculas
                        .map(
                            (p) => `
                    <li>
                        <b>${p.Titulo}</b><br>
                        Horarios: ${p.Horarios ?? ""}</br>
                        
                    </li>`
                        )
                        .join("")
                    : "<li>No hay películas registradas.</li>"
                }
                </ul>
                
                </div>
                <br>
                <img src="img/cine/${cine.id}.2.jpg"/>
                <h2>Tarifas</h2>
                <table border="1" cellpadding="5">
                <tr><th>Día</th><th>Precio</th></tr>
                ${
                    cine.tarifas && cine.tarifas.length > 0
                    ? cine.tarifas
                        .map(
                            (t) =>
                            `<tr><td>${t.DiasSemana ?? "?"}</td><td>${t.Precio ?? "?"}</td></tr>`
                        )
                        .join("")
                    : "<tr><td colspan='2'>No hay tarifas registradas.</td></tr>"
                }
                </table>
                

                <br>  <h2><b>JUEGOS</b> </h2>  </br>
				<br><img  src="img/cine/${cine.id}.3.jpg"/></br>
				<br><span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
						Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
						<br/><br/>
						Visitános y diviértete con nosotros. 
						<br/><br/>
						<b>CINESTAR</b>, siempre pensando en tí. 
				</span>
            `;
        }
    });

    document.getElementById("contenido-interno").innerHTML = html;
}

getCine()



