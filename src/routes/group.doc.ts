const createGroup = {
  tags: ['Group'],
  description: 'route to create a new Group',
  summary: 'For creating a new group for messaging by a registered user',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            groupName: {
              type: 'string',
              description:
                'The name of the new group that the user intends to create',
              example: 'Mentorship Group',
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
              groupName: 'Example Group',
              groupId: '6t5r4e3w2q12rdfvc67yh',
              groupadmin: '9i8u7y6t54rtg453h',
              messages: ['a2bc5ed3476ggh6'],
              members: ['9i8u7y6t54rtg453h'],
            },
          },
        },
      },
    },
  },
};

const addMembers = {
  tags: ['Group'],
  description: 'routes for Admin of the group to add new members.',
  summary:
    'For adding new members in to the group and only the Admin is authorized to add new members.',
  requestBody: {
    content: {
      'application/json': {
        shema: {
          type: 'object',
          properties: {
            member: {
              type: 'string',
              desription:
                'Email address of the new member that will be added to the group',
              example: 'ayofe123@gmail.com',
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
              groupName: 'Example Group',
              groupId: '6t5r4e3w2q12rdfvc67yh',
              groupadmin: '9i8u7y6t54rtg453h',
              messages: [
                'a2bc5ed3476ggh6',
                'ed34gt5ht54hs',
                '9i8u7y6t54rtg453h',
              ],
              members: [
                'plkm987hj76h7k8h0gv',
                'ed34gt5ht54hs',
                '9i8u7y6t54rtg453h',
              ],
            },
          },
        },
      },
    },
  },
};

const sendGroupMessage = {
  tags: ['Group'],
  description: 'routes to send message to the group',
  summary: 'For sending message to registered users in the group',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
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
              groupId: '',
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

const getGroupMessage = {
  tags: ['Group'],
  description: 'routes for getting messages sent in the group',
  summary: 'for reading messages sennt to the group by group members only',

  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              sender: 'sender@gmail.com',
              groupId: '',
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

const groupRoutesDoc = {
  'api/v1/group/createGroup': {
    post: createGroup,
  },
  'api/v1/group/addMembers/:{groupId}': {
    patch: addMembers,
  },
  'api/v1/group/sendMessage/:{groupId}': {
    post: sendGroupMessage,
  },
  'api/v1/group/readMessages/:{groupId}': {
    get: getGroupMessage,
  },
};

export default groupRoutesDoc;
