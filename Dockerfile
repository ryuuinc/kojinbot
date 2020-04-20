FROM node:12.16.2-alpine

WORKDIR /kojinbot

COPY package*.json ./

RUN npm ci --production \
  && npm run build

COPY . .

EXPOSE 50000

CMD ["npm", "start"]
