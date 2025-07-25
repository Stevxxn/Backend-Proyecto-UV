const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan'); // Opcional: para logs (lo tenías en tu otro server.js)

const app = express();
const URL = 'http://3.18.212.174:3000/api'
// Middlewares
app.use(cors({
    origin: URL,
    methods: ['GET', 'POST']
}));
app.use(express.json());
app.use(morgan('tiny')); // Logs de requests

// Conexión a MongoDB Atlas (igual que ya tienes)
mongoose.connect('mongodb+srv://stevenbautista717:1234@cluster0.sq5crqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión:', err));

// Importar rutas (opcional, para modularizar como en tu estructura)
const uvRoutes = require('./src/routes/uv.routes'); // Crear este archivo (te muestro abajo)
app.use('/api', uvRoutes); // Todas las rutas UV empezarán con /api

// Misma lógica de rutas que ya tienes (directas en server.js)
app.post('/api/uv', async (req, res) => {
    try {
    console.log("Datos recibidos:", req.body); // Log para depuración
    
    if (!req.body.uv && req.body.uv !== 0) {
        return res.status(400).json({ error: "Se requiere el campo 'uv'" });
    }

    const newData = new UVData({ value: req.body.uv });
    await newData.save();
    
    res.status(200).json({ 
        status: 'Datos guardados',
        savedData: newData
    });
    
    } catch (err) {   
    console.error("Error al guardar:", err);
    res.status(500).json({ 
        error: "Error en el servidor",
        details: err.message 
    });
    }
});

app.get('/api/uv', async (req, res) => {  
    const data = await UVData.find().sort({ timestamp: -1 }).limit(100);  
    res.json(data);  
});

// Iniciar servidor
app.listen(3000, () => console.log(`Servidor en ${URL}`));