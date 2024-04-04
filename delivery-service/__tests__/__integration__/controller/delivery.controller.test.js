const {describe, beforeEach, afterEach, it, expect, afterAll} = require('@jest/globals');
const request = require('supertest');
const db = require('../../../database/config');
const courseRepository = require('../../../domain/repository/course.repository');


let server;

describe("/courses", () => {

    beforeEach(async () => {
        server = require('../../../app');
        await courseRepository.insertMany([{
            name: "Numerical Analysis",
            author: "Ewang Clarkson",
            tags: ["math"],
            date: new Date(),
            isPublished: false
        },
            {name: "Calculus", author: "Ewang Clarkson", tags: ["math"], date: new Date(), isPublished: false}
        ]);
    });
    afterEach(async () => {
        await courseRepository.deleteMany({});
        server.close()
    });
    afterAll(() => db.close());

    describe('GET /', () => {
        it('should return a list of courses', async () => {
            const resp = await request(server).get('/courses');
            expect(resp.status).toBe(200);
            expect(resp.body.length).toEqual(2);
            expect(resp.body.some((p) => p.name === 'Numerical Analysis')).toBeTruthy();
        });

    });
    describe('GET /:id', () => {
        it('should return a 404 status code if the course does not exist', async () => {
            const resp = await request(server).get('/courses/6609af6e87555f3d88a34147');
            expect(resp.status).toBe(404);
        });

        it('should return the course with a status code of 200', async () => {
            const course = await courseRepository.create({
                name: "Genre",
                author: "Ewang Clarkson",
                tags: ["math"],
                date: new Date(),
                isPublished: false
            });

            const resp = await request(server).get(`/courses/${course._id}`);
            expect(resp.status).toBe(200);
            expect(resp.body.name).toEqual(course.name);
        });
    });

    describe('DELETE /:id', () => {

        it('should return 404 if the given id does not exist', async () => {
            const resp = await request(server).delete(`/courses/6609af6e87555f3d88a34147`);
            expect(resp.status).toEqual(404);
        });

        it('should delete the course and return 200 status code', async () => {
            const course = await courseRepository.create({
                name: "Genre",
                author: "Ewang Clarkson",
                tags: ["math"],
                date: new Date(),
                isPublished: false
            });
            const resp = await request(server).delete(`/courses/${course._id}`);
            expect(resp.status).toEqual(200);
        });
    });

    describe('POST /', () => {
        it('should return status code 400 if validation fails', async () => {
            const course = {
                author: "Ewang Clarkson",
                tags: ["math"],
                date: new Date(),
                isPublished: false
            };

            const resp = await request(server).post('/courses').send(course);
            expect(resp.status).toBe(400);

        });

        it('should return status code 200 and create course', async () => {
            const course = {
                name: 'Computer',
                author: "Ewang Clarkson",
                tags: ["math"],
                date: new Date(),
                isPublished: false
            };

            const resp = await request(server).post('/courses').send(course);
            expect(resp.status).toBe(201);
            expect(resp.body).toHaveProperty('name', 'Computer');
        });
    });


    describe('PUT /:id', () => {
        it('should return status code 404 if id invalid', async () => {
            const course = {
                name:'Computer',
                author: "Valid",
                tags: ["math"],
                date: new Date(),
                isPublished: false
            };

            const resp = await request(server).put('/courses/1').send(course);
            expect(resp.status).toBe(404);

        });

        it('should update the course if valid id', async () => {
            const newCourse ={
                name: 'Computer',
                author: "Ewang Clarkson",
                tags: ["math"],
                date: new Date(),
                isPublished: false
            };

            const course = await courseRepository.create(newCourse);

            const resp = await request(server).put(`/courses/${course._id}`).send({...newCourse,['name']:'Laptop'});
            expect(resp.status).toBe(200);
            expect(resp.body.name).toEqual('Laptop');
        });
        it('should return status code 400 if validation fails', async () => {
            const newCourse = {
                author: "Valid",
                tags: ["math"],
                date: new Date(),
                isPublished: false
            };
            const course = await courseRepository.create({...newCourse,name:'Computer'});

            const resp = await request(server).put('/courses/' + course._id).send(course);
            expect(resp.status).toBe(400);

        });

    });
});