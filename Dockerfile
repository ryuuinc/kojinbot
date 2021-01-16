# builder
FROM node:14.15.4-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY lib ./lib
RUN npm run build

# release
FROM node:14.15.4-alpine
WORKDIR /kojinbot
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app/dist ./dist
EXPOSE 55000
CMD ["npm", "start"]
