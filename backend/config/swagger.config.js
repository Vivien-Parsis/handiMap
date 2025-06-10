import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Project B3',
      version: '1.0.0',
      description: "Documentation Swagger de l'API de Handi'Map",
    },
    components: {
      securitySchemes: {
        jwtToken: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'JWT brut',
        },
      },
    },
    security: [{ jwtToken: [] }],
  },
  apis: ['./routes/*.route.js'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

export { swaggerOptions, swaggerSpec }
