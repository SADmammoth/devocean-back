module.exports['swagger-generator'] = {
  disabled: false,
  swaggerJsonPath: './swagger/swagger.json',
  swagger: {
    openapi: '3.0.0',
    info: {
      title: 'DEVocean REST API',
      description: 'React API documentation of DEVocean project',
    },
    servers: [{ url: 'http://localhost:1337/' }],
  },
  defaults: {
    responses: {
      '200': { description: 'The requested resource' },
      '404': { description: 'Resource not found' },
      '500': { description: 'Internal server error' },
    },
  },
  excludeDeprecatedPutBlueprintRoutes: true,
  includeRoute: function (routeInfo) {
    return true;
  },
};
