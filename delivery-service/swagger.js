const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Delivery Service Rest API',
            description: 'This REST Api documentation for delivery service',
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:8002",
                description: "Development API server"
            }
        ],
        components: {
            schemas: {
                Course: {
                    type: "object",
                    required: ['_id', 'name', 'tags'],
                    properties: {
                        _id: {
                            type: "string",
                            description: 'The ID of the course'
                        },
                        name: {
                            type: "string",
                            description: 'The name of the course'
                        },
                        author: {
                            type: "string",
                            description: 'The author of the course'
                        },
                        tags: {
                            type: "array",
                            description: 'The tags of the course'
                        },
                        isPublished: {
                            type: "boolean",
                            description: 'The published state of the course'
                        }
                    }
                },
                CourseRequest: {
                    type: "object",
                    required: ['name', 'author', 'tags'],
                    properties: {
                        name: {
                            type: "string",
                            description: 'The name of the course'
                        },
                        author: {
                            type: "string",
                            description: 'The author of the course'
                        },
                        tags: {
                            type: "array",
                            description: 'The tags of the course'
                        },
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
                                    $ref: '#/components/schemas/Course'
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
                            example: 'Course id could not be found'
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
                                $ref: '#/components/schemas/Course'
                            }
                        }
                    }
                }
            },
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