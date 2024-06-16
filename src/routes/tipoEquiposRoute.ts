import express from 'express';
import tipoEquipoController from '../controllers/tipoEquipoController';

const router = express.Router();

router.post('/', tipoEquipoController.agregarTipoEquipo);

router.route("/:id")
    .delete(tipoEquipoController.eliminarTipoEquipo);
    
export default router;