FROM node:alpine3.18
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

