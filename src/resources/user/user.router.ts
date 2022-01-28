import { getUsers, getUser, deleteUser, updateUser } from "./user.controller";

const User = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: "string"},
    login: {type: "string"}
  }
}

const getUsersOpts = {
  schema: {
    response:{
      200: {
        type: 'array',
        items: User
      }
    }
  },
  handler: getUsers
}

const getUserOpts = {
  schema: {
    response: {
      200: User
    }
  },

  handler: getUser
}

const updateUserOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: {type: 'string'},
        password: {type: 'string'},
        login: {type: 'string'},
      }
    },
    response: {
      200: User 
    }
  },

  handler: updateUser
}

const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: {type: "string"}
        }
      },
      404: {
        type: "object",
        properties: {
          message: {type: "string"}
        }
      }  
    }
  },

  handler: deleteUser
}

export function UserRoutes (fastify, _, done) {

  fastify.get('/users', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...getUsersOpts,
  });
  fastify.get('/profile', {
    preHandler: fastify.auth([fastify.verifyToken]),
    ...getUserOpts
  });
  fastify.put('/update', {
    preHandler: fastify.auth([fastify.verifyToken]), 
    ...updateUserOpts
  });
  fastify.delete('/delete', {
    preHandler: fastify.auth([fastify.verifyToken]), 
    ...deleteUserOpts
  });

  done();
}
