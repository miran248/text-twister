FROM node:10.12.0-alpine AS base
ENV NODE_ENV=production
WORKDIR /text-twister

FROM base AS dependencies
COPY package.json .
COPY yarn.lock .
COPY packages/common packages/common
COPY packages/protobuf packages/protobuf
COPY services/api services/api

# RUN yarn install --non-interactive --cache-folder .yarn-cache; rm -Rf .yarn-cache
RUN yarn install --non-interactive

WORKDIR /text-twister/services/api
RUN yarn build
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.3.0/wait ./wait
RUN chmod +x ./wait
ENTRYPOINT ./wait && ./docker-entrypoint.sh
EXPOSE 8080
