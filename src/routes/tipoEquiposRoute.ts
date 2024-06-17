import express from 'express';
import tipoEquiposController from '../controllers/tipoEquiposController';

const router = express.Router();

router.post('/', tipoEquiposController.agregarTipoEquipo);

router.route("/:id")
    .delete(tipoEquiposController.eliminarTipoEquipo);
    
export default router;