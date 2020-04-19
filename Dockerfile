FROM node:12.16.2-alpine

WORKDIR /kojinbot

COPY package*.json ./

RUN npm ci --production \
  && npm i typescript --global \
  && tsc -p tsconfig.json

COPY . .

EXPOSE 50000

CMD npm run start
