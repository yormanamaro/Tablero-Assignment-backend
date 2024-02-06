// Se crearan las estructuras de los datos para interpretacion de mongodb.(en cuanto a la creacion de tareas).

import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({ // Este sera el modelo que se guardara en la base de datos con respecto a las tareas.
  title:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Task", taskSchema);