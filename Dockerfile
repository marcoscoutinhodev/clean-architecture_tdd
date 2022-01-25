FROM node:16
WORKDIR /usr/src/clean-tdd-node-api
COPY ./package.json .
RUN npm install --only=prod