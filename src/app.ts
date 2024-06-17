import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Request, Response } from "express";
import bodyParser from 'body-parser';
import equiposRoutes from './routes/equiposRoutes';
import tipoEquiposRoutes from './routes/tipoEquiposRoute';
import propietariosRoutes from './routes/propietariosRoutes'
import authRoutes from './routes/authRoutes'
import rolesRoutes from './routes/rolesRoutes';
import usuariosRoutes from './routes/usuariosRoutes';

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
app.use("/propietarios", propietariosRoutes);
app.use('/auth', authRoutes);
app.use('/roles', rolesRoutes);
app.use('/usuarios', usuariosRoutes);

export default app;