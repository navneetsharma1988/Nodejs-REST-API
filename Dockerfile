FROM node:alpine3.18

EXPOSE 3000

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

CMD [ "npm", "start" ]

