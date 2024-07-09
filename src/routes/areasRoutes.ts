import express from 'express'
import areasController from '../controllers/areasController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), verificarToken, areasController.listarAreas);

router.post('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), verificarToken, areasController.agregarArea);

export default router;