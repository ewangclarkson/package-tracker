const swaggerJsdoc = require('swagger-jsdoc');
const config = require('config');
const host = config.get('app.host') + ':'
    + config.get('app.port');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Delivery Service Rest API',
            description: 'REST Api documentation for delivery service',
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
                Delivery: {
                    type: "object",
                    required: ['delivery_id', 'package_id', 'description', 'pickup_time', 'start_time', 'end_time', 'location', 'status'],
                    properties: {
                        delivery_id: {
                            type: "string",
                            description: 'The ID of the delivery',
                            format: 'uuid'
                        },
                        package_id: {
                            type: "string",
                            description: 'The ID of the package been delivered',
                            format: 'uuid'
                        },
                        pickup_time: {
                            type: "date",
                            description: 'The pickup time'
                        },
                        start_time: {
                            type: "date",
                            description: 'The start time delivery'
                        },
                        end_time: {
                            type: "date",
                            description: 'The end time of the delivery'
                        },
                        location: {
                            schema: {
                                $ref: '#/components/schemas/Location'
                            }
                        },
                        status: {
                            enum: [
                                'open',
                                'picked-up',
                                'in-transit',
                                'delivered',
                                'failed'
                            ]
                        },
                    }
                },
                DeliveryRequest: {
                    type: "object",
                    required: ['active_delivery', 'description', 'weight', 'width', 'height', 'depth', 'from_name', 'from_address', 'from_location', 'to_name', 'to_address', 'to_location'],
                    properties: {
                        package_id: {
                            type: "string",
                            description: 'The ID of the package been delivered',
                            format: 'uuid'
                        },
                        pickup_time: {
                            type: "date",
                            description: 'The pickup time'
                        },
                        start_time: {
                            type: "date",
                            description: 'The start time delivery'
                        },
                        end_time: {
                            type: "date",
                            description: 'The end time of the delivery'
                        },
                        location: {
                            schema: {
                                $ref: '#/components/schemas/Location'
                            }
                        },
                        status: {
                            enum: [
                                'open',
                                'picked-up',
                                'in-transit',
                                'delivered',
                                'failed'
                            ]
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
                                    $ref: '#/components/schemas/Delivery'
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
                            example: 'Delivery id could not be found'
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
                                $ref: '#/components/schemas/Delivery'
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