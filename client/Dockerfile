#------------------------------------------------------
#               Client dev begin
#------------------------------------------------------
FROM node:8.12

RUN mkdir -p /app/client

WORKDIR /app/client

COPY ["./package.json", "./yarn.lock", "./"]
RUN npm install -g --silent yarn
RUN yarn install

COPY [".", "./"]

CMD [ "yarn", "start" ]