FROM node:18.16.0-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
RUN apk update && apk upgrade && apk add git python3 make g++ bash

COPY . /usr/src/app/
# RUN npm install pm2 --global
RUN yarn add node-sass
RUN yarn

ENV HOST 0.0.0.0

WORKDIR ./runscripts

RUN NODE_OPTIONS=--openssl-legacy-provider yarn concurrently "yarn extract-routes" "yarn extract-scss-variables"
RUN npm run build
# start command
CMD npm run start
#CMD NODE_OPTIONS=--openssl-legacy-provider yarn concurrently "yarn start-watchers" "nuxt --port 8000"
