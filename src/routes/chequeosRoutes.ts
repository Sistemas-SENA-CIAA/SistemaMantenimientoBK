import express from 'express'
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';
import chequeosController from '../controllers/chequeosController';

const router = express.Router();

router.post('/addOrUpdate', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO']), chequeosController.addOrUpdateChequeo);

router.get('/cosas/:mantenimientoId', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), chequeosController.getChequeosByMantenimiento)

export default router;