# Builder stage
FROM node:lts-alpine AS builder

RUN npm install -g yarn

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build


# Runner stage
FROM node:lts-alpine

RUN npm install -g yarn

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --from=builder /app/dist ./dist

CMD yarn start
