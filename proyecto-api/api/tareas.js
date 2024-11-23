const connectToDatabase = require("../utils/db");
const Tarea = require("../models/tareas");

module.exports = async (req, res) => {
    await connectToDatabase();

    if (req.url === '/') {
        res.status(200).send('Bienvenido a la API de Tareas');
      } else {
        res.status(404).send('Ruta no encontrada');
      }


    if (req.method === "GET") {
        // Obtener todas las tareas
        const tareas = await Tarea.find({});
        return res.status(200).json(tareas);
    }

    if (req.method === "POST") {
        // Crear una nueva tarea
        const { nombre, estado } = req.body;
        if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

        const nuevaTarea = new Tarea({ nombre, estado });
        await nuevaTarea.save();
        return res.status(201).json(nuevaTarea);
    }

    res.status(405).json({ error: "Método no permitido" });
};
