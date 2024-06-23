import express from 'express'
import insumosController from '../controllers/insumosController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), verificarToken, insumosController.listarInsumos);

router.post('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), verificarToken, insumosController.agregarInsumo);

export default router;