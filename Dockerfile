FROM node:16-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y openssl

RUN npm run build

ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/node_modules/@prisma/engines/libquery_engine-debian-openssl-1.1.x.so.node

CMD ["npm", "start"]
