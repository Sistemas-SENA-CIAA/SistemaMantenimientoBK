import express from 'express';
import equiposController from '../controllers/equiposController';

const router = express.Router();

router.post('/', equiposController.agregarEquipo);

router.get('/', equiposController.listarEquipos);

router.route("/:id")
    .get(equiposController.obtenerEquipoPorSerial)
    .put(equiposController.modificarEquipo)
    .delete(equiposController.eliminarEquipo);
    



export default router;