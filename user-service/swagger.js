const swaggerJsdoc = require('swagger-jsdoc');
const config = require('config');
const host = config.get('app.host') + ':'
    + config.get('app.port');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Service Rest API',
            description: 'REST Api documentation for auth service',
            version: '1.0.0',
        },
        servers: [
            {
                url: host,
                description: "Development API server"
            }
        ],
        components: {
            schemas: {
                User:{
                    type: "object",
                    properties:{
                        _id:{
                          type: "string",
                          description: "The id of the user",
                            format: "uuid"
                        },
                        name: {
                            type:"string",
                            description:"The name of the user"
                        },
                        email: {
                            type:"string",
                            description:"The email of the user",
                            format:"email"
                        },
                        phoneNumber:{
                            type:Number,
                            description: "The phone number of the user"
                        }
                    }
                },
                UserRequest:{
                    type: "object",
                    required: ['name','email','password','phoneNumber'],
                    properties:{
                        name: {
                            type:"string",
                            description:"The name of the user"
                        },
                        email: {
                            type:"string",
                            description:"The email of the user",
                            format:"email"
                        },
                        password: {
                            type:"string",
                            description:"The password of the user"
                        },
                        phoneNumber:{
                            type:Number,
                            description: "The phone number of the user"
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: "Success",
                    content: {
                        "application/json":
                            {
                                schema: {
                                    $ref: '#/components/schemas/User'
                                }
                            }
                    }
                },
                '400': {
                    description: "Bad request",
                    content: {
                        'application/json': {
                            example: 'Validation failure'
                        }
                    }
                },
                '404': {
                    description: "Resource not found",
                    content: {
                        'application/json': {
                            example: 'User id could not be found'
                        }
                    }
                },
                '500': {
                    description: "Internal Server Error",
                    content: {
                        'application/json': {
                            example: 'Could not connect to the DB'
                        }
                    }
                },
                '201': {
                    description: "Created",
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User'
                            }
                        }
                    }
                }
            } ,
            securitySchemes: {
                jwtAuth: {
                    type: "http",
                    scheme: "bearer",
                    name: "Authorization",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [{
            jwtAuth: []
        }
        ]
    },
    apis: ['./routes/*.js'],
}

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;