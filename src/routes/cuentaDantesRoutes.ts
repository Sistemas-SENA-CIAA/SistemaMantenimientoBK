import express from 'express';
import cuentaDantes from '../controllers/cuentaDantesController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.post('/', verificarToken, validarRol(['ADMINISTRADOR']), cuentaDantes.agregarCuentaDante);

router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'TÉCNICO EN CAMPO', 'USUARIO DE CONSULTA']), cuentaDantes.listarCuentaDantes);

router.route("/:documento")
    .get(verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO DE CONSULTA']), cuentaDantes.obtenerCuentaDantesPorDocumento)
    .put(verificarToken, validarRol(['ADMINISTRADOR']), cuentaDantes.modificarDatosCuentadante)
    



export default router;