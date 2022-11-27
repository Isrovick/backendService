FROM node:14-alpine as packages

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install

## Builder container
FROM node:14-alpine as builder

WORKDIR /app
ADD ./ .
COPY --from=packages /tmp/node_modules /app/node_modules

RUN cd /app && npm run build
