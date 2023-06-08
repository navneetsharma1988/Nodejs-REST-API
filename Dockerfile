FROM node:alpine3.18

EXPOSE 3000

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD [ "npm", "start" ]

