const express = require('express');
const router = express.Router();
const uvController = require('../controllers/uv.controllers');
const ip = 'http://3.18.212.174:3000/api';
router.post('/uv', uvController.addData);
router.get('/uv', uvController.getData);
router.get('/uv/filter', uvController.getDataByDate);
router.get('/uv/latest', uvController.getLatestData);

// Ruta de bienvenida (NUEVA)
router.get('/', (req, res) => {
    res.send(`
        <h1>🌟 ¡Bienvenido al Sistema de Monitoreo UV!</h1>
        <p>Endpoints disponibles:</p>
        <ul>
            <li><strong>POST /api/uv</strong>: Enviar datos del sensor UV</li>
            <li><strong>GET /api/uv</strong>: Consultar registros UV</li>
        </ul>
        <p>Para enviar datos, usa un cliente HTTP como Postman o cURL.</p>
        <p>Ejemplo de cuerpo para POST:</p>
        <pre>{ "value": 5.6 }</pre>
        <nav>
            <a href="${ip}/uv">Consultar registros UV</a>
        </nav>
        <p>¡Gracias por usar nuestro servicio!</p>
        <p>Desarrollado por 
            <ul>
                <li><strong>Steven Parra</strong></li>
                <li><strong>Sebastian Tipantuña</strong></li>
                <li><strong>Jossue Bastidas</strong></li>
                <li><strong>Dylan Huilca</strong></li>
            </ul>
        </p>
    `);
});

module.exports = router;