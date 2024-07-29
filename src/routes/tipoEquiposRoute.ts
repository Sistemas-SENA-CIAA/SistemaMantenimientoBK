import express from 'express';
import tipoEquiposController from '../controllers/tipoEquiposController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.get('/', tipoEquiposController.listarTipoEquipos);

router.post('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), tipoEquiposController.agregarTipoEquipo);

router.put('/:id', verificarToken, validarRol(['ADMINISTRADOR']), tipoEquiposController.modificarTipo);
    
export default router;