import express from 'express';
import propietariosController from '../controllers/propietariosController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.post('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), propietariosController.agregarPropietario);

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), propietariosController.listarPropietarios);

router.route("/:documento")
    .get(verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), propietariosController.obtenerPropietarioPorDocumento)
    .put(verificarToken, validarRol(['ADMINISTRADOR']), propietariosController.modificarDatosPropietario)
    



export default router;