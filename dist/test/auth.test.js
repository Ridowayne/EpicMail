"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_1 = __importDefault(require("../server"));
//Assertion style
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
describe('Epic mail API', () => {
    // (api/v1/users)
    // get allusers route
    describe('GET /allUsers', () => {
        it('it should GET all the Users', (done) => {
            chai_1.default
                .request(server_1.default)
                .get('/api/v1/users/allUsers')
                .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.an('object');
                response.body.should.have.property('status').eql('sucess');
                response.body.should.property('users');
                response.body.users.should.have.an('array');
                done();
            });
        });
    });
    it('it should not GET all the Users with incorrect route', (done) => {
        chai_1.default
            .request(server_1.default)
            .get('/api/v1/users/allUser')
            .end((err, response) => {
            response.should.have.status(404);
            response.body.should.be.an('object');
            response.body.should.have.property('status').eql('fail');
            response.body.should.have.property('message');
            done();
        });
    });
    describe('POST /login', () => {
        it('it should log users in when creditials are valid', (done) => {
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users/login')
                .send({
                email: 'rilwan@bfree.limited',
                password: 'lalalala123',
            })
                .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.an('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('token');
                done();
            });
        });
        it('it should not log users in without credentilas', (done) => {
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users/login')
                .send({
                email: '',
                password: '',
            })
                .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have
                    .property('message')
                    .eql('Kindly provide a valid email and password');
                done();
            });
        });
        it('it should not log users in with incorrect email credentilas', (done) => {
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users/login')
                .send({
                email: 'ilwan@bfree.limited',
                password: 'lalalala123',
            })
                .end((err, response) => {
                response.should.have.status(401);
                response.body.should.be.an('object');
                response.body.should.have
                    .property('message')
                    .eql('Email or Password is Wrong!');
                done();
            });
        });
        it('it should not log users in with incorrect email credentilas', (done) => {
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users/login')
                .send({
                email: 'rilwan@bfree.limited',
                password: 'lalalala12',
            })
                .end((err, response) => {
                response.should.have.status(401);
                response.body.should.be.an('object');
                response.body.should.have
                    .property('message')
                    .eql('Email or Password is Wrong!');
                done();
            });
        });
    });
    describe('POST /signup', () => {
        //     it('it should signup new user when creditials are valid', (done) => {
        //       chai
        //         .request(server)
        //         .post('/api/v1/users/signup')
        //         .send({
        //           name: 'Oladapo Omoyajowo',
        //           phoneNumber: '2347066322844',
        //           password: 'lalalala123',
        //           email: 'Oladapo@bfree.limited',
        //         })
        //         .end((err, response) => {
        //           response.should.have.status(200);
        //           response.body.should.be.an('object');
        //           response.body.should.have.property('_id');
        //           response.body.should.have.property('name');
        //           response.body.should.have.property('email');
        //           response.body.should.have.property('token');
        //           done();
        //         });
        //     });
        it('it should not signup new user without name', (done) => {
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users/signup')
                .send({
                name: '',
                phoneNumber: '2347066322844',
                password: 'lalalala123',
                email: 'Oladapo@bfree.limited',
            })
                .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('status').eql('fail');
                response.body.should.have.property('error');
                done();
            });
        });
        it('it should not signup new user without phoneNumber', (done) => {
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users/signup')
                .send({
                name: 'Oladapo Omoyajowo',
                phoneNumber: '',
                password: 'lalalala123',
                email: 'Oladapo@bfree.limited',
            })
                .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('status').eql('fail');
                response.body.should.have.property('error');
                done();
            });
        });
        it('it should not signup new user without password', (done) => {
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users/signup')
                .send({
                name: 'Oladapo Omoyajowo',
                phoneNumber: '2347066322844',
                password: '',
                email: 'Oladapo@bfree.limited',
            })
                .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('status').eql('fail');
                response.body.should.have.property('error');
                done();
            });
        });
        it('it should not signup new user without email', (done) => {
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users/signup')
                .send({
                name: 'Oladapo Omoyajowo',
                phoneNumber: '2347066322844',
                password: 'lalalala123',
                email: '',
            })
                .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('status').eql('fail');
                response.body.should.have.property('error');
                response.body.error.should.be.an('object');
                response.body.error.should.have.property('errors');
                response.body.error.errors.should.be.an('object');
                response.body.error.errors.should.have.property('email');
                response.body.error.errors.email.should.be.an('object');
                response.body.error.errors.email.should.have
                    .property('message')
                    .eql('kindly provide an email address');
                done();
            });
        });
        it('it should not signup new user without valid email', (done) => {
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users/signup')
                .send({
                name: 'Oladapo Omoyajowo',
                phoneNumber: '2347066322844',
                password: 'lalalala123',
                email: 'rilwan',
            })
                .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.an('object');
                response.body.should.have.property('status').eql('fail');
                response.body.should.have.property('error');
                response.body.error.should.be.an('object');
                response.body.error.should.have.property('errors');
                response.body.error.errors.should.be.an('object');
                response.body.error.errors.should.have.property('email');
                response.body.error.errors.email.should.be.an('object');
                response.body.error.errors.email.should.have
                    .property('message')
                    .eql('kindly provide a valid email address');
                done();
            });
        });
    });
    describe('POST /forgotPassword', () => {
        it('it should Send token to user mail when email is valid', (done) => {
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users/forgotPassword')
                .send({
                email: 'Oladapo@bfree.limited',
            })
                .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.an('object');
                response.body.should.have
                    .property('message')
                    .eql('Token sent to you via your email, click on the link to verify');
                done();
            });
        });
    });
    describe('POST /resetPassword', () => {
        it('it should reset a new password for the user based with the new reset token sent to user', (done) => {
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users/resetPassword')
                .send({
                password: 'Google1234',
            })
                .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.an('object');
                response.body.should.have.property('id');
                response.body.should.have.property('name');
                response.body.should.have.property('email');
                response.body.should.have.property('token');
                done();
            });
        });
    });
});
