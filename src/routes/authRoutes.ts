import express from 'express';
import authController from '../controllers/authController';
import verificarToken from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/registro', authController.registrarUsuario);

router.post('/login', authController.loginUsuario);

router.get('/ruta-protegida', verificarToken,authController.saludar);


export default router;