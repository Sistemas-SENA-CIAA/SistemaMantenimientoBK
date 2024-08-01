import express from 'express';
import equiposController from '../controllers/equiposController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.post('/', verificarToken, validarRol(['ADMINISTRADOR']), equiposController.agregarEquipo);

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), equiposController.listarEquipos);

router.route("/:serial")
    .get(verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), equiposController.obtenerEquipoPorSerial)
    .put(verificarToken, validarRol(['ADMINISTRADOR']), equiposController.modificarEquipo);
    



export default router;