ARG NODE_VERSION=24.7.0-alpine

FROM node:${NODE_VERSION} AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev", "tasks-service"]

FROM node:${NODE_VERSION} AS production

ARG NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/tasks-service/main"]