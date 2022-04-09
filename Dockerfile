FROM node:alpine

WORKDIR /usr/local/app

ADD index.js package.json package-lock.json ./

RUN npm i

ENV CONNECTION_STRING=""

EXPOSE 8080

ENTRYPOINT node index.js