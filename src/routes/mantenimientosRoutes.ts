import express from 'express';
import mantenimientosController from '../controllers/mantenimientosController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE', 'USUARIO']), mantenimientosController.listarMantenimientos);

router.post('/', verificarToken, validarRol(['ADMINISTRADOR']), mantenimientosController.agregarMantenimiento);

export default router