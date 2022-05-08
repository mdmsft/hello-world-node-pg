FROM node:alpine

ARG PORT=8080

WORKDIR /usr/local/app

ADD index.js package.json package-lock.json ./

RUN npm i

ENV CONNECTION_STRING=
ENV PFX_PATH=
ENV CRT_PATH=
ENV KEY_PATH=
ENV HTTP_VERSION=
ENV PORT=${PORT}

EXPOSE ${PORT}

ENTRYPOINT node index.js