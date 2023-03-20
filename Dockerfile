FROM node:lts-alpine

ENV HOME /usr/src/
WORKDIR $HOME

COPY ["yarn-offline-mirror", "$HOME/yarn-offline-mirror/"]

COPY ["package.json", "yarn.lock", ".yarnrc", "$HOME/"]

RUN yarn install --offline --frozen-lockfile --link-duplicates

COPY . $HOME

RUN yarn build
CMD yarn start
