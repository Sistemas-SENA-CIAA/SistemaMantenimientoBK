import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Request, Response } from "express";
import bodyParser from 'body-parser';
import equiposRoutes from './routes/equiposRoutes';
import tipoEquiposRoutes from './routes/tipoEquiposRoute';
import cuentaDantesRoutes from './routes/cuentaDantesRoutes'
import authRoutes from './routes/authRoutes'
import rolesRoutes from './routes/rolesRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import mantenimientosRoutes from './routes/mantenimientosRoutes';
import insumosRoutes from './routes/insumosRoutes';
import estadosRoutes from './routes/estadosRoutes';
import areasRoutes from './routes/areasRoutes'

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
app.use("/cuentadantes", cuentaDantesRoutes);
app.use('/auth', authRoutes);
app.use('/roles', rolesRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/mantenimientos', mantenimientosRoutes);
app.use('/insumos', insumosRoutes);
app.use('/estados', estadosRoutes);
app.use('/areas', areasRoutes)

export default app;