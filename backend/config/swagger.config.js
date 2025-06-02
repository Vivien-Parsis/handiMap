import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Project B3',
      version: '1.0.0',
      description: 'Documentation Swagger pour les routes propriétaires',
    },
    components: {
      securitySchemes: {
        jwtToken: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'JWT sans le préfixe Bearer, juste le token brut',
        },
      },
    },
    security: [{ jwtToken: [] }],
  },
  apis: ['./routes/*.route.js'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

export { swaggerOptions, swaggerSpec }