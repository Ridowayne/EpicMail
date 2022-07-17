import { string } from 'joi';

const getAllUsers = {
  tags: ['Users'],
  description: 'routes to get list of all users',
  summary: 'for getting all registered users',
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
              user: [],
            },
          },
        },
      },
    },
  },
};
const signupUser = {
  tags: ['Users'],
  description: 'routes to signup a new user',
  summary: 'for registering a new user',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              decription: 'Fullname of new user',
              example: 'Rilwan Hassan',
            },
            password: {
              type: 'string',
              decription: 'Preffered password of user',
              example: 'Nigeria123',
            },
            email: {
              type: 'string',
              decription: 'E-mail address Unique to just the user',
              example: 'Nigeria123@gamil.com',
            },
            phoneNumber: {
              type: 'number',
              decription: 'Phone number Unique to the ussser',
              example: '2349074452956',
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
              _id: 'string',
              name: '',
              email: '',
              token: 'token',
            },
          },
        },
      },
    },
  },
};
const loginUser = {
  tags: ['Users'],
  description: 'routes to login an existing user',
  summary: 'for authenticating a returning user',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              decription: 'E-mail address Unique to just the user',
              example: 'Nigeria123@gamil.com',
            },
            password: {
              type: 'string',
              decription: 'Preffered password of user',
              example: 'Nigeria123',
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
              _id: 'string',
              name: '',
              email: '',
              token: 'token',
            },
          },
        },
      },
    },
  },
};

const forgotPassword = {
  tags: ['Users'],
  description: 'routes to request for reset password link',
  summary:
    'for requesting for link to resset password by user who hass forgotten password after due verification',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              decription:
                'E-mail address Unique to just the user that was used to sign up initially',
              example: 'Nigeria123@gamil.com',
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
              message:
                'Token sent to you via your email, click on the link to verify',
            },
          },
        },
      },
    },
  },
};

const resetPassword = {
  tags: ['Users'],
  description: 'routes to reset password from link sent to mail',
  summary:
    'for resetting to a new password after with the link to the reset password routes sent to the mail of the user along with the reset token',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            password: {
              type: 'string',
              decription: 'new Preffered password of user',
              example: 'Nigeria123',
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
              message:
                'Token sent to you via your email, click on the link to verify',
            },
          },
        },
      },
    },
  },
};

const userRoutesDoc = {
  '/api/v1/users/allUsers': {
    get: getAllUsers,
  },
  '/api/v1/users/login': {
    post: loginUser,
  },
  '/api/v1/users/signup': {
    post: signupUser,
  },
  '/api/v1/users/forgotPassword': {
    post: forgotPassword,
  },
  '/api/v1/users/resetPassword': {
    post: resetPassword,
  },
};

export default userRoutesDoc;
