import { z } from 'zod'; // Importamos libreria zod, lo que va hacer Z es lo que nos va a permitir tipos de datos

// Para el Register.
export const registerSchema = z.object({ // Esto lo que va hacer es crear el schema de validacion de los datos enviados por el usuario

  username: z
		.string({ // Parametro requerido.
			required_error: "Username is required",
	}),

  email: z
		.string({ // Parametro requerido.
			required_error: "Email is required",
		})
		.email({ // Parametro requerido.
			message: "Invalidated email",
		}),

	password: z
		.string({ // Parametro requerido.
			required_error: "Password is required",
		})
		.min(6, { // Parametro de incluir como munimo 6 caracteres.
			message: "Password must be at least 6 characters",
		}),	

});

// Esto es para una prueba sin importancia de git 