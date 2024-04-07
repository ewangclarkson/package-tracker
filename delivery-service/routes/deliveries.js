const express = require('express');
const router = express.Router();
const DeliveryController = require('../controller/delivery.controller');
const {validObjectId} = require("pk-common-lib/middleware/validateobjectid");
const {auth,admin,driver}= require("pk-common-lib/middleware/auth");

/**
 * @openapi
 * tags:
 *  name: Delivery
 *  description: (Rest API to manage delivery)
 */
/**
 * @openapi
 * /delivery:
 *  get:
 *    description: Get all delivery
 *    summary: Get  all created delivery from DB
 *    operationId: getDeliveries
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    tags:
 *     - Delivery
 */
router.get('/',[auth,admin],DeliveryController.getDeliveries);

/** @openapi
 * /delivery/{id}:
 *  get:
 *    description: Get a delivery by ID
 *    summary: Get a delivery by ID
 *    operationId: getDelivery
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
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

router.get('/:id',[auth,validObjectId], DeliveryController.getDelivery);


/** @openapi
 * /delivery:
 *  post:
 *    description: Create a new delivery
 *    summary: Create delivery
 *    operationId: createDelivery
 *    responses:
 *      '201':
 *        $ref: '#/components/responses/201'
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
 * /delivery/{id}:
 *  put:
 *    description: update delivery by ID
 *    summary: update delivery
 *    operationId: updateDelivery
 *    responses:
 *      '201':
 *        $ref: '#/components/responses/200'
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


router.put('/:id',[validObjectId,auth,driver], DeliveryController.updateDelivery);


/** @openapi
 * /delivery/{id}:
 *  delete:
 *    description: Delete a delivery by id
 *    summary: Delete a delivery from the DB
 *    operationId: deleteDelivery
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
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
router.delete('/:id', [validObjectId,auth,admin],DeliveryController.deleteDelivery);

module.exports = router;