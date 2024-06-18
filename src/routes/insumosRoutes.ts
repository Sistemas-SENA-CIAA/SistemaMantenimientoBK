import express from 'express'
import insumosController from '../controllers/insumosController';
import verificarToken from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', verificarToken, insumosController.listarInsumos);

router.post('/', verificarToken, insumosController.agregarInsumo);

export default router;