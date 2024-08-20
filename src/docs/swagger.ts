import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition : OAS3Definition = {
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
                scheme: "bearer"
            },
        },
        schemas: {
            equipo: {
                type: "object",
                required: ["documento", "nombre", "fecha_inicio", "fecha_fin", "observaciones", "correo", "contrasenia"]
            },
            properties: {
                documento: {
                    type: "integer"
                },
                nombre: {
                    type: "string"
                },
                fecha_inicio: {
                    type: "date"
                },
                fecha_fin: {
                    type: "date"
                },
                observaciones: {
                    type: "string"
                },
                correo: {
                    type: "string"
                },
                contrasenia: {
                    type: "string"
                },
            },
        }
    }
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./routes/*.ts"],
  };
  
  export default swaggerJSDoc(swaggerOptions);

