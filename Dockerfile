# builder
FROM node:12.18.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY lib ./lib
RUN npm run build
RUN npm prune --production

# copy from builder
FROM node:12.18.0-alpine
WORKDIR /kojinbot
COPY package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 55000
CMD ["npm", "start"]
