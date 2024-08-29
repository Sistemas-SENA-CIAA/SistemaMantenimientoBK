"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const rolValidatorMiddleware_1 = __importDefault(require("../middlewares/rolValidatorMiddleware"));
const stateValidatorMiddleware_1 = __importDefault(require("../middlewares/stateValidatorMiddleware"));
const router = express_1.default.Router();
router.post('/registro', authMiddleware_1.default, (0, rolValidatorMiddleware_1.default)(['ADMINISTRADOR']), authController_1.default.registrarUsuario);
router.post('/login', (0, stateValidatorMiddleware_1.default)(true), authController_1.default.loginUsuario);
router.get('/ruta-protegida', authController_1.default.saludar);
exports.default = router;
