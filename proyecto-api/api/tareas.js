const connectToDatabase = require("../utils/db");
const Tarea = require("../models/tareas");

module.exports = async (req, res) => {
    await connectToDatabase();

    // Verifica el método de la solicitud
    if (req.method === "GET") {
        // Obtener todas las tareas
        try {
            const tareas = await Tarea.find({});
            return res.status(200).json(tareas);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener las tareas" });
        }
    }

    if (req.method === "POST") {
        // Crear una nueva tarea
        try {
            const { nombre, estado } = req.body;

            if (!nombre) {
                return res.status(400).json({ error: "El nombre es obligatorio" });
            }

            const nuevaTarea = new Tarea({ nombre, estado });
            await nuevaTarea.save();
            return res.status(201).json(nuevaTarea);
        } catch (error) {
            return res.status(500).json({ error: "Error al crear la tarea" });
        }
    }

    // Si el método no está soportado
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Método no permitido" });
};