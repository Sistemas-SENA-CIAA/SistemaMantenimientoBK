import express from 'express';
import propietariosController from '../controllers/propietariosController';

const router = express.Router();

router.post('/', propietariosController.agregarPropietario);

router.get('/', propietariosController.listarPropietarios);

router.route("/:documento")
    .get(propietariosController.obtenerPropietarioPorDocumento)
    .put(propietariosController.modificarPropietario)
    .delete(propietariosController.eliminarPropietario);
    



export default router;