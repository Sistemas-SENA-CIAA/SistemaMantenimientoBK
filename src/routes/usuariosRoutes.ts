//Generamos una sección de rutas
import express from 'express';
import usuariosController from '../controllers/usuariosController'
const router = express.Router();

//Ruta GET para los usuarios
router.get('/', usuariosController.consultar);

export default router;