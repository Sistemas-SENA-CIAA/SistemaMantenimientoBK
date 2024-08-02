import express from 'express'
import areasController from '../controllers/areasController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), areasController.listarAreas);

router.post('/', verificarToken, validarRol(['ADMINISTRADOR']), areasController.agregarArea);

router.put('/:codigo', verificarToken, validarRol(['ADMINISTRADOR']), areasController.modificarArea);

export default router;