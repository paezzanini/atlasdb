const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    estado: { type: String, enum: ["Pendiente", "En progreso", "Completada"], default: "Pendiente" },
    fechaCreacion: { type: Date, default: Date.now },
});

const Tarea = mongoose.models.Tarea || mongoose.model("Tarea", TareaSchema);

module.exports = Tarea;
