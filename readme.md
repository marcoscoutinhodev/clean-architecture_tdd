# Clean Architecture & TDD
## 
[![Build Status](https://app.travis-ci.com/marcoscoutinhodev/clean-architecture_tdd.svg?branch=main)](https://app.travis-ci.com/marcoscoutinhodev/clean-architecture_tdd)

[![Coverage Status](https://coveralls.io/repos/github/marcoscoutinhodev/clean-architecture_tdd/badge.svg?branch=main)](https://coveralls.io/github/marcoscoutinhodev/clean-architecture_tdd?branch=main)

The purpose of this API is to practice NodeJS API development using Clean Architecture, SOLID principles, TDD, Docker and Ci/Cd

## Tech & Tools

- [NodeJs]
- [Express]
- [TypeScript]
- [Jest]
- [Docker]
- [Travis Ci]
- [Coveralls]
- [Swagger]

## Installation

Requires [Docker] to run api.
 - Docker will expose the API on port 4001 and the MongoDb database on port 27017

Install the dependencies and devDependencies and start the server.

```sh
cd clean-architecture_tdd
yarn && yarn up
```


## UseCases
- SignUp
    - POST request to /api/signup
    - Request body must have: name, email, password, passwordConfirmation, cpf, birthdate, phoneNumber
    - All data is string
    - email must have a valid email format
    - email must not be registered
    - password and passwordConfirmation must match
    - cpf must be valid
    - birthdate must be valid date
    - phoneNumber must have this format: xx-xxxxx-xxxx
    - On success returns 200 and the account access token
- Login
    - POST request to /api/login
    - Request body must have: email, password
    - All data is string
    - email must have a valid email format
    - email must be registered
    - password must match the account password
    - On success returns 200 and the account access token
- AddSurvey
    - POST request to /api/surveys
    - x-access-token is required with account access token in request headers
    - Requires an account with admin role
    - Request body must have: question, answers
    - question is string
    - answers is an array of answer's object like this >> [{ image?: string, answer: string }]
    - On success returns 204
- LoadSurveys
    - GET request to /api/surveys
    - Required x-access-token with any account access token
    - On success returns 200 and all Surveys registered
- SaveSurveyResult
    - PUT request to /api/surveys/:surveyId/results
    - Requires surveyId in url params
    - x-access-token is required with account access token in request headers
    - Request body must have: answer
    - answer is string and must to be valid
    - On success returns 200 and the survey result saved