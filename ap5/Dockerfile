FROM node:24-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

COPY src ./src

EXPOSE 5000
CMD ["node", "src/server.js"]
