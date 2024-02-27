// En este file lo que se va hacer es crear un middleware (funcion) de validacionde los schemas de usuarios ya creados, es decir que tengas los parametros exigidos.

export const validateSchema = (schema) => (req, res, next) => { // Esta funcion validara que los parametros ingresados en schemas register, login segun lo establecido es schema zop concuerden
	try {
		schema.parse(req.body) // Se usa el metodo parse que ya lo valida en express  // y va a comparar con el req.body xq es lo que va a ir llegando.
		next(); // Si lo valida correctamente parasara al sigueinete paso.
	} catch (error) {
		return res.status(400).json({ error });
	}
};