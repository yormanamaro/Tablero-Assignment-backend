// EN ESTE FILE VAMOS A CONECTAR LA AUTENTICACION DEL FRONTEND CON EL BACK.

import axios from "./axios"; // Importamos axios desde mi pripia ruta en axios.js


export const registerRequest = user => axios.post(`/register`, user); // Lo que estamos haciendo es pasar la api con su esquema auth register el el user que es el del body

export const loginRequest = user => axios.post(`/login`, user); // Lo que estamos haciendo es pasar la api con su esquema auth login

export const verityTokenRequest = () => axios.get('/auth/verity'); // Esta sera una ruta anexa a las demas para verificacion.