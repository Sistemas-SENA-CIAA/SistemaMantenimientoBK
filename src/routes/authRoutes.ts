import express from 'express';
import authController from '../controllers/authController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';
import validarEstado from '../middlewares/stateValidatorMiddleware';

const router = express.Router();

router.post('/registro', authController.registrarUsuario);

/**
 * Post track
 * @openapi
 * /users:
 *    post:
 *      tags:
 *        - users
 *      summary: "Login Uusarios"
 *      description: Este endpoint es para realizar el proceso de login y obtención de Token JWT
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Inicio de sesión exitoso.
 *      security:
 *       - bearerAuth: []
 */
router.post('/login', validarEstado(true), authController.loginUsuario);

router.get('/ruta-protegida', authController.saludar);


export default router;