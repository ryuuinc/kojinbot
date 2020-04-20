FROM node:12.16.2-alpine

WORKDIR /kojinbot

COPY package*.json ./

RUN npm ci --production

COPY . .

RUN npm run build

EXPOSE 50000

CMD ["npm", "start"]
