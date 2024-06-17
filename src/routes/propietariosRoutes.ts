import express from 'express';
import propietariosController from '../controllers/propietariosController';

const router = express.Router();

router.post('/', propietariosController.agregarPropietario);

router.get('/', propietariosController.listarPropietarios);

router.route("/:id")
    .get(propietariosController.obtenerEquipoPorDocumento)
    .put(propietariosController.modificarPropietario)
    .delete(propietariosController.eliminarPropietario);
    



export default router;