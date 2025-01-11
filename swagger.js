const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend App API',
      version: '1.0.0',
      description: 'API documentation for the Backend App',
    },
  },
  apis: ['./routes/*.js', './controllers/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);

const swaggerOptions = {
  customSiteTitle: 'Backend App API Documentation',
  swaggerOptions: {
    docExpansion: 'none',
    defaultModelsExpandDepth: -1,
    defaultModelExpandDepth: 0,
    showRequestHeaders: false,
  },
};

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));
};