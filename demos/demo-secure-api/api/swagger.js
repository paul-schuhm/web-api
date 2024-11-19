const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'

const endpointsFiles = ['./routes/index.js', './routes/login.js']

//@See: https://swagger-autogen.github.io/docs/getting-started/
const doc = {
    info: {
      version: '3.0.0',            // by default: '1.0.0'
      title: 'Starter RESTful API',              // by default: 'REST API'
      description: '0.0.1'         // by default: ''
    },
    host: 'localhost:5001',                 // by default: 'localhost:3000'
    basePath: '',             // by default: '/'
    schemes: ['http'],              // by default: ['http']
    consumes: [],             // by default: ['application/json']
    produces: [],             // by default: ['application/json']
    tags: [                   // by default: empty Array
      {
        name: '',             // Tag name
        description: ''       // Tag description
      },
      // { ... }
    ],
    securityDefinitions: {},  // by default: empty object
    definitions: {}           // by default: empty object
  };
  

swaggerAutogen(outputFile, endpointsFiles, doc)
