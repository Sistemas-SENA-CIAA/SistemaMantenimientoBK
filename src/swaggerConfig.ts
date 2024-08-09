import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentación Automática',
        version: '1.0.0',
        description: 'Documentación generada automáticamente con Swagger',
    },
    servers: [
        {
            url: 'sistemamantenimiento-production.up.railway.app',
            description: 'Servidor',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerDefinition };
