#------------------------------------------------------
#               Server dev begin
#------------------------------------------------------
FROM node:8.12

RUN mkdir -p /app/server

WORKDIR /app/server

COPY ["./package.json", "./yarn.lock", "./.babelrc", "./"]
RUN npm install -g --silent yarn
RUN yarn install

COPY ["./src", "./"]

CMD [ "yarn", "start" ]