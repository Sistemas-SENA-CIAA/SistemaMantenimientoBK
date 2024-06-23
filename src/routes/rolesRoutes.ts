//Generamos una sección de rutas
import express from 'express';
import rolesController from '../controllers/rolesController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';
const router = express.Router();


//Ruta GET para los Roles
router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), rolesController.listarRoles);

//Ruta POST para los Roles
router.post('/', verificarToken, rolesController.agregarRol);

//Ruta POST para los Asociar usuarios
router.post('/asociaUsuarios', verificarToken,rolesController.asociarUsuario);


export default router;