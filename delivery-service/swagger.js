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
                        _id: {
                            type: "string",
                            description: 'The ID of the delivery',
                            format: 'uuid'
                        },
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
                            type: "string",
                            description: 'The pickup time',
                            format: "date-time"
                        },
                        start_time: {
                            type: "string",
                            description: 'The start time delivery',
                            format: "date-time"
                        },
                        end_time: {
                            type: "string",
                            description: 'The end time of the delivery',
                            format: "date-time"
                        },
                        location: {
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
                        status: {
                            enum: [
                                'open',
                                'picked-up',
                                'in-transit',
                                'delivered',
                                'failed'
                            ]
                        },
                        __v: {
                            type: "number",
                            description: 'The version',
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
                            type: "string",
                            description: 'The pickup time',
                            format: "date-time"
                        },
                        start_time: {
                            type: "string",
                            description: 'The start time delivery',
                            format: "date-time"
                        },
                        end_time: {
                            type: "string",
                            description: 'The end time of the delivery',
                            format: "date-time"
                        },
                        location:  {
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
                            example: 'must be one of [open, picked-up, in-transit, delivered, failed]'
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
                            example: 'An unexpected error occurred ...'
                        }
                    }
                },
                '401': {
                    description: "Unauthorized Request",
                    content: {
                        'application/json': {
                            example: 'Access denied or invalid user'
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