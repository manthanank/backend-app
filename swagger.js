const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend App API',
      version: '1.0.0',
      description: 'API documentation for the Backend App',
      contact: {
        name: 'Manthan Ankolekar',
        url: 'https://github.com/manthanank',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server (v1)',
      },
      {
        url: 'http://localhost:3000/api',
        description: 'Development server (legacy - deprecated)',
      },
      {
        url: 'https://backend-app-manthanank.vercel.app/api/v1',
        description: 'Production server (v1)',
      },
    ],
    basePath: '/api/v1',
  },
  apis: [
    './routes/*.js',
    './routes/v1/*.js',
    './controllers/*.js',
    './models/*.js',
  ],
};

const specs = swaggerJsdoc(options);

const swaggerOptions = {
  customSiteTitle: 'Backend App API Documentation',
  swaggerOptions: {
    docExpansion: 'none',
    defaultModelsExpandDepth: -1,
    defaultModelExpandDepth: 0,
    showRequestHeaders: false,
    tryItOutEnabled: true,
    persistAuthorization: true,
  },
};

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';

module.exports = (app) => {
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, swaggerOptions, { customCssUrl: CSS_URL }),
  );
};
