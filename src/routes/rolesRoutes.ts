//Generamos una sección de rutas
import express from 'express';
import rolesController from '../controllers/rolesController';
const router = express.Router();


//Ruta GET para los Roles
router.get('/', rolesController.listarRoles);

//Ruta POST para los Roles
router.post('/', rolesController.agregarRol);

//Ruta POST para los Asociar usuarios
router.post('/asociaUsuarios', rolesController.asociarUsuario);


export default router;