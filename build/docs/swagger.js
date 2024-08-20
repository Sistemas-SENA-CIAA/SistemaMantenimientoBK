"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentación API Sistema Gestión Mantenimiento e Inventario",
        version: "1.0"
    },
    servers: [
        {
            url: "https://sistemamantenimiento-production.up.railway.app/"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "https",
                scheme: "bearer",
            },
        },
        schemas: {
            equipo: {
                type: "object",
                required: ["documento", "nombre", "fecha_inicio", "fecha_fin", "observaciones", "correo", "contrasenia"],
            },
            properties: {
                documento: {
                    type: "integer",
                },
                nombre: {
                    type: "string",
                },
                fecha_inicio: {
                    type: "date",
                },
                fecha_fin: {
                    type: "date",
                },
                observaciones: {
                    type: "string",
                },
                correo: {
                    type: "string",
                },
                contrasenia: {
                    type: "string",
                },
            },
        },
    },
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ["./routes/*.ts"],
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
