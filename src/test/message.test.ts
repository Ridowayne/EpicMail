import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

let token = '';

//Assertion style
chai.should();

chai.use(chaiHttp);
// test(sending, sent, inbox, draft, retracted, retractAmessage, getmessage)

describe('Epic mail API', () => {
  // (api/v1/mail)
  describe('GET /inbox', () => {
    it('it should GET all messages sent to the user', (done) => {
      chai
        .request(server)
        .get('api/v1/mail/inbox')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('status').eql('sucess');
          response.body.should.have.property('count');
          response.body.should.have.property('content');
          response.body.content.should.be.an('array');
          done();
        });
    });
  });

  it('it should not GET messages sent to the user with incorrect route', (done) => {
    chai
      .request(server)
      .get('/api/v1/inboxes')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.an('object');
        response.body.should.have.property('status').eql('fail');
        response.body.should.have.property('message');

        done();
      });
  });

  describe('GET /sentMessages', () => {
    it('it should GET all messages sent by the user', (done) => {
      chai
        .request(server)
        .get('api/v1/mail/sentMessages')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('status').eql('sucess');
          response.body.should.have.property('count');
          response.body.should.have.property('content');
          response.body.content.should.be.an('array');
          done();
        });
    });
  });

  it('it should not GET messages sent to by user with incorrect route', (done) => {
    chai
      .request(server)
      .get('/api/v1/sentMessage')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.an('object');
        response.body.should.have.property('status').eql('fail');
        response.body.should.have.property('message');

        done();
      });
  });
  describe('GET /drafts', () => {
    it('it should GET all draft messages of the user', (done) => {
      chai
        .request(server)
        .get('api/v1/mail/drafts')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('status').eql('sucess');
          response.body.should.have.property('count');
          response.body.should.have.property('content');
          response.body.content.should.be.an('array');
          done();
        });
    });
  });

  it('it should not GET draft messages of the user with incorrect route', (done) => {
    chai
      .request(server)
      .get('/api/v1/draft')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.an('object');
        response.body.should.have.property('status').eql('fail');
        response.body.should.have.property('message');

        done();
      });
  });

  describe('GET /drafts', () => {
    it('it should GET all retracted messages of the user', (done) => {
      chai
        .request(server)
        .get('api/v1/mail/retractedMessages')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('status').eql('sucess');
          response.body.should.have.property('count');
          response.body.should.have.property('content');
          response.body.content.should.be.an('array');
          done();
        });
    });
  });

  it('it should not GET retracted messages of the user with incorrect route', (done) => {
    chai
      .request(server)
      .get('/api/v1/retractedMessage')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.an('object');
        response.body.should.have.property('status').eql('fail');
        response.body.should.have.property('message');

        done();
      });
  });

  describe('GET /getMessage/:id', () => {
    it('it should GET a specific message of the user based on the id', (done) => {
      chai
        .request(server)
        .get('api/v1/mail/getMessage/62e17e4c3dd10e109b201b84')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('status').eql('sucess');
          response.body.should.have.property('count');
          response.body.should.have.property('content');
          response.body.content.should.be.an('array');
          done();
        });
    });
  });

  it('it should not GET message of the user with incorrect route', (done) => {
    chai
      .request(server)
      .get('/api/v1/getMessages//62e17e4c3dd10e109b201b84')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.an('object');
        response.body.should.have.property('status').eql('fail');
        response.body.should.have.property('message');

        done();
      });
  });
  it('it should not GET message of the user with incorrect id', (done) => {
    chai
      .request(server)
      .get('/api/v1/getMessage/62e17e4c3dd10e109b20')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.an('object');
        response.body.should.have.property('status').eql('fail');
        response.body.should.have
          .property('message')
          .eql('No message with such id was found');

        done();
      });
  });

  describe('PATCH /retractMessage/:id', () => {
    it('it should PATCH retract message of the user', (done) => {
      chai
        .request(server)
        .patch('api/v1/mail/retractMessage/62e17e4c3dd10e109b201b84')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('status').eql('sucess');
          response.body.should.have.property('count');
          response.body.should.have.property('content');
          response.body.content.should.be.an('array');
          done();
        });
    });
  });

  it('it should not PATCH retract message of the user with incorrect route', (done) => {
    chai
      .request(server)
      .patch('/api/v1/retractMessages//62e17e4c3dd10e109b201b84')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.an('object');
        response.body.should.have.property('status').eql('fail');
        response.body.should.have.property('message');

        done();
      });
  });

  it('it should not PATCH retract message of the user with incorrect id', (done) => {
    chai
      .request(server)
      .patch('/api/v1/retractMessage/62e17e4c3dd10e109b20')
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.an('object');
        response.body.should.have.property('status').eql('fail');
        response.body.should.have
          .property('message')
          .eql('No message with such ID found');

        done();
      });
  });

  describe('POST /sendmail', () => {
    it('it should log users in when creditials are valid', (done) => {
      chai
        .request(server)
        .post('/api/v1/mail/sendmail')
        .send({
          receiver: 'rilwan@bfree.limited',
          status: 'lalalala123',
          heading: 'Request Form',
          body: 'Indly fill the form to be admiited to the mentorship programme',
        })
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.an('object');
          response.body.should.have.property('newmail');
          response.body.newmail.should.have.property('sender');
          response.body.newmail.should.have.property('senderID');
          response.body.newmail.should.have.property('receiver');
          response.body.newmail.should.have.property('receiverID');
          response.body.newmail.should.have.property('status');
          response.body.newmail.should.have.property('heading');
          response.body.newmail.should.have.property('body');

          done();
        });
    });
  });
});

// [\w\d\s\.\'\,\-\!\@\#\$\&\*\`\~\[\]\?\<\>\"\:\;\\\/\{\}\|\%\^\(\)\+\=]{4,196}
// ^((?:.+)?)(?: )?(§[\d\w])<§[\d\w]((?:§[\d\w])?)(.+)§[\d\w]>\ §[\d\w]((?:§[\d\w])?)(.+)$
