import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';


const app = express();
app.use(express.json())


dotenv.config();

conectarDB();  

const dominiosPermitidos = [process.env.FRONTEND_URL]; 
 
// Cuando realicemos la siguiente operación  de corsOptions que le demos al boton crear cuenta va a verificar que dominio realiza la petición y lo va a almacenar en la variable llamada 'origin' y la revisará si está registrado en la lista de dominiosPermitidos, si es diferente a -1 significa que si está en la lista de dominios permitidos. LLegará al callback cuyo primer parámetro es el mensaje de error y como no habrá error le permitirá el acceso. Caso contrario llegará al segundo callback mandando el error.

const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            // El Origen del Request está permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
};

app.use(cors(corsOptions));



app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});