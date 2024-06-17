import express from 'express';
import equiposController from '../controllers/equiposController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.post('/', verificarToken, validarRol(['ADMINISTRADOR']), equiposController.agregarEquipo);

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO']), equiposController.listarEquipos);

router.route("/:id")
    .get(verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO']), equiposController.obtenerEquipoPorSerial)
    .put(verificarToken, validarRol(['ADMINISTRADOR']), equiposController.modificarEquipo)
    .delete(verificarToken, validarRol(['ADMINISTRADOR']), equiposController.eliminarEquipo);
    



export default router;