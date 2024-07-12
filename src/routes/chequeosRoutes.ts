import express from 'express'
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';
import chequeosController from '../controllers/chequeosController';

const router = express.Router();

router.post('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), chequeosController.agregarChequeo);

export default router;