import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

let token = '';

chai.should();

chai.use(chaiHttp);

describe('Epic mail API', () => {
  describe('POST/newGroup', () => {
    it('it should create a new group', (done) => {
      chai
        .request(server)
        .post('api/v1/group/newGroup')
        .send({ groupName: 'work group' })
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('status').eql('sucess');
          response.body.should.have.property('group');
          response.body.group.should.have.property('groupAdmin');
          response.body.group.should.have.property('groupName');
          response.body.group.should.have.property('members');

          done();
        });
    });
  });

  describe('PATCH/addMember/:id', () => {
    it('it should add new member', (done) => {
      chai
        .request(server)
        .patch('api/v1/group/addMembers/')
        .send({ members: 'Oladapo@bfree.limited' })
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.an('object');
          response.body.should.have.property('status').eql('sucess');
          response.body.should.have.property('group');
          response.body.group.should.have.property('groupAdmin');
          response.body.group.should.have.property('groupName');
          response.body.group.should.have.property('members');

          done();
        });
    });
  });
  describe('POST/sendMessage/:id', () => {
    it('it should send group message to the the group', (done) => {
      chai
        .request(server)
        .post('api/v1/group/sendMessage/')
        .send({
          status: 'lalalala123',
          heading: 'Request Form',
          body: 'Kindly fill the form to be admiited to the mentorship programme',
        })
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.an('object');
          response.body.should.have.property('status').eql('sucess');
          response.body.should.have.property('group');
          response.body.should.have.property('message');

          done();
        });
    });
  });

  describe('GET/readMessages/:id', () => {
    it('It should get messages sent to the group', (done) => {
      chai
        .request(server)
        .get('api/v1/group/sendMessage/')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.an('object');
        });
    });
  });
});
