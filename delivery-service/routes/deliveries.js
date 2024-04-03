const express = require('express');
const router = express.Router();
const CourseController = require('../controller/course.controller');
const validateObjectId = require('../middleware/validateobjectid');

/**
 * @openapi
 * tags:
 *  name: Course
 *  description: (Rest API to manage courses)
 */
/**
 * @openapi
 * /courses:
 *  get:
 *    description: Get all courses
 *    summary: Get  all created courses from DB
 *    operationId: getCourses
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    tags:
 *     - Course
 */
router.get('/', CourseController.getCourses);

/** @openapi
 * /courses/{id}:
 *  get:
 *    description: Get a course by ID
 *    summary: Get a course by ID
 *    operationId: getCourse
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    tags:
 *     - Course
 *  parameters:
 *   - name: id
 *     in: path
 *     description: ID of course to get
 *     required: true
 *     schema:
 *      type: string
 *      items:
 *        type: string
 *     style: simple
 */

router.get('/:id',validateObjectId, CourseController.getCourse);


/** @openapi
 * /courses:
 *  post:
 *    description: Create a new course
 *    summary: Create course
 *    operationId: createCourse
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
 *         $ref: '#/components/schemas/CourseRequest'
 *    tags:
 *     - Course
 *
 */

router.post('/', CourseController.creatCourse);


/** @openapi
 * /courses/{id}:
 *  delete:
 *    description: Delete a course by id
 *    summary: Delete a course from the DB
 *    operationId: deleteCourse
 *    responses:
 *      '200':
 *        $ref: '#/components/responses/200'
 *      '404':
 *        $ref: '#/components/responses/404'
 *      '500':
 *        $ref: '#/components/responses/500'
 *    tags:
 *     - Course
 *  parameters:
 *   - name: id
 *     in: path
 *     description: ID of course to be be deleted
 *     required: true
 *     schema:
 *      type: string
 *      items:
 *        type: string
 *     style: simple
 */
router.delete('/:id', validateObjectId,CourseController.deleteCourse);

/** @openapi
 * /courses/{id}:
 *  put:
 *    description: update course by ID
 *    summary: update course
 *    operationId: updateCourse
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
 *         $ref: '#/components/schemas/CourseRequest'
 *    tags:
 *     - Course
 *  parameters:
 *   - name: id
 *     in: path
 *     description: ID of course to be updated
 *     required: true
 *     schema:
 *      type: string
 *      items:
 *        type: string
 *     style: simple
 */


router.put('/:id',validateObjectId, CourseController.updateCourse);

module.exports = router;