ARG NODE_VERSION=24.7.0-alpine

FROM node:${NODE_VERSION} AS development

WORKDIR /app

COPY apps/web/package*.json ./

RUN npm install

COPY apps/web .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM node:${NODE_VERSION} AS production

WORKDIR /app

COPY apps/web/package*.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY apps/web .

EXPOSE 4173

RUN npm run build

CMD ["npm","run","preview"]