import express from 'express';
import fs from 'fs';
const app = express();

const dataFilePath = './app/data.json';

function cargarDatos() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error al cargar los datos:', error);
        return { seccionales: [] };
    }
}
app.get('/:seccional/:year', (req, res) => {
    const seccional = req.params.seccional.toUpperCase();
    const year = req.params.year;
    const data = cargarDatos();
    const seccionalData = data.seccionales.find((secc) => secc.nombre === seccional);
    if (seccionalData) {
        if (seccionalData.delitos.hasOwnProperty(year)) {
            res.json({
                seccional: seccional,
                coords: seccionalData.coords,
                year: year,
                delitos: seccionalData.delitos[year]
            });
        }
        else {
            res.status(404).json({ error: 'No se encontraron datos para el año especificado.' });
        }
    }
    else {
        res.status(404).json({ error: 'No se encontró la seccional especificada.' });
    }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto:  http://localhost:${PORT}`);
});