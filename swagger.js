import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expense tracker API',
      description: 'API endpoints for an expense tracker documented on swagger',
      contact: {
        name: 'Dmytro Sadovskyi',
        url: 'https://github.com/DmytroSadovskyi',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
      {
        url: 'https://expense-tracker-backend-mffk.onrender.com',
        description: 'Live server',
      },
    ],
  },

  apis: ['./routes/api/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
