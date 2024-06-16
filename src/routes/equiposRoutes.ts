import express from 'express';
import equiposController from '../controllers/equiposController';

const router = express.Router();

 //Ruta para Obtener listado de equipos
router.get('/', equiposController.listarEquipos);

router.route("/:id")
    .get(equiposController.obtenerEquipoPorId)
    .put(equiposController.modificarEquipo)
    .delete(equiposController.eliminarEquipo);
    



export default router;