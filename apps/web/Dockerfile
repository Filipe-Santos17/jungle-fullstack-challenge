ARG NODE_VERSION=24.7.0-alpine

FROM node:${NODE_VERSION} AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["tail -f /dev/null"]

FROM node:${NODE_VERSION} AS production

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm","run","preview"]