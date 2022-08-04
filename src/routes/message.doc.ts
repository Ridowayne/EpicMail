import { SendMailOptions } from 'nodemailer';

const sendMail = {
  tags: ['Mail'],
  description: 'routes to send message',
  summary: 'For sending message to registered user',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            receiver: {
              type: 'string',
              description:
                'E-mail address of the for the to which the mail is being sent to',
              example: 'receiver@gmail.com',
            },
            status: {
              type: 'string',
              description:
                'status of the message, wether sent, draft or retracted',
              example: 'draft',
            },
            heading: {
              type: 'string',
              description: 'subject of the mail to be sent',
              example: 'Cover Letter',
            },
            body: {
              type: 'string',
              description:
                'Body of the mail to be sent which is the content of the mail',
              example:
                'I wish to apply for the positon as advertised in the media',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              sender: 'sender@gmail.com',
              receiver: 'receiver@gmail.com',
              status: 'sent',
              heading: 'Cover Letter',
              body: 'I wish to apply for the positon as advertised in the media',
            },
          },
        },
      },
    },
  },
};

const retractAMessage = {
  tags: ['Mail'],
  description: 'routes to retract a sent message',
  summary: 'For retracting previus message to  a registered user',
  //   parameters:
  //      - in: path,
  //         name: id,
  //         required: true,
  //         description: 'message id is reqired to complet the operation',
  //         type: 'string'
};

const getMessage = {
  tags: ['Mail'],
  description: 'routes to get a message',
  summary: 'For getting individual messages',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              sender: 'sender@gmail.com',
              receiver: 'receiver@gmail.com',
              status: 'sent',
              heading: 'Cover Letter',
              body: 'I wish to apply for the positon as advertised in the media',
            },
          },
        },
      },
    },
  },
};

const inbox = {
  tags: ['Mail'],
  description: 'routes to get inbox messages',
  summary: 'For getting users inbox  messages',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 'sucess',
              count: 0,
              content: [],
            },
          },
        },
      },
    },
  },
};

const sentMessages = {
  tags: ['Mail'],
  description: 'routes to get sent messages',
  summary: 'For getting users sent messages',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 'sucess',
              count: 0,
              content: [],
            },
          },
        },
      },
    },
  },
};

const retractedMessages = {
  tags: ['Mail'],
  description: 'routes to get retracted messages',
  summary: 'For getting users retracted  messages',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 'sucess',
              count: 0,
              content: [],
            },
          },
        },
      },
    },
  },
};

const draftMessages = {
  tags: ['Mail'],
  description: 'routes to get draft messages',
  summary: 'For getting users draft messages',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 'sucess',
              count: 0,
              content: [],
            },
          },
        },
      },
    },

    404: {
      description: 'not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              message: 'Unable to get Draft Messages at the moment',
            },
          },
        },
      },
    },
  },
};

const mailRoutesDoc = {
  '/api/v1/mail/sendmail': {
    post: sendMail,
  },
  '/api/v1/mail/retractMessage/{id}:': {
    patch: retractAMessage,
  },
  '/api/v1/mail/getMessage/{id}:': {
    get: getMessage,
  },
  '/api/v1/mail/inbox': {
    get: inbox,
  },
  '/api/v1/mail/sentMessages': {
    get: sentMessages,
  },
  '/api/v1/mail/drafts': {
    get: draftMessages,
  },
  '/api/v1/mail/retractedMessages': {
    get: retractedMessages,
  },
};
export default mailRoutesDoc;
