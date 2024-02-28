//Estos son Esquemas de validaciones de dastos mediante libreria zop al gual que joy validation. para las tasks

import { z } from 'zod'; // Importamos libreria zod, lo que va hacer Z es lo que nos va a permitir tipos de datos

export const createTaskSchema = z.object({ // esto creara el schema de validacion para las tareas

  title: z
    .string({required_error: 'Title is required'}),

  description: z
    .string({required_error: 'Description must be a string'}),

  date: z
    .string().datetime().optional(),

});