import express from 'express';
import estadosController from '../controllers/estadosController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.get('/', estadosController.listarEstados);
    
export default router;