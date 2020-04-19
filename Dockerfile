FROM node:12.16.2-alpine

WORKDIR /kojinbot

COPY package*.json ./

RUN npm ci --production \
  && npm i typescript --global

COPY . .

EXPOSE 50000

CMD npm run build && npm run start
