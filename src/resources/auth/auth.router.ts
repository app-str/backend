import AuthController from './auth.controller';


const loginOpts = { 
  schema: {
    body: {
        type: 'object',
        require: ["login", "password"],
        properties: {
          login: {type: "string"},
          password: {type: "string"}
        }
    }
  },

  handler: AuthController.login
};

const registartionOpts = { 
  schema: {
    body: {
        type: 'object',
        require: ["login", "password"],
        properties: {
          login: {type: "string"},
          password: {type: "string"},
          name: {type: "string"}
        }
    }
  },

  handler: AuthController.registration
};



function AuthRoute (fastify, _, done) {

  fastify.post('/login', loginOpts);
  fastify.post('/registration', registartionOpts);

  done()
};


export default AuthRoute;
