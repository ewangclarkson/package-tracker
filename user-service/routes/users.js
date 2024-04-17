const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');
const {validObjectId} = require("../middleware/validateobjectid");
const {auth,admin,driver} = require('pk-common-lib/middleware/auth');


/** @openapi
 * /api/users/me:
 *  get:
 *    description: Get a user from the token
 *    summary: Get current auth user
 *    operationId: getUser
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    tags:
 *     - User
 */

router.get('/me',auth, UserController.getAuthUser);


/** @openapi
 * /api/users/register:
 *  post:
 *    description: Create a new user
 *    summary: Create user
 *    operationId: createUser
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
 *         $ref: '#/components/schemas/UserRequest'
 *    tags:
 *     - User
 *
 */

router.post('/register', UserController.registerUser);

/** @openapi
 * /api/users/{id}:
 *  put:
 *    description: update user by ID
 *    summary: update user
 *    operationId: updateUser
 *    responses:
 *      '200':
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
 *         $ref: '#/components/schemas/UpdateUserRequest'
 *    tags:
 *     - User
 *  parameters:
 *   - name: id
 *     in: path
 *     description: ID of user to be updated
 *     required: true
 *     schema:
 *      type: string
 *      items:
 *        type: string
 *     style: simple
 */
router.put('/:id',[validObjectId,auth], UserController.updateUser);

/** @openapi
 * /api/users/login:
 *  post:
 *    description: user authentication
 *    summary: authenticate user
 *    operationId: user login
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *         application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginResponse'
 *      '400':
 *        description: Bad Request
 *        content:
 *         application/json:
 *          example: Validation Failure
 *      '401':
 *        description: Unauthorized User
 *        content:
 *         application/json:
 *          example: Invalid user email or password
 *      '500':
 *        $ref: '#/components/responses/500'
 *    requestBody:
 *      require: true
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/LoginRequest'
 *    tags:
 *     - User
 */
router.post('/login',UserController.login);

module.exports = router;