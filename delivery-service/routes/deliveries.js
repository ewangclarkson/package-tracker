const express = require('express');
const router = express.Router();
const DeliveryController = require('../controller/delivery.controller');
const {validGUIDS} = require("pk-common-lib/middleware/validateguids");
const {auth,admin,driver}= require("pk-common-lib/middleware/auth");

/**
 * @openapi
 * tags:
 *  name: Delivery
 *  description: (Rest API to manage delivery)
 */
/**
 * @openapi
 * /api/delivery:
 *  get:
 *    description: Get all delivery
 *    summary: Get  all created delivery from DB
 *    operationId: getDeliveries
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *         application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Delivery'
 *      '401':
 *         $ref: '#/components/responses/401'
 *      '500':
 *         $ref: '#/components/responses/500'
 *    tags:
 *     - Delivery
 */
router.get('/',[auth,admin],DeliveryController.getDeliveries);

/** @openapi
 * /api/delivery/{id}:
 *  get:
 *    description: Get a delivery by ID
 *    summary: Get a delivery by ID
 *    operationId: getDelivery
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    tags:
 *     - Delivery
 *  parameters:
 *   - name: id
 *     in: path
 *     description: ID of delivery to get
 *     required: true
 *     schema:
 *      type: string
 *      items:
 *        type: string
 *     style: simple
 */

router.get('/:id',[auth,validGUIDS], DeliveryController.getDelivery);


/** @openapi
 * /api/delivery:
 *  post:
 *    description: Create a new delivery
 *    summary: Create delivery
 *    operationId: createDelivery
 *    responses:
 *      '201':
 *        $ref: '#/components/responses/201'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    requestBody:
 *      require: true
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/DeliveryRequest'
 *    tags:
 *     - Delivery
 *
 */

router.post('/',[auth,admin], DeliveryController.creatDelivery);

/** @openapi
 * /api/delivery/{id}:
 *  put:
 *    description: update delivery by ID
 *    summary: update delivery
 *    operationId: updateDelivery
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '400':
 *        $ref: '#/components/responses/400'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    requestBody:
 *      require: true
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/DeliveryRequest'
 *    tags:
 *     - Delivery
 *  parameters:
 *   - name: id
 *     in: path
 *     description: ID of delivery to be updated
 *     required: true
 *     schema:
 *      type: string
 *      items:
 *        type: string
 *     style: simple
 */


router.put('/:id',[validGUIDS,auth,driver], DeliveryController.updateDelivery);


/** @openapi
 * /api/delivery/{id}:
 *  delete:
 *    description: Delete a delivery by id
 *    summary: Delete a delivery from the DB
 *    operationId: deleteDelivery
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '401':
 *        $ref: '#/components/responses/401'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    tags:
 *     - Delivery
 *  parameters:
 *   - name: id
 *     in: path
 *     description: ID of delivery to be be deleted
 *     required: true
 *     schema:
 *      type: string
 *      items:
 *        type: string
 *     style: simple
 */
router.delete('/:id', [validGUIDS,auth,admin],DeliveryController.deleteDelivery);

module.exports = router;