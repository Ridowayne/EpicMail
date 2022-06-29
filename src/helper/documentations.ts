import userRoutesDoc from '../routes/auth.doc';
import userRoutesDoc2 from '../routes/auth.doc';
import userRoutesDoc3 from '../routes/auth.doc';
const swaggerDocumentation = {
  openapi: '3.0.0',
  info: {
    tittle: 'Epic Mail',
    version: '1.0',
    description: 'This is the documentation page to Epic mail api',
  },
  servers: [
    {
      url: 'http://127.0.0.1:8080',
      description: 'local dev',
    },
    {
      url: 'https://epick-mail.herokuapp.com/',
      description: 'Production dev',
    },
  ],

  tags: [
    {
      name: 'Users',
      description: 'User routes',
    },
  ],

  paths: {
    ...userRoutesDoc,
  },
};

export default swaggerDocumentation;
