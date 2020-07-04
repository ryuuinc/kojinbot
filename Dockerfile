FROM node:12.18.0-alpine AS builder

WORKDIR /builder

COPY package*.json ./

RUN npm ci

COPY tsconfig*.json ./
COPY lib ./lib

RUN npm run clean && npm run build

FROM node:12.18.0-alpine

WORKDIR /kojinbot

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /builder/dist ./dist

EXPOSE 55000

CMD ["npm", "start"]
