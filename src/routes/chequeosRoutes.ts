import express from 'express'
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';
import chequeosController from '../controllers/chequeosController';

const router = express.Router();

router.post('/', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO']), chequeosController.agregarChequeo);

router.put('/:idChequeo', verificarToken, chequeosController.actualizarChequeo);

export default router;