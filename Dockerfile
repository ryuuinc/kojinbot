FROM node:12.16.2-alpine

WORKDIR /kojinbot

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 50000

CMD npm run start
