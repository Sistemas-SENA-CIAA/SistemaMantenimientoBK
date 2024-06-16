import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Request, Response } from "express";
import bodyParser from 'body-parser';
import equiposRoutes from './routes/equiposRoutes';
import tipoEquiposRoutes from './routes/tipoEquiposRoute'

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    console.log('Hola mundo');
    res.send('Hola mundo')
});

//Rutas de la APP
app.use("/equipos", equiposRoutes);
app.use("/tipoEquipos", tipoEquiposRoutes);

export default app;