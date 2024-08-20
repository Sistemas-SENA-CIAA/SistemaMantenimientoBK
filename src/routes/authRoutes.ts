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
 *      summary: "Listar usuario"
 *      description: Este endpoint es para listar los usuario totales 
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - bearerAuth: []
 */
router.post('/login', validarEstado(true), authController.loginUsuario);

router.get('/ruta-protegida', authController.saludar);


export default router;