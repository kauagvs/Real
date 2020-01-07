FROM node:lts-alpine

RUN yarn

RUN mkdir -p /app/frontend
WORKDIR /app/frontend

COPY package.json /app/frontend
COPY . /app/frontend

CMD [ "yarn", "start" ]
