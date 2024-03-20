// Aqui lo que vamos hacer es configurar de base axios

import axios from'axios';

const instance = axios.create({ // Esto nos va a permitir decir a axios el dominio base que siempre va a consultar
  baseURL: 'http://localhost:4000/api',  
  withCredentials: true
})

export default instance