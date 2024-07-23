import express from 'express';
import cuentaDantes from '../controllers/cuentaDantesController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/rolValidatorMiddleware';

const router = express.Router();

router.post('/', verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), cuentaDantes.agregarCuentaDante);

router.get('/', cuentaDantes.listarCuentaDantes);

router.route("/:documento")
    .get(verificarToken, validarRol(['ADMINISTRADOR', 'RESPONSABLE']), cuentaDantes.obtenerCuentaDantesPorDocumento)
    .put(verificarToken, validarRol(['ADMINISTRADOR']), cuentaDantes.modificarDatosCuentadante)
    



export default router;