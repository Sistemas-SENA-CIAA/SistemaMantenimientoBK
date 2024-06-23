import express from 'express';
import tipoEquiposController from '../controllers/tipoEquiposController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.post('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), tipoEquiposController.agregarTipoEquipo);
    
export default router;