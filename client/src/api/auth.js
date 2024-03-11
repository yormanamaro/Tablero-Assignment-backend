// EN ESTE FILE VAMOS A CONECTAR LA AUTENTICACION DEL FRONTEND CON EL BACK.

import axios from 'axios'; // Importamos axios ya instaklado como -SE 

const API = 'http://localhost:4000/api' // guardamos nuestra api del back

export const registerRequest = user => axios.post(`${API}/register`, user); // Lo que estamos haciendo es pasar la api con su esquema auth register el el user que es el del body

