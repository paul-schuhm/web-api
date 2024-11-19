FROM node:23-bullseye-slim

WORKDIR /usr/src/app

RUN apt-get update && \
apt-get install -y default-mysql-client && \
rm -rf /var/lib/apt/lists/*

COPY api/ .

RUN npm install && npm run swagger-autogen

EXPOSE 3000
