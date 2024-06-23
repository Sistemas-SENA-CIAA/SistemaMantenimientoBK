//Generamos una sección de rutas
import express from 'express';
import usuariosController from '../controllers/usuariosController'
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';
const router = express.Router();

//Ruta GET para los usuarios
router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), usuariosController.listarUsuarios);

router.route("/:serial")
    .get(verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), usuariosController.obtenerUsuarioPorDocumento)
    .put(verificarToken, validarRol(['ADMINISTRADOR']), usuariosController.modificarDatosUsuario);

export default router;