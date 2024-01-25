// ESTO ES UN MIDELWARE PORQUE SON FUNCIONES QUE SE EJECUTAN ANTES DE QUE LLEGUEN A LAS RUTAS.

export const authRequired = (req, res, next) => { // Para que esta funcion sea un midelware debe tener esos 3 oparametros (req, res, next)
  console.log(req.headers);
  next();
};