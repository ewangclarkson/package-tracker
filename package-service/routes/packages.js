const express = require('express');
const router = express.Router();
const PackageController = require('../controller/package.controller');
const {validGUIDS} = require("pk-common-lib/middleware/validateguids");
const {auth,admin,driver}= require("pk-common-lib/middleware/auth");

/**
 * @openapi
 * tags:
 *  name: Package
 *  description: (Rest API to manage packages)
 */
/**
 * @openapi
 * /package:
 *  get:
 *    description: Get all packages
 *    summary: Get  all created packages from DB
 *    operationId: getPackages
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    tags:
 *     - Package
 */
router.get('',[auth,admin], PackageController.getPackages);

/** @openapi
 * /package/{id}:
 *  get:
 *    description: Get a package by ID
 *    summary: Get a package by ID
 *    operationId: getPackage
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    tags:
 *     - Package
 *  parameters:
 *   - name: id
 *     in: path
 *     description: ID of package to get
 *     required: true
 *     schema:
 *      type: string
 *      items:
 *        type: string
 *     style: simple
 */

router.get('/:id',[validGUIDS,auth], PackageController.getPackage);


/** @openapi
 * /package:
 *  post:
 *    description: Create a new package
 *    summary: Create package
 *    operationId: createPackage
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
 *         $ref: '#/components/schemas/PackageRequest'
 *    tags:
 *     - Package
 *
 */

router.post('',[auth,admin], PackageController.creatPackage);

/** @openapi
 * /package/{id}:
 *  put:
 *    description: update package by ID
 *    summary: update package
 *    operationId: updatePackage
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
 *         $ref: '#/components/schemas/PackageRequest'
 *    tags:
 *     - Package
 *  parameters:
 *   - name: id
 *     in: path
 *     description: ID of package to be updated
 *     required: true
 *     schema:
 *      type: string
 *      items:
 *        type: string
 *     style: simple
 */
router.put('/:id',[validGUIDS,auth,admin], PackageController.updatePackage);

/** @openapi
 * /package/{id}:
 *  delete:
 *    description: Delete a package by id
 *    summary: Delete a package from the DB
 *    operationId: deletePackage
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    tags:
 *     - Package
 *  parameters:
 *   - name: id
 *     in: path
 *     description: ID of package to be be deleted
 *     required: true
 *     schema:
 *      type: string
 *      items:
 *        type: string
 *     style: simple
 */
router.delete('/:id', [validGUIDS,auth,admin],PackageController.deletePackage);

module.exports = router;