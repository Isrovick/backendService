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

# Final Container
FROM keymetrics/pm2:14-alpine as server

ADD pm2.json .

WORKDIR /app

COPY --from=builder /app/dist /app
COPY --from=packages /tmp/node_modules /app/node_modules

## TODO: Activate health check for this service
#HEALTHCHECK  --interval=15s --timeout=3s CMD wget --quiet --spider http://localhost:80/api/status || exit 1

CMD [ "pm2-runtime", "start", "/pm2.json" ]

