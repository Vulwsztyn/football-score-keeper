FROM node:16-alpine3.11


ENV PRODUCTION=true

WORKDIR /app/server
COPY ./server/package*.json ./server/tsconfig.json ./

RUN npm ci

COPY ./server/src ./src
COPY ./server/ormconfig.ts ./ormconfig.ts
COPY ./prod.env ./.env
RUN npx tsc
RUN rm ./ormconfig.ts
RUN mv ./build/ormconfig.js ./ormconfig.js
RUN rm -rf ./src

WORKDIR /app/front
COPY ./front .
COPY ./prod.env ./.env
RUN npm ci
RUN npm run build

RUN mkdir /app/server/build/src/front/
RUN mv ./build/* /app/server/build/src/front/


WORKDIR /app/server/build
CMD ["node", "src/index.js"]