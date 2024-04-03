const swaggerJsdoc = require('swagger-jsdoc');
const config = require('config');
const host = config.get('app.host') + ':'
    + config.get('app.port');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Package Service Rest API',
            description: 'REST Api documentation for package service',
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
                Location: {
                    type: "object",
                    required: ['lat', 'lng'],
                    properties: {
                        lat: {
                            type: 'number',
                            description: 'The latitude on the map'
                        },
                        lng: {
                            type: 'number',
                            description: 'The longitude on the map'
                        }
                    }
                },
                Package: {
                    type: "object",
                    required: ['package_id', 'active_delivery', 'description', 'weight', 'width', 'height', 'depth', 'from_name', 'from_address', 'from_location', 'to_name', 'to_address', 'to_location'],
                    properties: {
                        package_id: {
                            type: "string",
                            description: 'The ID of the package',
                            format: 'uuid'
                        },
                        active_delivery_id: {
                            type: "string",
                            description: 'The active deliver ID',
                            format: 'uuid'
                        },
                        description: {
                            type: "string",
                            description: 'The description of the package'
                        },
                        weight: {
                            type: "number",
                            description: 'The weight of the package in grams'
                        },
                        width: {
                            type: "number",
                            description: 'The width of the package in cm'
                        },
                        height: {
                            type: "number",
                            description: 'The height of the package in cm'
                        },
                        depth: {
                            type: "number",
                            description: 'The depth of the package in cm'
                        },
                        from_name: {
                            type: "string",
                            description: 'The source name of the package'
                        },
                        from_address: {
                            type: "string",
                            description: 'The source address of the package'
                        },
                        from_location: {
                            schema: {
                                $ref: '#/components/schemas/Location'
                            }
                        },
                        to_name: {
                            type: "string",
                            description: 'The destination name of the package'
                        },
                        to_address: {
                            type: "string",
                            description: 'The destination address of the package'
                        },
                        to_location: {
                            schema: {
                                $ref: '#/components/schemas/Location'
                            }
                        },
                    }
                },
                PackageRequest: {
                    type: "object",
                    required: ['active_delivery', 'description', 'weight', 'width', 'height', 'depth', 'from_name', 'from_address', 'from_location', 'to_name', 'to_address', 'to_location'],
                    properties: {
                        active_delivery_id: {
                            type: "string",
                            description: 'The active deliver ID',
                            format: 'uuid'
                        },
                        description: {
                            type: "string",
                            description: 'The description of the package'
                        },
                        weight: {
                            type: "number",
                            description: 'The weight of the package in grams'
                        },
                        width: {
                            type: "number",
                            description: 'The width of the package in cm'
                        },
                        height: {
                            type: "number",
                            description: 'The height of the package in cm'
                        },
                        depth: {
                            type: "number",
                            description: 'The depth of the package in cm'
                        },
                        from_name: {
                            type: "string",
                            description: 'The source name of the package'
                        },
                        from_address: {
                            type: "string",
                            description: 'The source address of the package'
                        },
                        from_location: {
                            schema: {
                                $ref: '#/components/schemas/Location'
                            }
                        },
                        to_name: {
                            type: "string",
                            description: 'The destination name of the package'
                        },
                        to_address: {
                            type: "string",
                            description: 'The destination address of the package'
                        },
                        to_location: {
                            schema: {
                                $ref: '#/components/schemas/Location'
                            }
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
                                    $ref: '#/components/schemas/Package'
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
                            example: 'Package id could not be found'
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
                                $ref: '#/components/schemas/Package'
                            }
                        }
                    }
                }
            }// ,
            // securitySchemes: {
            //     // jwtAuth: {
            //     //     type: "http",
            //     //     scheme: "bearer",
            //     //     name: "Authorization",
            //     //     bearerFormat: "JWT",
            //     // }
            // }
        },
        // security: [{
        //     // jwtAuth: []
        // }
        // ]
    },
    apis: ['./routes/*.js'],
}

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;