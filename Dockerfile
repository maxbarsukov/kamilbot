FROM node:lts-alpine

ENV HOME /usr/src/
WORKDIR $HOME

COPY ["package.json", "yarn.lock", "$HOME/"]

RUN yarn install --frozen-lockfile --link-duplicates

COPY . $HOME

RUN yarn build
CMD yarn start
