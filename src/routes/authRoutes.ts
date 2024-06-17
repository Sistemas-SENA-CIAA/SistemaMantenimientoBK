import express from 'express';
import authController from '../controllers/authController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.post('/registro', authController.registrarUsuario);

router.post('/login', authController.loginUsuario);

router.get('/ruta-protegida', verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO']),authController.saludar);


export default router;