export const signUpParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    passwordConfirmation: {
      type: 'string',
    },
    cpf: {
      type: 'string',
    },
    birthdate: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
  },
  required: [
    'name',
    'email',
    'password',
    'passwordConfirmation',
    'cpf',
    'birthdate',
    'phoneNumber',
  ],
};
