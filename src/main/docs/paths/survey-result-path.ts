export const surveyResultPath = {
  put: {
    security: [{
      apiKeyAuth: [],
    }],
    tags: ['Survey'],
    summary: 'API for create answer to a survey',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/saveSurveyParams',
          },
        },
      },
    },
    parameters: [{
      in: 'path',
      name: 'surveyId',
      required: true,
      schema: {
        type: 'string',
      },
    }],
    responses: {
      200: {
        description: 'Successful',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult',
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
  get: {
    security: [{
      apiKeyAuth: [],
    }],
    tags: ['Survey'],
    summary: 'API for list a survey answer',
    parameters: [{
      in: 'path',
      name: 'surveyId',
      required: true,
      schema: {
        type: 'string',
      },
    }],
    responses: {
      200: {
        description: 'Successful',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult',
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
