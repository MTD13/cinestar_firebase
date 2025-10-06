//importa los modulos necesarios desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";


//bloque de conexion hacia firebase
const firebaseConfig = {
    apiKey: "AIzaSyCgLK8BoLeAzv4S8-Jx3mqXpJSEZJzaIdw",
    authDomain: "cinestar-jp-49e4e.firebaseapp.com",
    projectId: "cinestar-jp-49e4e",
    storageBucket: "cinestar-jp-49e4e.firebasestorage.app",
    messagingSenderId: "297607668639",
    appId: "1:297607668639:web:26e0e780c047dea49953aa"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

//Conecta con la BD Firebase
const db = getFirestore(app);

//Exporta BD para usarlos en otros archivos JS
export{db};