const mongoose = require("mongoose");

const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Conexión exitosa a MongoDB Atlas");
        } catch (error) {
            console.error("Error conectándose a MongoDB:", error);
            throw new Error("Conexión fallida a la base de datos");
        }
    }
};

module.exports = connectToDatabase;
