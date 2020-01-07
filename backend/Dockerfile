FROM node:lts-alpine

RUN npm i -g @adonisjs/cli

RUN mkdir -p /src/app/backend
WORKDIR /src/app/backend

COPY package.json /src/app/backend
COPY package-lock.json /src/app/backend
COPY . /src/app/backend

RUN npm install
