export const surveyPath = {
  get: {
    security: [{
      apiKeyAuth: [],
    }],
    tags: ['Survey'],
    summary: 'API for list all surveys',
    responses: {
      200: {
        description: 'Successful',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveys',
            },
          },
        },
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
