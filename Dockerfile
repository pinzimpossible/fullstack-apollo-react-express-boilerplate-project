## Specifies the base image we're extending
FROM node:8.12

## Create base directory
RUN mkdir -p /app/server

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /app/server

## Install packages using NPM 5 (bundled with the node:9 image)
COPY ./server/package.json  /app/server/package.json
RUN npm install --silent

## Add application code
COPY ./server/.env /app/server/.env
COPY ./server/.babelrc /app/server/.babelrc
COPY ./server/src /app/server/src

## Add the nodemon configuration file
# COPY ./nodemon.json /src/nodemon.json

## Set environment to "development" by default
ENV NODE_ENV development

## Allows port 3000 to be publicly available
EXPOSE 3000

## The command uses nodemon to run the application
CMD ["npm", "start"]