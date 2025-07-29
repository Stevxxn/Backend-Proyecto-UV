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
// En uv.controllers.js
uvController.getData = async (req, res) => {
    try {
        const { limit = 100, page = 1 } = req.query; // Parámetros opcionales
        const data = await UV.find()
            .sort({ timestamp: -1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

uvController.getDataByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const data = await UV.find({
            timestamp: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ timestamp: -1 });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

uvController.getLatestData = async (req, res) => {
    try {
        const data = await UV.findOne().sort({ timestamp: -1 });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = uvController;