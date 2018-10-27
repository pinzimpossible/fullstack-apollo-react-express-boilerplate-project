#------------------------------------------------------
#               Client build begin
#------------------------------------------------------
FROM node:8.12 as builder

RUN mkdir -p /app/client

WORKDIR /app/client

COPY ["./client/package.json", "./client/yarn.lock", "./"] 
RUN npm install -g --silent yarn
RUN yarn install

COPY ["./client/src", "./"]

RUN yarn build

#------------------------------------------------------
#               Server build begin
#------------------------------------------------------
## Specifies the base image we're extending
FROM node:8.12

## Create base directory
RUN mkdir -p /app/server

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /app/server

## Install packages using NPM 5 (bundled with the node:9 image)
COPY ["./server/package.json",  "/app/server/package.json"]
RUN npm install -g --silent yarn
RUN yarn install

RUN yarn install -g pm2 

## Add application code
COPY ["./server/.env", "./server/.babelrc", "./server/src", "/app/server/"]

WORKDIR /app

## Add the nodemon configuration file
# COPY ./nodemon.json /src/nodemon.json

## Set environment to "development" by default
# ENV NODE_ENV development

## Allows port 5000 to be publicly available
# EXPOSE 5000

## The command uses nodemon to run the application
# CMD ["npm", "start"]
# CMD ["pm2-docker", "start", "process.json"]

COPY --from=builder /app/client/build ./assets/blockpass_developer