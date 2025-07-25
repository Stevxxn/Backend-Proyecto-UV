const UV = require('../models/uv');

const uvController = {};

// Método POST: Guardar datos del sensor UV
uvController.addData = async (req, res) => {
    try {
        const { value } = req.body;
        const newData = new UV({ value });
        await newData.save();
        res.status(200).json({ status: 'Datos UV guardados', data: newData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Método GET: Obtener todos los datos UV
uvController.getData = async (req, res) => {
    try {
        const data = await UV.find().sort({ timestamp: -1 }); // Orden descendente
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = uvController;